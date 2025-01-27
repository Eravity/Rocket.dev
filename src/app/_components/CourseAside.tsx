import ArticleIcon from "./Icons/ArticleIcon";
import CourseData from "./CourseData";
import Time from "./Icons/Time";

export default function CourseAside() {
  return (
    <div className="col-span-1 flex flex-col gap-4">
      <CourseData icon={<ArticleIcon />} value={124} label={'Learning content'}/>
      <CourseData icon={<Time />} value={44} label={'Learning time'}/>
    </div>
  );
}
