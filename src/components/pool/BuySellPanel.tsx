import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRightLeft } from "lucide-react";
import { Socket } from "@socket.tech/socket-v2-sdk";
import { ChainSelector, SUPPORTED_CHAINS } from "./ChainSelector";
import { ContractInfo } from "./ContractInfo";
import { usePoolTransaction } from "./hooks/usePoolTransaction";

interface BuySellPanelProps {
  poolName: string;
  tokenSymbol: string;
  tokenContractAddress: string;
}

export const BuySellPanel = ({
  poolName,
  tokenSymbol,
  tokenContractAddress,
}: BuySellPanelProps) => {
  const [amount, setAmount] = useState("");
  const [selectedChain, setSelectedChain] = useState(SUPPORTED_CHAINS[0].id);
  const [isBuying, setIsBuying] = useState(true);
  const { handleTransaction, isLoading } = usePoolTransaction(tokenSymbol, tokenContractAddress);

  // Initialize Socket SDK
  const socketClient = new Socket({
    apiKey: "SOCKET_API_KEY", // Replace with your Socket API key
    defaultQuotePreferences: {
      singleTxOnly: true,
    },
  });

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
            <ChainSelector 
              selectedChain={selectedChain}
              onChainSelect={setSelectedChain}
            />
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
            onClick={() => handleTransaction(amount, isBuying)}
            disabled={isLoading || !amount}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isBuying ? "Buy" : "Sell"} Tokens
          </Button>

          <ContractInfo 
            tokenContractAddress={tokenContractAddress}
            isBuying={isBuying}
          />
        </div>
      </CardContent>
    </Card>
  );
};