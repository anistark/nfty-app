import { Code } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SmartContractPreviewProps {
  poolName: string;
  platformFee: string;
  managementFee: string;
  performanceFee: string;
  minimumInvestment: string;
  lockupPeriod: string;
}

export const SmartContractPreview = ({
  poolName,
  platformFee,
  managementFee,
  performanceFee,
  minimumInvestment,
  lockupPeriod,
}: SmartContractPreviewProps) => {
  const contractCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LiquidityPool {
    string public name = "${poolName}";
    uint256 public platformFee = ${platformFee};
    uint256 public managementFee = ${managementFee};
    uint256 public performanceFee = ${performanceFee};
    uint256 public minimumInvestment = ${minimumInvestment};
    uint256 public lockupPeriod = ${lockupPeriod};
    
    constructor(
        string memory _name,
        uint256 _platformFee,
        uint256 _managementFee,
        uint256 _performanceFee,
        uint256 _minimumInvestment,
        uint256 _lockupPeriod
    ) {
        name = _name;
        platformFee = _platformFee;
        managementFee = _managementFee;
        performanceFee = _performanceFee;
        minimumInvestment = _minimumInvestment;
        lockupPeriod = _lockupPeriod;
    }
    
    // Additional pool logic will be implemented here
}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Smart Contract Preview
        </CardTitle>
        <CardDescription>
          This is a preview of the smart contract that will be deployed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
          <code className="text-sm">{contractCode}</code>
        </pre>
      </CardContent>
    </Card>
  );
};