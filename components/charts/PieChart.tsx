"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChartProps } from "@/types/chart";

export function PieChart({
  data,
  dataKey,
  nameKey,
  colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ],
  height = 300,
  title,
  innerRadius = 0,
  outerRadius = 80,
}: PieChartProps) {
  // Custom label formatter with proper null/undefined handling
  const renderCustomLabel = ({
    name,
    percent,
  }: {
    name?: string;
    percent?: number;
  }) => {
    if (!name || percent === undefined || percent === null) {
      return "";
    }
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            label={renderCustomLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
            formatter={(value: unknown) => {
              if (value === undefined || value === null) return ["N/A", ""];
              if (typeof value === "number") {
                return [`${value}%`, ""];
              }
              return [String(value), ""];
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
