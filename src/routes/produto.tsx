import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Lock, RotateCcw, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { BundleSelector } from "@/components/site/BundleSelector";
import { SiteLayout } from "@/components/site/Layout";
import {
  BenefitsSection,
  CtaFinal,
  FaqSection,
  HowItWorks,
  InTheBoxSection,
} from "@/components/site/sections";
import { trackCheckoutClick } from "@/lib/analytics";
import {
  brl,
  bundleShippingLabel,
  FREE_SHIPPING_MIN,
  getBundle,
  type BundleId,
} from "@/lib/bundles";
import { BENEFITS, IN_THE_BOX } from "@/lib/content";
import { metaTrack } from "@/lib/meta-pixel";
import { bundleIdFromSearch, planSearchSchema } from "@/lib/plan-search";
import { productGallery } from "@/lib/product-images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto")({
  validateSearch: planSearchSchema,
  head: () => ({
    meta: [
      { title: "Comprar VIVI Cap | Protetor Térmico para Canetas" },
      {
        name: "description",
        content:
          "VIVI Cap: protetor térmico que substitui a tampa da caneta de insulina ou GLP-1. Kits com 1, 2 ou 3 unidades, pagamento via Pix e envio para todo o Brasil.",
      },
      { property: "og:url", content: "/produto" },
    ],
    links: [{ rel: "canonical", href: "/produto" }],
  }),
  component: Page,
});

