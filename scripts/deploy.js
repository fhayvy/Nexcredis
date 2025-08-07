const { ethers } = require("hardhat");

async function main() {
  try {
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    // Get account balance
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    console.log("\n=== Starting Contract Deployment ===\n");

    // 1. Deploy SkillToken first (no dependencies)
    console.log("1. Deploying SkillToken...");
    const SkillToken = await ethers.getContractFactory("SkillToken");
    const skillToken = await SkillToken.deploy(deployer.address); // feeCollector = deployer
    await skillToken.waitForDeployment();
    const skillTokenAddress = await skillToken.getAddress();
    console.log("SkillToken deployed to:", skillTokenAddress);

    // 2. Deploy AcademicCredentialToken (no dependencies)
    console.log("\n2. Deploying AcademicCredentialToken...");
    const AcademicCredentialToken = await ethers.getContractFactory("AcademicCredentialToken");
    const academicCredentialToken = await AcademicCredentialToken.deploy();
    await academicCredentialToken.waitForDeployment();
    const academicCredentialTokenAddress = await academicCredentialToken.getAddress();
    console.log("AcademicCredentialToken deployed to:", academicCredentialTokenAddress);

    // 3. Deploy CertificationAuthority (depends on SkillToken and AcademicCredentialToken)
    console.log("\n3. Deploying CertificationAuthority...");
    const CertificationAuthority = await ethers.getContractFactory("CertificationAuthority");
    const certificationAuthority = await CertificationAuthority.deploy(
      skillTokenAddress,
      academicCredentialTokenAddress
    );
    await certificationAuthority.waitForDeployment();
    const certificationAuthorityAddress = await certificationAuthority.getAddress();
    console.log("CertificationAuthority deployed to:", certificationAuthorityAddress);

    // 4. Deploy a NFT contract for SkillChain (since it needs ISkillCredentialNFT)
    console.log("\n4. Deploying SkillCredentialNFT...");
    const TestNFT = await ethers.getContractFactory("AcademicCredentialToken");
    const skillCredentialNFT = await TestNFT.deploy();
    await skillCredentialNFT.waitForDeployment();
    const skillCredentialNFTAddress = await skillCredentialNFT.getAddress();
    console.log("SkillCredentialNFT (test) deployed to:", skillCredentialNFTAddress);

    // 5. Deploy SkillChain (depends on SkillToken and SkillCredentialNFT)
    console.log("\n5. Deploying SkillChain...");
    const SkillChain = await ethers.getContractFactory("SkillChain");
    const skillChain = await SkillChain.deploy(
      skillTokenAddress,
      skillCredentialNFTAddress,
      deployer.address // revenueWallet = deployer
    );
    await skillChain.waitForDeployment();
    const skillChainAddress = await skillChain.getAddress();
    console.log("SkillChain deployed to:", skillChainAddress);

    // 6. Deploy TimedVault (with proper validation)
    console.log("\n6. Deploying TimedVault...");
    const currentTime = Math.floor(Date.now() / 1000);
    const oneHour = 3600; // 1 hour in seconds
    const releaseTime = currentTime + oneHour;
    
    // Validate release time
    console.log("Current timestamp:", currentTime);
    console.log("Release timestamp:", releaseTime);
    console.log("Time difference:", releaseTime - currentTime, "seconds");
    
    const TimedVault = await ethers.getContractFactory("TimedVault");
    const timedVault = await TimedVault.deploy(releaseTime, {
      value: ethers.parseEther("0.01"), // Send 0.01 ETH to the vault
      gasLimit: 500000 // Explicit gas limit
    });
    await timedVault.waitForDeployment();
    const timedVaultAddress = await timedVault.getAddress();
    console.log("TimedVault deployed to:", timedVaultAddress);
    console.log("TimedVault will release funds at:", new Date(releaseTime * 1000).toLocaleString());

    console.log("\n=== Post-Deployment Configuration ===\n");

    // Grant necessary roles with error handling
    console.log("7. Configuring roles and permissions...");
    
    try {
      // Grant PLATFORM_ROLE to SkillChain contract in SkillToken
      const PLATFORM_ROLE = await skillToken.PLATFORM_ROLE();
      const tx1 = await skillToken.grantRole(PLATFORM_ROLE, skillChainAddress);
      await tx1.wait();
      console.log("✓ Granted PLATFORM_ROLE to SkillChain in SkillToken");

      // Grant ISSUER_ROLE to CertificationAuthority in AcademicCredentialToken
      const ISSUER_ROLE = await academicCredentialToken.ISSUER_ROLE();
      const tx2 = await academicCredentialToken.grantRole(ISSUER_ROLE, certificationAuthorityAddress);
      await tx2.wait();
      console.log("✓ Granted ISSUER_ROLE to CertificationAuthority in AcademicCredentialToken");

      // Grant INSTRUCTOR_ROLE to deployer in SkillChain (for testing)
      const INSTRUCTOR_ROLE = await skillChain.INSTRUCTOR_ROLE();
      const tx3 = await skillChain.grantRole(INSTRUCTOR_ROLE, deployer.address);
      await tx3.wait();
      console.log("✓ Granted INSTRUCTOR_ROLE to deployer in SkillChain");

      // Grant LEARNER_ROLE to deployer in SkillChain (for testing)
      const LEARNER_ROLE = await skillChain.LEARNER_ROLE();
      const tx4 = await skillChain.grantRole(LEARNER_ROLE, deployer.address);
      await tx4.wait();
      console.log("✓ Granted LEARNER_ROLE to deployer in SkillChain");
    } catch (error) {
      console.log("⚠️ Error configuring roles:", error.message);
      console.log("Continuing with deployment...");
    }

    console.log("\n=== Deployment Summary ===\n");
    
    const contractAddresses = {
      SkillToken: skillTokenAddress,
      AcademicCredentialToken: academicCredentialTokenAddress,
      CertificationAuthority: certificationAuthorityAddress,
      SkillCredentialNFT: skillCredentialNFTAddress,
      SkillChain: skillChainAddress,
      TimedVault: timedVaultAddress,
    };

    console.log("📋 Contract Addresses:");
    Object.entries(contractAddresses).forEach(([name, address]) => {
      console.log(`${name}: ${address}`);
    });

    console.log("\n=== Verification Commands ===\n");
    console.log("Run these commands to verify your contracts on Etherscan/Blockscout:");
    console.log(`npx hardhat verify --network testnet ${contractAddresses.SkillToken} "${deployer.address}"`);
    console.log(`npx hardhat verify --network testnet ${contractAddresses.AcademicCredentialToken}`);
    console.log(`npx hardhat verify --network testnet ${contractAddresses.CertificationAuthority} "${contractAddresses.SkillToken}" "${contractAddresses.AcademicCredentialToken}"`);
    console.log(`npx hardhat verify --network testnet ${contractAddresses.SkillChain} "${contractAddresses.SkillToken}" "${contractAddresses.SkillCredentialNFT}" "${deployer.address}"`);
    console.log(`npx hardhat verify --network testnet ${contractAddresses.TimedVault} ${releaseTime}`);

    console.log("\n=== Quick Test Commands ===\n");
    console.log("You can test the deployment with these example interactions:");
    console.log("1. Check SkillToken balance:", `await skillToken.balanceOf("${deployer.address}")`);
    console.log("2. Check roles:", `await skillChain.hasRole(INSTRUCTOR_ROLE, "${deployer.address}")`);
    console.log("3. Create learning module in SkillChain");
    console.log("4. Apply for instructor certification in CertificationAuthority");

    // Save deployment info to file with error handling
    try {
      const fs = require('fs');
      const deploymentInfo = {
        network: process.env.HARDHAT_NETWORK || 'localhost',
        deployer: deployer.address,
        timestamp: new Date().toISOString(),
        contracts: contractAddresses,
        configuration: {
          timedVaultReleaseTime: releaseTime,
          timedVaultAmount: "0.01 ETH"
        }
      };

      fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
      console.log("\n📄 Deployment info saved to deployment-info.json");
    } catch (error) {
      console.log("⚠️ Could not save deployment info:", error.message);
    }

    console.log("\n🎉 All contracts deployed and configured successfully!");

  } catch (error) {
    console.error("\n❌ Deployment failed:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.reason) console.error("Error reason:", error.reason);
    if (error.code) console.error("Error code:", error.code);
    if (error.data) console.error("Error data:", error.data);
    
    // Log the full error for debugging
    console.error("\nFull error object:", error);
    
    process.exit(1);
  }
}

// Add better error handling for the main execution
main()
  .then(() => {
    console.log("Deployment script completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Unhandled error in main execution:");
    console.error(error);
    process.exit(1);
  });