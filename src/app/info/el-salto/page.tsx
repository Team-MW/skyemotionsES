import type { Metadata } from "next";
import Link from "next/link";
import TandemExperience from "@/components/TandemExperience";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "El salto en tándem",
  description:
    "Cómo es un salto en tándem con Sky Emotions: teórica, vuelo a 4200 m y caída libre.",
};

export default function ElSaltoPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="+Info"
        title="El salto en tándem"
        description="Del briefing al aterrizaje: te contamos cada fase de la experiencia."
        cta={{ label: "Ver precios", href: "/precios" }}
      />
      <TandemExperience />
      <div className="border-t border-white/5 bg-nav px-4 py-10 text-center">
        <Link
          href="/reserva"
          className="font-display inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black hover:bg-accent-hover"
        >
          Quiero saltar
        </Link>
      </div>
    </SiteShell>
  );
}
