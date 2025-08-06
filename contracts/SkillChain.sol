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
    mapping(uint256 => uint256) public pricingUpdateTimestamps;

    event ModuleLaunched(uint256 indexed moduleId, string moduleName);
    event ModuleModified(uint256 indexed moduleId, string moduleName, bool isAvailable, uint256 hbarCost, uint256 tokenCost);
    event LearnerRegistered(address indexed learner, uint256 indexed moduleId);
    event PaymentProcessed(address indexed learner, uint256 indexed moduleId, uint256 paymentAmount, string currencyType);
    event ModuleFinished(address indexed learner, uint256 indexed moduleId);
    event CredentialAwarded(address indexed learner, uint256 indexed moduleId);
    event CredentialWithdrawn(address indexed learner, uint256 indexed moduleId);
    event PricingAdjusted(uint256 indexed moduleId, uint256 newHbarCost, uint256 newTokenCost);

    constructor(address _skillToken, address _credentialNFT, address _revenueWallet) {
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
        string memory _moduleName, 
        string memory _moduleDetails, 
        uint256 _hbarCost, 
        uint256 _tokenCost
    ) external onlyRole(INSTRUCTOR_ROLE) {
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
        payable(revenueWallet).transfer(msg.value);
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
        string memory score, 
        string memory feedback
    ) external onlyInstructorOfModule(moduleId) {
        require(hasLearnerJoined[moduleId][learnerAddress], "Learner not registered for this module");
        LearnerProgress storage progressRecord = learnerProgressData[learnerAddress][moduleId];
        progressRecord.finalScore = score;
        progressRecord.instructorFeedback = feedback;
        emit ModuleModified(
            moduleId, 
            learningModules[moduleId].moduleName, 
            learningModules[moduleId].isAvailable, 
            learningModules[moduleId].hbarCost, 
            learningModules[moduleId].tokenCost
        );
    }

    function completeLearnerModule(
        uint256 moduleId, 
        address learnerAddress, 
        string memory credentialURI
    ) external onlyInstructorOfModule(moduleId) {
        require(hasLearnerJoined[moduleId][learnerAddress], "Learner not registered");
        LearnerProgress storage progressRecord = learnerProgressData[learnerAddress][moduleId];
        require(!progressRecord.isFinished, "Module already marked as completed");

        progressRecord.isFinished = true;
        emit ModuleFinished(learnerAddress, moduleId);

        if (!progressRecord.hasCredential) {
            credentialNFT.mintCredential(learnerAddress, credentialURI);
            progressRecord.hasCredential = true;
            emit CredentialAwarded(learnerAddress, moduleId);
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
        learningModules[moduleId].hbarCost = newHbarCost;
        learningModules[moduleId].tokenCost = newTokenCost;
        pricingUpdateTimestamps[moduleId] = block.timestamp;
        emit PricingAdjusted(moduleId, newHbarCost, newTokenCost);
    }

    function getModuleParticipants(uint256 moduleId) external view returns (address[] memory) {
        return moduleParticipants[moduleId].values();
    }

    function updateRevenueWallet(address newWallet) external onlyRole(PLATFORM_ADMIN_ROLE) {
        revenueWallet = newWallet;
    }

    function withdrawContractHBAR() external onlyRole(PLATFORM_ADMIN_ROLE) {
        payable(revenueWallet).transfer(address(this).balance);
    }

    function withdrawContractTokens() external onlyRole(PLATFORM_ADMIN_ROLE) {
        uint256 contractTokenBalance = skillToken.balanceOf(address(this));
        require(contractTokenBalance > 0, "No tokens available for withdrawal");
        require(skillToken.transfer(revenueWallet, contractTokenBalance), "Token withdrawal failed");
    }

    function assignLearnerRole(address learnerAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        _grantRole(LEARNER_ROLE, learnerAddress);
    }

    function assignInstructorRole(address instructorAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        _grantRole(INSTRUCTOR_ROLE, instructorAddress);
    }

    function assignCurriculumManagerRole(address managerAddress) external onlyRole(PLATFORM_ADMIN_ROLE) {
        _grantRole(CURRICULUM_MANAGER_ROLE, managerAddress);
    }
}