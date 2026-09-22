import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Precios de salto en tándem, packs con vídeo y cupones regalo en Sky Emotions.",
};

const PLANS = [
  {
    name: "Salto tándem",
    price: "Consultar",
    note: "Experiencia completa",
    features: [
      "Teórica + equipo",
      "Vuelo a 4200 m",
      "Caída libre ~60 s",
      "Instructor certificado",
    ],
    href: "/reserva",
    featured: false,
  },
  {
    name: "Pack experiencia",
    price: "Consultar",
    note: "El más popular",
    features: [
      "Todo el salto tándem",
      "Vídeo profesional",
      "Fotos en freefall",
      "Entrega digital",
    ],
    href: "/cupones-regalo/pack-experiencia",
    featured: true,
  },
  {
    name: "Cupón / tarjeta",
    price: "Flexible",
    note: "Para regalar",
    features: [
      "Sin fecha fija",
      "Ideal como regalo",
      "Varias modalidades",
      "Asesoramiento incluido",
    ],
    href: "/cupones-regalo",
    featured: false,
  },
];

export default function PreciosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Tarifas"
        title="Precios"
        description="Transparencia y opciones para cada tipo de experiencia. Contáctanos para la tarifa actualizada del día."
        cta={{ label: "Reservar", href: "/reserva" }}
      />

      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col border p-7 sm:p-8 ${
                plan.featured
                  ? "border-accent bg-accent text-black"
                  : "border-white/10 bg-surface text-white"
              }`}
            >
              <p
                className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${
                  plan.featured ? "text-black/60" : "text-accent"
                }`}
              >
                {plan.note}
              </p>
              <h2 className="font-display mt-3 text-2xl font-bold uppercase tracking-wide">
                {plan.name}
              </h2>
              <p className="font-display mt-6 text-3xl font-bold tracking-wide">
                {plan.price}
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`text-sm ${
                      plan.featured ? "text-black/75" : "text-white/65"
                    }`}
                  >
                    · {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`font-display mt-8 inline-flex justify-center py-3 text-sm font-bold uppercase tracking-wide transition ${
                  plan.featured
                    ? "bg-black text-accent hover:bg-black/85"
                    : "bg-accent text-black hover:bg-accent-hover"
                }`}
              >
                Elegir
              </Link>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/50">
          Los precios pueden variar según temporada, opciones extras y
          promociones. Te confirmamos el importe exacto al reservar.
        </p>
      </section>
    </SiteShell>
  );
}
