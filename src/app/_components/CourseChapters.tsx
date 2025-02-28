import { getChapters } from "../supabase/data-service";
import Accordion from "./Accordion";
import Link from "next/link";

type CourseChaptersProps = {
  course: {
    id: number;
    title: string;
    image: string;
  };
};

type Article = {
  id: number;
  title: string;
};

export default async function CourseChapters({ course }: CourseChaptersProps) {
  const chapters = await getChapters(course.id);
  const accordionItems = chapters.map((chapter) => ({
    id: chapter.id || chapter.title,
    title: chapter.title,
    content: (
      <ul className="space-y-2">
        {chapter.articles?.map((article: Article) => (
          <li key={article.id} className="pl-4 border-l-2 border-gray-200 py-2">
            <Link
              href={`/courses/${course.id}/chapters/${chapter.id}/articles/${article.id}`}
              className="hover:text-blue-500"
            >
              {article.title}
            </Link>
          </li>
        )) || (
          <p className="text-gray-500 italic">
            No articles available for this chapter.
          </p>
        )}
      </ul>
    ),
  }));

  return <Accordion items={accordionItems} />;
}
