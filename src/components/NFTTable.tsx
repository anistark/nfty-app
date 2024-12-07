import { ArrowUp } from "lucide-react";

interface NFT {
  name: string;
  performance: string;
  volume: string;
}

interface NFTTableProps {
  nfts: NFT[];
}

export const NFTTable = ({ nfts }: NFTTableProps) => {
  return (
    <div className="w-full space-y-2">
      {/* Header */}
      <div className="hidden md:grid md:grid-cols-3 text-sm font-medium text-muted-foreground mb-2 px-4">
        <div>Collection</div>
        <div>Performance</div>
        <div>Volume</div>
      </div>
      
      {/* List Items */}
      <div className="space-y-2">
        {nfts.map((nft) => (
          <div
            key={nft.name}
            className="group glass rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:bg-black/40 cursor-pointer"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                  <ArrowUp className="w-4 h-4" />
                </div>
                <span className="font-medium">{nft.name}</span>
              </div>
              
              <div className="flex items-center md:justify-start justify-between">
                <span className="md:hidden text-sm text-muted-foreground">Performance:</span>
                <span className="text-primary">{nft.performance}</span>
              </div>
              
              <div className="flex items-center md:justify-start justify-between">
                <span className="md:hidden text-sm text-muted-foreground">Volume:</span>
                <span>{nft.volume}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};