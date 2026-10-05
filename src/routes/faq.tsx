import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { CtaFinal, FaqList } from "@/components/site/sections";
import { FAQ } from "@/lib/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Dúvidas frequentes | VIVI Cap" },
      {
        name: "description",
        content:
          "Tudo sobre o VIVI Cap: compatibilidade, uso no avião, pagamento via Pix, entrega e trocas.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteLayout>
      <section className="bg-[var(--paper)] pb-20 pt-12 md:pt-20">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow text-[var(--violet)]">Dúvidas</p>
          <h1 className="mt-4 text-4xl leading-[1.05] text-[var(--navy)] md:text-6xl">
            Perguntas frequentes
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ink)]/70">
            Reunimos as perguntas mais comuns sobre o VIVI Cap, pagamento e entrega.
          </p>
          <div className="mt-12">
            <FaqList />
          </div>
        </div>
      </section>
      <CtaFinal />
    </SiteLayout>
  );
}
