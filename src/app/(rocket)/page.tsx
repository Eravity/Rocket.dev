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
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
          <div className="flex-1">
            <Greeting />
          </div>
          <div className="w-full lg:w-auto">
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
