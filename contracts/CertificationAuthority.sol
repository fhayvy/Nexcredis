// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ISkillToken {
    function awardTokens(address learner, string memory achievementType, uint256 multiplier) external;
}

interface IAcademicCredentialToken {
    function hasRole(bytes32 role, address account) external view returns (bool);
}

contract CertificationAuthority is AccessControl, Pausable, ReentrancyGuard {
    bytes32 public constant AUTHORITY_ROLE = keccak256("AUTHORITY_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    ISkillToken public skillToken;
    IAcademicCredentialToken public credentialToken;

    enum InstructorStatus { Pending, Certified, Suspended, Revoked }
    enum CourseStatus { Submitted, UnderReview, Approved, Rejected, Suspended }
    enum InstitutionTier { Bronze, Silver, Gold, Platinum }

    struct Instructor {
        string name;
        string expertise;
        InstructorStatus status;
        uint256 certificationDate;
        uint256 expiryDate;
        uint256 coursesCreated;
        uint256 averageRating;
        uint256 totalStudents;
        address certifiedBy;
        string ipfsProfile;
    }

    struct Course {
        uint256 courseId;
        string title;
        string description;
        address instructor;
        CourseStatus status;
        uint256 submissionDate;
        uint256 approvalDate;
        address approvedBy;
        uint256 duration;
        uint256 difficultyLevel;
        string contentHash;
        uint256 enrollmentCount;
        bool isActive;
    }

    struct Institution {
        string name;
        string country;
        InstitutionTier tier;
        bool isVerified;
        uint256 verificationDate;
        string accreditationDetails;
        uint256 coursesOffered;
    }

    struct CertificationStandard {
        string standardName;
        string description;
        uint256 minRequirements;
        uint256 validityPeriod;
        bool isActive;
    }

    // State variables
    uint256 public courseIdCounter;
    uint256 public certificationFee = 0.1 ether;
    uint256 public renewalFee = 0.05 ether;
    
    mapping(address => Instructor) public instructors;
    mapping(uint256 => Course) public courses;
    mapping(address => Institution) public institutions;
    mapping(string => CertificationStandard) public standards;
    mapping(address => uint256[]) public instructorCourses;
    
    // Reputation system
    mapping(address => uint256) public reputationScore;

    event InstructorCertified(address indexed instructor, address indexed certifiedBy, uint256 expiryDate);
    event InstructorSuspended(address indexed instructor, string reason);
    event CourseSubmitted(uint256 indexed courseId, address indexed instructor, string title);
    event CourseApproved(uint256 indexed courseId, address indexed approvedBy);
    event CourseRejected(uint256 indexed courseId, string reason);
    event InstitutionVerified(address indexed institution, InstitutionTier tier);
    event StandardCreated(string standardName, uint256 validityPeriod);
    event ReputationUpdated(address indexed instructor, uint256 newScore);

    constructor(address _skillToken, address _credentialToken) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(AUTHORITY_ROLE, msg.sender);
        _grantRole(AUDITOR_ROLE, msg.sender);
        _grantRole(VALIDATOR_ROLE, msg.sender);
        
        skillToken = ISkillToken(_skillToken);
        credentialToken = IAcademicCredentialToken(_credentialToken);
        
        // Initialize default standards
        _createStandard("BASIC_INSTRUCTOR", "Basic instructor certification", 1, 365 days);
        _createStandard("ADVANCED_INSTRUCTOR", "Advanced instructor certification", 5, 730 days);
        _createStandard("EXPERT_INSTRUCTOR", "Expert instructor certification", 10, 1095 days);
    }

    modifier onlyCertifiedInstructor() {
        require(instructors[msg.sender].status == InstructorStatus.Certified, "Not a certified instructor");
        require(instructors[msg.sender].expiryDate > block.timestamp, "Certification expired");
        _;
    }

    modifier validCourse(uint256 courseId) {
        require(courseId > 0 && courseId <= courseIdCounter, "Invalid course ID");
        _;
    }

    function applyForCertification(
        string calldata name,
        string calldata expertise,
        string calldata ipfsProfile
    ) external payable nonReentrant {
        require(msg.value >= certificationFee, "Insufficient certification fee");
        require(instructors[msg.sender].status != InstructorStatus.Certified, "Already certified");
        
        instructors[msg.sender] = Instructor({
            name: name,
            expertise: expertise,
            status: InstructorStatus.Pending,
            certificationDate: 0,
            expiryDate: 0,
            coursesCreated: 0,
            averageRating: 0,
            totalStudents: 0,
            certifiedBy: address(0),
            ipfsProfile: ipfsProfile
        });

        // Transfer fee to contract
        payable(address(this)).transfer(msg.value);
    }

    function certifyInstructor(
        address instructor,
        string calldata standardName,
        uint256 customValidityPeriod
    ) external onlyRole(AUTHORITY_ROLE) {
        require(instructors[instructor].status == InstructorStatus.Pending, "Invalid instructor status");
        
        CertificationStandard storage standard = standards[standardName];
        require(standard.isActive, "Standard not active");
        
        uint256 validityPeriod = customValidityPeriod > 0 ? customValidityPeriod : standard.validityPeriod;
        
        instructors[instructor].status = InstructorStatus.Certified;
        instructors[instructor].certificationDate = block.timestamp;
        instructors[instructor].expiryDate = block.timestamp + validityPeriod;
        instructors[instructor].certifiedBy = msg.sender;
        
        reputationScore[instructor] = 100;
        
        emit InstructorCertified(instructor, msg.sender, instructors[instructor].expiryDate);
        
        try skillToken.awardTokens(instructor, "instructor_certification", 1) {
            // Token award successful
        } catch {
            // Token award failed, continue without reverting
        }
    }

    function renewCertification() external payable nonReentrant onlyCertifiedInstructor {
        require(msg.value >= renewalFee, "Insufficient renewal fee");
        require(block.timestamp <= instructors[msg.sender].expiryDate + 90 days, "Renewal period expired");
        
        instructors[msg.sender].expiryDate = block.timestamp + 365 days;
        
        payable(address(this)).transfer(msg.value);
    }

    function suspendInstructor(address instructor, string calldata reason) external onlyRole(AUDITOR_ROLE) {
        require(instructors[instructor].status == InstructorStatus.Certified, "Instructor not certified");
        
        instructors[instructor].status = InstructorStatus.Suspended;
        emit InstructorSuspended(instructor, reason);
    }

    function submitCourse(
        string calldata title,
        string calldata description,
        uint256 duration,
        uint256 difficultyLevel,
        string calldata contentHash
    ) external onlyCertifiedInstructor returns (uint256) {
        require(bytes(title).length > 0 && bytes(description).length > 0, "Title and description required");
        require(difficultyLevel >= 1 && difficultyLevel <= 5, "Invalid difficulty level");
        
        uint256 newCourseId = ++courseIdCounter;
        
        courses[newCourseId] = Course({
            courseId: newCourseId,
            title: title,
            description: description,
            instructor: msg.sender,
            status: CourseStatus.Submitted,
            submissionDate: block.timestamp,
            approvalDate: 0,
            approvedBy: address(0),
            duration: duration,
            difficultyLevel: difficultyLevel,
            contentHash: contentHash,
            enrollmentCount: 0,
            isActive: false
        });
        
        instructorCourses[msg.sender].push(newCourseId);
        instructors[msg.sender].coursesCreated++;
        
        emit CourseSubmitted(newCourseId, msg.sender, title);
        return newCourseId;
    }

    function reviewCourse(
        uint256 courseId,
        bool approved,
        string calldata feedback
    ) external onlyRole(VALIDATOR_ROLE) validCourse(courseId) {
        Course storage course = courses[courseId];
        require(course.status == CourseStatus.Submitted || course.status == CourseStatus.UnderReview, "Invalid course status");
        
        if (approved) {
            course.status = CourseStatus.Approved;
            course.approvalDate = block.timestamp;
            course.approvedBy = msg.sender;
            course.isActive = true;
            
            emit CourseApproved(courseId, msg.sender);
            
            try skillToken.awardTokens(course.instructor, "course_approved", 1) {
                // Token award successful
            } catch {
                // Token award failed, continue without reverting
            }
            
            _updateReputation(course.instructor, 10);
            
        } else {
            course.status = CourseStatus.Rejected;
            emit CourseRejected(courseId, feedback);
        }
    }

    function verifyInstitution(
        address institution,
        string calldata name,
        string calldata country,
        InstitutionTier tier,
        string calldata accreditationDetails
    ) external onlyRole(AUTHORITY_ROLE) {
        institutions[institution] = Institution({
            name: name,
            country: country,
            tier: tier,
            isVerified: true,
            verificationDate: block.timestamp,
            accreditationDetails: accreditationDetails,
            coursesOffered: 0
        });
        
        emit InstitutionVerified(institution, tier);
    }

    function createCertificationStandard(
        string calldata standardName,
        string calldata description,
        uint256 minRequirements,
        uint256 validityPeriod
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _createStandard(standardName, description, minRequirements, validityPeriod);
    }

    function _createStandard(
        string memory standardName,
        string memory description,
        uint256 minRequirements,
        uint256 validityPeriod
    ) internal {
        standards[standardName] = CertificationStandard({
            standardName: standardName,
            description: description,
            minRequirements: minRequirements,
            validityPeriod: validityPeriod,
            isActive: true
        });
        
        emit StandardCreated(standardName, validityPeriod);
    }

    function _updateReputation(address instructor, uint256 points) internal {
        uint256 newScore = reputationScore[instructor] + points;
        reputationScore[instructor] = newScore > 1000 ? 1000 : newScore;
        emit ReputationUpdated(instructor, reputationScore[instructor]);
    }

    // View functions
    function getInstructorCourses(address instructor) external view returns (uint256[] memory) {
        return instructorCourses[instructor];
    }

    function getCourseStatus(uint256 courseId) external view validCourse(courseId) returns (CourseStatus) {
        return courses[courseId].status;
    }

    function isInstructorCertified(address instructor) external view returns (bool) {
        return instructors[instructor].status == InstructorStatus.Certified && 
               instructors[instructor].expiryDate > block.timestamp;
    }

    // Admin functions
    function setCertificationFee(uint256 newFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        certificationFee = newFee;
    }

    function setRenewalFee(uint256 newFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        renewalFee = newFee;
    }

    function withdrawFees() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function updateSkillToken(address newSkillToken) external onlyRole(DEFAULT_ADMIN_ROLE) {
        skillToken = ISkillToken(newSkillToken);
    }

    function updateCredentialToken(address newCredentialToken) external onlyRole(DEFAULT_ADMIN_ROLE) {
        credentialToken = IAcademicCredentialToken(newCredentialToken);
    }
}