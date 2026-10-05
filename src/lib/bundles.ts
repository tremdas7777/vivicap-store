import { brand } from "@/lib/brand";

/** Kit por quantidade de unidades do VIVI Cap. */
export type BundleId = "1" | "2" | "3";

/** Valor mínimo (produtos, sem frete) para liberar o frete grátis. */
export const FREE_SHIPPING_MIN = 199;
export const FREE_SHIPPING_LABEL = `Frete grátis em compras acima de R$ ${FREE_SHIPPING_MIN}`;

export const isFreeShippingEligible = (subtotal: number) => subtotal >= FREE_SHIPPING_MIN;

/** Selo de frete por kit: grátis quando o próprio kit já passa do mínimo. */
export const bundleShippingLabel = (b: { price: number }) =>
  isFreeShippingEligible(b.price) ? "Frete grátis para todo o Brasil" : FREE_SHIPPING_LABEL;

export type Bundle = {
  id: BundleId;
  name: string;
  units: number;
  price: number;
  compareAtPrice?: number;
  /** Ex.: "R$ 83,50 por unidade" */
  perUnitLabel: string;
  description: string;
  checkoutProductName: string;
  checkoutUrl: string;
  featured?: boolean;
  badge?: string;
  savings?: string;
};

const brlInline = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Preço de 1 unidade: referência do "de" dos kits (quantidade × preço unitário). */
const UNIT_PRICE = 150;
const kit = (
  units: number,
  price: number,
  extra: Partial<Pick<Bundle, "featured" | "badge">> = {},
): Bundle => {
  const compareAt = units > 1 ? +(UNIT_PRICE * units).toFixed(2) : undefined;
  const id = String(units) as BundleId;
  return {
    id,
    name: units === 1 ? "1 VIVI Cap" : `Kit com ${units} VIVI Cap`,
    units,
    price,
    ...(compareAt ? { compareAtPrice: compareAt } : {}),
    perUnitLabel: `${brlInline(price / units)} por unidade`,
    description:
      units === 1
        ? "1 protetor térmico completo"
        : `${units} protetores térmicos completos — um para cada caneta ou para casa e trabalho`,
    checkoutProductName: `${brand.productName} — ${units} ${units === 1 ? "unidade" : "unidades"}`,
    checkoutUrl: `/checkout?plano=${id}`,
    ...(compareAt ? { savings: `Economize ${brlInline(compareAt - price)}` } : {}),
    ...extra,
  };
};

export const bundles: Bundle[] = [
  kit(1, UNIT_PRICE),
  kit(2, 200, { featured: true, badge: "Mais vendido" }),
  kit(3, 230, { badge: "Melhor custo-benefício" }),
];

/** Kits visíveis na loja. */
export const availableBundles = bundles;

export function parseBundleId(raw: string | undefined): BundleId | undefined {
  if (raw === "1" || raw === "2" || raw === "3") return raw;
  return undefined;
}

export function getBundle(id: string | undefined): Bundle {
  const parsed = parseBundleId(id);
  return availableBundles.find((b) => b.id === parsed) ?? availableBundles[0]!;
}

export function getCheckoutUrl(id: string | undefined) {
  return getBundle(id).checkoutUrl;
}

/** Próximo kit para o empurrão de frete grátis no checkout (1→2, 2→3). */
export function getUpgradeBundle(current: Bundle): Bundle | null {
  return availableBundles.find((b) => b.units === current.units + 1) ?? null;
}

export function bundleUnitsLabel(bundle: Bundle) {
  return `${bundle.units} ${bundle.units === 1 ? "unidade" : "unidades"}`;
}

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
