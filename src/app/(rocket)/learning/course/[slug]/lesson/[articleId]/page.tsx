import getLesson from "@/sanity/queries/getLesson";

export default async function page({params}: { params: { articleId: string } }) {
  const { articleId } = params; 
  console.log("articleSlug", articleId);
  const lesson = await getLesson(articleId);
  
  if (!lesson) {
    return <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Lesson not found</h1>
    </main>
  }
  
  return (
    <main>
      <h1>{lesson.title}</h1>
    </main>
  );
}
