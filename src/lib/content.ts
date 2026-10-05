import { FREE_SHIPPING_MIN } from "@/lib/bundles";

// Afirmações do produto: vindas do texto do VIVI Cap usado no order bump da loja AiDEX.
// TODO(loja): confirmar com o fornecedor antes de anunciar (24h, luz indicadora, avião, compatibilidade).

export const BENEFITS = [
  {
    icon: "thermometer",
    title: "Temperatura segura por até 24h",
    text: "Mantém sua insulina ou GLP-1 protegida do calor durante o dia, longe da geladeira.",
  },
  {
    icon: "snowflake",
    title: "Sem gelo, pilha ou geladeira",
    text: "Nada de bolsa térmica pesada nem gelo que molha tudo. É só encaixar e levar.",
  },
  {
    icon: "light",
    title: "Luz indicadora",
    text: "A luz verde mostra na hora que o medicamento está protegido.",
  },
  {
    icon: "plane",
    title: "Liberado para avião",
    text: "Viaje com o tratamento na bagagem de mão, sem complicação.",
  },
  {
    icon: "pen",
    title: "Encaixa no lugar da tampa",
    text: "Substitui a tampa da caneta aplicadora. Modelo multi-caneta e versão FlexPen.",
  },
  {
    icon: "bag",
    title: "Leve e discreto",
    text: "Cabe no bolso, na bolsa ou na mochila. Ninguém precisa saber o que é.",
  },
] as const;

export type BenefitIcon = (typeof BENEFITS)[number]["icon"];

export const STEPS = [
  {
    n: "01",
    title: "Tire a tampa original",
    text: "Remova a tampa que veio com a sua caneta de insulina ou GLP-1.",
  },
  {
    n: "02",
    title: "Encaixe o VIVI Cap",
    text: "A caneta fica dentro do tubo transparente, com o protetor térmico no lugar da tampa.",
  },
  {
    n: "03",
    title: "Leve para onde for",
    text: "Trabalho, academia, praia, carro ou avião: sua caneta protegida o dia inteiro.",
  },
] as const;

export const USE_CASES = [
  { icon: "plane", title: "Viagens", text: "Férias, visitas à família e viagens a trabalho." },
  { icon: "sun", title: "Verão e praia", text: "Dias quentes longe de casa e da geladeira." },
  {
    icon: "briefcase",
    title: "Trabalho e estudo",
    text: "Sua dose junto com você, sem depender da copa.",
  },
  { icon: "car", title: "Carro", text: "O interior do carro esquenta rápido ao sol." },
] as const;

export const IN_THE_BOX = [
  "1 protetor térmico VIVI Cap",
  "1 tubo transparente para a caneta",
  "1 tampa de acabamento",
  "Embalagem de presente",
] as const;

export const FAQ = [
  {
    q: "Para que serve o VIVI Cap?",
    a: "É um protetor térmico que substitui a tampa da caneta de insulina ou de GLP-1 e ajuda a proteger o medicamento do calor quando você está longe da geladeira.",
  },
  {
    q: "Funciona com a minha caneta?",
    a: "O VIVI Cap é um modelo multi-caneta e também existe a versão FlexPen. Se tiver dúvida sobre o seu modelo, fale com a gente antes de comprar.",
  },
  {
    q: "Precisa de gelo, pilha ou geladeira?",
    a: "Não. Basta encaixar o VIVI Cap na caneta e levar.",
  },
  {
    q: "Posso levar no avião?",
    a: "Sim. O VIVI Cap é liberado para viagens de avião. Leve na bagagem de mão, junto com a receita do seu medicamento.",
  },
  {
    q: "O VIVI Cap substitui a geladeira?",
    a: "Não. Ele é para o dia a dia fora de casa. Siga sempre as orientações de armazenamento do fabricante do seu medicamento.",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Pix, com aprovação na hora. Assim que o pagamento é confirmado, seu pedido entra em separação.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: `Enviamos para todo o Brasil. O prazo aparece no checkout de acordo com o frete escolhido, e o frete é grátis em compras acima de R$ ${FREE_SHIPPING_MIN}.`,
  },
  {
    q: "Como acompanho meu pedido?",
    a: "Você recebe o código de rastreio por e-mail e pode acompanhar a entrega na página Rastrear pedido.",
  },
] as const;
