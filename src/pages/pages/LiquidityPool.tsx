import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { PoolHeader } from "@/components/pool/PoolHeader";
import { PoolPerformanceCard } from "@/components/pool/PoolPerformanceCard";
import { PoolCompositionCard } from "@/components/pool/PoolCompositionCard";
import { NFTCollectionsCard } from "@/components/pool/NFTCollectionsCard";
import { TopHoldersCard } from "@/components/pool/TopHoldersCard";
import { PoolDetailsCard } from "@/components/pool/PoolDetailsCard";

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
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Background image with dark tint */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-24">
        <div className="max-w-7xl mx-auto">
          <PoolHeader 
            name={poolData.name}
            description="A curated index of blue-chip NFT collections"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <PoolPerformanceCard
              performance={poolData.performance}
              performanceData={poolData.performanceData}
            />
            <PoolCompositionCard weights={poolData.weights} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <NFTCollectionsCard collections={poolData.nftCollections} />
            <TopHoldersCard holders={poolData.holders} />
          </div>

          <PoolDetailsCard balance={poolData.balance} />

          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setShowRebalanceModal(true)}
              className="gap-2"
              variant="outline"
            >
              <RefreshCw className="h-4 w-4" />
              Rebalance Pool
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityPool;