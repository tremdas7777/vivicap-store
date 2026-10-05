import { cn } from "@/lib/utils";

/** Símbolo da marca: o "V" com ponto gravado no protetor. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("h-8 w-8", className)}>
      <defs>
        <linearGradient id="vv-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b7cf6" />
          <stop offset="1" stopColor="#1b2266" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#vv-mark)" />
      <circle cx="20" cy="11.5" r="3.1" fill="#fff" />
      <path
        d="M9.5 16.5 L20 31 L30.5 16.5 L25.6 16.5 L20 24.6 L14.4 16.5 Z"
        fill="#fff"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Logo completo: símbolo + "VIVI Cap". `tone="light"` para fundos escuros. */
export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span
        className={cn(
          "font-display text-[1.35rem] font-extrabold leading-none tracking-[-0.03em]",
          tone === "light" ? "text-white" : "text-[var(--navy)]",
        )}
      >
        VIVI
        <span className={tone === "light" ? "text-[var(--lavender)]" : "text-[var(--violet)]"}>
          {" "}
          Cap
        </span>
      </span>
    </span>
  );
}
