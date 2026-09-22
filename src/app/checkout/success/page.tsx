import type { Metadata } from "next";
import Link from "next/link";
import PostPaymentBookingForm from "@/components/PostPaymentBookingForm";
import SiteShell from "@/components/SiteShell";
import { getPaidCheckoutSession, getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Completar reserva",
  description: "Formulario de datos tras el pago de tu salto Sky Emotions.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

function AccessDenied({ reason }: { reason: string }) {
  return (
    <SiteShell>
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-red-300">
          Acceso restringido
        </p>
        <h1 className="font-display mt-4 text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
          Formulario no disponible
        </h1>
        <p className="mt-4 max-w-md text-white/65">{reason}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/checkout"
            className="font-display inline-flex bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black hover:bg-accent-hover"
          >
            Ir al checkout
          </Link>
          <Link
            href="/contacto"
            className="font-display inline-flex border border-white/25 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:border-accent hover:text-accent"
          >
            Contacto
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  if (!getStripe()) {
    return (
      <AccessDenied reason="El pago aún no está configurado en el servidor (falta STRIPE_SECRET_KEY)." />
    );
  }

  if (!sessionId) {
    return (
      <AccessDenied reason="Este formulario solo es accesible después de un pago exitoso con Stripe." />
    );
  }

  const session = await getPaidCheckoutSession(sessionId);

  if (!session) {
    return (
      <AccessDenied reason="No encontramos un pago válido asociado a este enlace. Si acabas de pagar, espera unos segundos o contacta con nosotros." />
    );
  }

  return (
    <SiteShell>
      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Paso final
          </p>
          <h1 className="font-display mt-3 text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            Datos del salto
          </h1>
          <p className="mt-3 text-white/60">
            Tu pago está confirmado. Completa el formulario para que organicemos
            tu experiencia.
          </p>
        </div>
        <PostPaymentBookingForm session={session} />
      </section>
    </SiteShell>
  );
}
