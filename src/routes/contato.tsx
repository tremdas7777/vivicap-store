import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, PackageSearch } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { brand, hasWhatsapp, whatsappUrl } from "@/lib/brand";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Fale conosco | VIVI Cap" },
      {
        name: "description",
        content: "Fale com a equipe VIVI Cap: dúvidas sobre o produto, pedidos e entregas.",
      },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Page,
});

function Page() {
  const channels = [
    hasWhatsapp() && {
      icon: MessageCircle,
      title: "WhatsApp",
      text: brand.whatsapp.display,
      href: whatsappUrl("Olá! Tenho uma dúvida sobre o VIVI Cap."),
      cta: "Chamar no WhatsApp",
    },
    brand.email && {
      icon: Mail,
      title: "E-mail",
      text: brand.email,
      href: `mailto:${brand.email}`,
      cta: "Enviar e-mail",
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    title: string;
    text: string;
    href: string;
    cta: string;
  }[];

  return (
    <SiteLayout>
      <section className="bg-[var(--paper)] pb-24 pt-12 md:pt-20">
        <div className="container-edge max-w-4xl">
          <p className="eyebrow text-[var(--violet)]">Atendimento</p>
          <h1 className="mt-4 text-4xl leading-[1.05] text-[var(--navy)] md:text-6xl">
            Fale com a gente
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink)]/70">
            Dúvidas sobre o VIVI Cap, compatibilidade com a sua caneta ou o seu pedido? Respondemos
            em dias úteis.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {channels.map(({ icon: Icon, title, text, href, cta }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.75rem] border border-[var(--border)] bg-white p-7 transition hover:border-[var(--lavender)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--lilac)] text-[var(--violet)]">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-lg font-bold text-[var(--navy)]">{title}</p>
                <p className="text-[var(--ink)]/65">{text}</p>
                <p className="mt-4 text-sm font-semibold text-[var(--violet)]">{cta} →</p>
              </a>
            ))}
            <Link
              to="/rastreio"
              className="rounded-[1.75rem] border border-[var(--border)] bg-white p-7 transition hover:border-[var(--lavender)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--lilac)] text-[var(--violet)]">
                <PackageSearch className="h-6 w-6" />
              </span>
              <p className="mt-5 text-lg font-bold text-[var(--navy)]">Onde está meu pedido?</p>
              <p className="text-[var(--ink)]/65">Acompanhe a entrega com o CPF de quem comprou.</p>
              <p className="mt-4 text-sm font-semibold text-[var(--violet)]">Rastrear pedido →</p>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
