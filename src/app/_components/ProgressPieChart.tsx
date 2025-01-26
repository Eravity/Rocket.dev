"use client"

import { memo } from 'react';
import { PieChart, Pie, Cell } from "recharts";

// Constants
const CHART_SIZE = 24;
const INNER_RADIUS = 6;
const OUTER_RADIUS = 12;
const START_ANGLE = 90;
const END_ANGLE = -270;
const CORNER_RADIUS = 10;
const COLORS = {
  completed: "#82ca9d",
  remaining: "#f3f4f6"
} as const;

interface ProgressPieChartProps {
  data: number;
}

function ProgressPieChart({ data }: ProgressPieChartProps) {
  // Validate input
  const validatedData = Math.max(0, Math.min(100, data));

  const chartData = [
      { name: "completed" as const, value: validatedData },
      { name: "remaining" as const, value: 100 - validatedData },
    ];

  return (
    <div 
      style={{ 
        width: CHART_SIZE, 
        height: CHART_SIZE, 
        display: "inline-block" 
      }}
      role="img"
      aria-label={`Progress: ${validatedData}%`}
    >
      <PieChart width={CHART_SIZE} height={CHART_SIZE}>
        <Pie
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={INNER_RADIUS}
          outerRadius={OUTER_RADIUS}
          startAngle={START_ANGLE}
          endAngle={END_ANGLE}
          cornerRadius={CORNER_RADIUS}
        >
          {chartData.map((entry) => (
            <Cell 
              key={`cell-${entry.name}`} 
              fill={COLORS[entry.name]} 
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

// Memoize component to prevent unnecessary rerenders
export default memo(ProgressPieChart);
