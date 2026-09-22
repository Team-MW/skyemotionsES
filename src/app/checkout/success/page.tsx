"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import SiteShell from "@/components/SiteShell";

export default function CheckoutSuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <SiteShell>
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Confirmado
        </p>
        <h1 className="font-display mt-4 text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
          ¡Gracias por tu reserva!
        </h1>
        <p className="mt-4 max-w-md text-white/65">
          Hemos recibido tu pago. Te contactaremos para confirmar fecha y
          detalles del salto.
        </p>
        <Link
          href="/"
          className="font-display mt-10 inline-flex bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black hover:bg-accent-hover"
        >
          Volver al inicio
        </Link>
      </section>
    </SiteShell>
  );
}
