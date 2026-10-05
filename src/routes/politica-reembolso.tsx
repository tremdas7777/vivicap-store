import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/politica-reembolso")({
  head: () => ({
    meta: [
      { title: "Trocas e devoluções | VIVI Cap" },
      {
        name: "description",
        content: "Direito de arrependimento, trocas e reembolso de pedidos VIVI Cap.",
      },
      { property: "og:url", content: "/politica-reembolso" },
    ],
    links: [{ rel: "canonical", href: "/politica-reembolso" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PolicyPage
      title="Trocas e devoluções"
      intro="Sua compra é protegida pelo Código de Defesa do Consumidor."
    >
      <h2>Direito de arrependimento</h2>
      <p>
        Você pode desistir da compra em até 7 dias corridos depois de receber o produto, sem
        precisar justificar. O produto deve ser devolvido com a embalagem e os itens que vieram na
        caixa.
      </p>
      <h2>Produto com defeito</h2>
      <p>
        Se o VIVI Cap chegar com defeito, fale com a gente informando o número do pedido e fotos do
        produto. Fazemos a troca ou o reembolso.
      </p>
      <h2>Reembolso</h2>
      <ul>
        <li>O reembolso é feito via Pix, na conta do titular da compra.</li>
        <li>O valor é devolvido depois que recebemos e conferimos o produto devolvido.</li>
      </ul>
      <h2>Como solicitar</h2>
      <p>Entre em contato pela página Fale conosco com o número do pedido em mãos.</p>
    </PolicyPage>
  );
}
