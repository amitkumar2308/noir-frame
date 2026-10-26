import CinematicNavigation from "@/components/cinematic/CinematicNavigation";
import WorkPage from "@/components/cinematic/WorkPage";

export const metadata = {
  title: "Work | NoirFrame",
  description: "Selected cinematography projects across narrative film, commercial campaigns, music videos, and fashion editorial.",
};

export default function Work() {
  return (
    <>
      <CinematicNavigation forceLight />
      <main>
        <WorkPage />
      </main>
    </>
  );
}
