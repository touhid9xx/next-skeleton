"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, AreaChart } from "@/components/charts";
import { KPICard } from "@/components/KPICard";
import { TrendingUp, Target, Calendar, BarChart3 } from "lucide-react";
import type { LineChartData, BarChartData, AreaChartData } from "@/types/chart";

// Mock projection data with proper types
const quarterlyProjections: LineChartData[] = [
  {
    quarter: "Q1 2024",
    actual: 125000,
    projected: 130000,
    optimistic: 140000,
    pessimistic: 120000,
  },
  {
    quarter: "Q2 2024",
    actual: 142000,
    projected: 148000,
    optimistic: 158000,
    pessimistic: 138000,
  },
  {
    quarter: "Q3 2024",
    actual: 158000,
    projected: 165000,
    optimistic: 175000,
    pessimistic: 155000,
  },
  {
    quarter: "Q4 2024",
    actual: 175000,
    projected: 182000,
    optimistic: 195000,
    pessimistic: 170000,
  },
  {
    quarter: "Q1 2025",
    actual: null,
    projected: 195000,
    optimistic: 210000,
    pessimistic: 180000,
  },
  {
    quarter: "Q2 2025",
    actual: null,
    projected: 210000,
    optimistic: 228000,
    pessimistic: 195000,
  },
  {
    quarter: "Q3 2025",
    actual: null,
    projected: 228000,
    optimistic: 248000,
    pessimistic: 210000,
  },
  {
    quarter: "Q4 2025",
    actual: null,
    projected: 245000,
    optimistic: 268000,
    pessimistic: 225000,
  },
];

const yearlyGrowth: BarChartData[] = [
  { year: "2020", revenue: 45000, users: 3200 },
  { year: "2021", revenue: 68000, users: 4800 },
  { year: "2022", revenue: 95000, users: 7200 },
  { year: "2023", revenue: 125000, users: 9800 },
  { year: "2024", revenue: 165000, users: 12500 },
  { year: "2025", revenue: 215000, users: 15800 },
  { year: "2026", revenue: 280000, users: 20000 },
];

const monthlyForecast: AreaChartData[] = [
  { month: "Jan", current: 15500, projected: 16800 },
  { month: "Feb", current: 16200, projected: 17400 },
  { month: "Mar", current: 15800, projected: 18100 },
  { month: "Apr", current: 17100, projected: 18800 },
  { month: "May", current: 16900, projected: 19500 },
  { month: "Jun", current: 18200, projected: 20200 },
  { month: "Jul", current: 0, projected: 21000 },
  { month: "Aug", current: 0, projected: 21800 },
  { month: "Sep", current: 0, projected: 22600 },
  { month: "Oct", current: 0, projected: 23500 },
  { month: "Nov", current: 0, projected: 24400 },
  { month: "Dec", current: 0, projected: 25300 },
];

export default function ProjectionPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient-primary">Projections & Forecasts</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Future trends, forecasts, and strategic planning insights.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Projected Revenue 2025"
          value="$280,000"
          change={28}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          title="Target Users"
          value="20,000"
          change={23}
          icon={<Target className="h-4 w-4" />}
        />
        <KPICard
          title="YoY Growth"
          value="32.5%"
          change={5.8}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <KPICard
          title="Forecast Period"
          value="24 Months"
          change={0}
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      {/* Main Projection Chart */}
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle>Revenue Projections with Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={quarterlyProjections}
            xAxisKey="quarter"
            lines={[
              { key: "actual", color: "hsl(var(--primary))", name: "Actual" },
              {
                key: "projected",
                color: "hsl(var(--chart-2))",
                name: "Projected",
                strokeWidth: 3,
              },
              {
                key: "optimistic",
                color: "hsl(var(--chart-4))",
                name: "Optimistic",
                strokeWidth: 1.5,
              },
              {
                key: "pessimistic",
                color: "hsl(var(--chart-3))",
                name: "Pessimistic",
                strokeWidth: 1.5,
              },
            ]}
            height={350}
          />
        </CardContent>
      </Card>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Growth */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Yearly Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={yearlyGrowth}
              xAxisKey="year"
              bars={[
                {
                  key: "revenue",
                  color: "hsl(var(--primary))",
                  name: "Revenue ($)",
                },
                { key: "users", color: "hsl(var(--chart-2))", name: "Users" },
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Monthly Forecast */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Monthly Forecast (Next 12 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={monthlyForecast}
              xAxisKey="month"
              areas={[
                {
                  key: "current",
                  color: "hsl(var(--primary))",
                  name: "Current",
                },
                {
                  key: "projected",
                  color: "hsl(var(--chart-2))",
                  name: "Projected",
                },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Forecast Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Best Case
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$268,000</div>
            <p className="text-sm text-muted-foreground mt-2">
              Optimistic scenario with aggressive growth
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm">
                <span className="text-green-500">↑ 8.5%</span> above target
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors border-primary/30">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Most Likely
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$245,000</div>
            <p className="text-sm text-muted-foreground mt-2">
              Based on current trends and market conditions
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm">
                <span className="text-primary">✓</span> Recommended target
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Worst Case
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">$225,000</div>
            <p className="text-sm text-muted-foreground mt-2">
              Conservative estimate with market volatility
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm">
                <span className="text-red-500">↓ 8.2%</span> below target
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-primary">
                Growth Drivers
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 32.5% YoY revenue growth projected</li>
                <li>• User base expected to reach 20,000 by 2026</li>
                <li>• Mobile engagement increasing by 15%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">Risk Factors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Market volatility in Q3-Q4</li>
                <li>• Competition from new entrants</li>
                <li>• Potential regulatory changes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
