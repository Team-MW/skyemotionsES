"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatEUR } from "@/lib/catalog";
import type { PaidSessionView } from "@/lib/booking-types";

type Props = {
  session: PaidSessionView;
};

export default function PostPaymentBookingForm({ session }: Props) {
  const { clear } = useCart();
  const [sent, setSent] = useState(session.bookingComplete);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    clear();
  }, [clear]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      sessionId: session.id,
      fullName: String(fd.get("fullName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      birthDate: String(fd.get("birthDate") || ""),
      weightKg: String(fd.get("weightKg") || ""),
      preferredDate: String(fd.get("preferredDate") || ""),
      alternateDate: String(fd.get("alternateDate") || ""),
      emergencyContact: String(fd.get("emergencyContact") || ""),
      notes: String(fd.get("notes") || ""),
      acceptTerms: fd.get("acceptTerms") === "on",
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setError(data.error || "No se pudo enviar el formulario.");
        return;
      }

      setSent(true);
    } catch {
      setError("Error de red. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

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
          Gracias. Hemos guardado tu información. Nuestro equipo te contactará
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
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 border border-accent/30 bg-accent/5 px-5 py-4 text-center sm:px-6">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Pago confirmado
        </p>
        <p className="mt-2 text-sm text-white/80">
          {session.productSummary}
          {amountLabel ? ` · ${amountLabel}` : null}
        </p>
        <p className="mt-1 text-xs text-white/45">
          Completa tus datos para organizar el salto. Este formulario solo está
          disponible tras el pago.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 border border-white/10 bg-surface p-6 sm:p-8"
      >
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
            Nombre completo *
          </span>
          <input
            required
            name="fullName"
            defaultValue={session.name || ""}
            className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Email *
            </span>
            <input
              required
              type="email"
              name="email"
              defaultValue={session.email || ""}
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Teléfono *
            </span>
            <input
              required
              type="tel"
              name="phone"
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
              placeholder="+34 …"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Fecha de nacimiento *
            </span>
            <input
              required
              type="date"
              name="birthDate"
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Peso (kg) *
            </span>
            <input
              required
              type="number"
              name="weightKg"
              min={40}
              max={120}
              step={1}
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
              placeholder="ej. 72"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Fecha preferida *
            </span>
            <input
              required
              type="date"
              name="preferredDate"
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Fecha alternativa
            </span>
            <input
              type="date"
              name="alternateDate"
              className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
            Contacto de emergencia
          </span>
          <input
            name="emergencyContact"
            className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
            placeholder="Nombre y teléfono"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
            Notas / condiciones médicas
          </span>
          <textarea
            name="notes"
            rows={4}
            className="w-full resize-y border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
            placeholder="Opcional"
          />
        </label>

        <label className="flex items-start gap-3 text-left text-sm text-white/70">
          <input
            required
            type="checkbox"
            name="acceptTerms"
            className="mt-1 h-4 w-4 accent-[var(--accent,#e2ff00)]"
          />
          <span>
            Confirmo que cumplo los{" "}
            <Link href="/info/requisitos" className="text-accent hover:underline">
              requisitos
            </Link>{" "}
            y que la información es correcta. *
          </span>
        </label>

        {error && (
          <p className="border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="font-display w-full bg-accent py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-accent-hover disabled:opacity-60"
        >
          {loading ? "Enviando…" : "Enviar datos de reserva"}
        </button>
      </form>
    </div>
  );
}
