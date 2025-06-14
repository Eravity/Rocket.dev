import Greeting from "@/app/_components/Greeting";
import InProgressContent from "@/app/_components/InProgressContent";
import NewEnrollment from "@/app/_components/NewEnrollment";
import Stats from "@/app/_components/Stats";
import CourseAside from "@/app/_components/CourseAside";
import MostViewedContents from "@/app/_components/MostViewedContents";
import ToBeReviewed from "@/app/_components/ToBeReviewed";

const sampleChapters = [
  {
    id: 0,
    title: "Getting Started",
    description:
      "Learn the fundamentals of web development and set up your development environment",
    completion: 100,
  },
  {
    id: 1,
    title: "HTML & CSS",
    description:
      "Master the building blocks of the web with semantic HTML and modern CSS",
    completion: 100,
  },
  {
    id: 2,
    title: "JS Essentials",
    description:
      "Dive into JavaScript programming and TypeScript for type-safe development",
    completion: 85,
  },
  {
    id: 3,
    title: "Version Control with Git",
    description:
      "Learn Git workflows, branching, and collaborative development practices",
    completion: 45,
  },
  {
    id: 4,
    title: "Backend & APIs",
    description:
      "Build RESTful APIs, work with databases, and understand server-side concepts",
    completion: 0,
  },
  {
    id: 5,
    title: "React Development",
    description:
      "Create interactive UIs with React, hooks, state management, and component patterns",
    completion: 0,
  },
  {
    id: 6,
    title: "Full-Stack with Next.js",
    description:
      "Build production-ready applications with Next.js, deployment, and optimization",
    completion: 0,
  },
  {
    id: 7,
    title: "Advanced Topics",
    description:
      "Explore AI integration, automation, testing, and advanced development patterns",
    completion: 0,
  },
  {
    id: 8,
    title: "You've made it!",
    description:
      "Congratulations for completing the course!",
    completion: 0,
  },
];

const Home = async () => {
  return (
    <main className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-6 lg:py-8 space-y-3 md:space-y-5 lg:space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3 md:gap-x-4 md:gap-y-3 lg:gap-6 xl:gap-8 items-start">
          <div className="lg:col-span-3 xl:col-span-2">
            <Greeting chapters={sampleChapters} />
          </div>
          <div className="lg:col-span-2 xl:col-span-1">
            <Stats />
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3 space-y-4 md:space-y-6 lg:space-y-8">
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
