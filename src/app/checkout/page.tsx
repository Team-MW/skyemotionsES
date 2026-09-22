import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";
import CheckoutClient from "@/components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Paga tu reserva Sky Emotions de forma segura con Stripe.",
};

export default function CheckoutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pago"
        title="Checkout"
        description="Revisa tu carrito y paga cuando quieras. Puedes guardar y volver más tarde."
      />
      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <CheckoutClient />
      </section>
    </SiteShell>
  );
}
