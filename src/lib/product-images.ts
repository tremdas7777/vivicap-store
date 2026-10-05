/** Fotos do VIVI Cap (public/images/produto). Fundo transparente/branco. */
const base = "/images/produto";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Arte quadrada que ocupa o quadro inteiro (sem margem branca). */
  full?: boolean;
};

export const productImages = {
  box: `${base}/vivicap-caixa.webp`,
  pen: `${base}/vivicap-caneta.webp`,
  kitOpen: `${base}/vivicap-kit-aberto.webp`,
  flexpen: `${base}/vivicap-flexpen.webp`,
  temperatures: `${base}/vivicap-temperaturas.webp`,
  sensor: `${base}/vivicap-sensor.webp`,
  pens: `${base}/vivicap-canetas.webp`,
  travel: `${base}/vivicap-viagem.webp`,
} as const;

/** Galeria da página do produto, na ordem de venda: produto → benefício → prova → compatibilidade → uso → caixa. */
export const productGallery: GalleryItem[] = [
  {
    src: productImages.box,
    alt: "VIVI Cap com a caneta dentro do tubo transparente, ao lado da embalagem",
    caption: "VIVI Cap + embalagem",
  },
  {
    src: productImages.temperatures,
    alt: "VIVI Cap funciona mesmo em temperaturas extremas: calor intenso e frio congelante",
    caption: "Calor e frio extremos",
    full: true,
  },
  {
    src: productImages.sensor,
    alt: "Sensor de temperatura integrado: a luz verde mostra que a insulina está segura",
    caption: "Luz verde de confirmação",
    full: true,
  },
  {
    src: productImages.pens,
    alt: "VIVI Cap serve em todas as canetas de insulina e cabe no bolso",
    caption: "Serve em todas as canetas",
    full: true,
  },
  {
    src: productImages.travel,
    alt: "VIVI Cap pronto para viajar: sem água ou gelo, sem geladeira e sem recarga",
    caption: "Pronto para viajar",
    full: true,
  },
  {
    src: productImages.kitOpen,
    alt: "Caixa do VIVI Cap aberta com o protetor, o tubo transparente e a tampa",
    caption: "O que vem na caixa",
  },
];

export const productHeroImage = productImages.box;
