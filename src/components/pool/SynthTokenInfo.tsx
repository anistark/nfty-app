import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SynthTokenInfoProps {
  symbol: string;
  tokenContractAddress: string;
}

export const SynthTokenInfo = ({ symbol, tokenContractAddress }: SynthTokenInfoProps) => {
  const etherscanUrl = `https://sepolia.basescan.org/address/${tokenContractAddress}`;

  return (
    <Card className="glass mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Synth Token Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Token Symbol</span>
            <span className="font-semibold">${symbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Contract Address</span>
            <Button
              variant="link"
              className="flex items-center gap-2 text-primary"
              onClick={() => window.open(etherscanUrl, '_blank')}
            >
              {`${tokenContractAddress.slice(0, 6)}...${tokenContractAddress.slice(-4)}`}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};