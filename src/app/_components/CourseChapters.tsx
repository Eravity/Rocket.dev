"use client";

import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import { getChapters, getChapterArticles } from "@/app/supabase/data-service";
import Link from "next/link";

type Chapter = {
  id: number;
  title: string;
  course_id: number;
  order_number?: number;
  description?: string;
};

type Article = {
  id: number;
  title: string;
  chapter_id: number;
  order_number?: number;
};

type ChapterWithArticles = Chapter & {
  articles: Article[];
};

type CourseChaptersProps = {
  course: { id: number; title: string; };
};

export default function CourseChapters({ course }: CourseChaptersProps) {
  // Removed unused state variable
  const [accordionItems, setAccordionItems] = useState<{ id: number; title: string; content: React.ReactElement; chapterId: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChaptersAndArticles = async () => {
      if (!course?.id) return;
      
      try {
        setIsLoading(true);
        const chaptersData = await getChapters(course.id);
        
        // Fetch articles for each chapter
        const chaptersWithArticlesData = await Promise.all(
          chaptersData.map(async (chapter: Chapter) => {
            const articles = await getChapterArticles(chapter.id);
            return { ...chapter, articles };
          })
        );
        
        // Transform chapters into accordion items with article lists
        const items = chaptersWithArticlesData.map((chapter: ChapterWithArticles) => ({
          id: chapter.id,
          title: chapter.title,
          content: (
            <div className="py-4">
              {chapter.articles.length > 0 ? (
                <ul className="space-y-4 py-2">
                  {chapter.articles.map((article) => (
                    <li key={article.id} className="px-2">
                      <Link 
                        href={`/course/${course.id}/article/${article.id}`}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <div className="mr-4 flex-shrink-0 w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-medium text-neutral-600">
                          {article.order_number || '•'}
                        </div>
                        <span className="text-gray-700">{article.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic px-2">No articles available for this chapter.</p>
              )}
            </div>
          ),
          chapterId: chapter.id
        }));
        
        setAccordionItems(items);
      } catch (error) {
        console.error("Error fetching chapters and articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChaptersAndArticles();
  }, [course]);

  if (isLoading) {
    return (
      <div className="w-full text-center py-8">
        <div className="inline-block animate-pulse">
          Loading chapters...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Course Chapters</h2>
      {accordionItems.length > 0 ? (
        <Accordion items={accordionItems} defaultAllOpen={true} />
      ) : (
        <p className="text-center py-4 text-gray-500">No chapters available for this course.</p>
      )}
    </div>
  );
}
