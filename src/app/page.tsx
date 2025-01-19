import Greeting from "./_components/Greeting";
import Treat from "./_components/Treat";

export default function Home() {
  return (
    <main className="felx flex-col space-y-10">
      <div className="flex justify-between items-center">
        <Greeting />
        <h1>.</h1>
      </div>
      <Treat/>
    </main>
  );
}
