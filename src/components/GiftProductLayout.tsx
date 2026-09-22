import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteShell from "@/components/SiteShell";

type GiftProductLayoutProps = {
  title: string;
  description: string;
  image: string;
  bullets: string[];
  priceHint: string;
};

export default function GiftProductLayout({
  title,
  description,
  image,
  bullets,
  priceHint,
}: GiftProductLayoutProps) {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Cupón regalo"
        title={title}
        description={description}
        cta={{ label: "Solicitar cupón", href: "/reserva" }}
      />
      <section className="bg-background px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <ul className="space-y-4">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="border-l-2 border-accent pl-4 text-sm leading-relaxed text-white/75 sm:text-base"
                >
                  {b}
                </li>
              ))}
            </ul>
            <p className="font-display mt-8 text-lg font-bold uppercase tracking-wide text-accent">
              {priceHint}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/reserva"
                className="font-display inline-flex bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black hover:bg-accent-hover"
              >
                Comprar / reservar
              </Link>
              <Link
                href="/cupones-regalo"
                className="font-display inline-flex border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:border-accent hover:text-accent"
              >
                Ver todos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
