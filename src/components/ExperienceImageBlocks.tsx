import Image from "next/image";
import Link from "next/link";

const EXPERIENCES = [
  {
    id: "vip-helicoptero",
    title: "Salto VIP + Helicóptero",
    subtitle: "Tándem + paseo turístico en helicóptero + hotel",
    image: "/images/helicopter-vip-1.png",
    imageAlt: "Helicóptero R44 Raven II para experiencia VIP",
    href: "/contacto",
    cta: "Consultar",
  },
  {
    id: "imax-360",
    title: "Salto tándem IMAX 360º",
    subtitle: "Vídeo inmersivo 360º de tu salto",
    image: "/images/salto-tandem-imax360-2.png",
    imageAlt: "Salto tándem en caída libre con sol de fondo",
    href: "/contacto",
    cta: "Consultar",
  },
  {
    id: "video-4k",
    title: "Salto tándem vídeo 4K",
    subtitle: "Grabación profesional en calidad 4K",
    image: "/images/salto-tandem-video4k-3.png",
    imageAlt: "Pasajera sonriendo en caída libre tándem",
    href: "/reserva",
    cta: "Reservar",
  },
  {
    id: "salto-tandem",
    title: "Salto tándem",
    subtitle: "La experiencia esencial desde 199€",
    image: "/images/salto-tandem2.png",
    imageAlt: "Salida del avión en salto tándem",
    href: "/reserva",
    cta: "Reservar",
  },
] as const;

export default function ExperienceImageBlocks() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {EXPERIENCES.map((item) => (
        <article
          key={item.id}
          className="group flex flex-col overflow-hidden bg-[#2a2a2a]"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="flex flex-1 flex-col px-4 py-5 text-center sm:px-5">
            <h3 className="font-display text-[0.95rem] font-bold uppercase leading-snug tracking-[0.04em] text-accent sm:text-base">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm font-light text-white/70">
              {item.subtitle}
            </p>
            <Link
              href={item.href}
              className="font-display mt-5 block w-full rounded-lg bg-accent py-3 text-center text-xs font-bold uppercase tracking-[0.1em] text-black transition hover:bg-accent-hover"
            >
              {item.cta}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
