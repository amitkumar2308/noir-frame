import CinematicNavigation from "@/components/cinematic/CinematicNavigation";
import ServicesPage from "@/components/cinematic/ServicesPage";

export const metadata = {
  title: "Services | NoirFrame",
  description: "Full cinematography services from narrative features to commercial campaigns and music videos.",
};

export default function Services() {
  return (
    <>
      <CinematicNavigation forceLight />
      <main>
        <ServicesPage />
      </main>
    </>
  );
}
