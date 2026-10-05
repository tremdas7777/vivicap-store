import type { ReactNode } from "react";
import { SiteLayout } from "./Layout";

/** Página de texto (políticas, sobre): título + corpo com tipografia padrão. */
export function PolicyPage({
  eyebrow = "Políticas",
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="bg-[var(--paper)] pb-24 pt-12 md:pt-20">
        <div className="container-edge max-w-3xl">
          <p className="eyebrow text-[var(--violet)]">{eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-[1.05] text-[var(--navy)] text-balance md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ink)]/70">{intro}</p>
          <div className="mt-12 space-y-5 rounded-[2rem] bg-white p-8 md:p-12 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:text-[var(--navy)] [&_h2:first-child]:mt-0 [&_li]:flex [&_li]:gap-2 [&_li]:before:mt-2.5 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-[var(--violet)] [&_li]:before:content-[''] [&_p]:leading-relaxed [&_p]:text-[var(--ink)]/70 [&_ul]:space-y-2.5 [&_ul]:text-[var(--ink)]/70">
            {children}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
