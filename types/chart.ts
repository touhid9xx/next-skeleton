// Base chart data types
export type ChartDataPoint = Record<string, string | number | null>;

// Specific chart data types
export type BarChartData = ChartDataPoint;
export type LineChartData = ChartDataPoint;
export type AreaChartData = ChartDataPoint;

// Pie chart data - more specific since it needs name and value
export interface PieChartData {
  name: string;
  value: number;
  [key: string]: string | number; // Allow additional properties
}

// Bar chart configuration
export interface BarConfig {
  key: string;
  color: string;
  name?: string;
}

export interface BarChartProps {
  data: BarChartData[];
  xAxisKey: string;
  bars: BarConfig[];
  height?: number;
  title?: string;
}

// Line chart configuration
export interface LineConfig {
  key: string;
  color: string;
  name?: string;
  strokeWidth?: number;
}

export interface LineChartProps {
  data: LineChartData[];
  xAxisKey: string;
  lines: LineConfig[];
  height?: number;
  title?: string;
}

// Pie chart configuration
export interface PieChartProps {
  data: PieChartData[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
  height?: number;
  title?: string;
  innerRadius?: number;
  outerRadius?: number;
}

// Area chart configuration
export interface AreaConfig {
  key: string;
  color: string;
  name?: string;
  strokeWidth?: number;
}

export interface AreaChartProps {
  data: AreaChartData[];
  xAxisKey: string;
  areas: AreaConfig[];
  height?: number;
  title?: string;
}

// KPI Card configuration
export interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

// Additional utility type for chart data with specific keys
export type ChartDataWithKeys<T extends string> = Record<
  T,
  string | number | null
> &
  Record<string, string | number | null>;
