import { Link } from "@tanstack/react-router";
import { Lock, MessageCircle, Truck } from "lucide-react";
import { brand, hasWhatsapp, whatsappUrl } from "@/lib/brand";
import { FREE_SHIPPING_MIN } from "@/lib/bundles";
import { Logo } from "./Logo";

const LINKS = {
  Loja: [
    { to: "/produto", label: "Comprar VIVI Cap" },
    { to: "/faq", label: "Dúvidas frequentes" },
    { to: "/sobre", label: "Sobre a VIVI Cap" },
    { to: "/rastreio", label: "Rastrear pedido" },
  ],
  Ajuda: [
    { to: "/contato", label: "Fale conosco" },
    { to: "/politica-envio", label: "Envio e prazos" },
    { to: "/politica-reembolso", label: "Trocas e devoluções" },
    { to: "/politica-privacidade", label: "Privacidade" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] text-white">
      <div className="container-edge grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" aria-label="VIVI Cap — início">
            <Logo tone="light" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            {brand.tagline}. Proteção para levar seu tratamento a qualquer lugar.
          </p>
          {hasWhatsapp() && (
            <a
              href={whatsappUrl("Olá! Tenho uma dúvida sobre o VIVI Cap.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15"
            >
              <MessageCircle className="h-4 w-4" /> {brand.whatsapp.display}
            </a>
          )}
        </div>

        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title}>
            <p className="eyebrow text-[var(--lavender)]">{title}</p>
            <ul className="mt-5 space-y-3">
              {items.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4">
          <div className="flex gap-3 rounded-2xl bg-white/[0.06] p-4">
            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ice-strong)]" />
            <p className="text-sm text-white/75">
              <b className="text-white">Frete grátis</b> em compras acima de R$ {FREE_SHIPPING_MIN}{" "}
              para todo o Brasil.
            </p>
          </div>
          <div className="flex gap-3 rounded-2xl bg-white/[0.06] p-4">
            <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--ice-strong)]" />
            <p className="text-sm text-white/75">
              <b className="text-white">Compra segura</b> com pagamento via Pix e dados protegidos.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-edge flex flex-col gap-2 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} VIVI Cap. Todos os direitos reservados.
            {brand.cnpj && <> · CNPJ {brand.cnpj}</>}
            {brand.email && <> · {brand.email}</>}
          </p>
          <p>
            O VIVI Cap não substitui as orientações de armazenamento do fabricante do seu
            medicamento.
          </p>
        </div>
      </div>
    </footer>
  );
}
