'use client';

import { useState } from 'react';
import Greeting from "./Greeting";

import { Chapter } from "../_hooks/useChapterProgress";

type GreetingWithStateProps = {
  chapters: Chapter[];
};

export default function GreetingWithState({ chapters }: GreetingWithStateProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Fixed height container for greeting and stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 h-[280px] mb-4">
        <div className="lg:col-span-3 xl:col-span-2 h-full">
          <div className="group relative w-full h-full">
            {/* Background blur effects */}
            <div className="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/20 via-purple-400/25 to-indigo-400/20 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-tr from-orange-400/25 via-yellow-400/30 to-amber-400/20 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-r from-pink-300/15 to-purple-300/15 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
            </div>
            <Greeting 
              chapters={chapters} 
              isConstrained={true} 
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          </div>
        </div>
        <div className="lg:col-span-2 xl:col-span-1 h-full">
          <div className="h-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            Stats Component (Temporarily Disabled)
          </div>
        </div>
      </div>
      
      {/* Expandable roadmap section with proper spacing */}
      <div className="w-full">
        <Greeting 
          chapters={chapters} 
          isConstrained={false} 
          expandableOnly={true}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </div>
    </>
  );
}
