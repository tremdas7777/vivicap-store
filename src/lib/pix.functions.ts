import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getBundle, isFreeShippingEligible, parseBundleId, FREE_SHIPPING_MIN } from "@/lib/bundles";
import { brand } from "@/lib/brand";
import {
  saveOrder,
  fetchGatewayStatus,
  reportPaidOnce,
  reportPendingToUtmify,
  getOrder,
  findUpsellOf,
} from "@/lib/pix-orders.server";
import { isPaidStatus } from "@/lib/pix-status";
import { upsellPrice } from "@/lib/upsell";
import { getRequest } from "@tanstack/react-start/server";
import { PIXGATE_API, requirePixGateKey } from "@/lib/pixgate.server";

const utmSchema = z.record(z.string(), z.string().max(300).nullable()).optional().default({});

/**
 * Domínio público para o postback da PixGate, lido da própria requisição no servidor
 * (não do que o navegador informa). Fora de https público (ex.: localhost), usa PUBLIC_SITE_URL.
 */
function siteBase(fallbackOrigin: string): string {
  const h = getRequest()?.headers;
  const host = h?.get("x-forwarded-host") ?? h?.get("host");
  const proto = h?.get("x-forwarded-proto") ?? "https";
  const fromRequest = host ? `${proto}://${host}` : "";
  const isPublic = /^https:\/\//.test(fromRequest) && !/localhost|127\.0\.0\.1/.test(fromRequest);
  const base = isPublic
    ? fromRequest
    : process.env["PUBLIC_SITE_URL"] || fromRequest || fallbackOrigin;
  return new URL(base).origin;
}

function isValidCpf(raw: string): boolean {
  const c = raw.replace(/\D/g, "");
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  for (const t of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < t; i++) sum += Number(c[i]) * (t + 1 - i);
    const d = ((sum * 10) % 11) % 10;
    if (d !== Number(c[t])) return false;
  }
  return true;
}

const customerSchema = z.object({
  plano: z.string(),
  name: z.string().trim().min(3).max(120),
  email: z.string().trim().email().max(160),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .pipe(z.string().min(10).max(11)),
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine(isValidCpf, "CPF inválido"),
  origin: z.string().url(),
  frete: z.enum(["gratis", "padrao", "express"]).default("padrao"),
  endereco: z.string().max(300).optional(),
  // Endereço por partes (RastroCode). Opcional: clientes antigos não enviam.
  address: z
    .object({
      street: z.string().trim().min(1).max(200),
      number: z.string().trim().min(1).max(20),
      complement: z.string().trim().max(200).optional(),
      neighborhood: z.string().trim().min(1).max(120),
      city: z.string().trim().min(1).max(120),
      state: z.string().trim().length(2),
      zipcode: z.string().regex(/^\d{8}$/),
    })
    .optional(),
  utm: utmSchema,
});

/** Regras de preço do checkout (espelhadas no cliente só para exibição). */
export const FRETES = [
  { id: "gratis", name: "Frete Grátis", eta: "7 a 10 dias úteis", price: 0 },
  { id: "padrao", name: "Frete Padrão", eta: "5 dias úteis", price: 20 },
  { id: "express", name: "Frete Express", eta: "1 a 2 dias úteis", price: 37.53 },
] as const;
export type FreteId = (typeof FRETES)[number]["id"];
export const getFrete = (id: FreteId) => FRETES.find((f) => f.id === id) ?? FRETES[0];

export type PixCharge = { id: string; qrcode: string; amount: number; status: string };

/** Gera a cobrança Pix na PixGate. Valor em centavos. */
async function gatewayCashin(o: { name: string; cpf: string; amount: number; origin: string }) {
  // PixGate recebe o valor em reais (decimal); internamente seguimos em centavos.
  const valor = Number((o.amount / 100).toFixed(2));
  const res = await fetch(`${PIXGATE_API}/v1/cashin`, {
    method: "POST",
    headers: {
      Apikey: await requirePixGateKey(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      nome: o.name,
      cpf: o.cpf,
      valor,
      // Nome genérico enviado ao gateway — sem detalhes do produto real.
      descricao: brand.chargeDescription,
      postback: `${siteBase(o.origin)}/api/public/pix-webhook`,
    }),
  });
  const json = (await res.json().catch(() => null)) as any;
  const txId = json?.id;
  const qrcode = json?.pix;
  if (!res.ok || !txId || !qrcode) {
    console.error("PixGate error", res.status, JSON.stringify(json)?.slice(0, 500));
    throw new Error("Não foi possível gerar o Pix. Confira seus dados e tente novamente.");
  }
  return {
    id: String(txId),
    qrcode: String(qrcode),
    status: String(json?.status ?? "pending").toLowerCase(),
  };
}

function requestMeta() {
  const h = getRequest()?.headers;
  return {
    ip: h?.get("cf-connecting-ip") ?? h?.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    ua: h?.get("user-agent") ?? null,
  };
}

