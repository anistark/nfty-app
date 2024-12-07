import { ChartBar, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SyntheticAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  collateral_amount: number;
  initial_price: number;
}

interface PortfolioOverviewProps {
  assets: SyntheticAsset[];
}

export const PortfolioOverview = ({ assets }: PortfolioOverviewProps) => {
  const totalCollateral = assets.reduce((sum, asset) => sum + asset.collateral_amount, 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5" />
          Portfolio Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{assets.length}</div>
                <p className="text-xs text-muted-foreground">Total Assets</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">${totalCollateral.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Total Collateral</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-500">+$1,234.56</div>
                <p className="text-xs text-muted-foreground">Unrealized P/L</p>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Collateral</TableHead>
                <TableHead>Initial Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.symbol}</TableCell>
                  <TableCell>{asset.amount}</TableCell>
                  <TableCell>${asset.collateral_amount}</TableCell>
                  <TableCell>${asset.initial_price}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};