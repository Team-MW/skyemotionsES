"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatEUR } from "@/lib/catalog";
import type { PaidSessionView } from "@/lib/booking-types";

/** Official embed: https://form.jotform.com/jsform/262644955020355 */
const JOTFORM_ID = "262644955020355";
const JOTFORM_SRC = `https://form.jotform.com/${JOTFORM_ID}`;

type Props = {
  session: PaidSessionView;
};

function isJotformSubmission(data: unknown): boolean {
  if (typeof data === "string") {
    return (
      data.includes("submission-completed") ||
      data.includes("formSubmissionComplete") ||
      data.includes('"action":"submission-completed"')
    );
  }
  if (!data || typeof data !== "object") return false;
  const msg = data as Record<string, unknown>;
  const action = String(msg.action ?? msg.type ?? msg.event ?? "");
  return (
    action === "submission-completed" ||
    action === "formSubmissionComplete" ||
    action === "JFFormSubmitted"
  );
}

export default function PostPaymentBookingForm({ session }: Props) {
  const { clear } = useCart();
  const [sent, setSent] = useState(session.bookingComplete);

  useEffect(() => {
    clear();
  }, [clear]);

  useEffect(() => {
    if (sent) return;

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Debes completar el formulario obligatorio antes de salir.";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [sent]);

  useEffect(() => {
    if (sent) return;

    const onMessage = (event: MessageEvent) => {
      const origin = event.origin || "";
      if (
        origin &&
        !origin.includes("jotform.com") &&
        !origin.includes("jotform.me")
      ) {
        return;
      }
      if (isJotformSubmission(event.data)) {
        setSent(true);
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [sent]);

  if (sent) {
    return (
      <div className="mx-auto max-w-xl border border-white/10 bg-surface px-6 py-14 text-center sm:px-10">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Completado
        </p>
        <h2 className="font-display mt-4 text-3xl font-bold uppercase tracking-wide text-white">
          ¡Datos recibidos!
        </h2>
        <p className="mt-4 text-white/65">
          Gracias. Hemos recibido tu formulario. Nuestro equipo te contactará
          para confirmar la fecha del salto.
        </p>
        <Link
          href="/"
          className="font-display mt-10 inline-flex bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black hover:bg-accent-hover"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const amountLabel =
    session.amountTotal != null
      ? formatEUR(session.amountTotal).replace(/\s/g, "")
      : null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 border border-accent/40 bg-accent/10 px-5 py-5 text-center sm:px-6">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Pago confirmado · formulario obligatorio
        </p>
        <p className="mt-2 text-sm text-white/85">
          {session.productSummary}
          {amountLabel ? ` · ${amountLabel}` : null}
        </p>
        <p className="mt-3 text-sm font-medium text-white">
          Debes completar este formulario para organizar tu salto. No cierres
          esta página hasta enviarlo.
        </p>
      </div>

      <iframe
        id={`JotFormIFrame-${JOTFORM_ID}`}
        title="Formulario obligatorio de reserva"
        src={JOTFORM_SRC}
        allow="geolocation; microphone; camera; fullscreen"
        className="block w-full border-0 bg-white"
        style={{ minHeight: 720, height: "80vh" }}
      />
    </div>
  );
}