export const createPixCharge = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => customerSchema.parse(d))
  .handler(async ({ data }): Promise<PixCharge> => {
    // Preço sempre definido no servidor — nunca confiar no cliente.
    const bundle = getBundle(parseBundleId(data.plano) ?? "1");
    if (data.frete === "gratis" && !isFreeShippingEligible(bundle.price)) {
      throw new Error(
        `Frete grátis disponível apenas para compras acima de R$ ${FREE_SHIPPING_MIN}.`,
      );
    }
    const freteOpt = getFrete(data.frete);
    const frete = freteOpt.price;
    const amount = Math.round((bundle.price + frete) * 100);
    const charge = await gatewayCashin({
      name: data.name,
      cpf: data.cpf,
      amount,
      origin: data.origin,
    });
    const { ip, ua } = requestMeta();
    // Guarda o pedido no servidor para reportar a aprovação mesmo sem o cliente na página.
    const orderData = {
      createdAt: Date.now(),
      id: charge.id,
      amountCents: amount,
      customer: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        cpf: data.cpf,
        endereco: data.endereco?.replace(/\s+/g, " ").trim(),
        ...(data.address ? { address: data.address } : {}),
        // Pix copia e cola, para o admin poder reenviar ao cliente.
        qrcode: charge.qrcode,
        frete: { id: freteOpt.id, name: freteOpt.name, price: freteOpt.price },
      },
      bundleId: bundle.id,
      bundleName: bundle.name,
      utm: data.utm,
      ip,
      ua,
    };
    await saveOrder(orderData);
    // Pix gerado → UTMify como pendente (não é conversão; só "paid" conta como venda).
    await reportPendingToUtmify(orderData);
    return { id: charge.id, qrcode: charge.qrcode, amount, status: charge.status };
  });

/**
 * Upsell pós-compra: mais 1 kit igual ao do pedido pago, com desconto.
 * Usa os dados já salvos do pedido original — o cliente não digita nada de novo.
 */
export const createUpsellCharge = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ parentId: z.string().regex(/^[\w-]{1,64}$/), origin: z.string().url() }).parse(d),
  )
  .handler(async ({ data }): Promise<PixCharge> => {
    const parent = await getOrder(data.parentId);
    if (!parent || parent.customer?.upsellOf) throw new Error("Pedido não encontrado.");
    if (!isPaidStatus(parent.status)) {
      const { status } = await fetchGatewayStatus(parent.id);
      if (!isPaidStatus(status)) throw new Error("Pedido ainda não foi pago.");
    }

    // Já existe um upsell para este pedido: reaproveita em vez de gerar outra cobrança.
    const existing = await findUpsellOf(parent.id);
    if (existing?.customer.qrcode) {
      return {
        id: existing.id,
        qrcode: existing.customer.qrcode,
        amount: existing.amount_cents,
        status: existing.status,
      };
    }

    const bundle = getBundle(parent.bundle_id);
    const amount = Math.round(upsellPrice(bundle) * 100);
    const c = parent.customer;
    const charge = await gatewayCashin({ name: c.name, cpf: c.cpf, amount, origin: data.origin });
    const { ip, ua } = requestMeta();
    const orderData = {
      createdAt: Date.now(),
      id: charge.id,
      amountCents: amount,
      customer: {
        name: c.name,
        email: c.email,
        phone: c.phone,
        cpf: c.cpf,
        endereco: c.endereco,
        ...(c.address ? { address: c.address } : {}),
        frete: { id: "junto", name: `Junto com o pedido ${parent.id}`, price: 0 },
        upsellOf: parent.id,
        qrcode: charge.qrcode,
      },
      bundleId: bundle.id,
      bundleName: `Upsell 50% OFF - ${bundle.name}`,
      utm: parent.utm ?? undefined,
      ip,
      ua,
      fbp: parent.fbp,
      fbc: parent.fbc,
    };
    await saveOrder(orderData);
    // Pix gerado → UTMify como pendente (não é conversão; só "paid" conta como venda).
    await reportPendingToUtmify(orderData);
    return { id: charge.id, qrcode: charge.qrcode, amount, status: charge.status };
  });

export const getPixStatus = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) =>
    z
      .object({
        id: z.string().regex(/^[\w-]{1,64}$/),
        report: z
          .object({
            name: z.string().max(120),
            email: z.string().max(160),
            phone: z.string().max(20),
            cpf: z.string().max(14),
            bundleId: z.string().max(10),
            bundleName: z.string().max(80),
            createdAt: z.number(),
            utm: utmSchema,
            fbp: z.string().max(200).nullable().optional(),
            fbc: z.string().max(300).nullable().optional(),
            url: z.string().max(1000).optional(),
          })
          .optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }): Promise<{ status: string; paid: boolean }> => {
    const { status, amount } = await fetchGatewayStatus(data.id);
    const paid = isPaidStatus(status);
    // Só pagamento confirmado pelo gateway (servidor) vira conversão — reportado uma única vez.
    if (paid) {
      const h = getRequest()?.headers;
      await reportPaidOnce(data.id, amount, {
        fbp: data.report?.fbp,
        fbc: data.report?.fbc,
        url: data.report?.url,
        ip: h?.get("cf-connecting-ip") ?? h?.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        ua: h?.get("user-agent") ?? null,
      });
    }
    return { status, paid };
  });
