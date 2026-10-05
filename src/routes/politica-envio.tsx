import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";
import { FREE_SHIPPING_MIN } from "@/lib/bundles";
import { FRETES } from "@/lib/pix.functions";

export const Route = createFileRoute("/politica-envio")({
  head: () => ({
    meta: [
      { title: "Envio e prazos | VIVI Cap" },
      {
        name: "description",
        content: "Como funciona o envio do VIVI Cap: opções de frete, prazos e rastreio.",
      },
      { property: "og:url", content: "/politica-envio" },
    ],
    links: [{ rel: "canonical", href: "/politica-envio" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PolicyPage
      title="Envio e prazos"
      intro="Enviamos o VIVI Cap para todo o Brasil, com código de rastreio em todos os pedidos."
    >
      <h2>Opções de frete</h2>
      <ul>
        {FRETES.map((f) => (
          <li key={f.id}>
            <span>
              <b>{f.name}</b>: {f.eta}
              {f.id === "gratis"
                ? ` (compras acima de R$ ${FREE_SHIPPING_MIN})`
                : ` — R$ ${f.price.toFixed(2).replace(".", ",")}`}
            </span>
          </li>
        ))}
      </ul>
      <h2>Quando o prazo começa</h2>
      <p>
        O prazo conta a partir da confirmação do pagamento via Pix. Pedidos pagos em dias úteis são
        separados e despachados o mais rápido possível.
      </p>
      <h2>Rastreio</h2>
      <p>
        Assim que o pedido é despachado, você recebe o código de rastreio por e-mail e pode
        acompanhar a entrega na página Rastrear pedido.
      </p>
    </PolicyPage>
  );
}
