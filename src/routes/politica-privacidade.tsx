import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/politica-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade | VIVI Cap" },
      {
        name: "description",
        content: "Como a VIVI Cap coleta, usa e protege seus dados pessoais, de acordo com a LGPD.",
      },
      { property: "og:url", content: "/politica-privacidade" },
    ],
    links: [{ rel: "canonical", href: "/politica-privacidade" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PolicyPage
      title="Política de privacidade"
      intro="Respeitamos a sua privacidade e tratamos seus dados de acordo com a Lei Geral de Proteção de Dados (LGPD)."
    >
      <h2>Quais dados coletamos</h2>
      <ul>
        <li>Nome, e-mail, telefone e CPF, para emitir o pedido e o pagamento via Pix.</li>
        <li>Endereço de entrega, para enviar o produto.</li>
        <li>
          Dados de navegação e de campanhas (cookies e pixels), para medir e melhorar nossos
          anúncios.
        </li>
      </ul>
      <h2>Como usamos</h2>
      <p>
        Usamos seus dados apenas para processar o pedido, entregar o produto, prestar atendimento e
        medir nossas campanhas. Não vendemos seus dados.
      </p>
      <h2>Compartilhamento</h2>
      <p>
        Compartilhamos somente o necessário com parceiros que tornam a compra possível: processador
        de pagamento, transportadora e ferramentas de medição de anúncios.
      </p>
      <h2>Seus direitos</h2>
      <p>
        Você pode pedir acesso, correção ou exclusão dos seus dados a qualquer momento pela página
        Fale conosco.
      </p>
    </PolicyPage>
  );
}
