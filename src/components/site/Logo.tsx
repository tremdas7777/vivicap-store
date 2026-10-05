import { cn } from "@/lib/utils";

/** Símbolo: "V" sólido com o ponto em cima (o mesmo gravado no protetor). Usa currentColor. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 44"
      aria-hidden
      className={cn("h-8 w-auto", className)}
      fill="currentColor"
    >
      <circle cx="20" cy="5.2" r="4.4" />
      <path d="M1.5 14.5 C 8.5 17.2 14.6 20.6 20 25.4 C 25.4 20.6 31.5 17.2 38.5 14.5 C 33.4 23.6 26.6 33.4 20 43 C 13.4 33.4 6.6 23.6 1.5 14.5 Z" />
    </svg>
  );
}

/**
 * Logo completo no estilo do fabricante: símbolo + "ViviCap" em sans humanista (Open Sans).
 * `tone="light"` para fundos escuros.
 */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "light" ? "text-white" : "text-[var(--navy)]",
        className,
      )}
    >
      <LogoMark />
      <span
        className="text-[1.65rem] leading-none tracking-[-0.01em]"
        style={{ fontFamily: '"Open Sans", "Segoe UI", system-ui, sans-serif', fontWeight: 400 }}
      >
        ViviCap
      </span>
    </span>
  );
}
