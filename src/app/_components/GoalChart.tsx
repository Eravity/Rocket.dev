"use client";
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

export default function GoalChart({ data }: { data: number }) {
  // Assume data is already a percentage (0-100)
  const validatedData = Math.max(0, Math.min(100, data));
  
  const chartData = [
    { value: validatedData },
    { value: 100 - validatedData },
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
            <Cell key={`cell-${index}`} fill={index === 0 ? COLORS.completed : COLORS.remaining} />
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
