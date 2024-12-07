import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PoolConfigurationForm, PoolFormData } from "@/components/pool/PoolConfigurationForm";
import { SmartContractPreview } from "@/components/pool/SmartContractPreview";
import { useState } from "react";

const CreateLiquidityPool = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PoolFormData | null>(null);

  const handleSubmit = async (values: PoolFormData) => {
    try {
      console.log("Creating pool with values:", values);
      toast({
        title: "Pool Created",
        description: "Your liquidity pool has been created successfully.",
      });
      navigate("/synth-token");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create pool. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Create New Liquidity Pool</h1>
          
          <div className="grid gap-8">
            <PoolConfigurationForm 
              onSubmit={async (values) => {
                setFormData(values);
                await handleSubmit(values);
              }}
            />
            
            {formData && (
              <SmartContractPreview
                poolName={formData.poolName}
                platformFee={formData.platformFee}
                managementFee={formData.managementFee}
                performanceFee={formData.performanceFee}
                minimumInvestment={formData.minimumInvestment}
                lockupPeriod={formData.lockupPeriod}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateLiquidityPool;