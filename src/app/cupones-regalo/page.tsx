import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Cupones regalo",
  description:
    "Regala un salto en tándem con Sky Emotions. Cupones salto tándem, packs experiencia y tarjetas regalo.",
};

const PRODUCTS = [
  {
    href: "/cupones-regalo/salto-tandem",
    title: "Salto tándem",
    text: "La experiencia esencial: teórica, vuelo a 4200 m y caída libre con instructor.",
    image: "/images/salto-sonrisa.jpg",
  },
  {
    href: "/cupones-regalo/pack-experiencia",
    title: "Pack experiencia",
    text: "Salto + vídeo y fotos para revivir cada segundo del freefall.",
    image: "/images/salto-freefall.jpg",
  },
  {
    href: "/cupones-regalo/tarjeta-regalo",
    title: "Tarjeta regalo",
    text: "Flexibilidad total: elige importe y deja que elijan su momento.",
    image: "/images/vuelo-avion.jpg",
  },
];

export default function CuponesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Regalos"
        title="Cupones regalo"
        description="El regalo que no se olvida. Válido para saltar cuando la meteorología y la agenda lo permitan."
        cta={{ label: "Reservar ahora", href: "/reserva" }}
      />

      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group overflow-hidden border border-white/10 bg-surface transition hover:border-accent/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-accent">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/65">
                  {p.text}
                </p>
                <span className="font-display mt-4 inline-block text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  Ver detalle →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
