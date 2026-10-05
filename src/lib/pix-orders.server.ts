// Pedidos Pix guardados no servidor para que a aprovação seja reportada
// (UTMify + Meta CAPI) mesmo que o cliente feche a página. Somente servidor.
import { sendUtmifyOrder, type UtmParams } from "@/lib/utmify.server";
import { sendCapiEvent } from "@/lib/meta.server";
import { sendRastroOrder, type RastroAddress } from "@/lib/rastrocode.server";
import { getBundle } from "@/lib/bundles";
import { isPaidStatus } from "@/lib/pix-status";

const API = "https://app.pixgateip.com/api";

export type StoredCustomer = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  endereco?: string;
  /** Endereço por partes (pedidos a partir da integração com a RastroCode). */
  address?: RastroAddress;
  frete?: { id: string; name: string; price: number };
  bump?: { id: string; name: string; price: number };
  /** Id do pedido original quando este é um upsell pós-compra. */
  upsellOf?: string;
  /** Código Pix copia-e-cola (guardado no upsell para reexibir sem cobrar de novo). */
  qrcode?: string;
};

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  // Tabela nova ainda não presente nos tipos gerados.
  return supabaseAdmin as unknown as { from: (t: string) => any };
}

export async function saveOrder(o: {
  id: string;
  amountCents: number;
  customer: StoredCustomer;
  bundleId: string;
  bundleName: string;
  utm?: UtmParams;
  ip?: string | null;
  ua?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  /** Momento da criação (ms). O mesmo valor vai para a UTMify no "pendente" e no "pago". */
  createdAt?: number;
}): Promise<void> {
  try {
    const db = await admin();
    const { error } = await db.from("pix_orders").upsert({
      id: o.id,
      ...(o.createdAt ? { created_at: new Date(o.createdAt).toISOString() } : {}),
      amount_cents: o.amountCents,
      customer: o.customer,
      bundle_id: o.bundleId,
      bundle_name: o.bundleName,
      utm: o.utm ?? {},
      ip: o.ip ?? null,
      ua: o.ua ?? null,
      fbp: o.fbp ?? null,
      fbc: o.fbc ?? null,
    });
    if (error) console.error("saveOrder error", error.message);
  } catch (e) {
    console.error("saveOrder failed", e);
  }
}

export type StoredOrder = {
  id: string;
  status: string;
  amount_cents: number;
  customer: StoredCustomer;
  bundle_id: string;
  bundle_name: string;
  utm: UtmParams | null;
  fbp: string | null;
  fbc: string | null;
};

export async function getOrder(id: string): Promise<StoredOrder | null> {
  const db = await admin();
  const { data } = await db.from("pix_orders").select("*").eq("id", id).maybeSingle();
  return (data as StoredOrder | null) ?? null;
}

/** Upsell já gerado para um pedido (evita cobranças duplicadas). */
export async function findUpsellOf(parentId: string): Promise<StoredOrder | null> {
  const db = await admin();
  const { data } = await db
    .from("pix_orders")
    .select("*")
    .eq("customer->>upsellOf", parentId)
    .order("created_at", { ascending: false })
    .limit(1);
  return (data?.[0] as StoredOrder | undefined) ?? null;
}

/**
 * Avisa a UTMify que o Pix foi gerado (status "waiting_payment"). Isso NÃO conta como venda/conversão:
 * a UTMify só considera venda quando o mesmo orderId chega depois com status "paid".
 */
export async function reportPendingToUtmify(o: {
  id: string;
  amountCents: number;
  customer: StoredCustomer;
  bundleId: string;
  bundleName: string;
  utm?: UtmParams;
  ip?: string | null;
  createdAt: number;
}): Promise<void> {
  const r = await sendUtmifyOrder({
    orderId: o.id,
    status: "waiting_payment",
    // A UTMify exige a MESMA data de criação no envio pendente e no pago.
    createdAt: o.createdAt,
    approvedAt: null,
    customer: {
      name: o.customer.name,
      email: o.customer.email,
      phone: o.customer.phone,
      document: o.customer.cpf,
      ip: o.ip ?? null,
    },
    product: { id: o.bundleId, name: `VIVI Cap - ${o.bundleName}` },
    amountCents: o.amountCents,
    utm: o.utm ?? {},
  });
  if (!r.ok) console.error("UTMify pending failed", o.id, r.error);
  // Guarda a resposta no pedido para aparecer no admin (seção Técnico).
  try {
    const db = await admin();
    await db
      .from("pix_orders")
      .update({ report_result: { utmifyPending: { ...r, at: new Date().toISOString() } } })
      .eq("id", o.id)
      .is("paid_reported_at", null);
  } catch (e) {
    console.error("UTMify pending save failed", e);
  }
}

export { isPaidStatus };

