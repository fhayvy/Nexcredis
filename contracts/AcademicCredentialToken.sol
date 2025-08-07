// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AcademicCredentialToken is ERC721URIStorage, AccessControl {
    uint256 private _credentialIds; // Replace Counters with simple uint256

    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant INSTRUCTOR_ROLE = keccak256("INSTRUCTOR_ROLE");

    struct CredentialMetadata {
        string programTitle;
        string recipientName;
        string achievementLevel;
        string completionDate;
        string documentURI;
        uint256 validUntil;
        string issuingBody;
    }

    mapping(uint256 => CredentialMetadata) public credentialRecords;
    mapping(address => bool) public discountQualified;
    mapping(uint256 => bool) public credentialRedeemed;
    mapping(uint256 => Program) public programRegistry;
    mapping(address => address) public referralLinks;
    mapping(address => uint256[]) public learnerPrograms;

    event CredentialIssued(address indexed recipient, uint256 indexed credentialId, string documentUri);
    event CredentialDestroyed(uint256 indexed credentialId);
    event CredentialCancelled(uint256 indexed credentialId, string justification);
    event PrintOrderSubmitted(uint256 indexed credentialId, string orderId);
    event OwnershipChangeRequested(uint256 indexed credentialId, address indexed currentOwner, address indexed newOwner);
    event CredentialRedeemed(uint256 indexed credentialId);
    event CredentialValidated(uint256 indexed credentialId);

    struct Program {
        string title;
        string facilitator;
        string overview;
        uint256 enrollmentCost;
    }

    constructor() ERC721("AcademicCredential", "ACRED") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
    }

    function issueCredential(
        address recipient,
        string memory documentURI,
        string memory programTitle,
        string memory recipientName,
        string memory achievementLevel,
        string memory completionDate,
        uint256 validUntil,
        string memory documentTemplate,
        string memory issuingBody
    ) internal returns (uint256) {
        _credentialIds++; // Simple increment instead of Counters
        uint256 credentialId = _credentialIds;

        _mint(recipient, credentialId);
        _setTokenURI(credentialId, documentURI);

        credentialRecords[credentialId] = CredentialMetadata({
            programTitle: programTitle,
            recipientName: recipientName,
            achievementLevel: achievementLevel,
            completionDate: completionDate,
            validUntil: validUntil,
            documentURI: documentTemplate,
            issuingBody: issuingBody
        });

        emit CredentialIssued(recipient, credentialId, documentURI);
        return credentialId;
    }

    function issueDiscountedCredential(
        address recipient,
        string memory documentURI,
        string memory programTitle,
        string memory recipientName,
        string memory achievementLevel,
        string memory completionDate,
        uint256 validUntil,
        string memory documentTemplate,
        string memory issuingBody
    ) external onlyRole(ISSUER_ROLE) returns (uint256) {
        require(discountQualified[recipient], "Recipient not qualified for discount");
        return issueCredential(recipient, documentURI, programTitle, recipientName, achievementLevel, completionDate, validUntil, documentTemplate, issuingBody);
    }

    function destroyCredential(uint256 credentialId) external onlyRole(ISSUER_ROLE) {
        require(ownerOf(credentialId) != address(0), "Credential does not exist");
        _burn(credentialId);
        delete credentialRecords[credentialId];
        emit CredentialDestroyed(credentialId);
    }

    function cancelCredential(uint256 credentialId, string memory justification) external onlyRole(MANAGER_ROLE) {
        require(ownerOf(credentialId) != address(0), "Credential does not exist");
        _burn(credentialId);
        delete credentialRecords[credentialId];
        emit CredentialCancelled(credentialId, justification);
    }

    function submitPrintOrder(uint256 credentialId, string memory orderId) external onlyRole(MANAGER_ROLE) {
        require(ownerOf(credentialId) != address(0), "Credential does not exist");
        emit PrintOrderSubmitted(credentialId, orderId);
    }

    function validateCredential(uint256 credentialId) public view returns (bool) {
        require(ownerOf(credentialId) != address(0), "Credential does not exist");
        return !isCredentialExpired(credentialId) && credentialRecords[credentialId].validUntil > block.timestamp;
    }

    function isCredentialExpired(uint256 credentialId) public view returns (bool) {
        return credentialRecords[credentialId].validUntil <= block.timestamp;
    }

    function redeemCredential(uint256 credentialId) external {
        require(ownerOf(credentialId) != address(0), "Credential does not exist");
        require(!credentialRedeemed[credentialId], "Credential already redeemed");

        credentialRedeemed[credentialId] = true;
        emit CredentialRedeemed(credentialId);
    }

    function isCredentialRedeemed(uint256 credentialId) external view returns (bool) {
        return credentialRedeemed[credentialId];
    }

    function transferOwnership(address newOwner, uint256 credentialId) external {
        require(ownerOf(credentialId) != address(0), "Credential does not exist");
        require(!isCredentialExpired(credentialId), "Credential has expired");

        _transfer(msg.sender, newOwner, credentialId);
        emit OwnershipChangeRequested(credentialId, msg.sender, newOwner);
    }

    function updateCustomData(uint256 credentialId, string memory issuingBody, string memory documentTemplate) external onlyRole(MANAGER_ROLE) {
        require(ownerOf(credentialId) != address(0), "Credential does not exist");
        credentialRecords[credentialId].documentURI = documentTemplate;
        credentialRecords[credentialId].issuingBody = issuingBody;
    }

    function updateDiscountStatus(address recipient, bool qualified) external onlyRole(MANAGER_ROLE) {
        discountQualified[recipient] = qualified;
    }

    function registerProgram(uint256 programId, string memory title, string memory facilitator, string memory overview, uint256 enrollmentCost) external onlyRole(MANAGER_ROLE) {
        programRegistry[programId] = Program(title, facilitator, overview, enrollmentCost);
    }

    function getProgramInfo(uint256 programId) external view returns (Program memory) {
        return programRegistry[programId];
    }

    function establishReferral(address referee, address referrer) external {
        require(referralLinks[referee] == address(0), "Referee already linked to a referrer");
        referralLinks[referee] = referrer;
    }

    function finishProgram(address learner, uint256 programId) external onlyRole(INSTRUCTOR_ROLE) {
        learnerPrograms[learner].push(programId);
        if (allProgramsFinished(learner)) {
            issueCompletionCredential(learner);
        }
    }

    function allProgramsFinished(address learner) private view returns (bool) {
        return learnerPrograms[learner].length == 5;
    }

    function issueCompletionCredential(address learner) private {
        // Implementation depends on how you wish to distinguish this credential
    }

    // Add getter for current credential count
    function currentCredentialId() external view returns (uint256) {
        return _credentialIds;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}