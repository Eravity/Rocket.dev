import { getCourse, getContentType } from "@/app/supabase/data-service";
import CurrentPath from "@/app/_components/CurrentPath";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  const course = (await getCourse(id))[0];
  if (!course.content_ref_id) {
    throw new Error("Missing content_ref_id in course");
  }
  // Folosim course.content_ref_id pentru a căuta tipul în tabela contents
  const contentType = await getContentType(course.content_ref_id);
  console.log(course);
  
  return (
    <div>
      <CurrentPath id={id}/>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Type: {contentType}</p>
    </div>
  );
}
