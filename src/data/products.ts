export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  spiritualDescription: string;
  devotion: string;
  price: number;
  originalPrice?: number;
  images: string[];
  stock: number;
  featured: boolean;
  bestseller: boolean;
  materials: string[];
  size: string;
}

export const devotions = [
  { id: "nossa-senhora", name: "Nossa Senhora", count: 5 },
  { id: "sao-bento", name: "São Bento", count: 3 },
  { id: "sagrado-coracao", name: "Sagrado Coração", count: 2 },
  { id: "divina-misericordia", name: "Divina Misericórdia", count: 2 },
  { id: "terco-homens", name: "Terço dos Homens", count: 2 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Terço de São Bento",
    slug: "terco-sao-bento",
    description: "Terço artesanal com medalha de São Bento banhada a ouro. Contas em cristal negro de alta qualidade.",
    spiritualDescription: "São Bento é conhecido como o patrono contra o mal e as tentações. Este terço carrega a poderosa Medalha de São Bento, símbolo de proteção espiritual reconhecido pela Igreja. A oração com este terço invoca a intercessão do santo para afastar o mal e fortalecer a fé.",
    devotion: "sao-bento",
    price: 89.90,
    originalPrice: 119.90,
    images: ["/placeholder.svg"],
    stock: 15,
    featured: true,
    bestseller: true,
    materials: ["Cristal negro", "Metal banhado a ouro", "Fio de náilon reforçado"],
    size: "Comprimento total: 45cm",
  },
  {
    id: "2",
    name: "Terço de Nossa Senhora Aparecida",
    slug: "terco-nossa-senhora-aparecida",
    description: "Terço em homenagem à Padroeira do Brasil. Contas em azul celeste com detalhes dourados.",
    spiritualDescription: "Nossa Senhora Aparecida é a Mãe do povo brasileiro. Rezar o terço em sua honra é um ato de devoção que nos aproxima de Maria e, através dela, de Jesus Cristo. Este terço foi abençoado e é ideal para a oração diária do Rosário.",
    devotion: "nossa-senhora",
    price: 79.90,
    images: ["/placeholder.svg"],
    stock: 20,
    featured: true,
    bestseller: true,
    materials: ["Cristal azul celeste", "Metal dourado", "Fio encerado"],
    size: "Comprimento total: 42cm",
  },
  {
    id: "3",
    name: "Terço dos Homens",
    slug: "terco-dos-homens",
    description: "Terço robusto e masculino, com contas em madeira de lei e crucifixo em metal envelhecido.",
    spiritualDescription: "O movimento do Terço dos Homens nasceu para fortalecer a fé masculina através da oração mariana. Este terço foi desenhado especialmente para os homens que desejam viver sua fé com coragem e devoção. Ideal para grupos de oração masculinos.",
    devotion: "terco-homens",
    price: 69.90,
    images: ["/placeholder.svg"],
    stock: 25,
    featured: true,
    bestseller: false,
    materials: ["Madeira de lei escura", "Metal envelhecido", "Cordão de couro"],
    size: "Comprimento total: 50cm",
  },
  {
    id: "4",
    name: "Terço da Divina Misericórdia",
    slug: "terco-divina-misericordia",
    description: "Terço especial para a oração da Chapelinha da Divina Misericórdia. Contas em vermelho e branco.",
    spiritualDescription: "A Divina Misericórdia é a devoção revelada a Santa Faustina. Este terço permite rezar a Chapelinha às 15h, hora da misericórdia, invocando o amor infinito de Deus. As cores representam o sangue e a água que jorram do coração de Jesus.",
    devotion: "divina-misericordia",
    price: 59.90,
    images: ["/placeholder.svg"],
    stock: 18,
    featured: false,
    bestseller: false,
    materials: ["Cristal vermelho e branco", "Metal prateado", "Fio de náilon"],
    size: "Comprimento total: 40cm",
  },
  {
    id: "5",
    name: "Terço de Nossa Senhora de Fátima",
    slug: "terco-nossa-senhora-fatima",
    description: "Terço comemorativo das aparições de Fátima. Contas em branco pérola com detalhes em ouro.",
    spiritualDescription: "Nossa Senhora de Fátima apareceu aos três pastorinhos pedindo a oração do Rosário pela paz no mundo. Este terço honra essa mensagem e convida à oração diária pelos pecadores e pela conversão das nações.",
    devotion: "nossa-senhora",
    price: 99.90,
    originalPrice: 129.90,
    images: ["/placeholder.svg"],
    stock: 12,
    featured: false,
    bestseller: true,
    materials: ["Pérolas sintéticas", "Metal banhado a ouro 18k", "Fio de seda"],
    size: "Comprimento total: 44cm",
  },
  {
    id: "6",
    name: "Terço do Sagrado Coração de Jesus",
    slug: "terco-sagrado-coracao",
    description: "Terço dedicado ao Sagrado Coração de Jesus. Contas em cristal vermelho rubi.",
    spiritualDescription: "O Sagrado Coração de Jesus representa o amor infinito de Cristo pela humanidade. Este terço é ideal para as primeiras sextas-feiras do mês e para a consagração ao Coração de Jesus. As contas vermelhas simbolizam o amor ardente de Deus.",
    devotion: "sagrado-coracao",
    price: 84.90,
    images: ["/placeholder.svg"],
    stock: 14,
    featured: false,
    bestseller: false,
    materials: ["Cristal vermelho rubi", "Metal dourado", "Fio encerado"],
    size: "Comprimento total: 43cm",
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((p) => p.featured);
};

export const getBestsellers = (): Product[] => {
  return products.filter((p) => p.bestseller);
};

export const getProductsByDevotion = (devotionId: string): Product[] => {
  return products.filter((p) => p.devotion === devotionId);
};
