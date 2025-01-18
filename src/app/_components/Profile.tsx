import ArrowDown from "./ArrowDown";

export default function Profile() {
  return (
    <div className="flex space-x-3 items-center">
      <div className="w-10 h-10 flex justify-center items-center bg-blueLotus rounded-lg">
        <h1 className="text-white font-bold">CC</h1>
      </div>

      <div>
        <h1 className="font-bold">Cristian Cebotari</h1>
        <p className="text-neutral-500">FullStack Developer</p>
      </div>

      <ArrowDown />
    </div>
  );
}
