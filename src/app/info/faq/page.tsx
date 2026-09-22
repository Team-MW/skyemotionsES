import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Preguntas frecuentes sobre el salto en tándem con Sky Emotions.",
};

const FAQ = [
  {
    q: "¿Qué pasa si hace mal tiempo?",
    a: "La seguridad es prioritaria. Si las condiciones no permiten saltar, reprogramamos tu experiencia sin coste adicional según disponibilidad.",
  },
  {
    q: "¿Hay que saber paracaidismo?",
    a: "No. Vas unido a un instructor experimentado. Solo necesitas la teórica breve del día del salto.",
  },
  {
    q: "¿Puedo regalar un salto?",
    a: "Sí. Tenemos cupones de salto tándem, packs con vídeo y tarjetas regalo flexibles.",
  },
  {
    q: "¿Cuánto dura toda la experiencia?",
    a: "Cuenta con varias horas en el centro (teoría, espera de slot, vuelo y salto). El freefall en sí dura cerca de un minuto.",
  },
  {
    q: "¿Estáis autorizados?",
    a: "Sí. Operamos bajo autorizaciones AESA / EASA (ES.SPO.0000 · SPO FR.DEC.0594) y como centro deportivo en Andalucía.",
  },
];

export default function FaqPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="+Info"
        title="Preguntas frecuentes"
        description="Respuestas rápidas. Si no encuentras la tuya, escríbenos."
        cta={{ label: "Contacto", href: "/contacto" }}
      />
      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group border border-white/10 bg-surface open:border-accent/40"
            >
              <summary className="font-display cursor-pointer list-none px-5 py-4 text-sm font-bold uppercase tracking-wide text-white marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-accent transition group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-white/5 px-5 py-4 text-sm font-light leading-relaxed text-white/70 sm:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-white/50">
          Más detalles del salto en{" "}
          <Link href="/info/el-salto" className="text-accent hover:underline">
            El salto
          </Link>
          .
        </p>
      </section>
    </SiteShell>
  );
}
