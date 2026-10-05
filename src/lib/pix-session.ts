/** Sessão do Pix compartilhada entre /checkout e /pedido/$id (client-side). */
export type PixSession = {
  id: string;
  qrcode: string;
  /** Valor em centavos. */
  amount: number;
  email: string;
  name: string;
  bundleId: string;
  bundleName: string;
  units: number;
  productPrice: number;
  /** Upsell pós-compra: id do pedido original. */
  isUpsell?: boolean;
  parentId?: string;
  frete: number;
  discount: number;
  createdAt: number;
  phone?: string;
  cpf?: string;
  utm?: Record<string, string | null>;
  fbp?: string | null;
  fbc?: string | null;
};

const key = (id: string) => `pix:${id}`;

export function savePixSession(s: PixSession): void {
  try {
    sessionStorage.setItem(key(s.id), JSON.stringify(s));
  } catch {
    // storage indisponível — a tela /pedido cai no fallback
  }
}

export function loadPixSession(id: string): PixSession | null {
  try {
    const raw = sessionStorage.getItem(key(id));
    return raw ? (JSON.parse(raw) as PixSession) : null;
  } catch {
    return null;
  }
}
