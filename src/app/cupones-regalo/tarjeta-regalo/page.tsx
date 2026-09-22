import type { Metadata } from "next";
import GiftProductLayout from "@/components/GiftProductLayout";

export const metadata: Metadata = {
  title: "Tarjeta regalo",
  description:
    "Tarjeta regalo Sky Emotions: elige el importe y regala libertad para saltar cuando quieran.",
};

export default function TarjetaRegaloPage() {
  return (
    <GiftProductLayout
      title="Tarjeta regalo"
      description="Máxima flexibilidad. Ellos eligen fecha y modalidad cuando estén listos."
      image="/images/vuelo-avion.jpg"
      priceHint="Importe a elegir"
      bullets={[
        "Importe personalizable",
        "Válida para salto tándem u opciones del centro",
        "Diseño digital o físico bajo petición",
        "Ideal si no conoces su disponibilidad",
        "Canjeable contactando con nuestro equipo",
      ]}
    />
  );
}
