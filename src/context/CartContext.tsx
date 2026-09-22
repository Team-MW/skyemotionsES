"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CATALOG, getProduct, type CatalogProduct } from "@/lib/catalog";

export type CartLine = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotalCents: number;
  itemsDetailed: { product: CatalogProduct; quantity: number; lineCents: number }[];
};

const STORAGE_KEY = "skyemotions-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) {
          setLines(
            parsed.filter(
              (l) =>
                typeof l.productId === "string" &&
                typeof l.quantity === "number" &&
                getProduct(l.productId) &&
                l.quantity > 0,
            ),
          );
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const addItem = useCallback((productId: string, qty = 1) => {
    if (!getProduct(productId)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId
            ? { ...l, quantity: l.quantity + qty }
            : l,
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.productId !== productId));
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.productId === productId ? { ...l, quantity } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemsDetailed = useMemo(() => {
    return lines
      .map((l) => {
        const product = getProduct(l.productId);
        if (!product) return null;
        return {
          product,
          quantity: l.quantity,
          lineCents: product.priceCents * l.quantity,
        };
      })
      .filter(Boolean) as CartContextValue["itemsDetailed"];
  }, [lines]);

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const subtotalCents = useMemo(
    () => itemsDetailed.reduce((sum, i) => sum + i.lineCents, 0),
    [itemsDetailed],
  );

  const value = useMemo(
    () => ({
      lines,
      ready,
      open,
      setOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
      count,
      subtotalCents,
      itemsDetailed,
    }),
    [
      lines,
      ready,
      open,
      addItem,
      removeItem,
      setQuantity,
      clear,
      count,
      subtotalCents,
      itemsDetailed,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/** Safe for optional UI that may render before provider in edge cases */
export function useCartOptional() {
  return useContext(CartContext);
}

export { CATALOG };
