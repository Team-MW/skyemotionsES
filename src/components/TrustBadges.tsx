import Image from "next/image";

const BADGES = [
  {
    name: "Groupon",
    src: "/partners/groupon.png",
    href: "https://www.groupon.es",
    width: 140,
    height: 72,
    className: "h-12 w-auto sm:h-14",
  },
  {
    name: "Aladinia",
    src: "/partners/aladinia.png",
    href: "https://www.aladinia.com",
    width: 220,
    height: 50,
    className: "h-8 w-auto sm:h-10",
  },
  {
    name: "TripAdvisor",
    src: "/partners/tripadvisor.png",
    href: "https://www.tripadvisor.es",
    width: 120,
    height: 140,
    className: "h-16 w-auto sm:h-20",
  },
] as const;

export default function TrustBadges() {
  return (
    <section
      aria-label="Recomendado en"
      className="border-b border-white/5 bg-background px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
        {BADGES.map((badge) => (
          <a
            key={badge.name}
            href={badge.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={badge.name}
            className="opacity-90 transition-opacity duration-300 hover:opacity-100"
          >
            <Image
              src={badge.src}
              alt=""
              width={badge.width}
              height={badge.height}
              className={`object-contain ${badge.className}`}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
