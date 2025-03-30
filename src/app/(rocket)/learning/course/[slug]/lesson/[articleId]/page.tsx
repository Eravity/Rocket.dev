import getLesson from "@/sanity/queries/getLesson";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ articleId: string }>;
};

export default async function LessonPage(props: Props) {
  const { articleId } = await props.params;
  const lesson = await getLesson(articleId);

  if (!lesson) {
    notFound();
  }

  return (
    <main>
      <h1>{lesson.title}</h1>
    </main>
  );
}
