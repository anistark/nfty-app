import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Asset {
  name: string;
  allocation: number;
}

interface AssetAllocationProps {
  assets: Asset[];
}

export const AssetAllocation = ({ assets }: AssetAllocationProps) => {
  return (
    <Card className="glass mb-8">
      <CardHeader>
        <CardTitle className="text-xl">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.map((asset) => (
            <div key={asset.name}>
              <div className="flex justify-between mb-2">
                <span>{asset.name}</span>
                <span>{asset.allocation}%</span>
              </div>
              <Progress value={asset.allocation} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};