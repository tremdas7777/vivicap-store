import { FREE_SHIPPING_MIN } from "@/lib/bundles";

// Dados técnicos do VIVI Cap segundo o fabricante (TempraMed — tempramed.com/pages/vivi-cap-laa).
// Texto próprio em português; não usar depoimentos/endossos do site do fabricante como se fossem da loja.

export const BENEFITS = [
  {
    icon: "thermometer",
    title: "Protege do calor e do frio",
    text: "Mantém a insulina na temperatura certa mesmo quando o ambiente esquenta ou esfria demais.",
  },
  {
    icon: "infinity",
    title: "24 horas por dia, por anos",
    text: "Sem pilha para trocar, sem recarga, sem gelo e sem água. É só usar.",
  },
  {
    icon: "light",
    title: "Luz verde de confirmação",
    text: "Aperte o botão: a luz verde mostra que a sua insulina ficou na temperatura certa.",
  },
  {
    icon: "pen",
    title: "Serve em qualquer caneta",
    text: "Substitui a tampa da caneta e pode ser trocado entre canetas diferentes.",
  },
  {
    icon: "sunoff",
    title: "Bloqueia a luz direta",
    text: "A insulina também é sensível à luz. O protetor ajuda a proteger dela.",
  },
  {
    icon: "shield",
    title: "Protege em quedas",
    text: "Mais uma camada de proteção para a caneta no dia a dia.",
  },
  {
    icon: "feather",
    title: "Só 60 gramas",
    text: "Leve e compacto: cabe no bolso, na bolsa ou na mochila.",
  },
  {
    icon: "plane",
    title: "Pronto para viajar",
    text: "Leve na bagagem de mão e tenha a dose protegida durante toda a viagem.",
  },
] as const;

export type BenefitIcon = (typeof BENEFITS)[number]["icon"];

export const STEPS = [
  {
    n: "01",
    title: "Tire a tampa original",
    text: "Remova a tampa que veio com a sua caneta de insulina.",
  },
  {
    n: "02",
    title: "Encaixe o VIVI Cap",
    text: "Ele entra no lugar da tampa e passa a controlar a temperatura sozinho.",
  },
  {
    n: "03",
    title: "Confira na luz verde",
    text: "Quando quiser, aperte o botão: a luz verde confirma que a insulina está protegida.",
  },
] as const;

/** Como o VIVI Cap funciona por dentro. */
export const TECH = [
  {
    title: "Isolamento térmico especial",
    text: "Uma barreira que reduz a troca de calor entre a caneta e o ambiente.",
  },
  {
    title: "Material que absorve o calor",
    text: "Quando a temperatura sobe, ele absorve o excesso de calor. Quando o ambiente volta ao normal, libera esse calor e se regenera sozinho.",
  },
  {
    title: "Eletrônica de controle",
    text: "Monitora a temperatura e acende a luz verde quando a insulina está segura.",
  },
] as const;

export const USE_CASES = [
  {
    icon: "plane",
    title: "Viagens",
    text: "Férias, trilhas, visitas à família e viagens a trabalho.",
  },
  {
    icon: "sun",
    title: "Praia e piscina",
    text: "Aproveite o dia sem pensar na insulina dentro da bolsa.",
  },
  {
    icon: "briefcase",
    title: "Trabalho",
    text: "No escritório, na rua ou na obra: a dose certa na hora certa.",
  },
  {
    icon: "dumbbell",
    title: "Esporte e academia",
    text: "Treine tranquilo, mesmo com a mochila no armário quente.",
  },
] as const;

/** VIVI Cap x alternativas comuns (bolsa térmica, garrafa térmica com gelo). */
export const COMPARISON = {
  columns: ["VIVI Cap", "Bolsa térmica", "Gelo / garrafa térmica"],
  rows: [
    { label: "Protege do calor e do frio extremo", values: [true, false, false] },
    { label: "Não precisa preparar nada antes de sair", values: [true, false, false] },
    { label: "Sem gelo, água ou recarga", values: [true, false, false] },
    { label: "Uso ilimitado, todos os dias", values: [true, true, false] },
    { label: "Dura anos", values: [true, false, false] },
    { label: "Cabe no bolso", values: [true, false, false] },
  ],
} as const;

export const IN_THE_BOX = [
  "1 protetor térmico VIVI Cap",
  "1 tubo transparente para a caneta",
  "1 tampa de acabamento",
  "Embalagem de presente",
] as const;

export const FAQ = [
  {
    q: "Como o VIVI Cap funciona?",
    a: "Ele combina isolamento térmico, um material que absorve o excesso de calor e se regenera sozinho, e uma eletrônica de controle. Por isso funciona por anos sem precisar de pilha para trocar, recarga, gelo ou qualquer preparação.",
  },
  {
    q: "Preciso colocar o VIVI Cap na geladeira?",
    a: "Não. Ele absorve o calor em excesso automaticamente e devolve esse calor ao ambiente quando a temperatura volta ao normal.",
  },
  {
    q: "O que a luz verde indica?",
    a: "Ao apertar o botão, a luz verde confirma que a insulina ficou guardada na temperatura certa. Ela fica acesa só por alguns segundos, para poupar energia e o protetor durar anos.",
  },
  {
    q: "Funciona com a minha caneta?",
    a: "O VIVI Cap serve nas canetas de insulina e pode ser trocado entre canetas diferentes. Se tiver dúvida sobre o seu modelo, fale com a gente antes de comprar.",
  },
  {
    q: "Por que a temperatura é tão importante?",
    a: "Insulina em uso exposta a mais de 30 °C ou a temperaturas abaixo de zero pode estragar, e o dano não aparece a olho nu. Isso pode causar variação da glicemia, aumento da dose necessária e risco de hipoglicemia.",
  },
  {
    q: "Quanto pesa?",
    a: "Apenas 60 gramas. Cabe no bolso, na bolsa ou na mochila.",
  },
  {
    q: "Dá para guardar a caneta com a agulha?",
    a: "A agulha cabe no VIVI Cap, mas o recomendado é retirar a agulha depois de cada aplicação.",
  },
  {
    q: "O produto foi testado?",
    a: "Segundo o fabricante, o VIVI Cap teve o desempenho testado e publicado na revista científica Expert Opinion on Drug Delivery (2017) e é registrado na FDA (Estados Unidos) e com marcação CE (Europa).",
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Pix, com aprovação na hora. Assim que o pagamento é confirmado, seu pedido entra em separação.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: `Enviamos para todo o Brasil. O prazo aparece no checkout de acordo com o frete escolhido, e o frete é grátis em compras acima de R$ ${FREE_SHIPPING_MIN}.`,
  },
] as const;
