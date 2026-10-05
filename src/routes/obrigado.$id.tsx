import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Mail, PackageCheck, Truck } from "lucide-react";
import { loadPixSession, type PixSession } from "@/lib/pix-session";
import { brl } from "@/components/checkout/parts";
import { Pill, Shell } from "@/components/checkout/OrderShell";

export const Route = createFileRoute("/obrigado/$id")({
  head: () => ({
    meta: [{ title: "Pedido confirmado | VIVI Cap" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

/** Página de obrigado — após o pedido (sem upsell) ou após o pagamento do kit extra. */
function Page() {
  const { id } = Route.useParams();
  // Lido só no navegador (sessionStorage) para não divergir da renderização do servidor.
  const [sessions, setSessions] = useState<{ main: PixSession | null; extra: PixSession | null }>({
    main: null,
    extra: null,
  });

  useEffect(() => {
    const s = loadPixSession(id);
    if (s?.isUpsell)
      setSessions({ main: s.parentId ? loadPixSession(s.parentId) : null, extra: s });
    else setSessions({ main: s, extra: null });
  }, [id]);

  const { main, extra } = sessions;
  const email = main?.email ?? extra?.email;

  return (
    <Shell>
      <div className="mx-auto max-w-[560px] px-4 pb-20 text-center">
        <div className="mt-2">
          <Pill variant="approved" />
        </div>
        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ck-ok)] text-white">
          <Check className="h-9 w-9" />
        </div>
        <h1 className="mt-5 text-[28px] font-bold tracking-tight">
          {extra ? "Kit extra confirmado!" : "Pedido confirmado!"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {extra
            ? "Obrigado pela confiança! Seu kit extra vai junto no mesmo envio do seu pedido."
            : "Obrigado pela compra! Seu pedido já está sendo preparado."}
          {email && (
            <>
              {" "}
              Os detalhes foram enviados para <b className="text-foreground">{email}</b>.
            </>
          )}
        </p>

        {(main || extra) && (
          <div className="mt-8 rounded-lg border border-border bg-white p-6 text-left">
            <h2 className="mb-4 text-[15px] font-semibold">Resumo da compra</h2>
            <div className="space-y-4 text-[13px]">
              {main && (
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="font-medium">VIVI Cap — Protetor térmico para canetas</p>
                    <p className="mt-0.5 text-muted-foreground">
                      {main.units} {main.units > 1 ? "unidades" : "unidade"}
                    </p>
                  </div>
                  <span className="shrink-0">{brl(main.amount / 100)}</span>
                </div>
              )}
              {extra && (
                <div className="flex justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <p className="font-medium">{extra.bundleName}</p>
                    <p className="mt-0.5 text-muted-foreground">
                      {extra.units} {extra.units > 1 ? "unidades" : "unidade"} · enviado junto
                    </p>
                  </div>
                  <span className="shrink-0">{brl(extra.amount / 100)}</span>
                </div>
              )}
              {main && extra && (
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                  <span>Total pago</span>
                  <span>{brl((main.amount + extra.amount) / 100)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-lg bg-muted/60 p-6 text-left">
          <h2 className="text-[15px] font-semibold">Próximos passos</h2>
          <ol className="mt-4 space-y-4 text-[13.5px]">
            {[
              { icon: Mail, text: "Você recebe a confirmação do pedido no seu e-mail." },
              { icon: PackageCheck, text: "Separamos e embalamos tudo em um único envio." },
              { icon: Truck, text: "Assim que for despachado, você recebe o código de rastreio." },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--ck-green)] text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          to="/rastreio"
          className="mt-8 inline-block rounded-lg bg-[var(--ck-green)] px-8 py-3.5 text-[15px] font-semibold text-white transition hover:opacity-90"
        >
          Acompanhar meu pedido
        </Link>
        <p className="mt-2 text-[12px] text-muted-foreground">Pedido nº {id}</p>
      </div>
    </Shell>
  );
}
