import type { Metadata } from "next";
import GiftProductLayout from "@/components/GiftProductLayout";

export const metadata: Metadata = {
  title: "Cupón salto tándem",
  description:
    "Regala un salto en tándem Sky Emotions: caída libre a 4200 m con instructor certificado.",
};

export default function SaltoTandemCuponPage() {
  return (
    <GiftProductLayout
      title="Salto tándem"
      description="El clásico. Ideal para regalar la primera experiencia de caída libre."
      image="/images/salto-sonrisa.jpg"
      priceHint="Consulta tarifas en Precios"
      bullets={[
        "Teórica de ~20 minutos con tu instructor",
        "Vuelo a 4200 metros con vistas espectaculares",
        "Caída libre de casi 60 segundos a ~200 km/h",
        "Vuelo en paracaídas 6–8 minutos",
        "Cupón canjeable según disponibilidad y meteorología",
      ]}
    />
  );
}
