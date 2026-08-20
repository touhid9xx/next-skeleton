"use client";

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AreaChartProps } from "@/types/chart";

export function AreaChart({
  data,
  xAxisKey,
  areas,
  height = 300,
  title,
}: AreaChartProps) {
  return (
    <div className="w-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data}>
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
          {areas.map((area) => (
            <Area
              key={area.key}
              type="monotone"
              dataKey={area.key}
              name={area.name || area.key}
              stroke={area.color}
              fill={`${area.color}33`}
              strokeWidth={area.strokeWidth || 2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
