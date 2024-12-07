import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TokenOverview } from "@/components/synth-token/TokenOverview";
import { LiquidityPoolsTabs } from "@/components/synth-token/LiquidityPoolsTabs";

const performanceData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}d`,
  value: Math.random() * 100 + 50,
}));

const SynthToken = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreatePool = () => {
    navigate('/create-pool');
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        <TokenOverview performanceData={performanceData} />

        {/* Create Pool Button */}
        <div className="mb-8">
          <Button onClick={handleCreatePool} className="w-full md:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Start New Liquidity Pool
          </Button>
        </div>

        <LiquidityPoolsTabs />
      </div>
    </div>
  );
};

export default SynthToken;