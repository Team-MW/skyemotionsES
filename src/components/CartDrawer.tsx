"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatEUR } from "@/lib/catalog";

export default function CartDrawer() {
  const {
    open,
    setOpen,
    itemsDetailed,
    count,
    subtotalCents,
    setQuantity,
    removeItem,
    clear,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-[100] xl:z-[100] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Cerrar carrito"
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-[min(100%,24rem)] flex-col border-l border-white/10 bg-nav shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">
              Carrito
            </p>
            <p className="text-xs text-muted">
              {count} {count === 1 ? "artículo" : "artículos"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-white hover:text-accent"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {itemsDetailed.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-white/70">Tu carrito está vacío.</p>
              <Link
                href="/reserva"
                onClick={() => setOpen(false)}
                className="font-display mt-4 inline-block text-sm font-bold uppercase tracking-wide text-accent"
              >
                Ver experiencias →
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {itemsDetailed.map(({ product, quantity, lineCents }) => (
                <li
                  key={product.id}
                  className="flex gap-3 border-b border-white/10 pb-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-surface">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-sm text-accent">
                      {formatEUR(product.priceCents)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center border border-white/20 text-white hover:border-accent"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label="Quitar uno"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm text-white">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center border border-white/20 text-white hover:border-accent"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label="Añadir uno"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto text-xs text-muted hover:text-accent"
                        onClick={() => removeItem(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-white/40">
                      Subtotal: {formatEUR(lineCents)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {itemsDetailed.length > 0 && (
          <div className="border-t border-white/10 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted">Total</span>
              <span className="font-display text-xl font-bold text-accent">
                {formatEUR(subtotalCents)}
              </span>
            </div>
            <p className="mb-4 text-xs text-white/45">
              Guarda tu selección y paga más tarde con Stripe. El carrito se
              conserva en este dispositivo.
            </p>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="font-display flex w-full items-center justify-center bg-accent py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-black hover:bg-accent-hover"
            >
              Ir al pago
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="font-display mt-2 w-full py-3 text-xs font-semibold uppercase tracking-wide text-white/70 hover:text-accent"
            >
              Seguir eligiendo · reservar más tarde
            </button>
            <button
              type="button"
              onClick={clear}
              className="mt-1 w-full text-center text-xs text-muted hover:text-white"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
