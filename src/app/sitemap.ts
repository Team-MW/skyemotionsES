import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.skyemotions.es";

const routes = [
  "",
  "/reserva",
  "/cupones-regalo",
  "/cupones-regalo/salto-tandem",
  "/cupones-regalo/pack-experiencia",
  "/cupones-regalo/tarjeta-regalo",
  "/precios",
  "/el-centro",
  "/contacto",
  "/info",
  "/info/requisitos",
  "/info/el-salto",
  "/info/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path, i) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : Math.max(0.5, 0.9 - i * 0.03),
  }));
}
