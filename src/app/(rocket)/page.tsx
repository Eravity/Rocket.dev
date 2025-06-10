import Greeting from "@/app/_components/Greeting";
import InProgressContent from "@/app/_components/InProgressContent";
import NewEnrollment from "@/app/_components/NewEnrollment";
import Stats from "@/app/_components/Stats";
import CourseAside from "@/app/_components/CourseAside";
import MostViewedContents from "@/app/_components/MostViewedContents";
import ToBeReviewed from "@/app/_components/ToBeReviewed";
import RoadmapWidget from "@/app/_components/RoadmapWidget";

const Home = async () => {
  return (
    <main className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8">
        {/* Header Section */}
        <section className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 items-start">
          <div className="lg:col-span-3 xl:col-span-2">
            <Greeting />
          </div>
          <div className="lg:col-span-2 xl:col-span-1">
            <Stats />
          </div>
        </section>

        {/* Learning Roadmap */}
        <section className="w-full">
          <RoadmapWidget />
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-6 lg:space-y-8">
            <InProgressContent />
            <NewEnrollment />
            <MostViewedContents />
            <ToBeReviewed />
          </div>
          
          {/* Sidebar */}
          <aside className="xl:col-span-1">
            <CourseAside />
          </aside>
        </section>
      </div>
    </main>
  );
};

export default Home;
