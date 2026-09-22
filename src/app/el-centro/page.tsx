import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "El centro",
  description:
    "Conoce el centro de paracaidismo Sky Emotions en Andalucía. Autorizado AESA y EASA. ES.SPO.0000 · SPO FR.DEC.0594.",
};

const HIGHLIGHTS = [
  {
    title: "Seguridad primero",
    text: "Instructores experimentados, material revisado y procedimientos bajo normativa europea.",
  },
  {
    title: "Ubicación privilegiada",
    text: "Vistas al Atlántico, costa de Marruecos, Gibraltar y sierras andaluzas desde 4200 m.",
  },
  {
    title: "Ambiente cercano",
    text: "Equipo humano que te acompaña desde la llegada hasta el aterrizaje con una sonrisa.",
  },
];

export default function ElCentroPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Sky Emotions"
        title="El centro"
        description="Centro deportivo de paracaidismo con todas las autorizaciones exigidas. Un lugar pensado para que vivas el cielo con total confianza."
        cta={{ label: "Reservar visita / salto", href: "/reserva" }}
      />

      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
            <Image
              src="/images/vuelo-avion.jpg"
              alt="Avión del centro Sky Emotions"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-[0.1em] text-accent">
              Quiénes somos
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-white/70">
              El centro de paracaidismo{" "}
              <strong className="font-semibold text-white">SKY EMOTIONS</strong>{" "}
              cuenta con todos los permisos y licencias de la Agencia Estatal de
              Seguridad Aérea y la European Aviation Safety Agency. Estamos
              registrados en las entidades deportivas de Andalucía como Centro
              Deportivo.
            </p>
            <p className="mt-4 text-base font-light leading-relaxed text-white/70">
              Aquí no solo saltas: vives una experiencia completa, segura y
              emocionante, con un equipo que conoce cada detalle del freefall.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {["ES.SPO.0000", "SPO FR.DEC.0594"].map((code) => (
                <div
                  key={code}
                  className="border border-accent/40 bg-black/40 px-5 py-3"
                >
                  <p className="font-display text-sm font-bold tracking-[0.12em] text-accent">
                    {code}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-surface px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <article key={h.title} className="border border-white/10 p-6">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                {h.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
                {h.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-[1100px] text-center">
          <Link
            href="/contacto"
            className="font-display inline-flex border border-accent px-7 py-3 text-sm font-bold uppercase tracking-wide text-accent transition hover:bg-accent hover:text-black"
          >
            Cómo llegar / contacto
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
