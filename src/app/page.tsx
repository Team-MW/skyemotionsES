import ExperienceResumen from "@/components/ExperienceResumen";
import Hero from "@/components/Hero";
import JoinUs from "@/components/JoinUs";
import PartnersMarquee from "@/components/PartnersMarquee";
import Requisitos from "@/components/Requisitos";
import Reviews from "@/components/Reviews";
import SiteShell from "@/components/SiteShell";
import TandemExperience from "@/components/TandemExperience";
import TrustBadges from "@/components/TrustBadges";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <TrustBadges />
      <PartnersMarquee />
      <TandemExperience />
      <ExperienceResumen />
      <JoinUs />
      <Requisitos />
      <Reviews />
    </SiteShell>
  );
}
