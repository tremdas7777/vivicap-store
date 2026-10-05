import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Check, CircleCheck, Loader2 } from "lucide-react";
import { getBundle } from "@/lib/bundles";
import { brand } from "@/lib/brand";
import { createUpsellCharge } from "@/lib/pix.functions";
import { loadPixSession, savePixSession, type PixSession } from "@/lib/pix-session";
import { UPSELL_DISCOUNT, upsellPrice } from "@/lib/upsell";
import { brl } from "@/components/checkout/parts";
import { kitImage } from "@/lib/product-images";
import { Shell } from "@/components/checkout/OrderShell";

export const Route = createFileRoute("/upsell/$id")({
  head: () => ({
    meta: [{ title: "Oferta especial | VIVI Cap" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

/** Oferta pós-compra: mais 1 kit igual ao comprado com 50% OFF, pago em um Pix separado. */
function Page() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<PixSession | null | undefined>(undefined);
  const createFn = useServerFn(createUpsellCharge);

  useEffect(() => {
    const s = loadPixSession(id);
    // Sem sessão (outro dispositivo) ou já é um upsell: segue para o obrigado.
    if (!s || s.isUpsell) navigate({ to: "/obrigado/$id", params: { id }, replace: true });
    else setSession(s);
  }, [id, navigate]);

  const bundle = getBundle(session?.bundleId);
  const price = upsellPrice(bundle);
  const off = Math.round(UPSELL_DISCOUNT * 100);

  const mutation = useMutation({
    mutationFn: () => createFn({ data: { parentId: id, origin: window.location.origin } }),
    onSuccess: (c) => {
      if (!session) return;
      savePixSession({
        id: c.id,
        qrcode: c.qrcode,
        amount: c.amount,
        email: session.email,
        name: session.name,
        bundleId: bundle.id,
        bundleName: `Kit extra ${off}% OFF - ${bundle.name}`,
        units: bundle.units,
        productPrice: price,
        frete: 0,
        discount: 0,
        createdAt: Date.now(),
        phone: session.phone,
        cpf: session.cpf,
        utm: session.utm,
        fbp: session.fbp,
        fbc: session.fbc,
        isUpsell: true,
        parentId: id,
      });
      navigate({ to: "/pedido/$id", params: { id: c.id }, replace: true });
    },
  });

  if (!session) {
    return (
      <Shell>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--ck-ok)]" />
        </div>
      </Shell>
    );
  }

  const firstName = session.name.trim().split(/\s+/)[0];

  return (
    <Shell>
      <div className="mx-auto max-w-[560px] px-4 pb-20">
        <div className="flex items-center justify-center gap-2 rounded-lg bg-[var(--ck-badge)] px-4 py-3 text-[13px] font-semibold text-[var(--ck-ok)]">
          <CircleCheck className="h-4 w-4 shrink-0" />
          Pagamento aprovado! Seu pedido está confirmado.
        </div>

        <p className="mt-8 text-center text-[13px] font-bold uppercase tracking-wider text-amber-600">
          Espere, {firstName}! Oferta única para você
        </p>
        <h1 className="mt-2 text-center text-[26px] font-bold leading-tight tracking-tight md:text-[30px]">
          Leve mais 1 kit do {brand.productName} com{" "}
          <span className="text-[var(--ck-ok)]">{off}% OFF</span>
        </h1>
        <p className="mt-3 text-center text-[14px] leading-relaxed text-muted-foreground">
          Tenha um VIVI Cap para cada caneta, ou deixe um em casa e outro na bolsa.{" "}
          <b className="text-foreground">
            Mais {bundle.units} {bundle.units > 1 ? "unidades" : "unidade"} com {off}% de desconto
          </b>
          , enviadas junto com o seu pedido.
        </p>

        <div className="mt-6 rounded-xl border-2 border-[var(--ck-ok)] p-5">
          <div className="flex items-center gap-4">
            <img
              src={kitImage(bundle.units)}
              alt={brand.productName}
              width={96}
              height={96}
              className="h-24 w-24 shrink-0 rounded-lg border border-border bg-white object-contain p-1"
            />
            <div>
              <p className="text-[15px] font-semibold">{bundle.name}</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">
                {bundle.units} {bundle.units > 1 ? "unidades" : "unidade"} · enviado junto
              </p>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
                <span className="text-[14px] text-muted-foreground line-through">
                  {brl(bundle.price)}
                </span>
                <span className="text-[24px] font-bold text-[var(--ck-ok)]">{brl(price)}</span>
              </div>
              <p className="text-[12px] font-semibold text-[var(--ck-ok)]">
                Você economiza {brl(bundle.price - price)}
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-2 border-t border-border pt-4 text-[13.5px]">
            {[
              "Vai no mesmo envio do seu pedido — frete grátis",
              "Sem preencher nada: usamos os dados que você já informou",
              "Pagamento separado via Pix, só do kit extra",
              "Desconto válido só nesta página, agora",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ck-ok)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {mutation.isError && (
          <p role="alert" className="mt-4 text-center text-sm text-destructive">
            Não foi possível gerar o Pix agora. Tente novamente em alguns segundos.
          </p>
        )}

        <button
          type="button"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate()}
          className="mt-6 flex w-full flex-col items-center justify-center rounded-lg bg-[var(--ck-green)] px-6 py-4 text-white shadow-lg transition hover:opacity-90 disabled:opacity-70"
        >
          <span className="flex items-center gap-2 text-[17px] font-bold uppercase">
            {mutation.isPending && <Loader2 className="h-5 w-5 animate-spin" />}
            Sim! Quero meu kit extra
          </span>
          <span className="text-[13px] font-medium opacity-90">por apenas {brl(price)} no Pix</span>
        </button>

        <Link
          to="/obrigado/$id"
          params={{ id }}
          replace
          className="mt-4 block text-center text-[13px] text-muted-foreground underline"
        >
          Não, obrigado. Prefiro pagar o preço cheio depois.
        </Link>
      </div>
    </Shell>
  );
}
