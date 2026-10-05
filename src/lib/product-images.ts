/** Fotos do VIVI Cap (public/images/produto). Fundo transparente/branco. */
const base = "/images/produto";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const productImages = {
  box: `${base}/vivicap-caixa.webp`,
  pen: `${base}/vivicap-caneta.webp`,
  kitOpen: `${base}/vivicap-kit-aberto.webp`,
  flexpen: `${base}/vivicap-flexpen.webp`,
} as const;

/** Galeria da página do produto. */
export const productGallery: GalleryItem[] = [
  {
    src: productImages.box,
    alt: "VIVI Cap com a caneta dentro do tubo transparente, ao lado da embalagem",
    caption: "Protetor completo + embalagem",
  },
  {
    src: productImages.pen,
    alt: "VIVI Cap encaixado no lugar da tampa de uma caneta aplicadora",
    caption: "Encaixa no lugar da tampa da caneta",
  },
  {
    src: productImages.kitOpen,
    alt: "Caixa do VIVI Cap aberta com o protetor, o tubo transparente e a tampa",
    caption: "O que vem na caixa",
  },
  {
    src: productImages.flexpen,
    alt: "VIVI Cap modelo FlexPen",
    caption: "Versão FlexPen",
  },
];

export const productHeroImage = productImages.box;
