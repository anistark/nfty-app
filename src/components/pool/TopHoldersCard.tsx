import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Holder {
  address: string;
  exposure: string;
}

interface TopHoldersCardProps {
  holders: Holder[];
}

export const TopHoldersCard = ({ holders }: TopHoldersCardProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Top Holders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holders.map((holder, index) => (
            <div key={holder.address} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">#{index + 1}</span>
                <span className="font-mono">{holder.address}</span>
              </div>
              <span className="font-semibold">{holder.exposure}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};