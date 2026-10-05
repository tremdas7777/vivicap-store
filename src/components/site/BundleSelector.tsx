import { availableBundles, brl, isFreeShippingEligible, type BundleId } from "@/lib/bundles";
import { cn } from "@/lib/utils";

/** Escolha do kit (1, 2 ou 3 unidades) na página do produto. */
export function BundleSelector({
  selected,
  onSelect,
}: {
  selected: BundleId;
  onSelect: (id: BundleId) => void;
}) {
  return (
    <div className="space-y-3" role="radiogroup" aria-label="Escolha seu kit">
      {availableBundles.map((b) => {
        const active = b.id === selected;
        return (
          <button
            key={b.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(b.id)}
            className={cn(
              "relative flex w-full items-center gap-4 rounded-2xl border-2 bg-white px-4 py-4 text-left transition",
              active
                ? "border-[var(--violet)] shadow-[0_14px_34px_-20px_rgba(91,74,230,0.8)]"
                : "border-[var(--border)] hover:border-[var(--lavender)]",
            )}
          >
            {b.badge && (
              <span
                className={cn(
                  "absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white",
                  b.featured ? "bg-[var(--violet)]" : "bg-[var(--navy)]",
                )}
              >
                {b.badge}
              </span>
            )}
            <span
              className={cn(
                "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
                active ? "border-[var(--violet)]" : "border-[var(--ink)]/25",
              )}
            >
              {active && <span className="h-2.5 w-2.5 rounded-full bg-[var(--violet)]" />}
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-semibold text-[var(--navy)]">{b.name}</span>
              <span className="block text-[12.5px] text-[var(--ink)]/55">
                {b.perUnitLabel}
                {isFreeShippingEligible(b.price) && (
                  <>
                    {" "}
                    · <b className="text-emerald-700">frete grátis</b>
                  </>
                )}
              </span>
            </span>
            <span className="text-right">
              {b.compareAtPrice && (
                <span className="block text-[12px] text-[var(--ink)]/40 line-through">
                  {brl(b.compareAtPrice)}
                </span>
              )}
              <span className="block text-lg font-extrabold text-[var(--navy)]">
                {brl(b.price)}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
