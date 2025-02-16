"use client";
import Roadmap from "./Roadmap";

const sampleChapters = [
  { id: 0, title: "Introduction", description: "Basics", completion: 100 },
  { id: 1, title: "Web Foundations", description: "HTML & CSS", completion: 100 },
  { id: 2, title: "Interactive Coding", description: "JavaScript & TS", completion: 100 },
  { id: 3, title: "Version Control", description: "Git", completion: 0 },
  { id: 4, title: "Data & APIs", description: "Databases & API", completion: 0 },
  { id: 5, title: "Modern UI", description: "React", completion: 0 },
  { id: 6, title: "Full-Stack Mastery", description: "Next.js", completion: 0 },
  { id: 7, title: "Automation & AI", description: "AI & Automation", completion: 0 },
  { id: 8, title: "Graduation", description: "Final", completion: 0 }
];

export default function Treat() {
  return (
    <div className="relative rounded-xl flex flex-col md:flex-row gap-4 md:gap-0 justify-between py-6 px-16 min-h-[140px] bg-white border border-gray-200">
      <Roadmap chapters={sampleChapters} />
    </div>
  );
}
