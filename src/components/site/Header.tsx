import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/", label: "Início", hash: undefined },
  { to: "/produto", label: "VIVI Cap", hash: undefined },
  { to: "/", label: "Como funciona", hash: "como-funciona" },
  { to: "/faq", label: "Dúvidas", hash: undefined },
  { to: "/rastreio", label: "Rastrear pedido", hash: undefined },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`border-b transition-colors ${
        scrolled
          ? "border-[var(--border)] bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white"
      }`}
    >
      <div className="container-edge flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Link to="/" aria-label="VIVI Cap — início" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              className="text-[14px] font-medium text-[var(--ink)]/75 transition-colors hover:text-[var(--violet)]"
              activeOptions={{ exact: true, includeHash: true }}
              activeProps={{ className: "text-[var(--ink)]" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--ink)] hover:bg-[var(--lilac)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--border)] bg-white lg:hidden" aria-label="Menu">
          <ul className="container-edge py-3">
            {NAV.map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  hash={n.hash}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-[15px] font-medium text-[var(--ink)] hover:bg-[var(--lilac)]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
