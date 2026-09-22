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
};

/** Tarifs officiels Sky Emotions */
export const CATALOG: CatalogProduct[] = [
  {
    id: "salto-tandem",
    name: "Salto tándem",
    shortName: "Tándem",
    description: "Salto tándem",
    features: [
      "Instrucción teórica previa al salto",
      "20 minutos de vuelo en nuestro avión",
      "60 segundos aprox. de caída libre",
      "8 minutos aprox. de vuelo con el paracaídas",
      "Diploma acreditativo de la actividad",
    ],
    priceCents: 19900,
    image: "/images/salto-sonrisa.jpg",
  },
  {
    id: "salto-tandem-video",
    name: "Salto tándem vídeo",
    shortName: "Tándem + vídeo",
    description: "Salto tándem + Video",
    features: [
      "El pack de salto tándem",
      "Vídeo del salto, grabado por tu instructor con GoPro, en calidad FHD",
    ],
    priceCents: 26900,
    image: "/images/salto-freefall.jpg",
    featured: true,
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
