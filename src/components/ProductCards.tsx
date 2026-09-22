"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { CATALOG, formatEUR } from "@/lib/catalog";

type ProductCardsProps = {
  ids?: string[];
};

export default function ProductCards({ ids }: ProductCardsProps) {
  const { addItem } = useCart();
  const products = ids
    ? CATALOG.filter((p) => ids.includes(p.id))
    : CATALOG;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className={`flex flex-col overflow-hidden border ${
            product.featured
              ? "border-accent bg-surface"
              : "border-white/10 bg-surface/80"
          }`}
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={product.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 25vw"
            />
            {product.featured && (
              <span className="font-display absolute left-3 top-3 bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                Popular
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              {product.name}
            </h3>
            <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-white/65">
              {product.description}
            </p>
            <ul className="mt-4 space-y-1.5">
              {product.features.slice(0, 3).map((f) => (
                <li key={f} className="text-xs text-white/50">
                  · {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-end justify-between gap-3">
              <p className="font-display text-xl font-bold text-accent">
                {formatEUR(product.priceCents)}
              </p>
              <button
                type="button"
                onClick={() => addItem(product.id)}
                className="font-display shrink-0 bg-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-accent-hover"
              >
                Añadir
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
