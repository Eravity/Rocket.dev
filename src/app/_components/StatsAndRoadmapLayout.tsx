/**
 * Example usage of Stats and Roadmap components with equal heights
 * 
 * This example shows how to properly layout the Stats and Roadmap components
 * so they maintain consistent heights across all viewports.
 */

import Stats from "./Stats";
import RoadmapWidget from "./RoadmapWidget";
import EqualHeightWrapper from "./EqualHeightWrapper";

export default function StatsAndRoadmapLayout() {
  return (
    <div className="container mx-auto p-4 h-full min-h-screen">
      {/* Main layout grid - both components will have equal heights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch h-full">
        {/* Roadmap Section */}
        <EqualHeightWrapper>
          <RoadmapWidget />
        </EqualHeightWrapper>
        
        {/* Stats Section */}
        <EqualHeightWrapper>
          <Stats />
        </EqualHeightWrapper>
      </div>
    </div>
  );
}

// Alternative layout without the wrapper (recommended approach)
export function DirectStatsAndRoadmapLayout() {
  return (
    <div className="container mx-auto p-4 h-full min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch h-full">
        {/* Both components now have built-in height matching */}
        <RoadmapWidget />
        <Stats />
      </div>
    </div>
  );
}
