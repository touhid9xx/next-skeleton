"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { KPICardProps } from "@/types/chart";

export function KPICard({
  title,
  value,
  change,
  changeLabel = "from last month",
  icon,
  className,
}: KPICardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <Card
      className={cn("hover:border-primary/50 transition-colors", className)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-primary">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="text-xs flex items-center gap-1 mt-1">
            <TrendIcon
              className={cn(
                "h-3 w-3",
                isPositive && "text-green-500",
                isNegative && "text-red-500",
                isNeutral && "text-muted-foreground",
              )}
            />
            <span
              className={cn(
                isPositive && "text-green-500",
                isNegative && "text-red-500",
                isNeutral && "text-muted-foreground",
              )}
            >
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-muted-foreground">{changeLabel}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
