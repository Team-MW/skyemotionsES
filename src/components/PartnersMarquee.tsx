import Image from "next/image";

const PARTNERS = [
  {
    name: "Banco Sabadell",
    src: "/partners/sabadell.png",
    href: "https://www.bancosabadell.com",
  },
  {
    name: "Bankinter",
    src: "/partners/bankinter.png",
    href: "https://www.bankinter.com",
  },
  {
    name: "BBVA",
    src: "/partners/bbva.png",
    href: "https://www.bbva.es",
  },
  {
    name: "CaixaBank",
    src: "/partners/caixabank.svg",
    href: "https://www.caixabank.es",
  },
  {
    name: "Crypto.com",
    src: "/partners/crypto.png",
    href: "https://crypto.com",
  },
  {
    name: "Mastercard",
    src: "/partners/mastercard.svg",
    href: "https://www.mastercard.com",
  },
  {
    name: "Santander",
    src: "/partners/santander.png",
    href: "https://www.santander.es",
  },
  {
    name: "Visa",
    src: "/partners/visa.svg",
    href: "https://www.visa.es",
  },
] as const;

function LogoLink({
  partner,
}: {
  partner: (typeof PARTNERS)[number];
}) {
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className="flex h-14 w-[9.5rem] shrink-0 items-center justify-center rounded-lg bg-white/[0.04] px-4 transition-all duration-300 hover:bg-white/[0.1] sm:h-16 sm:w-44"
    >
      <Image
        src={partner.src}
        alt=""
        width={140}
        height={56}
        className="max-h-9 w-auto max-w-[7.5rem] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:max-h-10 sm:max-w-[8.5rem]"
      />
    </a>
  );
}

export default function PartnersMarquee() {
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="partners"
      aria-label="Medios de pago y partners"
      className="relative overflow-hidden border-y border-white/5 bg-nav py-6 sm:py-8"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-nav to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-nav to-transparent sm:w-20"
        aria-hidden
      />

      <div className="partners-marquee flex w-max gap-4 sm:gap-6">
        {track.map((partner, i) => (
          <LogoLink key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </section>
  );
}
