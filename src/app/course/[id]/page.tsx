import { getCourse } from "@/app/supabase/data-service";

export default async function page({params}: {params: Promise<{ id: number }>}) {
  const { id } = await params;
  const course = (await getCourse(id))[0];
  
  return <div>
    <h1>{course.title}</h1>
    <p>{course.description}</p> 
  </div>;
}

