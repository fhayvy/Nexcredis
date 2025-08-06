// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TimedVault {
    uint public releaseTimestamp;
    address payable public vaultOwner;

    event FundsWithdrawn(uint withdrawnAmount, uint withdrawalTime);

    constructor(uint _releaseTimestamp) payable {
        require(
            block.timestamp < _releaseTimestamp,
            "Release time should be in the future"
        );

        releaseTimestamp = _releaseTimestamp;
        vaultOwner = payable(msg.sender);
    }

    function withdrawFunds() public {
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Release time is %o and block timestamp is %o", releaseTimestamp, block.timestamp);

        require(block.timestamp >= releaseTimestamp, "Funds are still locked");
        require(msg.sender == vaultOwner, "Only the vault owner can withdraw");

        emit FundsWithdrawn(address(this).balance, block.timestamp);
        vaultOwner.transfer(address(this).balance);
    }
}