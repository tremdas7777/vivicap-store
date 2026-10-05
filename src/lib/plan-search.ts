import { z } from "zod";
import { parseBundleId, type BundleId } from "@/lib/bundles";

/** Query string dos kits (?plano=1|2|3). Número na URL para ficar limpo (sem aspas). */
export const planSearchSchema = z.object({
  plano: z.coerce.number().int().min(1).max(3).optional().catch(undefined),
});

export type PlanSearch = z.infer<typeof planSearchSchema>;

export function bundleIdFromSearch(search: PlanSearch): BundleId {
  return parseBundleId(search.plano === undefined ? undefined : String(search.plano)) ?? "2";
}
