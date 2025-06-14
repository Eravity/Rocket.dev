import GoalProgress from "../_components/GoalProgress";
import DailyGoal from "./DailyGoal";
import { Calendar } from "./calendar";

export default function CourseAside() {
  return (
    <aside className="col-span-1 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-col 2xl:flex-col gap-4 md:items-stretch lg:items-stretch">
        <div className="md:flex-1 lg:flex-1">
          <Calendar
            mode="single"
            className="bg-card/50 backdrop-blur-sm rounded-xl w-full shadow-sm border p-2 sm:p-3 md:p-4 overflow-hidden md:h-full lg:h-full"
          ></Calendar>
        </div>
        <div className="flex flex-col gap-4 md:flex-1 lg:flex-1">
          <DailyGoal />
          <GoalProgress />
        </div>
      </div>
    </aside>
  );
}
