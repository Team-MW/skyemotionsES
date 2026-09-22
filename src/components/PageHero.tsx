import Link from "next/link";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
};

export default function PageHero({
  eyebrow,
  title,
  description,
  cta,
}: PageHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/5 bg-nav">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 20% 0%, rgba(226,255,0,0.14), transparent 55%), radial-gradient(ellipse 50% 60% at 100% 100%, rgba(226,255,0,0.06), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        {eyebrow && (
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-accent sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-3 max-w-3xl text-[clamp(1.75rem,5vw,3.25rem)] font-bold uppercase leading-[1.1] tracking-[0.06em] text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="font-display mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-black transition-transform hover:scale-[1.03] hover:bg-accent-hover"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </header>
  );
}
