import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Sky Emotions para reservas, cupones regalo o información sobre el salto en tándem.",
};

export default function ContactoPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Hablemos"
        title="Contacto"
        description="¿Dudas, reservas o un regalo? Escríbenos. Respondemos lo antes posible."
      />

      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1.1fr]">
          <aside className="space-y-8">
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Email
              </h2>
              <a
                href="mailto:info@skyemotions.es"
                className="mt-2 block text-lg text-white transition hover:text-accent"
              >
                info@skyemotions.es
              </a>
            </div>
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
                WhatsApp
              </h2>
              <p className="mt-2 text-white/70">
                Usa el botón verde flotante o{" "}
                <Link href="/reserva" className="text-accent hover:underline">
                  solicita reserva
                </Link>
                .
              </p>
            </div>
            <div>
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Centro
              </h2>
              <p className="mt-2 text-white/70">
                Andalucía, España · Centro deportivo autorizado AESA / EASA
              </p>
              <Link
                href="/el-centro"
                className="mt-2 inline-block text-sm text-accent hover:underline"
              >
                Más sobre el centro →
              </Link>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>
    </SiteShell>
  );
}
