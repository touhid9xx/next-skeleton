"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChartProps } from "@/types/chart";

export function LineChart({
  data,
  xAxisKey,
  lines,
  height = 300,
  title,
}: LineChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey={xAxisKey}
            className="text-xs text-muted-foreground"
            tick={{ fill: "currentColor" }}
          />
          <YAxis
            className="text-xs text-muted-foreground"
            tick={{ fill: "currentColor" }}
            tickFormatter={(value: number) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--foreground)",
            }}
            formatter={(value: unknown) => {
              if (value === undefined || value === null) return ["N/A", ""];
              if (typeof value === "number") {
                return [value.toLocaleString(), ""];
              }
              return [String(value), ""];
            }}
          />
          <Legend />
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.name || line.key}
              stroke={line.color}
              strokeWidth={line.strokeWidth || 2}
              dot={{ fill: line.color }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
