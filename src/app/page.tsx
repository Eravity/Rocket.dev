import Greeting from "./_components/Greeting";
import InProgressContent from "./_components/InProgressContent";
import NewEnrollment from "./_components/NewEnrollment";
import Stats from "./_components/Stats";
import CourseAside from "./_components/CourseAside";
import Treat from "./_components/Treat";

export default function Home() {
  return (
    <main className="flex flex-col md:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="w-full flex justify-center md:justify-start">
          <Greeting />
        </div>
        <Stats />
      </div>
      <Treat />
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3 grid gap-10">
          <InProgressContent />
          <NewEnrollment />
        </div>
        <CourseAside />
      </div>
    </main>
  );
}
