"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-white/10 bg-surface p-6 py-14 text-center sm:p-8">
        <p className="font-display text-2xl font-bold uppercase tracking-wide text-accent">
          ¡Mensaje listo!
        </p>
        <p className="mt-3 text-white/70">
          Gracias. Te responderemos pronto a tu email.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="font-display mt-8 text-sm uppercase tracking-wide text-white underline"
        >
          Enviar otro
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 border border-white/10 bg-surface p-6 sm:p-8"
    >
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
          Nombre
        </span>
        <input
          required
          name="nombre"
          className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
          Asunto
        </span>
        <select
          name="asunto"
          className="w-full border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
          defaultValue="reserva"
        >
          <option value="reserva">Reserva</option>
          <option value="cupon">Cupón regalo</option>
          <option value="info">Información general</option>
          <option value="otro">Otro</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
          Mensaje
        </span>
        <textarea
          required
          name="mensaje"
          rows={5}
          className="w-full resize-y border border-white/15 bg-black/40 px-4 py-3 text-white outline-none focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="font-display w-full bg-accent py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-black hover:bg-accent-hover"
      >
        Enviar mensaje
      </button>
      <p className="text-center text-xs text-white/40">
        O ve a{" "}
        <Link href="/reserva" className="text-accent hover:underline">
          Reserva
        </Link>
      </p>
    </form>
  );
}
