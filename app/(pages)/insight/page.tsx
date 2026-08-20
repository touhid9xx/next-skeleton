"use client";

import { Users, TrendingUp, DollarSign, Activity } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { BarChart, LineChart, PieChart, AreaChart } from "@/components/charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  BarChartData,
  LineChartData,
  PieChartData,
  AreaChartData,
} from "@/types/chart";

// Mock data with proper types
const monthlyData: LineChartData[] = [
  { month: "Jan", revenue: 4000, users: 2400, engagement: 65 },
  { month: "Feb", revenue: 3000, users: 1398, engagement: 72 },
  { month: "Mar", revenue: 5000, users: 9800, engagement: 78 },
  { month: "Apr", revenue: 2780, users: 3908, engagement: 82 },
  { month: "May", revenue: 1890, users: 4800, engagement: 75 },
  { month: "Jun", revenue: 2390, users: 3800, engagement: 88 },
  { month: "Jul", revenue: 3490, users: 4300, engagement: 85 },
  { month: "Aug", revenue: 4200, users: 5200, engagement: 90 },
  { month: "Sep", revenue: 4500, users: 6100, engagement: 87 },
  { month: "Oct", revenue: 3800, users: 5500, engagement: 92 },
  { month: "Nov", revenue: 5100, users: 6800, engagement: 95 },
  { month: "Dec", revenue: 6200, users: 7500, engagement: 98 },
];

const userDemographics: PieChartData[] = [
  { name: "18-24", value: 25 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 20 },
  { name: "45-54", value: 12 },
  { name: "55+", value: 8 },
];

const deviceData: PieChartData[] = [
  { name: "Desktop", value: 45 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 20 },
];

const engagementData: BarChartData[] = [
  { name: "Mon", pageViews: 2400, sessions: 1800 },
  { name: "Tue", pageViews: 3200, sessions: 2400 },
  { name: "Wed", pageViews: 2800, sessions: 2100 },
  { name: "Thu", pageViews: 3500, sessions: 2600 },
  { name: "Fri", pageViews: 4100, sessions: 3200 },
  { name: "Sat", pageViews: 1800, sessions: 1200 },
  { name: "Sun", pageViews: 1500, sessions: 1000 },
];

export default function InsightPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-gradient-primary">Insights Dashboard</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Real-time analytics and data-driven insights for your business.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$48,291"
          change={18}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KPICard
          title="Active Users"
          value="12,345"
          change={12}
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Growth Rate"
          value="23.5%"
          change={5.2}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          title="Engagement"
          value="78.4%"
          change={3.8}
          icon={<Activity className="h-4 w-4" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Users Trend */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Revenue & User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              data={monthlyData}
              xAxisKey="month"
              lines={[
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

        {/* Engagement Trend */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={monthlyData}
              xAxisKey="month"
              areas={[
                {
                  key: "engagement",
                  color: "hsl(var(--primary))",
                  name: "Engagement %",
                },
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={engagementData}
              xAxisKey="name"
              bars={[
                {
                  key: "pageViews",
                  color: "hsl(var(--primary))",
                  name: "Page Views",
                },
                {
                  key: "sessions",
                  color: "hsl(var(--chart-2))",
                  name: "Sessions",
                },
              ]}
              height={300}
            />
          </CardContent>
        </Card>

        {/* User Demographics */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={userDemographics}
              dataKey="value"
              nameKey="name"
              height={300}
              outerRadius={90}
            />
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Device Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Device Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={deviceData}
              dataKey="value"
              nameKey="name"
              height={250}
              outerRadius={80}
              colors={[
                "hsl(var(--primary))",
                "hsl(var(--chart-2))",
                "hsl(var(--chart-3))",
              ]}
            />
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle>Monthly Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={monthlyData.slice(0, 6)}
              xAxisKey="month"
              bars={[
                {
                  key: "revenue",
                  color: "hsl(var(--primary))",
                  name: "Revenue ($)",
                },
              ]}
              height={250}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
