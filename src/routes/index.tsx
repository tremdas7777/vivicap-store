import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import {
  BenefitsSection,
  CtaFinal,
  FaqSection,
  Hero,
  HowItWorks,
  InTheBoxSection,
  KitsSection,
  ProblemSection,
  TrustBar,
  UseCasesSection,
} from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VIVI Cap | Protetor Térmico para Canetas de Insulina e GLP-1" },
      {
        name: "description",
        content:
          "Proteja sua caneta de insulina ou GLP-1 do calor por até 24h, sem gelo, pilha ou geladeira. VIVI Cap encaixa no lugar da tampa. Pix e envio para todo o Brasil.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <ProblemSection />
      <HowItWorks />
      <BenefitsSection />
      <UseCasesSection />
      <KitsSection />
      <InTheBoxSection />
      <FaqSection limit={5} />
      <CtaFinal />
    </SiteLayout>
  );
}
