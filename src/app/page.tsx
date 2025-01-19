import Greeting from "./_components/Greeting";
import Widgets from "./_components/Widgets";

export default function Home() {
  return (
    <div className="flex justify-between items-center">
      <Greeting />
      <Widgets/>
    </div>
  );
}
