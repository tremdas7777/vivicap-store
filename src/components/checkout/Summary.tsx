import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { bundleUnitsLabel, type Bundle } from "@/lib/bundles";
import { brl, PRODUCT_IMG } from "./parts";
import { FreeShippingProgress } from "./FreeShippingProgress";

type Props = { bundle: Bundle; frete: number; discount: number };

const totalOf = ({ bundle, frete, discount }: Props) => bundle.price - discount + frete;

function Body(p: Props) {
  const { bundle, frete, discount } = p;
  return (
    <>
      <FreeShippingProgress bundle={bundle} subtotal={bundle.price} className="mb-5" />
      <div className="space-y-2 text-[13px]">
        <div className="flex justify-between">
          <span>Produtos</span>
          <span>{brl(bundle.price)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span className={frete ? "" : "text-[var(--ck-ok)]"}>
            {frete ? brl(frete) : "Grátis"}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span>Descontos</span>
            <span className="text-[var(--ck-ok)]">-{brl(discount)}</span>
          </div>
        )}
        <div className="flex justify-between pt-1 text-base font-semibold">
          <span>Total</span>
          <span>{brl(totalOf(p))}</span>
        </div>
      </div>
      <div className="mt-6 flex gap-3 border-t border-border pt-6">
        <img
          src={PRODUCT_IMG}
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 rounded-md border border-border bg-white object-contain p-1"
        />
        <div className="flex-1 text-[13px]">
          <p>VIVI Cap — Protetor térmico para canetas</p>
          <p className="mt-1 text-muted-foreground">{bundleUnitsLabel(bundle)}</p>
        </div>
        <span className="text-[13px]">{brl(bundle.price)}</span>
      </div>
    </>
  );
}

export function SummaryDesktop(p: Props) {
  return (
    <aside className="hidden h-fit rounded-lg border border-border p-6 lg:block">
      <h2 className="mb-6 text-[15px]">Resumo do pedido</h2>
      <Body {...p} />
    </aside>
  );
}

export function SummaryMobile(p: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-y border-border bg-muted/60 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-3"
      >
        <span className="text-[13px]">Resumo do pedido</span>
        <span className="flex items-center gap-2 text-lg font-medium">
          {brl(totalOf(p))}{" "}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && (
        <div className="ck-surface px-5 py-5">
          <Body {...p} />
        </div>
      )}
    </div>
  );
}
