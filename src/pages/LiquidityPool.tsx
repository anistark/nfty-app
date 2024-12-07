import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { NFTTable } from "@/components/NFTTable";
import { Separator } from "@/components/ui/separator";

// Mock data - in a real app, this would come from an API
const poolData = {
  name: "Blue Chip NFT Index Fund",
  balance: "$2.5M",
  performance: {
    daily: "+2.4%",
    weekly: "+8.7%",
    monthly: "+15.2%"
  },
  nftCollections: [
    { name: "BAYC", performance: "+5.2%", volume: "$1.2M" },
    { name: "CryptoPunks", performance: "+3.8%", volume: "$980K" },
    { name: "Azuki", performance: "+2.1%", volume: "$750K" },
    { name: "Doodles", performance: "-1.2%", volume: "$420K" }
  ],
  weights: [
    { name: "BAYC", weight: 35 },
    { name: "CryptoPunks", weight: 30 },
    { name: "Azuki", weight: 20 },
    { name: "Doodles", weight: 15 }
  ],
  holders: [
    { address: "0x1234...5678", exposure: "15%" },
    { address: "0x8765...4321", exposure: "12%" },
    { address: "0x9876...5432", exposure: "10%" }
  ],
  performanceData: Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}d`,
    value: Math.random() * 100 + 50
  }))
};

const LiquidityPool = () => {
  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{poolData.name}</h1>
          <p className="text-lg text-muted-foreground">
            A curated index of blue-chip NFT collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Pool Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer config={{ line: { theme: { light: "#3b82f6", dark: "#3b82f6" } } }}>
                  <AreaChart data={poolData.performanceData}>
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
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">24h</p>
                  <p className="text-lg font-semibold text-primary">{poolData.performance.daily}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">7d</p>
                  <p className="text-lg font-semibold text-primary">{poolData.performance.weekly}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">30d</p>
                  <p className="text-lg font-semibold text-primary">{poolData.performance.monthly}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Pool Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {poolData.weights.map((asset) => (
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="glass">
            <CardHeader>
              <CardTitle>NFT Collections Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <NFTTable nfts={poolData.nftCollections} />
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Top Holders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {poolData.holders.map((holder, index) => (
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
        </div>

        <Card className="glass mb-8">
          <CardHeader>
            <CardTitle>Pool Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-2">Total Value Locked</h3>
                <p className="text-2xl font-bold">{poolData.balance}</p>
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
      </div>
    </div>
  );
};

export default LiquidityPool;