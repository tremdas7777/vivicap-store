// Pixel do Meta no navegador + espelho no servidor (Conversions API) com deduplicação por event_id.
import { trackMetaEvent } from "./meta.functions";

type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized: string | null = null;
const pending: Array<() => void> = [];

export function loadMetaPixel(pixelId: string) {
  if (typeof window === "undefined" || initialized === pixelId) return;
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      const self = n as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
      if (self.callMethod) self.callMethod(...args);
      else self.queue.push(args);
    } as unknown as Fbq & { push: unknown; loaded: boolean; version: string; queue: unknown[] };
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    window.fbq = n;
    window._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  window.fbq("init", pixelId);
  initialized = pixelId;
  pending.splice(0).forEach((fn) => fn());
}

function cookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/** fbc a partir do fbclid da URL quando o cookie ainda não existe. */
function getFbc(): string | null {
  const c = cookie("_fbc");
  if (c) return c;
  const id = new URLSearchParams(window.location.search).get("fbclid");
  return id ? `fb.1.${Date.now()}.${id}` : null;
}

export type MetaBrowserEvent =
  "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "AddPaymentInfo";

export function metaTrack(
  eventName: MetaBrowserEvent,
  data?: { value?: number; contentName?: string },
) {
  if (typeof window === "undefined") return;
  if (!initialized) {
    pending.push(() => metaTrack(eventName, data));
    return;
  }
  const eventId = `${eventName}-${crypto.randomUUID()}`;
  const custom =
    data?.value !== undefined
      ? {
          value: data.value,
          currency: "BRL",
          content_name: data.contentName,
          content_type: "product",
        }
      : {};
  window.fbq?.("track", eventName, custom, { eventID: eventId });
  void trackMetaEvent({
    data: {
      eventName,
      eventId,
      url: window.location.href,
      fbp: cookie("_fbp"),
      fbc: getFbc(),
      value: data?.value,
      contentName: data?.contentName,
    },
  }).catch(() => undefined);
}

/** Purchase no navegador com o mesmo event_id usado no servidor (id do pedido). */
export function metaPurchaseBrowser(orderId: string, value: number, contentName?: string) {
  if (typeof window === "undefined") return;
  if (!initialized) {
    pending.push(() => metaPurchaseBrowser(orderId, value, contentName));
    return;
  }
  window.fbq?.(
    "track",
    "Purchase",
    { value, currency: "BRL", content_name: contentName, content_type: "product" },
    { eventID: `purchase-${orderId}` },
  );
}

export function getMetaCookies() {
  if (typeof window === "undefined") return { fbp: null, fbc: null };
  return { fbp: cookie("_fbp"), fbc: getFbc() };
}

/** Estado de inicialização (para hooks aguardarem o pixel). */
export function isMetaReady() {
  return initialized !== null;
}
