import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/PolicyPage";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre | VIVI Cap" },
      {
        name: "description",
        content: "Conheça a VIVI Cap: proteção térmica para quem usa canetas de insulina e GLP-1.",
      },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Page,
});

function Page() {
  return (
    <PolicyPage
      eyebrow="Sobre nós"
      title="Seu tratamento não precisa ficar preso à geladeira"
      intro="A VIVI Cap nasceu para quem usa canetas de insulina ou GLP-1 e quer viver a rotina com mais liberdade: trabalhar, viajar e sair de casa sem se preocupar com o calor."
    >
      <h2>O que fazemos</h2>
      <p>
        O VIVI Cap é um protetor térmico que substitui a tampa da caneta aplicadora. Ele protege o
        medicamento do calor e do frio 24 horas por dia, sem gelo, recarga ou geladeira, e cabe no
        bolso ou na bolsa.
      </p>
      <h2>No que acreditamos</h2>
      <ul>
        <li>Cuidar da saúde tem que ser simples e caber na rotina.</li>
        <li>
          Informação clara: o VIVI Cap é para o dia a dia fora de casa e não substitui as
          orientações do fabricante do seu medicamento.
        </li>
        <li>Atendimento próximo, do pedido à entrega.</li>
      </ul>
    </PolicyPage>
  );
}
