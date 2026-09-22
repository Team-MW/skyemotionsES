import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductCards from "@/components/ProductCards";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Cupones regalo",
  description:
    "Regala un salto Sky Emotions: tándem + vídeo 269€ o vídeo + fotos 349€.",
};

export default function CuponesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Regalos"
        title="Cupones regalo"
        description="El mismo pack, para regalar. Añade al carrito y reserva cuando quieras."
        cta={{ label: "Ver carrito", href: "/checkout" }}
      />
      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <ProductCards />
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-white/50">
          ¿Prefieres hablar con nosotros?{" "}
          <Link href="/contacto" className="text-accent hover:underline">
            Contacto
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}
