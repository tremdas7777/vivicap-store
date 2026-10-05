/** Artes do VIVI Cap em português (public/images/produto). */
const base = "/images/produto";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Arte quadrada que ocupa o quadro inteiro (sem margem branca). */
  full?: boolean;
};

export const productImages = {
  temperatures: `${base}/vivicap-temperaturas.webp`,
  sensor: `${base}/vivicap-sensor.webp`,
  pens: `${base}/vivicap-canetas.webp`,
  travel: `${base}/vivicap-viagem.webp`,
  box: `${base}/vivicap-caixa-pt.webp`,
} as const;

/** Foto do kit (1, 2 ou 3 unidades, fundo transparente). Arquivos pequenos: usar em tamanho moderado. */
export const kitImage = (units: number) =>
  `${base}/vivicap-kit-${Math.min(3, Math.max(1, units))}.webp`;

/** Galeria da página do produto, na ordem de venda: benefício → prova → compatibilidade → uso → produto e embalagem. */
export const productGallery: GalleryItem[] = [
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
    src: productImages.box,
    alt: "VIVI Cap encaixado na caneta, ao lado da embalagem: Protetor Térmico de Insulina",
    caption: "Produto e embalagem",
  },
];

export const productHeroImage = productImages.temperatures;
