import Greeting from "@/app/_components/Greeting";
import InProgressContent from "@/app/_components/InProgressContent";
import NewEnrollment from "@/app/_components/NewEnrollment";
import Stats from "@/app/_components/Stats";
import CourseAside from "@/app/_components/CourseAside";
import Treat from "@/app/_components/RoadmapWidget";
import MostViewedContents from "@/app/_components/MostViewedContents";
import ToBeReviewed from "@/app/_components/ToBeReviewed";

const Home = async () => {
  return (
    <main className="flex container mx-auto flex-col my-8 space-y-6 2xl:px-16 md:px-6 md:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-auto">
          <Greeting />
        </div>
        <Stats />
      </div>
      <Treat />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-3 grid gap-6 md:gap-10">
          <InProgressContent />
          <NewEnrollment />
          <MostViewedContents />
          <ToBeReviewed />
        </div>
        <CourseAside />
      </div>
    </main>
  );
};

export default Home;
