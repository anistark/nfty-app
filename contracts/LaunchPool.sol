// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IndexToken.sol";

contract LaunchPool is Ownable {
    IERC20 public usdcToken; // USDC token contract
    IndexToken public token;
    address public fundFactory;
    uint256 public totalTokensForSale = 100_000 * 10 ** 18; // Total tokens available for sale
    uint256 public targetRaise = 100_000 * 10**6;
    uint256 public totalRaised; // Total USDC raised
    // uint256 public initialPrice = 0.9 * 10 ** 6; // Initial price in USDC (with 6 decimals)
    // uint256 public slope = 0.002 * 10 ** 6; // Slope of the bonding curve (with 6 decimals)
    uint256 public tokensSold; // Total tokens sold

    constructor(address _usdc, string memory _name, string memory _ticker) Ownable(msg.sender) {
        token = new IndexToken(totalTokensForSale, _name, _ticker, address(this));
        usdcToken = IERC20(_usdc);
        fundFactory = msg.sender;
    }

    function buyToken(uint256 amount) external {

        // add more checks 
        require(amount > 0, "Amount must be greater than 0");
        require(tokensSold + amount <= totalTokensForSale, "Not enough tokens available for sale");
        require(usdcToken.balanceOf(msg.sender) >= amount, "Insufficient USDC balance");
        
        usdcToken.transferFrom(msg.sender, address(this), amount);
        

        totalRaised += amount;
        tokensSold += amount * 10**12;
        token.transfer(msg.sender, amount * 10**12);
    }

    function sellToken(uint256 amount) external {
        
        //add more checks
        require(amount > 0, "Amount must be greater than 0");
        require(tokensSold <= totalTokensForSale, "Sale concluded");
        require(usdcToken.balanceOf(address(this)) >= amount, "Insufficient USDC balance");

        token.transferFrom(msg.sender, address(this), amount);

        totalRaised -= amount / 10**12;
        tokensSold -= amount;
        usdcToken.transfer(msg.sender, amount / 10**12);
    
    }

    function withdrawUSDC() external onlyOwner {
        require(tokensSold >= totalTokensForSale, "Tokens sold must be equal to or greater than total tokens for sale");
        uint256 balance = usdcToken.balanceOf(address(this));
        require(balance > 0, "No USDC balance to withdraw");
        usdcToken.transfer(msg.sender, balance);
    }


    
}
