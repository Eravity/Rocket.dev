"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

const CHART_SIZE = 96;
const INNER_RADIUS = 36;
const OUTER_RADIUS = 46;
const START_ANGLE = 90;
const END_ANGLE = -270;
const CORNER_RADIUS = 10;

const COLORS = {
  completed: "#82ca9d",
  remaining: "#f3f4f6",
} as const;

// Use local state for dynamic updates
export default function GoalChart({ data }: { data: number }) {
  const [chartValue, setChartValue] = useState(data);

  useEffect(() => {
    setChartValue(data);
  }, [data]);

  // Adjust rendering: if progress exceeds 100, cap the visual display at 100%
  const validatedData = Math.max(0, chartValue);
  const primaryValue = validatedData > 100 ? 100 : validatedData;
  const chartData = [
    { value: primaryValue },
    { value: primaryValue < 100 ? 100 - primaryValue : 0 },
  ];

  return (
    <div
      style={{
        width: CHART_SIZE,
        height: CHART_SIZE,
        display: "inline-block",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
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
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? COLORS.completed : COLORS.remaining}
              stroke="none"
              strokeWidth={0}
            />
          ))}
        </Pie>
      </PieChart>
      <div
        className="absolute top-1/2 transform -translate-y-1/2"
        style={{
          left: `calc(${validatedData}% - 10px)`,
          width: "20px",
          height: "20px",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
