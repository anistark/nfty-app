import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface LiquidityPoolCardProps {
  name: string;
  tvl: string;
  apr: string;
  utilization: number;
  performanceData: {
    date: string;
    value: number;
  }[];
}

export const LiquidityPoolCard = ({ name, tvl, apr, utilization, performanceData }: LiquidityPoolCardProps) => {
  const navigate = useNavigate();
  const poolSlug = name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Card 
      className="glass overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
      onClick={() => navigate(`/pools/${poolSlug}`)}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-muted-foreground">TVL</p>
            <p className="text-lg font-semibold">{tvl}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">APR</p>
            <p className="text-lg font-semibold text-primary">{apr}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Pool Utilization</p>
            <p className="text-sm font-medium">{utilization}%</p>
          </div>
          <Progress value={utilization} className="h-2" />
        </div>
        <div className="h-32">
          <ChartContainer config={{ line: { theme: { light: "#3b82f6", dark: "#3b82f6" } } }}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide />
              <YAxis hide />
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
  );
};