import Image from "next/image";

const STEPS = [
  {
    id: "teorica",
    number: "01",
    title: "Teórica",
    image: "/images/salto-sonrisa.jpg",
    imageAlt: "Saltadores en tándem sonriendo durante la caída libre",
    reverse: false,
    paragraphs: [
      "A su llegada al centro, serás recibido por nuestro amable equipo en nuestras oficinas para inscribirte. El equipo de paracaidistas y tu instructor te darán unos 20 minutos de teórica esencial y sencilla, enseñándote todos los aspectos del salto, nociones básicas de seguridad y todos los diferentes pasos de tu salto.",
      "Luego, se pone el mono, se pone los arneses y junto con tu instructor se embarcarán en el avión.",
    ],
  },
  {
    id: "vuelo",
    number: "02",
    title: "Vuelo",
    image: "/images/vuelo-avion.jpg",
    imageAlt: "Avión amarillo despegando hacia la zona de salto",
    reverse: true,
    paragraphs: [
      "Subirás y volarás en nuestro avión unos 20 minutos hasta alcanzar la altitud del salto que son 4200 metros. Mientras tanto disfrutarás de las vistas que ofrece la altura: las playas de arena blanca del océano Atlántico, la costa de Marruecos, la Roca de Gibraltar, la sierra de Santa Lucía y detrás la Sierra Nevada.",
    ],
  },
  {
    id: "salto",
    number: "03",
    title: "Salto",
    image: "/images/salto-freefall.jpg",
    imageAlt: "Caída libre en tándem vista desde el cielo",
    reverse: false,
    paragraphs: [
      "Vestido y preparado, unido a tu instructor en el avión, con las últimas instrucciones, estáis listos para saltar del avión y vivir una caída libre de casi 60 segundos — como un halcón en presa — a una velocidad de casi 200 km/h.",
      "Después se abre el paracaídas para volar unos 6 a 8 minutos disfrutando el impresionante paisaje.",
    ],
  },
] as const;

export default function TandemExperience() {
  return (
    <section
      id="resumen"
      className="scroll-mt-24 border-t border-white/5 bg-background"
    >
      {/* Intro */}
      <div className="px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            La experiencia
          </p>
          <h2 className="font-display mt-4 text-[clamp(1.4rem,4.5vw,2.75rem)] font-bold uppercase leading-[1.15] tracking-[0.06em] text-white">
            ¿En qué consiste el salto tándem?
          </h2>
          <p className="font-display mt-6 text-xl font-bold uppercase tracking-[0.04em] text-accent sm:text-2xl md:text-3xl">
            ¡Pues un sentimiento extraordinario!
          </p>
          <p className="font-display mt-3 text-lg font-semibold uppercase tracking-[0.08em] text-white sm:text-xl">
            ¡Felicidades!
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/70 sm:text-base md:text-lg">
            ¡Has decidido experimentar lo que probablemente será la emoción de
            tu vida!
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {STEPS.map((step) => (
          <article
            key={step.id}
            id={step.id}
            className="border-t border-white/5"
          >
            <div
              className={`mx-auto grid max-w-[1200px] items-center gap-0 lg:grid-cols-2 ${
                step.reverse ? "" : ""
              }`}
            >
              <div
                className={`relative aspect-[4/3] w-full overflow-hidden bg-surface lg:aspect-auto lg:min-h-[420px] ${
                  step.reverse ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20"
                  aria-hidden
                />
              </div>

              <div
                className={`px-5 py-10 sm:px-8 sm:py-14 lg:px-12 xl:px-16 ${
                  step.reverse ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm font-bold tracking-[0.2em] text-accent">
                    {step.number}
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-[0.14em] text-white sm:text-3xl">
                    {step.title}
                  </h3>
                </div>
                <div className="mt-6 space-y-4">
                  {step.paragraphs.map((p) => (
                    <p
                      key={p.slice(0, 40)}
                      className="text-sm font-light leading-relaxed text-white/75 sm:text-base md:text-[1.05rem] md:leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
