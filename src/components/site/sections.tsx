import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Lock,
  Minus,
  ShieldCheck,
  TriangleAlert,
  Truck,
} from "lucide-react";
import { useState } from "react";
import {
  availableBundles,
  brl,
  bundleShippingLabel,
  FREE_SHIPPING_MIN,
  type Bundle,
} from "@/lib/bundles";
import { BENEFITS, COMPARISON, FAQ, IN_THE_BOX, STEPS, TECH, USE_CASES } from "@/lib/content";
import { kitImage, productImages } from "@/lib/product-images";
import { cn } from "@/lib/utils";
import { ContentIcon } from "./icons";

/* ---------- Peças reutilizáveis ---------- */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center = false,
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow", light ? "text-[var(--lavender)]" : "text-[var(--violet)]")}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-3xl leading-[1.1] text-balance md:text-[2.75rem]",
          light ? "text-white" : "text-[var(--navy)]",
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light ? "text-white/70" : "text-[var(--ink)]/65",
          )}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export function BuyButton({
  children = "Quero meu VIVI Cap",
  plano,
  className,
  variant = "primary",
}: {
  children?: React.ReactNode;
  plano?: Bundle["id"];
  className?: string;
  variant?: "primary" | "light";
}) {
  return (
    <Link
      to="/produto"
      search={plano ? { plano: Number(plano) } : {}}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-semibold transition",
        variant === "primary"
          ? "bg-[var(--primary)] text-white shadow-[0_10px_30px_-10px_rgba(91,74,230,0.8)] hover:bg-[var(--primary-dark)]"
          : "bg-white text-[var(--navy)] hover:bg-[var(--lilac)]",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ---------- Home ---------- */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_85%_10%,#3a2fb0_0%,#1b2266_45%,#11164a_100%)] text-white">
      <div className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-[var(--violet)]/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[var(--ice-strong)]/20 blur-3xl" />
      <div className="container-edge relative grid items-center gap-10 py-14 md:grid-cols-[1.05fr_1fr] md:py-24">
        <div className="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[12px] font-medium text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Protetor térmico para
            canetas de insulina e GLP-1
          </span>
          <h1 className="mt-6 text-[2.5rem] leading-[1.03] text-balance md:text-[4rem]">
            Sua insulina na temperatura certa,{" "}
            <span className="bg-gradient-to-r from-[var(--lavender)] to-[var(--ice-strong)] bg-clip-text text-transparent">
              24 horas por dia.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
            O VIVI Cap substitui a tampa da caneta e protege a insulina do calor e do frio extremo,
            onde você estiver. Sem gelo, sem recarga, sem geladeira — e funciona por anos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButton />
            <a
              href="#como-funciona"
              className="px-2 py-3 text-sm font-semibold text-white/80 hover:text-white"
            >
              Ver como funciona
            </a>
          </div>
          <ul className="mt-10 grid max-w-lg grid-cols-1 gap-3 text-[13.5px] text-white/80 sm:grid-cols-3">
            {[
              "Proteção 24 horas por dia",
              "Serve em qualquer caneta",
              `Frete grátis acima de R$ ${FREE_SHIPPING_MIN}`,
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-[var(--ice-strong)]" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-[var(--lavender)]/40 to-[var(--ice-strong)]/25 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]">
            <img
              src={productImages.travel}
              alt="VIVI Cap pronto para viajar: sem água ou gelo, sem geladeira e sem recarga"
              className="h-full w-full object-cover"
              width={1260}
              height={1260}
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[var(--navy)] shadow-xl md:-left-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--ice)]">
              <ContentIcon name="thermometer" className="h-5 w-5 text-[#2a8fc4]" />
            </span>
            <span className="text-[13px] leading-tight">
              <b className="block text-[15px]">24 horas por dia</b>
              insulina na temperatura certa
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    {
      icon: Truck,
      title: "Envio para todo o Brasil",
      text: `Frete grátis acima de R$ ${FREE_SHIPPING_MIN}`,
    },
    { icon: Lock, title: "Pagamento seguro", text: "Pix com aprovação na hora" },
    { icon: ShieldCheck, title: "Troca garantida", text: "7 dias para devolução" },
  ];
  return (
    <section className="border-b border-[var(--border)] bg-white">
      <div className="container-edge grid gap-4 py-6 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--lilac)] text-[var(--violet)]">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[13.5px] leading-snug">
              <b className="block text-[var(--navy)]">{title}</b>
              <span className="text-[var(--ink)]/60">{text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProblemSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-edge grid items-center gap-12 md:grid-cols-2">
        <div className="relative order-2 md:order-1">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fff4ea] via-[#ffe7d6] to-[#ffd2bd] p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#b4542a]">
                  Limite da insulina em uso
                </p>
                <p className="mt-2 font-display text-6xl font-extrabold text-[#8d2f12] md:text-7xl">
                  30°C
                </p>
              </div>
              <ContentIcon name="sun" className="h-16 w-16 text-[#f08a4b]" />
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#6b2a12]/80">
              Acima de 30 °C ou abaixo de zero, a insulina pode estragar. No verão brasileiro, um
              carro fechado, a bolsa ao sol ou o armário da academia passam disso fácil.
            </p>
          </div>
          <div className="relative -mt-10 ml-auto w-[78%] rounded-[2rem] bg-[var(--ice)] p-6 shadow-[0_30px_60px_-30px_rgba(27,34,102,0.45)]">
            <div className="flex items-center gap-4">
              <p className="text-[15px] leading-relaxed text-[var(--navy)]">
                <b>Com o VIVI Cap</b>, a insulina fica na temperatura certa 24 horas por dia, mesmo
                longe de casa.
              </p>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <SectionHeading
            eyebrow="Por que proteger"
            title="Insulina estragada não muda de cor"
            sub="Insulina é sensível ao calor, ao frio e à luz. Quando passa do ponto, ela perde efeito sem nenhum sinal visível — e você só descobre pela glicemia."
          />
          <ul className="mt-8 space-y-4">
            {[
              "Glicemia oscilando sem explicação.",
              "Necessidade de doses maiores para o mesmo efeito.",
              "Mais risco de hipoglicemia.",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-[15px] text-[var(--ink)]/75">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-100">
                  <TriangleAlert className="h-3.5 w-3.5 text-amber-700" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Vídeo do produto + passo a passo de uso (página do produto). */
export function HowToUseVideo() {
  return (
    <section id="como-usar" className="scroll-mt-28 bg-white py-20 md:py-28">
      <div className="container-edge grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[2rem] bg-[var(--navy)] shadow-[0_30px_70px_-40px_rgba(27,34,102,0.6)]">
          {/* Com áudio: o cliente aperta o play (navegadores não deixam tocar som sozinho). */}
          <video
            className="aspect-[9/16] w-full object-cover"
            poster="/videos/como-usar-poster.webp"
            controls
            playsInline
            preload="none"
            aria-label="Vídeo: tire suas dúvidas sobre o VIVI Cap e veja como usar"
          >
            <source src="/videos/como-usar.webm" type="video/webm" />
            <source src="/videos/como-usar.mp4" type="video/mp4" />
          </video>
        </div>
        <div>
          <SectionHeading
            eyebrow="Como usar"
            title="Tire suas dúvidas em 1 minuto"
            sub="Funciona com qualquer caneta? Precisa de bateria ou de geladeira? Precisa ligar? Aperte o play e veja as respostas — e como usar no dia a dia."
          />
          <ol className="mt-10 space-y-4">
            {STEPS.map((st) => (
              <li
                key={st.n}
                className="flex gap-4 rounded-[1.5rem] border border-[var(--border)] p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--navy)] font-display text-[15px] font-extrabold text-white">
                  {st.n}
                </span>
                <span>
                  <b className="block text-[16px] text-[var(--navy)]">{st.title}</b>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-[var(--ink)]/65">
                    {st.text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-28 bg-[var(--paper)] py-20 md:py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Como funciona"
          title="Encaixou, está protegida"
          sub="Sem instalação, sem recarga e sem gelo. Você usa a sua caneta normalmente."
          center
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[0_20px_50px_-35px_rgba(27,34,102,0.35)]"
            >
              <span className="font-display text-5xl font-extrabold text-[var(--lavender)]">
                {s.n}
              </span>
              <h3 className="mt-4 text-xl text-[var(--navy)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink)]/65">{s.text}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--navy)] p-2 text-white md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-edge grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="A tecnologia"
            title="Por dentro do VIVI Cap"
            sub="Nada de pilha para trocar, recarga ou gelo. O protetor regula a temperatura sozinho, 24 horas por dia, e funciona por anos."
          />
          <ol className="mt-10 space-y-4">
            {TECH.map((t, i) => (
              <li
                key={t.title}
                className="flex gap-4 rounded-[1.5rem] border border-[var(--border)] p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[var(--navy)] font-display text-base font-extrabold text-white">
                  {i + 1}
                </span>
                <span>
                  <b className="block text-[16px] text-[var(--navy)]">{t.title}</b>
                  <span className="mt-1 block text-[14.5px] leading-relaxed text-[var(--ink)]/65">
                    {t.text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative">
          <img
            src={productImages.sensor}
            alt="Sensor de temperatura integrado: a luz verde mostra que a insulina está segura"
            loading="lazy"
            className="w-full rounded-[2rem] shadow-[0_30px_70px_-40px_rgba(27,34,102,0.55)]"
          />
        </div>
      </div>
    </section>
  );
}

export function ComparisonSection() {
  return (
    <section className="bg-[var(--paper)] py-20 md:py-28">
      <div className="container-edge">
        <SectionHeading eyebrow="Compare" title="Por que não uma bolsa térmica?" center />
        <div className="mx-auto mt-12 max-w-4xl overflow-x-auto rounded-[1.75rem] border border-[var(--border)] bg-white">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead>
              <tr>
                <th className="p-5" />
                {COMPARISON.columns.map((c, i) => (
                  <th
                    key={c}
                    className={cn(
                      "p-5 text-center font-display text-[15px]",
                      i === 0 ? "bg-[var(--navy)] text-white" : "text-[var(--ink)]/60",
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((r) => (
                <tr key={r.label} className="border-t border-[var(--border)]">
                  <td className="p-5 font-medium text-[var(--navy)]">{r.label}</td>
                  {r.values.map((v, i) => (
                    <td key={i} className={cn("p-5 text-center", i === 0 && "bg-[var(--lilac)]")}>
                      {v ? (
                        <Check
                          className={cn(
                            "mx-auto h-5 w-5",
                            i === 0 ? "text-[var(--violet)]" : "text-[var(--ink)]/45",
                          )}
                        />
                      ) : (
                        <Minus className="mx-auto h-5 w-5 text-[var(--ink)]/25" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy)] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[var(--violet)]/30 blur-3xl" />
      <div className="container-edge relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Benefícios"
            title="Liberdade para levar sua insulina a qualquer lugar"
            light
          />
          <img
            src={productImages.temperatures}
            alt="VIVI Cap funciona mesmo em temperaturas extremas: calor intenso e frio congelante"
            className="mt-10 w-full max-w-md rounded-[2rem]"
            loading="lazy"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[var(--ice-strong)]">
                <ContentIcon name={b.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{b.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-white/65">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UseCasesSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Feito para a sua rotina"
          title="Para todo lugar que a vida te leva"
          center
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((u) => (
            <div key={u.title} className="rounded-[1.5rem] bg-[var(--lilac)] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[var(--violet)]">
                <ContentIcon name={u.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg text-[var(--navy)]">{u.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ink)]/65">{u.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Kits ---------- */

export function KitCard({ bundle }: { bundle: Bundle }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[1.75rem] border bg-white p-7",
        bundle.featured
          ? "border-[var(--violet)] shadow-[0_30px_70px_-35px_rgba(91,74,230,0.65)] ring-1 ring-[var(--violet)]"
          : "border-[var(--border)]",
      )}
    >
      {bundle.badge && (
        <span
          className={cn(
            "absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
            bundle.featured ? "bg-[var(--violet)] text-white" : "bg-[var(--navy)] text-white",
          )}
        >
          {bundle.badge}
        </span>
      )}
      <div className="flex h-44 items-end justify-center rounded-2xl bg-gradient-to-b from-[var(--lilac)] to-white pt-4">
        <img
          src={kitImage(bundle.units)}
          alt={`${bundle.units} VIVI Cap`}
          loading="lazy"
          className="h-36 w-auto object-contain"
        />
      </div>
      <h3 className="mt-5 text-xl text-[var(--navy)]">{bundle.name}</h3>
      <p className="mt-1 text-[13.5px] text-[var(--ink)]/60">{bundle.perUnitLabel}</p>
      <div className="mt-5 flex items-baseline gap-2">
        {bundle.compareAtPrice && (
          <span className="text-sm text-[var(--ink)]/40 line-through">
            {brl(bundle.compareAtPrice)}
          </span>
        )}
        <span className="font-display text-4xl font-extrabold text-[var(--navy)]">
          {brl(bundle.price)}
        </span>
      </div>
      <p className="mt-1 text-[13px] font-semibold text-emerald-700">
        {bundle.savings ? `${bundle.savings} · no Pix` : "Pagamento único no Pix"}
      </p>
      <ul className="mt-5 space-y-2 text-[13.5px] text-[var(--ink)]/70">
        <li className="flex gap-2">
          <Check className="h-4 w-4 shrink-0 text-[var(--violet)]" />
          {bundle.description}
        </li>
        <li className="flex gap-2">
          <Check className="h-4 w-4 shrink-0 text-[var(--violet)]" />
          {bundleShippingLabel(bundle)}
        </li>
      </ul>
      <Link
        to="/checkout"
        search={{ plano: Number(bundle.id) }}
        className={cn(
          "mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition",
          bundle.featured
            ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
            : "bg-[var(--lilac)] text-[var(--navy)] hover:bg-[var(--lavender)]",
        )}
      >
        Comprar agora <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function KitsSection() {
  return (
    <section id="kits" className="scroll-mt-28 bg-[var(--paper)] py-20 md:py-28">
      <div className="container-edge">
        <SectionHeading
          eyebrow="Escolha seu kit"
          title="Quanto mais canetas, mais você economiza"
          sub="Um VIVI Cap para cada caneta, ou um para casa e outro para levar. Pagamento único no Pix."
          center
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {availableBundles.map((b) => (
            <KitCard key={b.id} bundle={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function InTheBoxSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-edge grid items-center gap-12 md:grid-cols-2">
        <img
          src={productImages.pens}
          alt="VIVI Cap serve em todas as canetas de insulina e cabe no bolso"
          loading="lazy"
          className="w-full rounded-[2rem] shadow-[0_30px_70px_-40px_rgba(27,34,102,0.55)]"
        />
        <div>
          <SectionHeading eyebrow="Na caixa" title="O que você recebe" />
          <ul className="mt-8 space-y-3">
            {IN_THE_BOX.map((t) => (
              <li
                key={t}
                className="flex items-center gap-3 rounded-2xl border border-[var(--border)] px-5 py-4 text-[15px] text-[var(--navy)]"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--violet)] text-white">
                  <Check className="h-4 w-4" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dúvidas e CTA ---------- */

export function FaqList({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? FAQ.slice(0, limit) : FAQ;
  return (
    <div className="divide-y divide-[var(--border)] rounded-[1.75rem] border border-[var(--border)] bg-white">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="text-[15.5px] font-semibold text-[var(--navy)]">{f.q}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-[var(--violet)] transition-transform",
                open === i && "rotate-180",
              )}
            />
          </button>
          {open === i && (
            <p className="-mt-1 px-6 pb-6 text-[15px] leading-relaxed text-[var(--ink)]/70">
              {f.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function FaqSection({ limit }: { limit?: number }) {
  return (
    <section className="bg-[var(--paper)] py-20 md:py-28">
      <div className="container-edge grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Dúvidas"
            title="Perguntas frequentes"
            sub="Não encontrou sua resposta? Fale com a gente."
          />
          {limit && (
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--violet)]"
            >
              Ver todas as dúvidas <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <FaqList limit={limit} />
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-edge">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[radial-gradient(120%_120%_at_0%_0%,#3a2fb0_0%,#1b2266_55%,#11164a_100%)] px-8 py-14 text-white md:px-16 md:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[var(--violet)]/40 blur-3xl" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="text-3xl leading-tight text-balance md:text-5xl">
                Leve seu tratamento para qualquer lugar, com tranquilidade.
              </h2>
              <p className="mt-5 max-w-lg text-white/70 md:text-lg">
                Escolha seu kit e receba em casa. Frete grátis acima de R$ {FREE_SHIPPING_MIN}.
              </p>
              <BuyButton variant="light" className="mt-8">
                Escolher meu kit
              </BuyButton>
            </div>
            <img
              src={productImages.travel}
              alt=""
              loading="lazy"
              className="mx-auto hidden w-full max-w-sm rounded-[2rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
