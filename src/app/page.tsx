import Greeting from "./_components/Greeting";
import InProgressContent from "./_components/InProgressContent";
import NewEnrollment from "./_components/NewEnrollment";
import Stats from "./_components/Stats";
import CourseAside from "./_components/CourseAside";
import Treat from "./_components/Treat";

export default function Home() {
  return (
    <main className="flex flex-col space-y-6 md:space-y-10">
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
        </div>
        <CourseAside />
      </div>
    </main>
  );
}
