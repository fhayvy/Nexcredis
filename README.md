# Nexcredis

**A Blockchain-Powered Educational Credentialing and Learning Platform**

Nexcredis is a comprehensive decentralized platform that revolutionizes educational credentialing, instructor certification, and skill-based learning through blockchain technology. Built on Ethereum-compatible networks, Nexcredis provides a trusted, transparent, and immutable system for issuing, managing, and verifying academic credentials and professional certifications.

## 🌟 Key Features

- **NFT-Based Academic Credentials**: Tamper-proof digital certificates stored on blockchain
- **Instructor Certification System**: Comprehensive certification and reputation management for educators
- **Skill-Based Learning Modules**: Interactive courses with token rewards and NFT credentials
- **Gamified Token Economy**: Earn and stake SKILL tokens for various achievements
- **Institutional Verification**: Multi-tier institution verification and accreditation
- **Time-Locked Vaults**: Secure fund management with time-based release mechanisms

## 🏗️ Architecture Overview

Nexcredis consists of five main smart contracts working together to create a complete educational ecosystem:

```
┌─────────────────────────────────────────────────────────────────┐
│                        Nexcredis Platform                       │
├─────────────────┬─────────────────┬─────────────────┬─────────────┤
│ Academic        │ Certification   │ SkillChain      │ SkillToken  │
│ Credential      │ Authority       │ Learning        │ Economy     │
│ Token (NFT)     │ Management      │ Platform        │ System      │
└─────────────────┴─────────────────┴─────────────────┴─────────────┘
                               │
                        ┌─────────────┐
                        │ TimedVault  │
                        │ Security    │
                        └─────────────┘
```

## 📋 Smart Contracts

### 1. AcademicCredentialToken.sol
**ERC-721 NFT contract for academic credentials**

- **Purpose**: Issues tamper-proof digital academic certificates
- **Key Features**:
  - Role-based access control (Issuer, Manager, Instructor roles)
  - Credential metadata storage with expiration dates
  - Discount qualification system
  - Print order management
  - Credential redemption and validation
  - Program registry and referral system

### 2. CertificationAuthority.sol
**Instructor certification and course management system**

- **Purpose**: Manages instructor certifications and course approvals
- **Key Features**:
  - Multi-role access system (Authority, Auditor, Validator roles)
  - Instructor certification with expiration dates
  - Course submission and review workflow
  - Institution verification with tier system
  - Reputation scoring system
  - Fee management for certifications and renewals

### 3. SkillChain.sol
**Learning module platform with payment integration**

- **Purpose**: Manages learning modules with HBAR and token payments
- **Key Features**:
  - Module creation and management
  - Dual payment system (HBAR/tokens)
  - Learner progress tracking
  - Automated credential minting
  - Revenue distribution system
  - Role-based access control

### 4. SkillToken.sol
**ERC-20 utility token with staking and rewards**

- **Purpose**: Platform's native token for rewards and payments
- **Key Features**:
  - Achievement-based token rewards
  - Staking mechanism with APY rewards
  - Batch token distribution
  - Pausable functionality
  - Maximum supply cap (1 billion tokens)
  - Platform fee collection

### 5. TimedVault.sol
**Time-locked fund management contract**

- **Purpose**: Secure time-based fund releases
- **Key Features**:
  - Time-locked fund storage
  - Owner-only withdrawals after release time
  - Balance and time tracking
  - Event logging for transparency

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Hardhat or Truffle
- MetaMask or compatible Web3 wallet
- Solidity ^0.8.19

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/fhayvy/Nexcredis.git
cd Nexcredis
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Install OpenZeppelin contracts**
```bash
npm install @openzeppelin/contracts
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Required Environment Variables

```env
PRIVATE_KEY=your_private_key_here
INFURA_API_KEY=your_infura_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
SKILL_TOKEN_ADDRESS=deployed_skill_token_address
CREDENTIAL_NFT_ADDRESS=deployed_credential_nft_address
REVENUE_WALLET=your_revenue_wallet_address
```

### Compilation

```bash
npx hardhat compile
```

### Testing

```bash
npx hardhat test
```

### Deployment

1. **Deploy contracts in order**:

```bash
# Deploy SkillToken first
npx hardhat run scripts/deploy-skill-token.js --network mainnet

# Deploy AcademicCredentialToken
npx hardhat run scripts/deploy-credential-token.js --network mainnet

# Deploy CertificationAuthority
npx hardhat run scripts/deploy-certification-authority.js --network mainnet

# Deploy SkillChain
npx hardhat run scripts/deploy-skill-chain.js --network mainnet

