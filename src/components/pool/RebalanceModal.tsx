import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface Asset {
  name: string;
  allocation: number;
}

interface RebalanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assets: Asset[];
  isRebalancing: boolean;
  onRebalance: () => Promise<void>;
}

export const RebalanceModal = ({
  open,
  onOpenChange,
  assets,
  isRebalancing,
  onRebalance,
}: RebalanceModalProps) => {
  const [allocations, setAllocations] = useState<{ [key: string]: number }>(
    Object.fromEntries(assets.map(asset => [asset.name, asset.allocation]))
  );

  const handleSliderChange = (value: number[], assetName: string) => {
    setAllocations(prev => ({
      ...prev,
      [assetName]: value[0]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rebalance Pool</DialogTitle>
          <DialogDescription>
            This action will rebalance the pool according to the target allocation weights.
            Adjust the sliders to set new target allocations:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            {assets.map((asset) => (
              <div key={asset.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{asset.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {allocations[asset.name]}%
                  </span>
                </div>
                <Slider
                  defaultValue={[asset.allocation]}
                  max={90}
                  min={1}
                  step={1}
                  onValueChange={(value) => handleSliderChange(value, asset.name)}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current: {(asset.allocation * (1 + (Math.random() * 0.2 - 0.1))).toFixed(1)}%</span>
                  <span>Target: {allocations[asset.name]}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onRebalance} disabled={isRebalancing}>
            {isRebalancing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Rebalancing...
              </>
            ) : (
              "Confirm Rebalance"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};