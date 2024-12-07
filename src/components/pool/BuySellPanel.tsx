import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRightLeft, ExternalLink } from "lucide-react";
import { Socket } from "@socket.tech/socket-v2-sdk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BuySellPanelProps {
  poolName: string;
  tokenSymbol: string;
  tokenContractAddress: string;
}

const SUPPORTED_CHAINS = [
  { id: "1", name: "Ethereum" },
  { id: "137", name: "Polygon" },
  { id: "56", name: "BSC" },
  { id: "42161", name: "Arbitrum" },
  { id: "10", name: "Optimism" },
];

const USDC_CONTRACT_ADDRESS = "0xc48c8f6f4f2a5e277f5d706c18f95fdf5db7b524";
const USDC_EXPLORER_LINK = `https://sepolia.basescan.org/token/${USDC_CONTRACT_ADDRESS}`;

export const BuySellPanel = ({
  poolName,
  tokenSymbol,
  tokenContractAddress,
}: BuySellPanelProps) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChain, setSelectedChain] = useState(SUPPORTED_CHAINS[0].id);
  const { toast } = useToast();
  const [isBuying, setIsBuying] = useState(true);

  // Initialize Socket SDK
  const socketClient = new Socket({
    apiKey: "SOCKET_API_KEY", // Replace with your Socket API key
    defaultQuotePreferences: {
      singleTxOnly: true,
    },
  });

  const handleTransaction = async () => {
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
      // This is a simplified example. In production, you would:
      // 1. Get user's wallet address
      // 2. Get quote from Socket using the selected chain
      // 3. Execute the transaction
      // 4. Monitor transaction status
      
      toast({
        title: "Transaction Initiated",
        description: `${isBuying ? "Buying" : "Selling"} ${amount} ${tokenSymbol} using USDC on ${
          SUPPORTED_CHAINS.find(chain => chain.id === selectedChain)?.name
        }`,
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5" />
          {isBuying ? "Buy" : "Sell"} {poolName} Tokens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-muted-foreground">
              Amount ({isBuying ? "USDC" : tokenSymbol})
            </label>
            <Input
              type="number"
              placeholder={`Enter amount to ${isBuying ? "buy" : "sell"}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {isBuying && (
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-muted-foreground">
                Source Chain
              </label>
              <Select
                value={selectedChain}
                onValueChange={setSelectedChain}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select chain" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CHAINS.map((chain) => (
                    <SelectItem key={chain.id} value={chain.id}>
                      {chain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="flex gap-4">
            <Button
              variant={isBuying ? "default" : "outline"}
              className="flex-1"
              onClick={() => setIsBuying(true)}
            >
              Buy
            </Button>
            <Button
              variant={!isBuying ? "default" : "outline"}
              className="flex-1"
              onClick={() => setIsBuying(false)}
            >
              Sell
            </Button>
          </div>

          <Button
            className="w-full"
            onClick={handleTransaction}
            disabled={isLoading || !amount}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isBuying ? "Buy" : "Sell"} Tokens
          </Button>

          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              Token Contract: {tokenContractAddress}
            </p>
          </div>

          {isBuying && (
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                USDC Contract: {USDC_CONTRACT_ADDRESS}
              </p>
              <a 
                href={USDC_EXPLORER_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};