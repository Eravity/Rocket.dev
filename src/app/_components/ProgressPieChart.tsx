"use client"

import { PieChart, Pie, Cell} from "recharts";

export default function ProgressPieChart({ data = 0 }: { data: number }) {
  const chartData = [
    { name: "completed", value: data },
    { name: "remaining", value: 100 - data },
  ];

  const COLORS = ["#82ca9d", "#f3f4f6"];

  return (
    <div style={{ width: 24, height: 24, display: "inline-block" }}>
      <PieChart width={24} height={24}>
        <Pie
          data={chartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={6}
          outerRadius={12}
          startAngle={0}
          endAngle={360}
          cornerRadius={10}
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
