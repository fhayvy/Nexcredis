require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true, // This helps with stack too deep errors
          metadata: {
            bytecodeHash: "none", // Reduce contract size
          },
        },
      },
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true, // This helps with stack too deep errors
          metadata: {
            bytecodeHash: "none", // Reduce contract size
          },
        },
      }
    ]
  },
  networks: {
    hardhat: {
      // Built-in test network
      gas: "auto",
      gasPrice: "auto",
      blockGasLimit: 30000000,
    },
    testnet: {
      url: process.env.TESTNET_URL || "https://testnet.hashio.io/api",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 296, // Hedera Testnet chain ID
      gas: "auto",
      gasPrice: "auto",
      timeout: 60000,
      httpHeaders: {
        "User-Agent": "hardhat"
      }
    },
    mainnet: {
      url: process.env.MAINNET_URL || "https://mainnet.hashio.io/api",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 295, // Hedera Mainnet chain ID
      gas: "auto",
      gasPrice: "auto",
      timeout: 60000,
    },
    // Other common testnets
    sepolia: {
      url: process.env.SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
      gas: "auto",
      gasPrice: "auto",
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 5,
      gas: "auto",
      gasPrice: "auto",
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 40000
  }
};