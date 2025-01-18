import ArrowDown from "./ArrowDown";
import DateAndTime from "./DateAndTime";

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
      <div className="flex items-center space-x-4">
        <div className="w-[1px] h-10 bg-neutral-300"></div>
        <div className="shadow-md px-2 rounded-lg border-t">
          <h1 className="font-semibold text-center text-blueLotus">Now</h1>
          <DateAndTime />
        </div>
      </div>
    </div>
  );
}
