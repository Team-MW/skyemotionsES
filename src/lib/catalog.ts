export type CatalogProduct = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  features: string[];
  /** Price in EUR cents (Stripe-compatible) */
  priceCents: number;
  image: string;
  featured?: boolean;
  /** Optional Stripe Price ID when configured */
  stripePriceId?: string;
  /** Afifly boutique pack id (GET /shopapi/packs) */
  afiflyPackId?: number;
  /** Afifly option ids to attach (GET /shopapi/options) */
  afiflyOptionIds?: number[];
};

/** Tarifs officiels Sky Emotions */
export const CATALOG: CatalogProduct[] = [
  {
    id: "salto-tandem-video",
    name: "Salto tándem vídeo",
    shortName: "Tándem + vídeo",
    description: "Salto tándem + Video",
    features: [
      "Instrucción teórica previa al salto",
      "20 minutos de vuelo en nuestro avión",
      "60 segundos aprox. de caída libre",
      "8 minutos aprox. de vuelo con el paracaídas",
      "Diploma acreditativo de la actividad",
    ],
    priceCents: 26900,
    image: "/images/salto-freefall.jpg",
    featured: true,
    // Afifly: pack SAUT TANDEM 4000 + VIDEO HANDYCAM
    afiflyPackId: 7,
    afiflyOptionIds: [1],
  },
  {
    id: "salto-tandem-video-fotos",
    name: "Salto tándem vídeo + fotos",
    shortName: "Tándem + vídeo + fotos",
    description: "Salto tándem + Video + Fotos",
    features: [
      "Instrucción teórica previa al salto",
      "Vídeo del salto, grabado por tu instructor con GoPro, en calidad FHD",
      "Fotos de la actividad",
    ],
    priceCents: 34900,
    image: "/images/salto-freefall.jpg",
    // Afifly: pack SAUT TANDEM 4000 + 2 VÍDEO (HANDYCAM + EXTERNO)
    afiflyPackId: 7,
    afiflyOptionIds: [2],
  },
];

export function formatEUR(cents: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getProduct(id: string) {
  return CATALOG.find((p) => p.id === id);
}
