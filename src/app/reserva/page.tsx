import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Reserva tu salto",
  description:
    "Reserva tu salto en tándem con Sky Emotions. Elige fecha, horario y vive la emoción de la caída libre a 4200 metros.",
};

const STEPS = [
  {
    n: "01",
    title: "Elige tu experiencia",
    text: "Salto tándem, pack con vídeo o cupón regalo. Te ayudamos a escoger lo que mejor se adapta a ti.",
  },
  {
    n: "02",
    title: "Confirma fecha y hora",
    text: "Seleccionamos juntos el día ideal según meteorología y disponibilidad de avión.",
  },
  {
    n: "03",
    title: "Prepárate y salta",
    text: "Teórica breve, equipo, despegue y… ¡caída libre! Nuestro equipo te acompaña en cada paso.",
  },
];

export default function ReservaPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Reserva"
        title="Reserva tu salto en tándem"
        description="Da el paso. En pocos clics — o un mensaje por WhatsApp — empezamos a preparar la emoción de tu vida."
        cta={{ label: "Ver precios", href: "/precios" }}
      />

      <section className="border-b border-white/5 bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <article
              key={step.n}
              className="border border-white/10 bg-surface/60 p-6 sm:p-8"
            >
              <p className="font-display text-sm font-bold tracking-[0.2em] text-accent">
                {step.n}
              </p>
              <h2 className="font-display mt-3 text-xl font-bold uppercase tracking-wide text-white">
                {step.title}
              </h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/65 sm:text-base">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl border border-accent/25 bg-background p-6 sm:p-10">
          <h2 className="font-display text-center text-2xl font-bold uppercase tracking-[0.12em] text-accent">
            Solicitar reserva
          </h2>
          <p className="mt-3 text-center text-sm text-white/60">
            Déjanos tus datos y te confirmamos disponibilidad.
          </p>
          <form className="mt-8 space-y-4" action="/contacto" method="get">
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Nombre
              </span>
              <input
                name="nombre"
                required
                className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                placeholder="Tu nombre"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Email
              </span>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                placeholder="tu@email.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Teléfono / WhatsApp
              </span>
              <input
                type="tel"
                name="telefono"
                className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                placeholder="+34 600 000 000"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Fecha preferida
              </span>
              <input
                type="date"
                name="fecha"
                className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
                Mensaje
              </span>
              <textarea
                name="mensaje"
                rows={4}
                className="w-full resize-y border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent"
                placeholder="Número de personas, preferencias..."
              />
            </label>
            <button
              type="submit"
              className="font-display w-full bg-accent py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-accent-hover"
            >
              Enviar solicitud
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-white/50">
            ¿Prefieres hablar ahora?{" "}
            <Link href="/contacto" className="text-accent hover:underline">
              Ir a contacto
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
