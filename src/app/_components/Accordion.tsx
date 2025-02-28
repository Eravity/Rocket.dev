"use client";

import { useState } from "react";

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
};

const AccordionItem = ({ title, children, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 px-6 text-left font-medium flex justify-between items-center hover:bg-gray-50"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="py-3 px-6 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

type AccordionProps = {
  items: {
    id: string | number;
    title: string;
    content: React.ReactNode;
  }[];
  defaultOpenIndex?: number;
};

export default function Accordion({ items, defaultOpenIndex = -1 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
