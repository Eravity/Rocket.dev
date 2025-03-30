import getLesson from "@/sanity/queries/getLesson";
import { notFound } from "next/navigation";
import LessonHeaderWrapper from "../../../../../../_components/LessonHeaderWrapper";

type Props = {
  params: Promise<{ articleId: string }>;
};

export default async function LessonPage({ params }: Props) {
  const { articleId } = await params;
  const lesson = await getLesson(articleId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="container mx-auto 2xl:px-16 md:px-6">
      <LessonHeaderWrapper />
      <h1>{lesson.title}</h1>
    </div>
  );
}
