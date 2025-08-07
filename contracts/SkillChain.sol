// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

interface ISkillCredentialNFT {
    function mintCredential(address recipient, string memory tokenURI) external returns (uint256);
}

contract SkillChain is AccessControl {
    using EnumerableSet for EnumerableSet.AddressSet;

    bytes32 public constant PLATFORM_ADMIN_ROLE = keccak256("PLATFORM_ADMIN_ROLE");
    bytes32 public constant INSTRUCTOR_ROLE = keccak256("INSTRUCTOR_ROLE");
    bytes32 public constant LEARNER_ROLE = keccak256("LEARNER_ROLE");
    bytes32 public constant CURRICULUM_MANAGER_ROLE = keccak256("CURRICULUM_MANAGER_ROLE");

    struct LearningModule {
        string moduleName;
        string moduleDetails;
        address moduleInstructor;
        uint256 hbarCost;
        uint256 tokenCost;
        bool isActive;
        bool isAvailable;
        uint256 launchTimestamp;
        uint256 modificationTimestamp;
    }

    struct LearnerProgress {
        string finalScore;
        string instructorFeedback;
        bool isFinished;
        bool hasCredential;
    }

    IERC20 public skillToken;
    ISkillCredentialNFT public credentialNFT;
    address public revenueWallet;

    uint256 public moduleIdCounter;
    mapping(uint256 => LearningModule) public learningModules;
    mapping(uint256 => EnumerableSet.AddressSet) private moduleParticipants;
    mapping(address => mapping(uint256 => LearnerProgress)) public learnerProgressData;
    mapping(uint256 => mapping(address => bool)) public hasLearnerJoined;

    event ModuleLaunched(uint256 indexed moduleId, string moduleName);
    event ModuleModified(uint256 indexed moduleId, string moduleName, bool isAvailable, uint256 hbarCost, uint256 tokenCost);
    event LearnerRegistered(address indexed learner, uint256 indexed moduleId);
    event PaymentProcessed(address indexed learner, uint256 indexed moduleId, uint256 paymentAmount, string currencyType);
    event ModuleFinished(address indexed learner, uint256 indexed moduleId);
    event CredentialAwarded(address indexed learner, uint256 indexed moduleId);
    event CredentialWithdrawn(address indexed learner, uint256 indexed moduleId);
    event PricingAdjusted(uint256 indexed moduleId, uint256 newHbarCost, uint256 newTokenCost);

    constructor(address _skillToken, address _credentialNFT, address _revenueWallet) {
        require(_skillToken != address(0), "Invalid skill token address");
        require(_credentialNFT != address(0), "Invalid credential NFT address");
        require(_revenueWallet != address(0), "Invalid revenue wallet address");
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PLATFORM_ADMIN_ROLE, msg.sender);
        skillToken = IERC20(_skillToken);
        credentialNFT = ISkillCredentialNFT(_credentialNFT);
        revenueWallet = _revenueWallet;
    }

    modifier onlyInstructorOfModule(uint256 moduleId) {
        require(learningModules[moduleId].isActive, "Learning module does not exist");
        require(learningModules[moduleId].moduleInstructor == msg.sender, "Access denied - not module instructor");
        _;
    }

    function launchLearningModule(
        string calldata _moduleName, 
        string calldata _moduleDetails, 
        uint256 _hbarCost, 
        uint256 _tokenCost
    ) external onlyRole(INSTRUCTOR_ROLE) {
        require(bytes(_moduleName).length > 0, "Module name cannot be empty");
        require(bytes(_moduleDetails).length > 0, "Module details cannot be empty");
        
        uint256 newModuleId = ++moduleIdCounter;
        learningModules[newModuleId] = LearningModule({
            moduleName: _moduleName,
            moduleDetails: _moduleDetails,
            moduleInstructor: msg.sender,
            hbarCost: _hbarCost,
            tokenCost: _tokenCost,
            isActive: true,
            isAvailable: true,
            launchTimestamp: block.timestamp,
            modificationTimestamp: block.timestamp
        });
        emit ModuleLaunched(newModuleId, _moduleName);
    }

    function updateModuleAvailability(uint256 moduleId, bool availability) external onlyInstructorOfModule(moduleId) {
        learningModules[moduleId].isAvailable = availability;
        learningModules[moduleId].modificationTimestamp = block.timestamp;
        emit ModuleModified(
            moduleId, 
            learningModules[moduleId].moduleName, 
            availability, 
            learningModules[moduleId].hbarCost, 
            learningModules[moduleId].tokenCost
        );
    }

    function registerWithHBAR(uint256 moduleId) external payable onlyRole(LEARNER_ROLE) {
        LearningModule storage targetModule = learningModules[moduleId];
        require(targetModule.isActive && targetModule.isAvailable, "Module unavailable or inactive");
        require(!hasLearnerJoined[moduleId][msg.sender], "Already registered for this module");
        require(msg.value >= targetModule.hbarCost, "Insufficient HBAR payment");

        moduleParticipants[moduleId].add(msg.sender);
        hasLearnerJoined[moduleId][msg.sender] = true;

        emit LearnerRegistered(msg.sender, moduleId);
        emit PaymentProcessed(msg.sender, moduleId, msg.value, "HBAR");
        
        (bool success, ) = payable(revenueWallet).call{value: msg.value}("");
        require(success, "Transfer to revenue wallet failed");
    }

    function registerWithTokens(uint256 moduleId) external onlyRole(LEARNER_ROLE) {
        LearningModule storage targetModule = learningModules[moduleId];
        require(targetModule.isActive && targetModule.isAvailable, "Module unavailable or inactive");
        require(!hasLearnerJoined[moduleId][msg.sender], "Already registered for this module");

        require(
            skillToken.transferFrom(msg.sender, revenueWallet, targetModule.tokenCost), 
            "Token payment transfer failed"
        );
        moduleParticipants[moduleId].add(msg.sender);
        hasLearnerJoined[moduleId][msg.sender] = true;

        emit LearnerRegistered(msg.sender, moduleId);
        emit PaymentProcessed(msg.sender, moduleId, targetModule.tokenCost, "TOKEN");
    }

    function updateLearnerProgress(
        uint256 moduleId, 
        address learnerAddress, 
        string calldata score, 
        string calldata feedback
    ) external onlyInstructorOfModule(moduleId) {
        require(hasLearnerJoined[moduleId][learnerAddress], "Learner not registered for this module");
        LearnerProgress storage progressRecord = learnerProgressData[learnerAddress][moduleId];
        progressRecord.finalScore = score;
        progressRecord.instructorFeedback = feedback;
    }

    function completeLearnerModule(
        uint256 moduleId, 
        address learnerAddress, 
        string calldata credentialURI
    ) external onlyInstructorOfModule(moduleId) {
        require(hasLearnerJoined[moduleId][learnerAddress], "Learner not registered");
        LearnerProgress storage progressRecord = learnerProgressData[learnerAddress][moduleId];
        require(!progressRecord.isFinished, "Module already marked as completed");

        progressRecord.isFinished = true;
        emit ModuleFinished(learnerAddress, moduleId);

        if (!progressRecord.hasCredential && bytes(credentialURI).length > 0) {
            try credentialNFT.mintCredential(learnerAddress, credentialURI) {
                progressRecord.hasCredential = true;
                emit CredentialAwarded(learnerAddress, moduleId);
            } catch {
                // NFT minting failed, continue without reverting
            }
        }
    }

    function withdrawCredential(uint256 moduleId, address learnerAddress) external onlyInstructorOfModule(moduleId) {
        LearnerProgress storage progressRecord = learnerProgressData[learnerAddress][moduleId];
        require(progressRecord.hasCredential, "No credential exists to withdraw");
        progressRecord.hasCredential = false;
        emit CredentialWithdrawn(learnerAddress, moduleId);
    }

    function adjustModulePricing(
        uint256 moduleId, 
        uint256 newHbarCost, 
        uint256 newTokenCost
    ) external onlyRole(PLATFORM_ADMIN_ROLE) {
        require(learningModules[moduleId].isActive, "Module does not exist");
        learningModules[moduleId].hbarCost = newHbarCost;
        learningModules[moduleId].tokenCost = newTokenCost;
        emit PricingAdjusted(moduleId, newHbarCost, newTokenCost);
    }

    function getModuleParticipants(uint256 moduleId) external view returns (address[] memory) {
        return moduleParticipants[moduleId].values();
    }

    function getModuleParticipantCount(uint256 moduleId) external view returns (uint256) {
        return moduleParticipants[moduleId].length();
    }

    function updateRevenueWallet(address newWallet) external onlyRole(PLATFORM_ADMIN_ROLE) {
        require(newWallet != address(0), "Invalid wallet address");
        revenueWallet = newWallet;
    }

    function withdrawContractHBAR() external onlyRole(PLATFORM_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        require(balance > 0, "No HBAR to withdraw");
        (bool success, ) = payable(revenueWallet).call{value: balance}("");
        require(success, "HBAR withdrawal failed");
    }

    function withdrawContractTokens() external onlyRole(PLATFORM_ADMIN_ROLE) {
        uint256 contractTokenBalance = skillToken.balanceOf(address(this));
        require(contractTokenBalance > 0, "No tokens available for withdrawal");
        require(skillToken.transfer(revenueWallet, contractTokenBalance), "Token withdrawal failed");
    }

    function assignLearnerRole(address learnerAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        require(learnerAddress != address(0), "Invalid address");
        _grantRole(LEARNER_ROLE, learnerAddress);
    }

    function assignInstructorRole(address instructorAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        require(instructorAddress != address(0), "Invalid address");
        _grantRole(INSTRUCTOR_ROLE, instructorAddress);
    }

    function assignCurriculumManagerRole(address managerAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        require(managerAddress != address(0), "Invalid address");
        _grantRole(CURRICULUM_MANAGER_ROLE, managerAddress);
    }

    function revokeLearnerRole(address learnerAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        _revokeRole(LEARNER_ROLE, learnerAddress);
    }

    function revokeInstructorRole(address instructorAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        _revokeRole(INSTRUCTOR_ROLE, instructorAddress);
    }

    function updateSkillToken(address newSkillToken) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newSkillToken != address(0), "Invalid skill token address");
        skillToken = IERC20(newSkillToken);
    }

    function updateCredentialNFT(address newCredentialNFT) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newCredentialNFT != address(0), "Invalid credential NFT address");
        credentialNFT = ISkillCredentialNFT(newCredentialNFT);
    }

    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        if (balance > 0) {
            (bool success, ) = payable(msg.sender).call{value: balance}("");
            require(success, "Emergency withdrawal failed");
        }
    }
}