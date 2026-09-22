import type { Metadata } from "next";
import GiftProductLayout from "@/components/GiftProductLayout";

export const metadata: Metadata = {
  title: "Pack experiencia",
  description:
    "Pack experiencia Sky Emotions: salto tándem con vídeo y fotos de tu caída libre.",
};

export default function PackExperienciaPage() {
  return (
    <GiftProductLayout
      title="Pack experiencia"
      description="Para quienes quieren recordar cada instante: salto + material audiovisual."
      image="/images/salto-freefall.jpg"
      priceHint="Pack premium — consulta precio"
      bullets={[
        "Todo lo incluido en el salto tándem",
        "Vídeo profesional de la experiencia",
        "Fotos en freefall y bajo campana",
        "Entrega digital para compartir al momento",
        "Perfecto como regalo premium",
      ]}
    />
  );
}
