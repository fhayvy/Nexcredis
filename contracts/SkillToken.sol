// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract SkillToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant PLATFORM_ROLE = keccak256("PLATFORM_ROLE");

    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    uint256 public totalMinted;
    bool private _paused;

    // Reward rates for different achievements
    mapping(string => uint256) public rewardRates;
    
    // User staking and rewards
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingStartTime;
    mapping(address => uint256) public pendingRewards;
    
    // Platform economics
    uint256 public stakingRewardRate = 5; // 5% APY
    uint256 public platformFee = 100; // 1% in basis points (100/10000)
    address public feeCollector;

    event TokensEarned(address indexed learner, string achievementType, uint256 amount);
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);
    event RewardsWithdrawn(address indexed user, uint256 amount);
    event RewardRateUpdated(string achievementType, uint256 newRate);
    event Paused(address account);
    event Unpaused(address account);

    modifier whenNotPaused() {
        require(!_paused, "Contract is paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "Contract is not paused");
        _;
    }

    constructor(address _feeCollector) ERC20("SkillToken", "SKILL") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(PLATFORM_ROLE, msg.sender);
        
        feeCollector = _feeCollector;
        _paused = false;
        
        // Set default reward rates (in tokens with decimals)
        rewardRates["course_completion"] = 100 * 10**18;
        rewardRates["quiz_perfect"] = 25 * 10**18;
        rewardRates["assignment_excellent"] = 50 * 10**18;
        rewardRates["peer_review"] = 10 * 10**18;
        rewardRates["forum_participation"] = 5 * 10**18;
        rewardRates["instructor_certification"] = 500 * 10**18;
        rewardRates["course_approved"] = 200 * 10**18;
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    function pause() public onlyRole(PAUSER_ROLE) whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public onlyRole(PAUSER_ROLE) whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }

    function awardTokens(
        address learner, 
        string memory achievementType, 
        uint256 multiplier
    ) external onlyRole(PLATFORM_ROLE) whenNotPaused {
        uint256 baseReward = rewardRates[achievementType];
        require(baseReward > 0, "Invalid achievement type");
        
        uint256 rewardAmount = baseReward * multiplier;
        require(totalMinted + rewardAmount <= MAX_SUPPLY, "Exceeds maximum supply");
        
        _mint(learner, rewardAmount);
        totalMinted += rewardAmount;
        
        emit TokensEarned(learner, achievementType, rewardAmount);
    }

    function batchAwardTokens(
        address[] calldata learners,
        string memory achievementType,
        uint256[] calldata multipliers
    ) external onlyRole(PLATFORM_ROLE) whenNotPaused {
        require(learners.length == multipliers.length, "Array length mismatch");
        
        uint256 baseReward = rewardRates[achievementType];
        require(baseReward > 0, "Invalid achievement type");
        
        for (uint256 i = 0; i < learners.length; i++) {
            uint256 rewardAmount = baseReward * multipliers[i];
            require(totalMinted + rewardAmount <= MAX_SUPPLY, "Exceeds maximum supply");
            
            _mint(learners[i], rewardAmount);
            totalMinted += rewardAmount;
            
            emit TokensEarned(learners[i], achievementType, rewardAmount);
        }
    }

    function stakeTokens(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Calculate and add pending rewards before staking more
        _updateRewards(msg.sender);
        
        _transfer(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;
        
        if (stakingStartTime[msg.sender] == 0) {
            stakingStartTime[msg.sender] = block.timestamp;
        }
        
        emit TokensStaked(msg.sender, amount);
    }

    function unstakeTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");
        
        // Calculate and add pending rewards
        _updateRewards(msg.sender);
        
        stakedBalance[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
        
        if (stakedBalance[msg.sender] == 0) {
            stakingStartTime[msg.sender] = 0;
        }
        
        emit TokensUnstaked(msg.sender, amount);
    }

    function claimRewards() external {
        _updateRewards(msg.sender);
        
        uint256 rewards = pendingRewards[msg.sender];
        require(rewards > 0, "No rewards to claim");
        require(totalMinted + rewards <= MAX_SUPPLY, "Exceeds maximum supply");
        
        pendingRewards[msg.sender] = 0;
        totalMinted += rewards;
        _mint(msg.sender, rewards);
        
        emit RewardsWithdrawn(msg.sender, rewards);
    }

    function _updateRewards(address user) internal {
        if (stakedBalance[user] > 0 && stakingStartTime[user] > 0) {
            uint256 timeStaked = block.timestamp - stakingStartTime[user];
            uint256 rewards = (stakedBalance[user] * stakingRewardRate * timeStaked) / (365 days * 100);
            pendingRewards[user] += rewards;
            stakingStartTime[user] = block.timestamp;
        }
    }

    function getPendingRewards(address user) external view returns (uint256) {
        if (stakedBalance[user] == 0 || stakingStartTime[user] == 0) {
            return pendingRewards[user];
        }
        
        uint256 timeStaked = block.timestamp - stakingStartTime[user];
        uint256 newRewards = (stakedBalance[user] * stakingRewardRate * timeStaked) / (365 days * 100);
        return pendingRewards[user] + newRewards;
    }

    // Admin functions
    function setRewardRate(string memory achievementType, uint256 newRate) external onlyRole(DEFAULT_ADMIN_ROLE) {
        rewardRates[achievementType] = newRate;
        emit RewardRateUpdated(achievementType, newRate);
    }

    function setStakingRewardRate(uint256 newRate) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newRate <= 50, "Staking rate too high"); // Max 50% APY
        stakingRewardRate = newRate;
    }

    function setPlatformFee(uint256 newFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = newFee;
    }

    function setFeeCollector(address newCollector) external onlyRole(DEFAULT_ADMIN_ROLE) {
        feeCollector = newCollector;
    }

    function emergencyWithdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _transfer(address(this), feeCollector, balanceOf(address(this)));
    }

    // Override _update instead of _beforeTokenTransfer for newer OpenZeppelin versions
    function _update(address from, address to, uint256 value) internal override whenNotPaused {
        super._update(from, to, value);
    }
}