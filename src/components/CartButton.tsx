"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { count, setOpen, ready } = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="relative flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/5 hover:text-accent"
      aria-label={`Carrito${count ? `, ${count} artículos` : ""}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M6 6h15l-1.5 9h-12z" />
        <path d="M6 6 5 3H2" />
        <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
      {ready && count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-black">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