# Deploy TimedVault (optional)
npx hardhat run scripts/deploy-timed-vault.js --network mainnet
```

2. **Verify contracts**:
```bash
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS
```

## 🎯 Use Cases

### For Educational Institutions
- Issue blockchain-verified academic credentials
- Manage instructor certifications
- Track student progress and achievements
- Integrate with existing LMS systems

### For Instructors
- Get certified through the platform
- Create and monetize learning modules
- Track student progress and provide feedback
- Earn reputation scores and tokens

### For Learners
- Earn verifiable credentials and certificates
- Participate in skill-based learning modules
- Accumulate and stake SKILL tokens
- Build a portable academic record

### For Employers
- Verify candidate credentials instantly
- Access trusted academic records
- Integrate with HR systems
- Reduce credential fraud

## 🔐 Security Features

- **Role-Based Access Control**: Multiple permission levels across all contracts
- **Reentrancy Protection**: Guards against reentrancy attacks
- **Pausable Functionality**: Emergency pause capabilities
- **Time-Lock Mechanisms**: Secure fund management
- **Validation Checks**: Comprehensive input validation
- **Event Logging**: Complete audit trail

## 🛡️ Access Roles

### AcademicCredentialToken
- `DEFAULT_ADMIN_ROLE`: Contract administration
- `ISSUER_ROLE`: Credential issuance
- `MANAGER_ROLE`: Management operations
- `INSTRUCTOR_ROLE`: Instructor-specific functions

### CertificationAuthority
- `AUTHORITY_ROLE`: Instructor certification
- `AUDITOR_ROLE`: Instructor auditing
- `VALIDATOR_ROLE`: Course validation

### SkillChain
- `PLATFORM_ADMIN_ROLE`: Platform administration
- `INSTRUCTOR_ROLE`: Module creation and management
- `LEARNER_ROLE`: Learning participation
- `CURRICULUM_MANAGER_ROLE`: Curriculum oversight

## 📊 Token Economics

### SKILL Token Distribution
- **Maximum Supply**: 1,000,000,000 SKILL tokens
- **Reward Pool**: Distributed based on achievements
- **Staking Rewards**: 5% APY (configurable)
- **Platform Fee**: 1% (configurable up to 10%)

### Achievement Rewards
| Achievement Type | Base Reward (SKILL) |
|-----------------|-------------------|
| Course Completion | 100 |
| Perfect Quiz Score | 25 |
| Excellent Assignment | 50 |
| Peer Review | 10 |
| Forum Participation | 5 |
| Instructor Certification | 500 |
| Course Approval | 200 |

## 🔧 Configuration

### Setting Reward Rates
```solidity
// Update reward rates (admin only)
skillToken.setRewardRate("course_completion", 150 * 10**18);
```

### Managing Certification Standards
```solidity
// Create new certification standard
certificationAuthority.createCertificationStandard(
    "EXPERT_INSTRUCTOR",
    "Expert level certification",
    10, // minimum requirements
    1095 days // validity period
);
```

### Module Pricing
```solidity
// Adjust module pricing (admin only)
skillChain.adjustModulePricing(moduleId, newHbarCost, newTokenCost);
```

## 📡 Events and Monitoring

### Key Events to Monitor

**Credential Events**:
- `CredentialIssued`
- `CredentialDestroyed`
- `CredentialValidated`

**Learning Events**:
- `ModuleLaunched`
- `LearnerRegistered`
- `ModuleFinished`
- `CredentialAwarded`

**Token Events**:
- `TokensEarned`
- `TokensStaked`
- `RewardsWithdrawn`

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npx hardhat test test/AcademicCredentialToken.test.js

# Run tests with coverage
npx hardhat coverage
```

### Test Coverage
- Unit tests for all contract functions
- Integration tests for cross-contract interactions
- Edge case and security testing
- Gas optimization tests

## 🚨 Known Limitations

1. **Gas Costs**: Complex operations may have high gas costs
2. **Scalability**: Consider Layer 2 solutions for high-volume usage
3. **IPFS Dependency**: Metadata storage relies on IPFS availability
4. **Oracle Integration**: Price feeds may need oracle integration
5. **Upgradeability**: Contracts are not upgradeable by design

## 🛠️ Development Roadmap

### Phase 1: Core Platform ✅
- Basic credential issuance
- Instructor certification
- Token economics

### Phase 2: Enhanced Features 🚧
- Advanced analytics dashboard
- Mobile application
- API integrations

### Phase 3: Ecosystem Expansion 📋
- Cross-chain compatibility
- Enterprise partnerships
- Advanced governance features

## 🤝 Contributing

We welcome contributions to Nexcredis! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Solidity style guide
- Add comprehensive tests for new features
- Update documentation accordingly
- Ensure security best practices

## 📞 Support and Contact
- **GitHub Issues**: [Report bugs or request features](https://github.com/fhayvy/Nexcredis/issues)

## 🙏 Acknowledgments

- OpenZeppelin for secure contract libraries
- Ethereum community for blockchain infrastructure
- Contributors and early adopters
- Educational institutions providing feedback


*Nexcredis - Empowering Education Through Blockchain Innovation*