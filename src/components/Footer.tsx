import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Reserva", href: "#reserva" },
  { label: "Precios", href: "#precios" },
  { label: "El centro", href: "#centro" },
  { label: "Contacto", href: "#contacto" },
  { label: "Requisitos", href: "#requisitos" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Redes", href: "#redes" },
];

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Bandeau marque — DA jaune */}
      <div className="relative overflow-hidden bg-accent">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #000 1px, transparent 1px), radial-gradient(circle at 80% 60%, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-black/5 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-black/5 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 py-14 sm:py-16 lg:py-20">
          <Link
            href="/"
            className="group transition-transform duration-500 hover:scale-[1.03]"
          >
            <Image
              src="/logo.png"
              alt="Sky Emotions — skydive & more"
              width={280}
              height={280}
              className="h-36 w-36 object-contain drop-shadow-sm brightness-0 sm:h-44 sm:w-44 lg:h-52 lg:w-52"
            />
          </Link>

          <nav
            aria-label="Pie de página"
            className="mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-10 sm:gap-x-7"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black sm:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bandeau bas */}
      <div className="border-t border-black/10 bg-[#0a0a0a] px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="font-display text-[11px] tracking-[0.12em] text-muted uppercase sm:text-xs">
            © {new Date().getFullYear()} Sky Emotions · skydive & more
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@skyemotions.es"
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              info@skyemotions.es
            </a>
            <span className="text-white/20" aria-hidden>
              ·
            </span>
            <a
              href="#contacto"
              className="text-xs text-muted transition-colors hover:text-accent"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
