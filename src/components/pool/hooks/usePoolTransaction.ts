import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";

const POOL_ABI = [
  "function buyToken(uint256 amount) external returns (bool)",
  "function sellToken(uint256 amount) external returns (bool)"
];

export const usePoolTransaction = (tokenSymbol: string, tokenContractAddress: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session } = useSessionContext();

  const handleTransaction = async (amount: string, isBuying: boolean = true) => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: `Please log in to ${isBuying ? 'purchase' : 'sell'} ${tokenSymbol}`,
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to continue");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Convert amount based on whether buying (6 decimals for USDC) or selling (18 decimals for tokens)
      const decimals = isBuying ? 6 : 18;
      const amountInDecimals = ethers.parseUnits(amount, decimals);
      
      // Create contract instance
      const poolContract = new ethers.Contract(tokenContractAddress, POOL_ABI, signer);
      
      // Call appropriate method
      const tx = isBuying 
        ? await poolContract.buyToken(amountInDecimals)
        : await poolContract.sellToken(amountInDecimals);
      await tx.wait();

      toast({
        title: "Transaction Successful",
        description: `Successfully ${isBuying ? 'bought' : 'sold'} ${amount} ${tokenSymbol}`,
      });
    } catch (error) {
      console.error('Transaction error:', error);
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleTransaction, isLoading };
};