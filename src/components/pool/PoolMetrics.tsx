import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface PoolMetricsProps {
  tvl: string;
  apr: string;
  utilization: number;
  minimumInvestment: string;
  managementFee: string;
  performanceFee: string;
  lockupPeriod: string;
  contractAddress: string;
}

export const PoolMetrics = ({
  tvl,
  apr,
  utilization,
  minimumInvestment,
  managementFee,
  performanceFee,
  lockupPeriod,
  contractAddress,
}: PoolMetricsProps) => {
  const etherscanUrl = `https://sepolia.basescan.org/address/${contractAddress}`;

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="text-xl">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">TVL</span>
            <span className="font-semibold">{tvl}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">APR</span>
            <span className="font-semibold text-primary">{apr}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Utilization</span>
            <span className="font-semibold">{utilization}%</span>
          </div>
          <Progress value={utilization} className="h-2" />
        </div>
        <Separator />
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Pool Contract</span>
            <Button
              variant="link"
              className="flex items-center gap-2 text-primary p-0 h-auto"
              onClick={() => window.open(etherscanUrl, '_blank')}
            >
              {`${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Minimum Investment</span>
            <span>{minimumInvestment}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Management Fee</span>
            <span>{managementFee}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Performance Fee</span>
            <span>{performanceFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lock-up Period</span>
            <span>{lockupPeriod}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};