import { createFileRoute } from "@tanstack/react-router";

// Notificação da PixGate. O corpo não é confiável: usamos só o id
// e sempre confirmamos o status na API autenticada antes de reportar a venda.
export const Route = createFileRoute("/api/public/pix-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json().catch(() => null)) as any;
        const rawId =
          body?.transaction_id ??
          body?.id ??
          body?.transaction?.id ??
          body?.body?.transaction?.id ??
          body?.data?.id;
        const id = rawId == null ? "" : String(rawId);
        console.log("pix-webhook", body?.event, id);
        if (!/^[\w-]{1,64}$/.test(id)) return Response.json({ ok: true });
        try {
          const { fetchGatewayStatus, reportPaidOnce, isPaidStatus } =
            await import("@/lib/pix-orders.server");
          const { status, amount } = await fetchGatewayStatus(id);
          if (isPaidStatus(status)) await reportPaidOnce(id, amount);
        } catch (e) {
          console.error("pix-webhook failed", e);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
