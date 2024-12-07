import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SynthTokenInfoProps {
  symbol: string;
  contractAddress: string;
}

export const SynthTokenInfo = ({ symbol, contractAddress }: SynthTokenInfoProps) => {
  const etherscanUrl = `https://etherscan.io/address/${contractAddress}`;

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
              {`${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};