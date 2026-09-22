import type { Metadata } from "next";
import { Barlow_Condensed, Outfit } from "next/font/google";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.skyemotions.es";

const siteTitle = "Sky Emotions | Paracaidismo en Tándem — Skydive & More";
const siteDescription =
  "Salta en tándem con Sky Emotions: caída libre a 4200 m, instructores certificados AESA/EASA y una experiencia inolvidable. Reserva tu salto en Andalucía.";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Sky Emotions",
  },
  description: siteDescription,
  applicationName: "Sky Emotions",
  keywords: [
    "paracaidismo",
    "salto tándem",
    "skydiving",
    "Sky Emotions",
    "caída libre",
    "paracaídas Andalucía",
    "regalo experiencia",
    "AESA",
    "EASA",
    "skydive España",
  ],
  authors: [{ name: "Sky Emotions" }],
  creator: "Microdidact",
  publisher: "Sky Emotions",
  category: "sports",
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Sky Emotions",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/hero-poster.jpg",
        width: 1280,
        height: 720,
        alt: "Salto en tándem Sky Emotions — caida libre",
      },
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Logo Sky Emotions skydive & more",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/hero-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
  },
  other: {
    "geo.region": "ES-AN",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Sky Emotions",
  description: siteDescription,
  url: siteUrl,
  image: `${siteUrl}/logo.png`,
  slogan: "skydive & more",
  email: "info@skyemotions.es",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Andalucía",
    addressCountry: "ES",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Andalucía",
  },
  priceRange: "€€",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
