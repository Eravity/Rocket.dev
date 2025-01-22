import CourseProgress from "./CourseProgress";
import InfoSign from "./InfoSign";

export default function InProgressContent() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg">In progress learning content</h1>
          <InfoSign info="This is just an information sign!" />
        </div>
        <button className="font-semibold underline-offset-[5px] border-b-2 border-blueLotus text-blueLotus transition-all duration-200">
          View all
        </button>
      </div>
      <CourseProgress />
    </div>
  );
}
