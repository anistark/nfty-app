// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import the ERC20 contract from OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Your contract that extends the ERC20 functionality
contract IndexToken is ERC20 {
    address public launchPool;
    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol, address _launchPool) ERC20(tokenName, tokenSymbol) {
        _mint(msg.sender, initialSupply);
        launchPool = _launchPool;
    }
    
    // Modifier to restrict access to only the launchPool address
    modifier onlyLaunchPool() {
        require(msg.sender == launchPool, "Caller is not the launch pool");
        _;
    }

    function mintNewTokens(address receiver, uint256 _amount) external onlyLaunchPool {
        _mint(receiver, _amount);
    }
}
