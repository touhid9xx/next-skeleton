"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChartProps } from "@/types/chart";

export function BarChart({
  data,
  xAxisKey,
  bars,
  height = 300,
  title,
}: BarChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
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
          {bars.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.name || bar.key}
              fill={bar.color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
