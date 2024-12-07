import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Weight {
  name: string;
  weight: number;
}

interface PoolCompositionCardProps {
  weights: Weight[];
}

export const PoolCompositionCard = ({ weights }: PoolCompositionCardProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Pool Composition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weights.map((asset) => (
            <div key={asset.name}>
              <div className="flex justify-between mb-2">
                <span>{asset.name}</span>
                <span>{asset.weight}%</span>
              </div>
              <Progress value={asset.weight} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};