import { ExternalLink } from "lucide-react";

interface ContractInfoProps {
  tokenContractAddress: string;
  isBuying: boolean;
}

const USDC_CONTRACT_ADDRESS = "0xc48c8f6f4f2a5e277f5d706c18f95fdf5db7b524";
const USDC_EXPLORER_LINK = `https://sepolia.basescan.org/token/${USDC_CONTRACT_ADDRESS}`;

export const ContractInfo = ({ tokenContractAddress, isBuying }: ContractInfoProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">
          Token Contract: {tokenContractAddress}
        </p>
        <a 
          href={`https://sepolia.basescan.org/token/${tokenContractAddress}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
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
    </>
  );
};