import CinematicNavigation from "@/components/cinematic/CinematicNavigation";
import HeroSection from "@/components/cinematic/HeroSection";
import PortfolioSections from "@/components/cinematic/PortfolioSections";
import ContactSection from "@/components/cinematic/ContactSection";

export default function Home() {
  return (
    <>
      <CinematicNavigation />
      <main>
        <HeroSection />
        <PortfolioSections />
        <ContactSection />
      </main>
    </>
  );
}
