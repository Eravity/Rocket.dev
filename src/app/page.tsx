import Greeting from "./_components/Greeting";
import Stats from "./_components/Stats";
import Treat from "./_components/Treat";

export default function Home() {
  return (
    <main className="flex flex-col space-y-8 md:space-y-5">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="w-full flex justify-center md:justify-start">
          <Greeting />
        </div>
        <Stats/>
      </div>
      <Treat/>
    </main>
  );
}
