import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Requisitos para saltar",
  description:
    "Requisitos para realizar un salto en tándem con Sky Emotions: edad, peso, salud y equipamiento.",
};

const ITEMS = [
  "Edad mínima: 16 años (con autorización parental hasta 18)",
  "Peso máximo según equipo y normativa del centro",
  "Buena salud general — consulta médica si tienes dudas",
  "Ropa cómoda y calzado cerrado el día del salto",
  "No consumir alcohol ni sustancias antes del salto",
  "Seguir en todo momento las indicaciones del instructor",
];

export default function RequisitosInfoPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="+Info"
        title="Requisitos para realizar un salto"
        description="Condiciones básicas para vivir la experiencia con seguridad."
        cta={{ label: "Reservar", href: "/reserva" }}
      />
      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <ul className="mx-auto max-w-3xl space-y-5">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="border-l-2 border-accent/80 pl-5 text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-white/50">
          ¿Tienes una condición médica concreta?{" "}
          <Link href="/contacto" className="text-accent hover:underline">
            Consúltanos
          </Link>{" "}
          antes de reservar.
        </p>
      </section>
    </SiteShell>
  );
}
