import ArrowDown from "./ArrowDown";

export default function Profile() {
  return (
    <div className="flex space-x-2">
      <div className="w-12 h-12 flex justify-center items-center bg-skySplash rounded-lg">
        <h1 className="text-white font-bold">CC</h1>
      </div>
      <div>
        <h1 className="font-bold">Cristian Cebotari</h1>
        <p className="text-neutral-500">FullStack Developer</p>
      </div>
      <ArrowDown/>
    </div>
  );
}
