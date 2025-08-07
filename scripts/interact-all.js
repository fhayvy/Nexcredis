async function main() {
  try {
    console.log("=== Testing All Deployed Contracts ===");
    
    // Load deployment addresses
    const fs = require('fs');
    let deploymentData;
    
    try {
      deploymentData = JSON.parse(fs.readFileSync('deployments.json', 'utf8'));
      console.log("📁 Loaded deployment data from deployments.json");
    } catch (err) {
      console.error("❌ Could not load deployments.json. Run deploy-all.js first.");
      return;
    }
    
    const [deployer, user1, user2] = await ethers.getSigners();
    console.log("Testing with deployer:", deployer.address);
    
    const contracts = deploymentData.contracts;
    const formatEther = ethers.formatEther || ethers.utils.formatEther;
    const parseEther = ethers.parseEther || ethers.utils.parseEther;
    
    // Get contract instances
    const SkillToken = await ethers.getContractFactory("SkillToken");
    const skillToken = SkillToken.attach(contracts.skillToken);
    
    const AcademicCredentialToken = await ethers.getContractFactory("AcademicCredentialToken");
    const academicToken = AcademicCredentialToken.attach(contracts.academicToken);
    
    const CertificationAuthority = await ethers.getContractFactory("CertificationAuthority");
    const certAuthority = CertificationAuthority.attach(contracts.certAuthority);
    
    const SkillChain = await ethers.getContractFactory("SkillChain");
    const skillChain = SkillChain.attach(contracts.skillChain);
    
    const TimedVault = await ethers.getContractFactory("TimedVault");
    const timedVault = TimedVault.attach(contracts.timedVault);

    console.log("\n=== Contract Status Check ===");
    
    // 1. SkillToken Status
    console.log("\n--- SkillToken (ERC20) ---");
    const tokenName = await skillToken.name();
    const tokenSymbol = await skillToken.symbol();
    const totalSupply = await skillToken.totalSupply();
    const deployerBalance = await skillToken.balanceOf(deployer.address);
    
    console.log("Name:", tokenName);
    console.log("Symbol:", tokenSymbol);
    console.log("Total Supply:", formatEther(totalSupply));
    console.log("Deployer Balance:", formatEther(deployerBalance));
    
    // 2. AcademicCredentialToken Status
    console.log("\n--- AcademicCredentialToken (NFT) ---");
    const nftName = await academicToken.name();
    const nftSymbol = await academicToken.symbol();
    const currentCredentialId = await academicToken.currentCredentialId();
    
    console.log("NFT Name:", nftName);
    console.log("NFT Symbol:", nftSymbol);
    console.log("Current Credential ID:", currentCredentialId.toString());
    
    // 3. CertificationAuthority Status
    console.log("\n--- CertificationAuthority ---");
    const certFee = await certAuthority.certificationFee();
    const renewalFee = await certAuthority.renewalFee();
    
    console.log("Certification Fee:", formatEther(certFee), "ETH");
    console.log("Renewal Fee:", formatEther(renewalFee), "ETH");
    
    // 4. SkillChain Status
    console.log("\n--- SkillChain (Learning Platform) ---");
    const moduleCounter = await skillChain.moduleIdCounter();
    const revenueWallet = await skillChain.revenueWallet();
    
    console.log("Module Counter:", moduleCounter.toString());
    console.log("Revenue Wallet:", revenueWallet);
    
    // 5. TimedVault Status
    console.log("\n--- TimedVault ---");
    const releaseTime = await timedVault.releaseTimestamp();
    const vaultOwner = await timedVault.vaultOwner();
    const vaultBalance = await ethers.provider.getBalance(contracts.timedVault);
    
    console.log("Release Time:", new Date(releaseTime.toNumber() * 1000).toLocaleString());
    console.log("Vault Owner:", vaultOwner);
    console.log("Vault Balance:", formatEther(vaultBalance), "ETH");
    console.log("Can Withdraw:", Date.now() / 1000 >= releaseTime.toNumber());
    
    console.log("\n=== Testing Basic Functionality ===");
    
    // Test 1: Award tokens for achievement
    console.log("\n--- Testing Token Awards ---");
    try {
      const awardTx = await skillToken.awardTokens(deployer.address, "course_completion", 1);
      await awardTx.wait();
      
      const newBalance = await skillToken.balanceOf(deployer.address);
      console.log("✅ Awarded tokens successfully!");
      console.log("New Deployer Balance:", formatEther(newBalance));
    } catch (error) {
      console.log("❌ Token award failed:", error.message);
    }
    
    // Test 2: Apply for instructor certification
    console.log("\n--- Testing Instructor Certification ---");
    try {
      const applyTx = await certAuthority.applyForCertification(
        "John Doe",
        "Blockchain Development",
        ["PhD Computer Science", "10 years experience"],
        "QmTestHash123",
        { value: parseEther("0.1") }
      );
      await applyTx.wait();
      console.log("✅ Applied for instructor certification successfully!");
      
      // Now certify the instructor
      const certifyTx = await certAuthority.certifyInstructor(
        deployer.address,
        "BASIC_INSTRUCTOR",
        0 // Use default validity period
      );
      await certifyTx.wait();
      console.log("✅ Instructor certified successfully!");
      
    } catch (error) {
      console.log("❌ Instructor certification failed:", error.message);
    }
    
    // Test 3: Create a learning module
    console.log("\n--- Testing Learning Module Creation ---");
    try {
      // First grant instructor role to deployer
      const INSTRUCTOR_ROLE = await skillChain.INSTRUCTOR_ROLE();
      await skillChain.assignInstructorRole(deployer.address);
      
      const moduleTx = await skillChain.launchLearningModule(
        "Introduction to Smart Contracts",
        "Learn the basics of smart contract development",
        parseEther("0.01"), // 0.01 ETH cost
        parseEther("10")    // 10 tokens cost
      );
      await moduleTx.wait();
      console.log("✅ Learning module created successfully!");
      
      const newModuleCount = await skillChain.moduleIdCounter();
      console.log("New Module Count:", newModuleCount.toString());
      
    } catch (error) {
      console.log("❌ Module creation failed:", error.message);
    }
    
    // Test 4: Token staking
    console.log("\n--- Testing Token Staking ---");
    try {
      const currentBalance = await skillToken.balanceOf(deployer.address);
      if (currentBalance > 0) {
        const stakeAmount = currentBalance / 2n; // Stake half of the tokens
        
        const stakeTx = await skillToken.stakeTokens(stakeAmount);
        await stakeTx.wait();
        
        const stakedBalance = await skillToken.stakedBalance(deployer.address);
        console.log("✅ Staked tokens successfully!");
        console.log("Staked Amount:", formatEther(stakedBalance));
      } else {
        console.log("⚠️ No tokens to stake");
      }
    } catch (error) {
      console.log("❌ Token staking failed:", error.message);
    }
    
    console.log("\n=== Testing Complete ===");
    console.log("🎉 All basic functionality tests completed!");
    console.log("📋 Check the output above for any failed tests");
    
    console.log("\n=== Contract Addresses for Reference ===");
    Object.entries(contracts).forEach(([name, address]) => {
      console.log(`${name}: ${address}`);
    });
    
  } catch (error) {
    console.error("❌ Testing failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });