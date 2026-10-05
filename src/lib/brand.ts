/** Marca da loja — VIVI Cap (protetor térmico para canetas de insulina e GLP-1). */
export const brand = {
  name: "VIVI Cap",
  productName: "VIVI Cap",
  tagline: "Protetor térmico para canetas de insulina e GLP-1",
  taglineShort: "Sua caneta protegida onde você estiver",
  /** Nome genérico enviado ao gateway na descrição da cobrança Pix. */
  chargeDescription: "Pedido VIVI Cap",
  // TODO(loja): preencher com os dados reais antes de anunciar.
  cnpj: "",
  email: "",
  whatsapp: {
    /** Número em E.164 (DDI + DDD + número), sem símbolos. Vazio = botões de WhatsApp ocultos. */
    phoneE164: "",
    display: "",
  },
  colors: {
    navy: "#1b2266",
    violet: "#6d5bf0",
    lavender: "#c9bffb",
    ice: "#e3f3fc",
  },
} as const;

export const hasWhatsapp = () => brand.whatsapp.phoneE164.length >= 12;
export const whatsappUrl = (text?: string) =>
  `https://wa.me/${brand.whatsapp.phoneE164}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
