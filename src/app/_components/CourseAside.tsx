import GoalProgress from "../_components/GoalProgress";
import DailyGoal from "./DailyGoal";
import { Calendar } from "./calendar";

export default function CourseAside() {
  return (
    <aside className="col-span-1 flex flex-col gap-4">
      <Calendar
        mode="single"
        className="bg-card/50 backdrop-blur-sm rounded-xl w-full shadow-sm border p-2"
      ></Calendar>
      <DailyGoal />
      <GoalProgress />
    </aside>
  );
}
