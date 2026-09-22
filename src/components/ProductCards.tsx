"use client";

import { useCart } from "@/context/CartContext";
import { CATALOG, formatEUR, type CatalogProduct } from "@/lib/catalog";

type ProductCardsProps = {
  ids?: string[];
};

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

function PricingCard({
  product,
  onAdd,
}: {
  product: CatalogProduct;
  onAdd: () => void;
}) {
  return (
    <article className="flex h-full flex-col bg-[#2a2a2a] px-6 py-8 text-center sm:px-8 sm:py-10">
      <h3 className="font-display text-[1.35rem] font-bold uppercase leading-tight tracking-[0.04em] text-accent sm:text-[1.5rem]">
        {product.name}
      </h3>
      <p className="mt-2 text-sm font-light text-white/80 sm:text-base">
        {product.description}
      </p>

      <p className="font-display mt-8 text-5xl font-bold tracking-tight text-accent sm:text-6xl">
        {formatEUR(product.priceCents).replace(/\s/g, "")}
      </p>

      <ul className="mt-8 flex-1 space-y-3.5 text-left">
        {product.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-snug text-white sm:text-[0.95rem]">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onAdd}
        className="font-display mt-10 w-full rounded-lg bg-accent py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:bg-accent-hover active:scale-[0.99]"
      >
        Reservar ahora
      </button>
    </article>
  );
}

export default function ProductCards({ ids }: ProductCardsProps) {
  const { addItem } = useCart();
  const products = ids
    ? CATALOG.filter((p) => ids.includes(p.id))
    : CATALOG;

  return (
    <div className="mx-auto grid max-w-[900px] gap-5 md:grid-cols-2 md:gap-6">
      {products.map((product) => (
        <PricingCard
          key={product.id}
          product={product}
          onAdd={() => addItem(product.id)}
        />
      ))}
    </div>
  );
}
