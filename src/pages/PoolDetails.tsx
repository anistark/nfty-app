import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { PoolPerformanceChart } from "@/components/pool/PoolPerformanceChart";
import { PoolMetrics } from "@/components/pool/PoolMetrics";
import { AssetAllocation } from "@/components/pool/AssetAllocation";
import { RebalanceModal } from "@/components/pool/RebalanceModal";
import { SynthTokenInfo } from "@/components/pool/SynthTokenInfo";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Mock performance data - in a real app, this would come from an API
const generatePerformanceData = () => 
  Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}d`,
    value: Math.random() * 100 + 50,
  }));

const PoolDetails = () => {
  const { poolId } = useParams();
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const { toast } = useToast();

  const { data: pool, isLoading, error } = useQuery({
    queryKey: ['pool', poolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('liquidity_pools')
        .select('*')
        .eq('slug', poolId)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 pt-24">Loading...</div>;
  }

  if (error || !pool) {
    return <div className="container mx-auto px-4 pt-24">Pool not found</div>;
  }

  // Mock assets data - in a real app, this would come from an API
  const assets = [
    { name: "BAYC", allocation: 30 },
    { name: "CryptoPunks", allocation: 25 },
    { name: "Azuki", allocation: 20 },
    { name: "Doodles", allocation: 15 },
    { name: "CloneX", allocation: 10 },
  ];

  // Mock contract address - in a real app, this would come from your backend
  const mockContractAddress = "0x1234567890123456789012345678901234567890";

  const handleRebalance = async () => {
    setIsRebalancing(true);
    try {
      // Here you would typically call your backend API to perform the rebalancing
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
      toast({
        title: "Pool Rebalanced",
        description: "The pool has been successfully rebalanced.",
      });
      setShowRebalanceModal(false);
    } catch (error) {
      toast({
        title: "Rebalancing Failed",
        description: "There was an error rebalancing the pool. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRebalancing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">{pool.name}</h1>
          <Button
            onClick={() => setShowRebalanceModal(true)}
            className="gap-2"
            variant="outline"
          >
            <RefreshCw className="h-4 w-4" />
            Rebalance Pool
          </Button>
        </div>
        <p className="text-lg text-muted-foreground mb-8">
          A curated index of blue-chip NFT collections including BAYC, CryptoPunks, and other established projects.
        </p>

        <SynthTokenInfo 
          symbol={pool.name.replace(" Pool", "").toUpperCase()} 
          contractAddress={mockContractAddress}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PoolPerformanceChart data={generatePerformanceData()} />
          <PoolMetrics
            tvl={pool.tvl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            apr={`${pool.apr}%`}
            utilization={pool.utilization}
            minimumInvestment={pool.minimum_investment}
            managementFee={pool.management_fee}
            performanceFee={pool.performance_fee}
            lockupPeriod={pool.lockup_period}
          />
        </div>

        <AssetAllocation assets={assets} />

        <RebalanceModal
          open={showRebalanceModal}
          onOpenChange={setShowRebalanceModal}
          assets={assets}
          isRebalancing={isRebalancing}
          onRebalance={handleRebalance}
        />
      </div>
    </div>
  );
};

export default PoolDetails;