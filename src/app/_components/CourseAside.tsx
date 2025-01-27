import ArticleIcon from "./Icons/ArticleIcon";
import CourseData from "./CourseData";
import Time from "./Icons/Time";
import DailyGoal from "./DailyGoal";

export default function CourseAside() {
  return (
    <aside className="col-span-1 flex flex-col gap-4">
      <CourseData icon={<ArticleIcon />} value={124} label={'Learning content'}/>
      <CourseData icon={<Time />} value={44} label={'Learning time'}/>
      <DailyGoal/>
    </aside>
  );
}
