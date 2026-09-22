"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Force early load + play (muted autoplay)
    video.load();
    const play = video.play();
    if (play) play.catch(() => {});
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-background sm:min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100svh-5rem)]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-105 object-cover brightness-[1.15] contrast-[1.05]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero-poster.jpg"
        aria-hidden
      >
        <source src="/landingpage-skyemotions.mp4" type="video/mp4" />
      </video>

      {/* Overlay léger — vidéo plus visible */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-background/90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.25)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24">
        <h1 className="animate-hero-in font-display text-[clamp(1.35rem,6.2vw,3.5rem)] font-light uppercase leading-[1.2] tracking-[0.08em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:tracking-[0.12em]">
          Vive una experiencia única
        </h1>

        <Link
          href="/info/requisitos"
          className="animate-hero-in-delay animate-cta-glow font-display mt-8 inline-flex w-full max-w-md items-center justify-center rounded-full bg-accent px-5 py-3.5 text-center text-xs font-bold uppercase leading-snug tracking-[0.04em] text-black transition-transform duration-300 hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98] sm:mt-10 sm:w-auto sm:max-w-none sm:px-8 sm:text-sm sm:tracking-[0.06em] md:text-base"
        >
          Requisitos para realizar un salto
        </Link>
      </div>
    </section>
  );
}