/** Consulta o status real no gateway. */
export async function fetchGatewayStatus(id: string): Promise<{ status: string; amount: number }> {
  const key = process.env["PIXGATE_API_KEY"];
  if (!key) throw new Error("Pagamento indisponível no momento.");
  const res = await fetch(`${API}/stats/${encodeURIComponent(id)}`, {
    headers: { Apikey: key, Accept: "application/json" },
  });
  const json = (await res.json().catch(() => null)) as any;
  // Status bruto no log (só status e nomes dos campos, sem dados pessoais) para auditar a regra de "pago".
  console.log(
    "pixgate-status",
    id,
    JSON.stringify(json?.status),
    Object.keys(json ?? {}).join(","),
  );
  // PixGate devolve o valor em reais; mantemos tudo em centavos internamente.
  return {
    status: String(json?.status ?? "pending").toLowerCase(),
    amount: Math.round(Number(json?.value ?? 0) * 100),
  };
}

/**
 * Reporta a venda aprovada uma única vez (idempotente via paid_reported_at).
 * `extra` traz cookies do Meta/URL quando a chamada vem do navegador.
 */
export async function reportPaidOnce(
  id: string,
  gatewayAmount: number,
  extra?: {
    fbp?: string | null;
    fbc?: string | null;
    url?: string;
    ip?: string | null;
    ua?: string | null;
  },
): Promise<void> {
  try {
    const db = await admin();
    // Trava atômica: só quem conseguir marcar paid_reported_at envia.
    const { data: rows, error } = await db
      .from("pix_orders")
      .update({
        status: "paid",
        paid_reported_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .is("paid_reported_at", null)
      .select("*");
    if (error) {
      console.error("reportPaidOnce lock error", error.message);
      return;
    }
    const o = rows?.[0];
    if (!o) return; // já reportado ou pedido desconhecido

    const amount =
      Number.isFinite(gatewayAmount) && gatewayAmount > 0 ? gatewayAmount : o.amount_cents;
    const c = o.customer as StoredCustomer;
    const productName = `VIVI Cap - ${o.bundle_name}`;
    const utmify = await sendUtmifyOrder({
      orderId: id,
      status: "paid",
      createdAt: new Date(o.created_at).getTime(),
      approvedAt: Date.now(),
      customer: { name: c.name, email: c.email, phone: c.phone, document: c.cpf, ip: o.ip },
      product: { id: o.bundle_id, name: productName },
      amountCents: amount,
      utm: o.utm ?? {},
    });
    const meta = await sendCapiEvent({
      eventName: "Purchase",
      eventId: `purchase-${id}`,
      url: extra?.url,
      user: {
        email: c.email,
        phone: c.phone,
        name: c.name,
        cpf: c.cpf,
        fbp: extra?.fbp ?? o.fbp ?? null,
        fbc: extra?.fbc ?? o.fbc ?? null,
        ip: extra?.ip ?? o.ip ?? null,
        ua: extra?.ua ?? o.ua ?? null,
      },
      customData: {
        value: amount / 100,
        currency: "BRL",
        content_name: productName,
        content_ids: [o.bundle_id],
        content_type: "product",
        order_id: id,
      },
    });
    // RastroCode: só pedidos principais com endereço completo. O upsell vai no mesmo envio do pedido original.
    // Se a RastroCode já respondeu de forma definitiva (sucesso, 422, 401, 402, 403), não reenvia.
    const prev = (o.report_result as { rastro?: { ok?: boolean; status?: number } } | null)?.rastro;
    const rastroDone =
      !!prev && (prev.ok || [401, 402, 403, 413, 415, 422].includes(prev.status ?? 0));
    const rastro = rastroDone
      ? prev
      : c.upsellOf
        ? { ok: true, skipped: "upsell enviado junto com o pedido original" }
        : !c.address
          ? { ok: false, skipped: "pedido sem endereço por partes" }
          : await sendRastroOrder({
              transactionId: id,
              customer: { name: c.name, email: c.email, phone: c.phone, document: c.cpf },
              address: c.address,
              products: [
                {
                  name: `VIVI Cap - ${getBundle(o.bundle_id).name}`,
                  quantity: 1,
                  price: getBundle(o.bundle_id).price,
                },
                ...(c.bump ? [{ name: c.bump.name, quantity: 1, price: c.bump.price }] : []),
              ],
            });
    // RastroCode fica fora do allOk: é idempotente por transaction_id e um 422 não deve ser retentado.
    const allOk = utmify.ok && meta.ok;
    console.log("reportPaidOnce", id, JSON.stringify({ utmify, meta, rastro }));
    // Guarda o resultado; se algo falhou, libera a trava para nova tentativa.
    await db
      .from("pix_orders")
      .update({
        report_result: {
          ...((o.report_result as Record<string, unknown> | null) ?? {}),
          utmify,
          meta,
          rastro,
          at: new Date().toISOString(),
        },
        ...(allOk ? {} : { paid_reported_at: null }),
        ...(extra?.fbp ? { fbp: extra.fbp } : {}),
        ...(extra?.fbc ? { fbc: extra.fbc } : {}),
      })
      .eq("id", id);
  } catch (e) {
    console.error("reportPaidOnce failed", e);
  }
}
