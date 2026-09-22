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

export const CATALOG: CatalogProduct[] = [
  {
    id: "salto-tandem",
    name: "Salto tándem",
    shortName: "Tándem",
    description:
      "La experiencia esencial: teórica, vuelo a 4200 m y caída libre con instructor certificado.",
    features: [
      "Teórica + equipo",
      "Vuelo a 4200 m",
      "Caída libre ~60 s",
      "Instructor certificado",
    ],
    priceCents: 29000,
    image: "/images/salto-sonrisa.jpg",
  },
  {
    id: "pack-experiencia",
    name: "Pack experiencia",
    shortName: "Pack vídeo",
    description:
      "Salto tándem + vídeo y fotos profesionales para revivir cada segundo.",
    features: [
      "Todo el salto tándem",
      "Vídeo profesional",
      "Fotos en freefall",
      "Entrega digital",
    ],
    priceCents: 37000,
    image: "/images/salto-freefall.jpg",
    featured: true,
  },
  {
    id: "cupon-tandem",
    name: "Cupón regalo tándem",
    shortName: "Cupón",
    description:
      "Regala un salto sin fecha fija. Canjeable según disponibilidad y meteorología.",
    features: [
      "Sin fecha fija",
      "Ideal como regalo",
      "Válido temporada",
      "Asesoramiento incluido",
    ],
    priceCents: 29000,
    image: "/images/vuelo-avion.jpg",
  },
  {
    id: "tarjeta-regalo-150",
    name: "Tarjeta regalo 150 €",
    shortName: "Tarjeta 150€",
    description:
      "Importe flexible para que elijan la experiencia que prefieran.",
    features: [
      "Importe 150 €",
      "Canjeable en el centro",
      "Diseño digital",
      "Perfecta para regalar",
    ],
    priceCents: 15000,
    image: "/images/vuelo-avion.jpg",
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
