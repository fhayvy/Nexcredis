// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TimedVault {
    uint256 public releaseTimestamp;
    address payable public vaultOwner;

    event FundsWithdrawn(uint256 withdrawnAmount, uint256 withdrawalTime);
    event FundsDeposited(address depositor, uint256 amount);

    constructor(uint256 _releaseTimestamp) payable {
        require(
            block.timestamp < _releaseTimestamp,
            "Release time should be in the future"
        );
        require(_releaseTimestamp > 0, "Release timestamp must be greater than 0");

        releaseTimestamp = _releaseTimestamp;
        vaultOwner = payable(msg.sender);
        
        if (msg.value > 0) {
            emit FundsDeposited(msg.sender, msg.value);
        }
    }

    function withdrawFunds() external {
        require(block.timestamp >= releaseTimestamp, "Funds are still locked");
        require(msg.sender == vaultOwner, "Only the vault owner can withdraw");
        
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        emit FundsWithdrawn(balance, block.timestamp);
        
        (bool success, ) = vaultOwner.call{value: balance}("");
        require(success, "Transfer failed");
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getTimeLeft() external view returns (uint256) {
        if (block.timestamp >= releaseTimestamp) {
            return 0;
        }
        return releaseTimestamp - block.timestamp;
    }

    // Allow the contract to receive Ether
    receive() external payable {
        emit FundsDeposited(msg.sender, msg.value);
    }
}