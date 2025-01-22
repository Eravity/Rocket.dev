import Greeting from "./_components/Greeting";
import InProgressContent from "./_components/InProgressContent";
import Stats from "./_components/Stats";
import Treat from "./_components/Treat";

export default function Home() {
  return (
    <main className="flex flex-col space-y-8 md:space-y-5">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="w-full flex justify-center md:justify-start">
          <Greeting />
        </div>
        <Stats />
      </div>
      <Treat />
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-3 h-[40] grid gap-4">
          <InProgressContent/>
        </div>

        <div className="col-span-1 grid border gap-4"></div>
      </div>
    </main>
  );
}
