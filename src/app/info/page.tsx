import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "+Info",
  description:
    "Información útil sobre el salto en tándem: requisitos, el salto, FAQ y más con Sky Emotions.",
};

const LINKS = [
  {
    href: "/info/requisitos",
    title: "Requisitos",
    text: "Edad, peso, salud y qué llevar el día del salto.",
  },
  {
    href: "/info/el-salto",
    title: "El salto",
    text: "Teórica, vuelo y freefall: en qué consiste la experiencia.",
  },
  {
    href: "/info/faq",
    title: "FAQ",
    text: "Respuestas rápidas a las dudas más frecuentes.",
  },
  {
    href: "/#opiniones",
    title: "Opiniones",
    text: "Lo que dicen quienes ya saltaron con nosotros.",
  },
];

export default function InfoPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="+Info"
        title="Todo lo que necesitas saber"
        description="Guías claras antes de saltar. Elige un tema o pregunta directamente a nuestro equipo."
        cta={{ label: "Contactar", href: "/contacto" }}
      />
      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-5 sm:grid-cols-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group border border-white/10 bg-surface p-7 transition hover:border-accent/60"
            >
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-accent">
                {l.title}
              </h2>
              <p className="mt-2 text-sm font-light text-white/65">{l.text}</p>
              <span className="font-display mt-5 inline-block text-xs font-bold uppercase tracking-[0.14em] text-accent">
                Abrir →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
