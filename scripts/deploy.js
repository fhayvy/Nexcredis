async function main() {
  // Get the signer of the tx and address for deployment
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Check account balance (compatible with both ethers v5 and v6)
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther ? ethers.formatEther(balance) : ethers.utils.formatEther(balance), "ETH");

  // Deploy AcademicCredentialToken
  console.log("\n--- Deploying AcademicCredentialToken ---");
  const AcademicCredentialToken = await ethers.getContractFactory("AcademicCredentialToken");
  const academicToken = await AcademicCredentialToken.deploy();
  await academicToken.waitForDeployment();
  console.log("AcademicCredentialToken deployed at:", await academicToken.getAddress());

  // Deploy TimedVault (with 1 hour lock time and some initial funds)
  console.log("\n--- Deploying TimedVault ---");
  const TimedVault = await ethers.getContractFactory("TimedVault");
  const futureTimestamp = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  
  const timedVault = await TimedVault.deploy(futureTimestamp, {
    value: ethers.parseEther ? ethers.parseEther("0.01") : ethers.utils.parseEther("0.01") // Send 0.01 ETH to the vault
  });
  await timedVault.waitForDeployment();
  console.log("TimedVault deployed at:", await timedVault.getAddress());
  console.log("Vault release time:", new Date(futureTimestamp * 1000).toLocaleString());

  console.log("\n=== Deployment Summary ===");
  console.log("AcademicCredentialToken:", await academicToken.getAddress());
  console.log("TimedVault:", await timedVault.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });