import type { Bundle } from "@/lib/bundles";

/** Upsell pós-compra: mais 1 kit igual ao comprado, com desconto. */
export const UPSELL_DISCOUNT = 0.5;

export const upsellPrice = (bundle: Bundle) =>
  Math.round(bundle.price * (1 - UPSELL_DISCOUNT) * 100) / 100;
