import { getCourse } from "@/app/supabase/data-service";
import CurrentPath from "@/app/_components/CurrentPath";

export default async function Page({params}: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const course = (await getCourse(id))[0];

  return (
    <div>
      <CurrentPath id={id}/>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
} 
