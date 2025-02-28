"use client";

import { useState } from "react";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        className="w-full py-4 px-6 text-left font-medium flex justify-between items-center bg-neutral-100 hover:bg-[#e2e2e299]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>
      {isOpen && <div className="py-3 px-6 bg-white">{children}</div>}
    </div>
  );
};

type AccordionProps = {
  items: {
    id: string | number;
    title: string;
    content: React.ReactNode;
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
    <div className="border border-gray-200 container mx-auto rounded-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIndices.includes(index)}
          onClick={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
