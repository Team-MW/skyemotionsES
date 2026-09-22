import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductCards from "@/components/ProductCards";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Reserva tu salto",
  description:
    "Elige tu experiencia Sky Emotions, añádela al carrito y reserva ahora o más tarde. Pago seguro con Stripe.",
};

const STEPS = [
  {
    n: "01",
    title: "Elige y añade al carrito",
    text: "Varias experiencias: tándem, pack vídeo, cupón o tarjeta regalo.",
  },
  {
    n: "02",
    title: "Guarda y vuelve cuando quieras",
    text: "Tu carrito se conserva en el navegador. Reserva más tarde sin perder nada.",
  },
  {
    n: "03",
    title: "Paga con Stripe",
    text: "Checkout seguro. Confirmamos fecha y meteorología contigo después.",
  },
];

export default function ReservaPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Reserva"
        title="Elige tu experiencia"
        description="Añade una o varias opciones al carrito. Puedes pagar ahora o guardar y reservar más tarde."
        cta={{ label: "Ver carrito / pagar", href: "/checkout" }}
      />

      <section className="border-b border-white/5 bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display mb-8 text-center text-sm font-bold uppercase tracking-[0.25em] text-accent">
            Experiencias
          </h2>
          <ProductCards />
        </div>
      </section>

      <section className="border-b border-white/5 bg-surface px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-[1100px] gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.n} className="border border-white/10 p-6">
              <p className="font-display text-sm font-bold tracking-[0.2em] text-accent">
                {step.n}
              </p>
              <h3 className="font-display mt-3 text-lg font-bold uppercase tracking-wide text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/65">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-background px-4 py-12 text-center sm:py-16">
        <p className="text-white/60">
          ¿Dudas antes de comprar?{" "}
          <Link href="/contacto" className="text-accent hover:underline">
            Contáctanos
          </Link>{" "}
          o usa WhatsApp.
        </p>
      </section>
    </SiteShell>
  );
}