const DETAILS = [
  {
    title: "Descrição",
    body: (
      <p>
        O VIVI Cap é um protetor térmico em formato de tampa. Ele substitui a tampa original da sua
        caneta aplicadora de insulina ou GLP-1, e a caneta fica dentro de um tubo transparente.
        Assim o medicamento fica protegido do calor por até 24h, sem gelo, pilha ou geladeira.
      </p>
    ),
  },
  {
    title: "O que vem na caixa",
    body: (
      <ul className="space-y-1.5">
        {IN_THE_BOX.map((t) => (
          <li key={t} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--violet)]" /> {t}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Compatibilidade",
    body: (
      <p>
        Modelo multi-caneta, com versão para FlexPen. Se tiver dúvida sobre a sua caneta, fale com a
        gente antes de comprar.
      </p>
    ),
  },
  {
    title: "Cuidados",
    body: (
      <p>
        O VIVI Cap é para o dia a dia fora de casa e não substitui a geladeira. Siga sempre as
        orientações de armazenamento do fabricante do seu medicamento.
      </p>
    ),
  },
];

function Page() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/produto" });
  const [selected, setSelected] = useState<BundleId>(() => bundleIdFromSearch(search));
  const [activeImg, setActiveImg] = useState(0);
  const [openDetail, setOpenDetail] = useState<number | null>(0);
  const bundle = getBundle(selected);
  const active = productGallery[activeImg] ?? productGallery[0]!;

  useEffect(() => {
    metaTrack("ViewContent", { value: bundle.price, contentName: bundle.name });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelect = (id: BundleId) => {
    setSelected(id);
    navigate({ search: (prev) => ({ ...prev, plano: Number(id) }), replace: true, resetScroll: false });
  };

  return (
    <SiteLayout>
      <ProductStructuredData />
      <section className="bg-[var(--paper)] pb-20 pt-6 md:pb-28 md:pt-10">
        <div className="container-edge">
          <nav className="mb-6 text-[12.5px] text-[var(--ink)]/50" aria-label="Você está em">
            <Link to="/" className="hover:text-[var(--violet)]">
              Início
            </Link>{" "}
            <span className="mx-1.5">/</span> VIVI Cap
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Galeria */}
            <div className="lg:sticky lg:top-[calc(var(--site-chrome-h,6rem)+1rem)] lg:col-span-7">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_70px_-45px_rgba(27,34,102,0.5)]">
                <img
                  key={active.src}
                  src={active.src}
                  alt={active.alt}
                  className="fade-up h-full w-full object-contain p-6 md:p-12"
                  fetchPriority="high"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-[var(--navy)]/90 px-3 py-1.5 text-[12px] font-medium text-white">
                  {active.caption}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {productGallery.map((g, i) => (
                  <button
                    key={g.src}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`Ver foto: ${g.caption}`}
                    aria-current={i === activeImg}
                    className={cn(
                      "aspect-square overflow-hidden rounded-2xl border-2 bg-white p-2 transition",
                      i === activeImg
                        ? "border-[var(--violet)]"
                        : "border-transparent hover:border-[var(--lavender)]",
                    )}
                  >
                    <img
                      src={g.src}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Compra */}
            <div className="lg:col-span-5">
              <p className="eyebrow text-[var(--violet)]">Protetor térmico para canetas</p>
              <h1 className="mt-3 text-4xl leading-[1.05] text-[var(--navy)] md:text-5xl">
                VIVI Cap
              </h1>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--ink)]/70">
                Substitui a tampa da sua caneta de insulina ou GLP-1 e mantém o medicamento em
                temperatura segura por até 24h. Sem gelo, pilha ou geladeira.
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-2.5">
                {BENEFITS.slice(0, 4).map((b) => (
                  <li key={b.title} className="flex gap-2 text-[13px] text-[var(--ink)]/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--violet)]" /> {b.title}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--navy)]">
                  Escolha seu kit
                </p>
                <BundleSelector selected={selected} onSelect={onSelect} />
              </div>

              <div className="mt-6 rounded-2xl bg-white p-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[14px] text-[var(--ink)]/60">Total no Pix</span>
                  <span className="font-display text-3xl font-extrabold text-[var(--navy)]">
                    {brl(bundle.price)}
                  </span>
                </div>
                <p className="mt-1 text-right text-[12.5px] text-[var(--ink)]/55">
                  {bundleShippingLabel(bundle)}
                </p>
                <Link
                  to="/checkout"
                  search={{ plano: Number(bundle.id) }}
                  onClick={() =>
                    trackCheckoutClick({
                      source: "product_buy_box",
                      bundleId: bundle.id,
                      bundleName: bundle.name,
                      value: bundle.price,
                    })
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] py-4 text-[16px] font-semibold text-white shadow-[0_14px_34px_-14px_rgba(91,74,230,0.9)] transition hover:bg-[var(--primary-dark)]"
                >
                  Comprar agora <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11.5px] text-[var(--ink)]/65">
                {[
                  { icon: Lock, t: "Pagamento seguro via Pix" },
                  { icon: Truck, t: `Frete grátis acima de R$ ${FREE_SHIPPING_MIN}` },
                  { icon: RotateCcw, t: "7 dias para devolução" },
                ].map(({ icon: Icon, t }) => (
                  <div key={t} className="rounded-2xl bg-white px-2 py-3">
                    <Icon className="mx-auto mb-1.5 h-4 w-4 text-[var(--violet)]" />
                    {t}
                  </div>
                ))}
              </div>

              <div className="mt-8 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-white">
                {DETAILS.map((d, i) => (
                  <div key={d.title}>
                    <button
                      type="button"
                      onClick={() => setOpenDetail(openDetail === i ? null : i)}
                      aria-expanded={openDetail === i}
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-[14.5px] font-semibold text-[var(--navy)]"
                    >
                      {d.title}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-[var(--violet)] transition-transform",
                          openDetail === i && "rotate-180",
                        )}
                      />
                    </button>
                    {openDetail === i && (
                      <div className="px-5 pb-5 text-[14px] leading-relaxed text-[var(--ink)]/70">
                        {d.body}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <BenefitsSection />
      <InTheBoxSection />
      <FaqSection />
      <CtaFinal />
      <div className="h-20 lg:hidden" aria-hidden />

      {/* Barra de compra fixa no celular */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] text-[var(--ink)]/60">{bundle.name}</p>
            <p className="font-display text-xl font-extrabold leading-tight text-[var(--navy)]">
              {brl(bundle.price)}
            </p>
          </div>
          <Link
            to="/checkout"
            search={{ plano: Number(bundle.id) }}
            onClick={() =>
              trackCheckoutClick({
                source: "product_sticky_bar",
                bundleId: bundle.id,
                bundleName: bundle.name,
                value: bundle.price,
              })
            }
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3.5 text-[15px] font-semibold text-white"
          >
            Comprar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}

/** Dados estruturados do produto (Google). Sem avaliações: a loja ainda não coleta reviews. */
function ProductStructuredData() {
  const b = getBundle("1");
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "VIVI Cap — Protetor térmico para canetas de insulina e GLP-1",
    image: productGallery.map((g) => g.src),
    description:
      "Protetor térmico que substitui a tampa da caneta de insulina ou GLP-1 e protege o medicamento do calor.",
    brand: { "@type": "Brand", name: "VIVI Cap" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: b.price.toFixed(2),
      availability: "https://schema.org/InStock",
      url: "/produto",
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
