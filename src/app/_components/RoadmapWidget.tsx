"use client";
import { useState } from "react";
import Roadmap from "./Roadmap";

const initialChapters = [
  {
    id: 0,
    title: "Getting Started",
    description:
      "Learn the fundamentals of web development and set up your development environment",
    completion: 100,
  },
  {
    id: 1,
    title: "HTML & CSS",
    description:
      "Master the building blocks of the web with semantic HTML and modern CSS",
    completion: 100,
  },
  {
    id: 2,
    title: "JS Essentials",
    description:
      "Dive into JavaScript programming and TypeScript for type-safe development",
    completion: 85,
  },
  {
    id: 3,
    title: "Version Control with Git",
    description:
      "Learn Git workflows, branching, and collaborative development practices",
    completion: 45,
  },
  {
    id: 4,
    title: "Backend & APIs",
    description:
      "Build RESTful APIs, work with databases, and understand server-side concepts",
    completion: 0,
  },
  {
    id: 5,
    title: "React Development",
    description:
      "Create interactive UIs with React, hooks, state management, and component patterns",
    completion: 0,
  },
  {
    id: 6,
    title: "Full-Stack with Next.js",
    description:
      "Build production-ready applications with Next.js, deployment, and optimization",
    completion: 0,
  },
  {
    id: 7,
    title: "Advanced Topics",
    description:
      "Explore AI integration, automation, testing, and advanced development patterns",
    completion: 0,
  },
  {
    id: 8,
    title: "You've made it!",
    description:
      "Congratulations for completing the course!",
    completion: 0,
  },
];

export default function RoadmapWidget() {
  const [chapters, setChapters] = useState(initialChapters);

  // Helper function to update chapter completion (for testing)
  const updateChapterCompletion = (id: number, completion: number) => {
    setChapters(prev => 
      prev.map(chapter => 
        chapter.id === id ? { ...chapter, completion } : chapter
      )
    );
  };

  return (
    <div>
      <Roadmap chapters={chapters} />
      {/* Optional: Add dev controls for testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold mb-2">Dev Controls:</h3>
          <div className="flex flex-wrap gap-2">
            {chapters.map(chapter => (
              <button
                key={chapter.id}
                onClick={() => updateChapterCompletion(chapter.id, chapter.completion < 100 ? 100 : 0)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Toggle {chapter.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
