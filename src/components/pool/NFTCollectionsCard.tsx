import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NFTTable } from "@/components/NFTTable";

interface NFTCollection {
  name: string;
  performance: string;
  volume: string;
}

interface NFTCollectionsCardProps {
  collections: NFTCollection[];
}

export const NFTCollectionsCard = ({ collections }: NFTCollectionsCardProps) => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>NFT Collections Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <NFTTable nfts={collections} />
      </CardContent>
    </Card>
  );
};