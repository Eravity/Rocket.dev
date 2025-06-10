"use client";
import Roadmap from "./Roadmap";

const sampleChapters = [
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
    title: "JavaScript Essentials",
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
  return <Roadmap chapters={sampleChapters} />;
}
