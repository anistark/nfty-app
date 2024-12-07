import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

interface TokenOverviewProps {
  performanceData: Array<{ date: string; value: number }>;
}

export const TokenOverview = ({ performanceData }: TokenOverviewProps) => {
  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold mb-6">Punk Token (PUNK)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Token Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ChartContainer config={{ line: { theme: { light: "#3b82f6", dark: "#3b82f6" } } }}>
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
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Token Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-xl font-semibold">$24.5M</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Circulating Supply</p>
              <p className="text-xl font-semibold">1,000,000 PUNK</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-xl font-semibold text-primary">$24.50</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Utilization</p>
              <Progress value={65} className="h-2" />
              <p className="text-sm text-right mt-1">65%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};