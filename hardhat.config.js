require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19"
      },
      {
        version: "0.8.28"
      }
    ]
  },
  networks: {
    hardhat: {
      // Built-in test network
    },
    testnet: {
      url: process.env.TESTNET_URL || "https://testnet.hashio.io/api",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 296, // Hedera Testnet chain ID
    },
    mainnet: {
      url: process.env.MAINNET_URL || "https://mainnet.hashio.io/api",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 295, // Hedera Mainnet chain ID
    },
    // Other common testnets
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 5,
    },
  },
  // Add other configurations as needed
};