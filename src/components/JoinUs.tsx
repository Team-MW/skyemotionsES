const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    labelColor: "#E1306C",
    icon: (
      <span
        className="social-icon social-icon--instagram flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.35rem] sm:h-24 sm:w-24 sm:rounded-[1.75rem]"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-white sm:h-10 sm:w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </span>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    labelColor: "#1877F2",
    icon: (
      <span
        className="social-icon social-icon--facebook flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.35rem] sm:h-24 sm:w-24 sm:rounded-[1.75rem]"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="h-9 w-9 translate-y-0.5 text-white sm:h-11 sm:w-11"
          fill="currentColor"
        >
          <path d="M14.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H8.5v3.2h2.6V22h3.4z" />
        </svg>
      </span>
    ),
  },
] as const;

export default function JoinUs() {
  return (
    <section
      id="redes"
      className="scroll-mt-24 relative overflow-hidden border-y border-accent/20 bg-surface px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
          Redes sociales
        </p>
        <h2 className="font-display mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-white sm:text-4xl md:text-5xl">
          Únete a nosotros
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-white/65 sm:text-base">
          Síguenos para ver saltos, ofertas y el día a día en el cielo.
        </p>

        <div className="mt-12 flex flex-wrap items-start justify-center gap-10 sm:mt-14 sm:gap-16">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 outline-none"
            >
              <span className="transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 group-focus-visible:-translate-y-1.5 group-focus-visible:scale-105">
                {social.icon}
              </span>
              <span
                className="font-display text-base font-bold tracking-wide transition-opacity group-hover:opacity-90 sm:text-lg"
                style={{ color: social.labelColor }}
              >
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
