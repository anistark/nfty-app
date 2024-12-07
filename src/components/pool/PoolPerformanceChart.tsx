import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface PerformanceData {
  date: string;
  value: number;
}

interface PoolPerformanceChartProps {
  data: PerformanceData[];
}

export const PoolPerformanceChart = ({ data }: PoolPerformanceChartProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl">Pool Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer config={{ line: { theme: { light: "#3b82f6", dark: "#3b82f6" } } }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="url(#gradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};