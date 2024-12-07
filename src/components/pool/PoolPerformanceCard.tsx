import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Performance {
  daily: string;
  weekly: string;
  monthly: string;
}

interface PerformanceData {
  date: string;
  value: number;
}

interface PoolPerformanceCardProps {
  performance: Performance;
  performanceData: PerformanceData[];
}

export const PoolPerformanceCard = ({ performance, performanceData }: PoolPerformanceCardProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Pool Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer config={{ line: { theme: { light: "#3b82f6", dark: "#3b82f6" } } }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
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
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">24h</p>
            <p className="text-lg font-semibold text-primary">{performance.daily}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">7d</p>
            <p className="text-lg font-semibold text-primary">{performance.weekly}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">30d</p>
            <p className="text-lg font-semibold text-primary">{performance.monthly}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};