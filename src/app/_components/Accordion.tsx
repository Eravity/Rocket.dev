"use client";

import { useState, useEffect } from "react";
import { getChapterArticles } from "@/app/_supabase/data-service";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  chapterId?: string | number; 
  isSanityChapter?: boolean; 
  lessonCount?: number; 
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onClick,
  chapterId,
  isSanityChapter = false,
  lessonCount = 0, 
}: AccordionItemProps) => {
  const [articlesCount, setArticlesCount] = useState(0);

  useEffect(() => {
    // Skip any data fetching for Sanity chapters to prevent loops
    if (isSanityChapter || typeof chapterId !== 'number') {
      return;
    }

    let isMounted = true;
    const fetchArticles = async () => {
      try {
        const articles = await getChapterArticles(chapterId as number);
        if (isMounted) {
          setArticlesCount(articles.length);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        if (isMounted) {
          setArticlesCount(0);
        }
      }
    };

    fetchArticles();
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [chapterId, isSanityChapter]);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        className="w-full py-4 px-6 text-left font-medium flex justify-between items-center bg-neutral-100 hover:bg-[#e2e2e299]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <div className="flex items-center gap-4">
          {!isSanityChapter && chapterId && <p>{articlesCount} articles</p>}
          {isSanityChapter && <p>{lessonCount} lessons</p>}
          <span
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </button>
      {isOpen && <div className="bg-white">{children}</div>}
    </div>
  );
};

type AccordionProps = {
  items: {
    id: string | number;
    title: string;
    content: React.ReactNode;
    chapterId?: number | string; 
    isSanityChapter?: boolean;
    lessonCount?: number; 
  }[];
  defaultAllOpen?: boolean;
};

export default function Accordion({
  items,
  defaultAllOpen = true,
}: AccordionProps) {
  const safeItems = Array.isArray(items) ? items : [];

  const initialOpenState = defaultAllOpen
    ? new Array(safeItems.length).fill(0).map((_, i) => i)
    : [];

  const [openIndices, setOpenIndices] = useState<number[]>(initialOpenState);

  const toggleItem = (index: number) => {
    setOpenIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      }
      return [...prevIndices, index];
    });
  };

  // Add defensive check before rendering
  if (!safeItems.length) {
    return (
      <div className="border border-gray-200 container mx-auto rounded-md overflow-hidden p-4 text-center">
        No content available
      </div>
    );
  }

  return (
    <div className="border-2 border-gray-200 container mx-auto rounded-md overflow-hidden">
      {safeItems.map((item, index) => (
        <AccordionItem
          key={item.id || index}
          title={item.title || "Untitled"}
          isOpen={openIndices.includes(index)}
          onClick={() => toggleItem(index)}
          chapterId={item.chapterId}
          isSanityChapter={item.isSanityChapter}
          lessonCount={item.lessonCount || 0}
        >
          {item.content || "No content available"}
        </AccordionItem>
      ))}
    </div>
  );
}
