import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PoolDetailsCardProps {
  balance: string;
}

export const PoolDetailsCard = ({ balance }: PoolDetailsCardProps) => {
  return (
    <Card className="glass mb-8">
      <CardHeader>
        <CardTitle>Pool Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Total Value Locked</h3>
            <p className="text-2xl font-bold">{balance}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Management Fee</h3>
            <p className="text-2xl font-bold">2%</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Performance Fee</h3>
            <p className="text-2xl font-bold">20%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};