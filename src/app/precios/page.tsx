import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductCards from "@/components/ProductCards";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Precios Sky Emotions: salto tándem, pack vídeo, cupones y tarjetas. Añade al carrito y paga con Stripe.",
};

export default function PreciosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Tarifas"
        title="Precios"
        description="Elige tu opción, añádela al carrito y reserva cuando quieras. Pago seguro con Stripe."
        cta={{ label: "Ir a reservar", href: "/reserva" }}
      />

      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1200px]">
          <ProductCards />
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-white/50">
            Precios orientativos en euros. Confirmamos el importe final en el
            checkout.{" "}
            <Link href="/checkout" className="text-accent hover:underline">
              Ver carrito
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
