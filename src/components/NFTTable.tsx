import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Collection</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nfts.map((nft) => (
            <TableRow key={nft.name}>
              <TableCell className="font-medium">{nft.name}</TableCell>
              <TableCell className="text-primary">{nft.performance}</TableCell>
              <TableCell>{nft.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};