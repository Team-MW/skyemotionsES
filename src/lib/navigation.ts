export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "INICIO", href: "/" },
  { label: "RESERVA", href: "/reserva" },
  {
    label: "CUPONES REGALO",
    href: "/cupones-regalo",
    children: [
      { label: "Salto tándem", href: "/cupones-regalo/salto-tandem" },
      { label: "Pack experiencia", href: "/cupones-regalo/pack-experiencia" },
      { label: "Tarjeta regalo", href: "/cupones-regalo/tarjeta-regalo" },
    ],
  },
  { label: "PRECIOS", href: "/precios" },
  { label: "EL CENTRO", href: "/el-centro" },
  { label: "CONTACTO", href: "/contacto" },
  {
    label: "+INFO",
    href: "/info",
    children: [
      { label: "Requisitos", href: "/info/requisitos" },
      { label: "El salto", href: "/info/el-salto" },
      { label: "FAQ", href: "/info/faq" },
      { label: "Opiniones", href: "/#opiniones" },
    ],
  },
];

export const FOOTER_LINKS = [
  { label: "Reserva", href: "/reserva" },
  { label: "Cupones", href: "/cupones-regalo" },
  { label: "Precios", href: "/precios" },
  { label: "El centro", href: "/el-centro" },
  { label: "Contacto", href: "/contacto" },
  { label: "Requisitos", href: "/info/requisitos" },
  { label: "+Info", href: "/info" },
];
