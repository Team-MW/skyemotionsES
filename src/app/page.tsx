import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import JoinUs from "@/components/JoinUs";
import Navbar from "@/components/Navbar";
import PartnersMarquee from "@/components/PartnersMarquee";
import Requisitos from "@/components/Requisitos";
import Reviews from "@/components/Reviews";
import TandemExperience from "@/components/TandemExperience";
import TrustBadges from "@/components/TrustBadges";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBadges />
        <PartnersMarquee />
        <TandemExperience />
        <JoinUs />
        <Requisitos />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
