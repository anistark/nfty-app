import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SUPPORTED_CHAINS = [
  { id: "84532", name: "Base Sepolia" },
  { id: "8453", name: "Base" },
  { id: "1", name: "Ethereum" },
  { id: "137", name: "Polygon" },
  { id: "56", name: "BSC" },
];

interface ChainSelectorProps {
  selectedChain: string;
  onChainSelect: (chainId: string) => void;
}

export const ChainSelector = ({ selectedChain, onChainSelect }: ChainSelectorProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-muted-foreground">
        Source Chain
      </label>
      <Select
        value={selectedChain}
        onValueChange={onChainSelect}
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
  );
};