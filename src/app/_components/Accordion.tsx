"use client";

import { useState, useEffect } from "react";
import { getChapterArticles } from "@/app/supabase/data-service";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  chapterId?: number; // Make chapterId optional
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onClick,
  chapterId,
}: AccordionItemProps) => {
  const [articlesCount, setArticlesCount] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      if (!chapterId) return;
      
      try {
        const articles = await getChapterArticles(chapterId);
        setArticlesCount(articles.length);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticlesCount(0);
      }
    };

    fetchArticles();
  }, [chapterId]);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        className="w-full py-4 px-6 text-left font-medium flex justify-between items-center bg-neutral-100 hover:bg-[#e2e2e299]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <div className="flex items-center gap-4">
          {chapterId && <p>{articlesCount} articles</p>}
          <span
            className={`transform transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
      </button>
      {isOpen && <div className="px-6 bg-white">{children}</div>}
    </div>
  );
};

type AccordionProps = {
  items: {
    id: string | number;
    title: string;
    content: React.ReactNode;
    chapterId?: number; // Make chapterId optional
  }[];
  defaultAllOpen?: boolean;
};

export default function Accordion({
  items,
  defaultAllOpen = true,
}: AccordionProps) {
  // Initialize with all indices if defaultAllOpen is true
  const initialOpenState = defaultAllOpen
    ? new Array(items.length).fill(0).map((_, i) => i)
    : [];

  const [openIndices, setOpenIndices] = useState<number[]>(initialOpenState);

  const toggleItem = (index: number) => {
    setOpenIndices((prevIndices) => {
      // If the index is already in the array, remove it
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      }
      // Otherwise add it
      return [...prevIndices, index];
    });
  };

  return (
    <div className="border-2 border-gray-200 container mx-auto rounded-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIndices.includes(index)}
          onClick={() => toggleItem(index)}
          chapterId={item.chapterId}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
