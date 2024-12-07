import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SyntheticAsset {
  amount: number;
  collateral_amount: number;
  initial_price: number;
}

interface RiskWarningProps {
  assets: SyntheticAsset[];
}

export const RiskWarning = ({ assets }: RiskWarningProps) => {
  const hasRiskyPositions = assets.some(
    (asset) => asset.collateral_amount < asset.amount * asset.initial_price * 1.5
  );

  if (!hasRiskyPositions) return null;

  return (
    <Card className="border-red-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          Risk Warning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-red-500">
          Some of your positions are at risk of liquidation. Please add more collateral to maintain a healthy position.
        </p>
      </CardContent>
    </Card>
  );
};