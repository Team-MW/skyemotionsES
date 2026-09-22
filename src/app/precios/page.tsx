import type { Metadata } from "next";
import Link from "next/link";
import ExperienceImageBlocks from "@/components/ExperienceImageBlocks";
import PageHero from "@/components/PageHero";
import ProductCards from "@/components/ProductCards";
import ServicePricingCards from "@/components/ServicePricingCards";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Tarifas Sky Emotions: tándem + vídeo desde 269€, VIP helicóptero, IMAX 360º, vídeo 4K, ticket titulados y rigger.",
};

export default function PreciosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Tarifas"
        title="Precios"
        description="Elige tu pack, añádelo al carrito y reserva ahora o más tarde. Pago seguro con Stripe."
      />

      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <ProductCards />
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/50">
          Precios en euros. Puedes guardar en el carrito y pagar cuando quieras.{" "}
          <Link href="/checkout" className="text-accent hover:underline">
            Ver carrito
          </Link>
        </p>
      </section>

      <section className="bg-background px-4 pb-14 sm:px-6 sm:pb-16">
        <ExperienceImageBlocks />
      </section>

      <section className="bg-background px-4 pb-14 sm:px-6 sm:pb-20">
        <ServicePricingCards />
      </section>
    </SiteShell>
  );
}
