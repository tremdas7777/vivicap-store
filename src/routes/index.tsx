import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import {
  BenefitsSection,
  ComparisonSection,
  CtaFinal,
  FaqSection,
  Hero,
  HowItWorks,
  InTheBoxSection,
  KitsSection,
  ProblemSection,
  TechSection,
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
          "VIVI Cap mantém sua insulina na temperatura certa 24 horas por dia, no calor ou no frio, sem gelo, recarga ou geladeira. Encaixa no lugar da tampa da caneta. Pix e envio para todo o Brasil.",
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
      <TechSection />
      <BenefitsSection />
      <UseCasesSection />
      <ComparisonSection />
      <KitsSection />
      <InTheBoxSection />
      <FaqSection limit={5} />
      <CtaFinal />
    </SiteLayout>
  );
}
