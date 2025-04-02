import getLesson from "@/sanity/queries/getLesson";
import { notFound } from "next/navigation";

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
    <div className="">
      <main className="flex">
      </main>
    </div>
  );
}
