import Link from "next/link";

type ServiceItem = {
  id: string;
  title: string;
  priceLabel?: string;
  features: string[];
  note?: string;
  cta?: boolean;
};

const SERVICES: ServiceItem[] = [
  {
    id: "ticket-salto",
    title: "Ticket de salto (Paracaidistas titulados)",
    priceLabel: "35€",
    features: [
      "Bono 20 saltos 580€ (Validez 4 meses)",
      "Bono 50 saltos 1400€ (Validez 1 año)",
      "Bono 100 saltos 2600€ (validez 1 año)",
    ],
    note: "Los bonos son nominativos y sólo podrán compartirse con previa consulta y autorización del Club",
  },
  {
    id: "plegado-principal",
    title: "Plegado de campana principal",
    priceLabel: "8€",
    features: ["Por uno de nuestros packers"],
    cta: true,
  },
  {
    id: "plegado-reserva",
    title: "Plegado de campana de reserva",
    priceLabel: "70€",
    features: ["Plegado por nuestro Rigger titulado"],
    cta: true,
  },
  {
    id: "servicio-rigger",
    title: "Servicio de rigger",
    features: ["A consultar sobre plazo o por teléfono"],
    cta: true,
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l4.1 4.1 6.5-6.5a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className="flex h-full flex-col bg-[#2a2a2a] px-5 py-8 text-center sm:px-6 sm:py-10">
      <h3 className="font-display text-[1.05rem] font-bold leading-snug tracking-[0.02em] text-accent sm:text-[1.15rem]">
        {item.title}
      </h3>

      {item.priceLabel ? (
        <p className="font-display mt-8 text-5xl font-bold tracking-tight text-accent sm:text-6xl">
          {item.priceLabel}
        </p>
      ) : (
        <div className="mt-8 h-0" aria-hidden />
      )}

      <ul className="mt-8 flex-1 space-y-3.5 text-left">
        {item.features.map((feature) => (
          <li
            key={feature}
            className="flex gap-3 text-sm leading-snug text-white sm:text-[0.95rem]"
          >
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
        {item.note ? (
          <li className="flex gap-3 text-sm leading-snug text-white sm:text-[0.95rem]">
            <CheckIcon />
            <span>{item.note}</span>
          </li>
        ) : null}
      </ul>

      {item.cta ? (
        <Link
          href="/contacto"
          className="font-display mt-10 block w-full rounded-lg bg-accent py-3.5 text-center text-sm font-bold uppercase tracking-[0.08em] text-black transition hover:bg-accent-hover active:scale-[0.99]"
        >
          Contactar con nosotros
        </Link>
      ) : null}
    </article>
  );
}

export default function ServicePricingCards() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {SERVICES.map((item) => (
        <ServiceCard key={item.id} item={item} />
      ))}
    </div>
  );
}
