"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: "INICIO", href: "/" },
  { label: "RESERVA", href: "#reserva" },
  {
    label: "CUPONES REGALO",
    href: "#cupones",
    children: [
      { label: "Salto tándem", href: "#cupones" },
      { label: "Pack experiencia", href: "#cupones" },
      { label: "Tarjeta regalo", href: "#cupones" },
    ],
  },
  { label: "PRECIOS", href: "#precios" },
  { label: "EL CENTRO", href: "#centro" },
  { label: "REDES", href: "#redes" },
  { label: "CONTACTO", href: "#contacto" },
  {
    label: "+INFO",
    href: "#info",
    children: [
      { label: "Requisitos", href: "#requisitos" },
      { label: "El salto", href: "#resumen" },
      { label: "Opiniones", href: "#opiniones" },
      { label: "Redes", href: "#redes" },
    ],
  },
];

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 8"
      className={`ml-1.5 h-2 w-2.5 shrink-0 text-muted transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="currentColor"
    >
      <path d="M6 8 0 0h12L6 8Z" />
    </svg>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuId = useId();

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onResize() {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
    setOpenMenu(null);
  }

  return (
    <>
      <header
        ref={navRef}
        className="sticky top-0 z-50 pt-[env(safe-area-inset-top)]"
      >
        <div className="border-b border-white/5 bg-nav/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-5 lg:h-20 lg:px-8">
            <Link
              href="/"
              className="relative z-10 shrink-0 transition-opacity hover:opacity-90"
              onClick={closeMobile}
            >
              <Image
                src="/logo.png"
                alt="Sky Emotions — skydive & more"
                width={120}
                height={120}
                priority
                className="h-14 w-14 object-contain sm:h-[68px] sm:w-[68px] lg:h-[76px] lg:w-[76px]"
              />
            </Link>

            <nav
              className="hidden items-center gap-0.5 xl:flex"
              aria-label="Principal"
            >
              {NAV_ITEMS.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openMenu === item.label;

                return (
                  <div key={item.label} className="relative">
                    {hasChildren ? (
                      <button
                        type="button"
                        className="font-display flex items-center px-2.5 py-2 text-[14px] font-semibold tracking-[0.05em] text-white transition-colors hover:text-accent lg:px-3 lg:text-[15px]"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() =>
                          setOpenMenu((prev) =>
                            prev === item.label ? null : item.label,
                          )
                        }
                      >
                        {item.label}
                        <Chevron open={isOpen} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="font-display block px-2.5 py-2 text-[14px] font-semibold tracking-[0.05em] text-white transition-colors hover:text-accent lg:px-3 lg:text-[15px]"
                      >
                        {item.label}
                      </Link>
                    )}

                    {hasChildren && isOpen && (
                      <div className="absolute left-0 top-full z-20 min-w-[200px] border border-white/10 bg-nav py-2 shadow-xl">
                        {item.children!.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="font-display block px-4 py-2.5 text-sm font-semibold tracking-wide text-white/90 transition-colors hover:bg-white/5 hover:text-accent"
                            onClick={() => setOpenMenu(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <button
              type="button"
              className="relative z-10 -mr-1 flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/5 xl:hidden"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              onClick={() => {
                setMobileOpen((v) => !v);
                setOpenMenu(null);
              }}
            >
              <span className="sr-only">Menú</span>
              <span className="relative block h-4 w-6" aria-hidden>
                <span
                  className={`absolute left-0 top-0 h-0.5 w-6 bg-accent transition-all duration-300 ease-out ${
                    mobileOpen ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                    mobileOpen ? "scale-x-0 opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-6 bg-accent transition-all duration-300 ease-out ${
                    mobileOpen ? "top-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hors du blur : fixed fonctionne correctement */}
      <div
        id={menuId}
        className={`fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-40 sm:top-[calc(4.5rem+env(safe-area-inset-top))] lg:top-[calc(5rem+env(safe-area-inset-top))] xl:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          tabIndex={mobileOpen ? 0 : -1}
          aria-label="Cerrar menú"
          className={`absolute inset-0 bg-black/65 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMobile}
        />

        <nav
          aria-label="Móvil"
          className={`absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col overflow-y-auto overscroll-contain border-l border-white/10 bg-nav px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 shadow-2xl transition-transform duration-300 ease-out sm:w-[22rem] sm:px-5 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openMenu === item.label;

            return (
              <div key={item.label} className="border-b border-white/10">
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      className="font-display flex min-h-14 w-full items-center justify-between py-4 text-left text-base font-semibold tracking-wide text-white sm:text-lg"
                      aria-expanded={isOpen}
                      tabIndex={mobileOpen ? 0 : -1}
                      onClick={() =>
                        setOpenMenu((prev) =>
                          prev === item.label ? null : item.label,
                        )
                      }
                    >
                      {item.label}
                      <Chevron open={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="space-y-1 pb-4 pl-3">
                        {item.children!.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            tabIndex={mobileOpen ? 0 : -1}
                            className="font-display block min-h-11 py-2.5 text-base font-medium text-muted transition-colors hover:text-accent"
                            onClick={closeMobile}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    tabIndex={mobileOpen ? 0 : -1}
                    className="font-display flex min-h-14 items-center py-4 text-base font-semibold tracking-wide text-white transition-colors hover:text-accent sm:text-lg"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
