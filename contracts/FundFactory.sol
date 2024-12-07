// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./LaunchPool.sol";

contract FundFactory is Ownable {


    //list of all the index funds deployed from this factory
    address[] public indexFunds;
    address constant USDC = address(0xc48C8f6f4F2A5E277f5d706c18f95FdF5Db7b524);
    uint64 public fundCounts;
    struct Fund {
        address fundAddress;
        string[] holdings;       
        uint256 lastUpdatedValue;
        uint256 fundLaunchDate;
        uint256 saleStartsAt;
        uint256 endOfSaleDate;
        uint256 softCap;         // soft target to reach for a index to be initialized in usd
        uint256 raised;          // raised amount
        uint16 status;           // 1 for upcoming, 2 for active, 3 for completed
        uint8 currentRound;      // there can be multiple rounds
    }

    mapping(address => Fund) funds;


    constructor() Ownable(msg.sender) {
    }

    function launchPool(string[] memory nfts, uint256 _saleStartsAt, uint256 saleDuration, uint256 _softCap, string memory _name, string memory _ticker) external onlyOwner {
        LaunchPool lp = new LaunchPool(USDC, _name, _ticker);
        Fund memory fund = Fund({
            fundAddress: address(lp),
            holdings: nfts, 
            lastUpdatedValue: 0,
            fundLaunchDate: block.timestamp,
            saleStartsAt: _saleStartsAt,
            endOfSaleDate: _saleStartsAt + saleDuration,
            softCap: _softCap,
            raised: 0,
            status: 1,
            currentRound: 1            
        });
        funds[address(lp)] = fund;
        indexFunds.push(address(lp));
        // Function logic here
    }
    
    function getIndexFunds(uint256 start, uint256 end) external view returns (address[] memory) {
        require(start < end, "Start index must be less than end index");
        require(end <= indexFunds.length, "End index exceeds indexFunds length");
        
        uint256 batchSize = end - start;
        address[] memory batch = new address[](batchSize);
        
        for (uint256 i = 0; i < batchSize; i++) {
            batch[i] = indexFunds[start + i];
        }
        
        return batch;
    }

    function getFundDetails(address fundAddress) external view returns (Fund memory) {
        require(fundAddress != address(0), "Invalid fund address");
        return funds[fundAddress];
    }
}



