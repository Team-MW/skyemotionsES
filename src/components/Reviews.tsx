"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Review = {
  name: string;
  date: string;
  text: string;
  initials: string;
  color: string;
};

const REVIEWS: Review[] = [
  {
    name: "Enrique Cañizar",
    date: "27 Junio 2023",
    initials: "E",
    color: "#5b8def",
    text: "Gran equipo de profesionales. Desde la reserva hasta el salto todo perfecto. Una experiencia que no olvidaré nunca. ¡Volveré!",
  },
  {
    name: "Laura Méndez",
    date: "14 Mayo 2024",
    initials: "L",
    color: "#e87a5d",
    text: "Increíble, la espera mereció la pena. Los instructores transmiten mucha seguridad y el freefall es indescriptible. 100% recomendable.",
  },
  {
    name: "Marc Vidal",
    date: "3 Marzo 2024",
    initials: "M",
    color: "#4caf82",
    text: "Organizaron todo de forma impecable. Ambiente familiar, trato cercano y unas vistas brutales. Sky Emotions es top.",
  },
  {
    name: "Sofía Ruiz",
    date: "19 Enero 2024",
    initials: "S",
    color: "#c77dff",
    text: "Mi primer salto y no podía haber elegido mejor centro. Explicaciones claras, material en perfecto estado y mucha emoción.",
  },
  {
    name: "Diego Navarro",
    date: "8 Noviembre 2023",
    initials: "D",
    color: "#f0b429",
    text: "Regalé un cupón y fue un éxito total. Atención al cliente excelente y la experiencia superó todas las expectativas.",
  },
];

function Stars({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${cls} fill-[#fbbc04]`}
          aria-hidden
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" aria-hidden>
      <circle cx="10" cy="10" r="10" fill="#1a73e8" />
      <path
        d="M8.2 13.4 5.4 10.6l1.1-1.1 1.7 1.7 4.3-4.3 1.1 1.1-5.4 5.4z"
        fill="#fff"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      data-review-card
      className="flex w-[min(85vw,300px)] shrink-0 snap-start flex-col rounded-2xl bg-[#2a2a2a] p-5 sm:w-[300px]"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: review.color }}
            aria-hidden
          >
            {review.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {review.name}
            </p>
            <p className="text-xs text-muted">{review.date}</p>
          </div>
        </div>
        <GoogleMark />
      </header>

      <div className="mt-3 flex items-center gap-1.5">
        <Stars size="sm" />
        <VerifiedBadge />
      </div>

      <p
        className={`mt-3 flex-1 text-sm leading-relaxed text-white/85 ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {review.text}
      </p>
      <button
        type="button"
        className="mt-3 self-start text-xs text-muted transition-colors hover:text-accent"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Leer menos" : "Leer más"}
      </button>
    </article>
  );
}

export default function Reviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const amount = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      id="opiniones"
      className="scroll-mt-24 border-t border-white/5 bg-background px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-display text-center text-2xl font-bold tracking-tight text-accent sm:text-3xl md:text-4xl">
          ¿Qué opinan de nosotros?
        </h2>

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-start lg:gap-10">
          <aside className="mx-auto w-full max-w-xs shrink-0 text-center lg:mx-0 lg:pt-2 lg:text-left">
            <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-lg border border-white/10 bg-black sm:h-24 sm:w-24 lg:mx-0">
              <Image
                src="/logo.png"
                alt="Sky Emotions"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-display text-lg font-semibold tracking-wide text-white">
              Skydive Emotions
            </p>
            <div className="mt-2 flex items-center justify-center gap-2 lg:justify-start">
              <Stars />
            </div>
            <p className="mt-2 text-sm text-muted">31 reseñas Google</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display mt-5 inline-flex min-h-11 items-center justify-center border border-white/70 px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-accent hover:bg-accent hover:text-black"
            >
              Escribe una reseña
            </a>
          </aside>

          <div className="relative min-w-0 flex-1">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              className="absolute -left-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-sm transition hover:border-accent hover:text-accent md:flex lg:-left-3"
              aria-label="Reseña anterior"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 6 9 12l6 6" />
              </svg>
            </button>

            <div
              ref={scrollerRef}
              className="reviews-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pl-1 pr-1 md:pl-8"
            >
              {REVIEWS.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollByCard(1)}
              className="absolute -right-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-sm transition hover:border-accent hover:text-accent md:flex lg:-right-3"
              aria-label="Siguiente reseña"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
