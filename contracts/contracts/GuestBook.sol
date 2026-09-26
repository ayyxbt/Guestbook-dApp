// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

contract Guestbook {
    struct Post {
        address user;
        string post;
        uint256 timestamp;
    }

    uint256 public constant MAX_MESSAGE_BYTES = 140;

    Post[] private userPosts;

    // Tracks whether an address has already posted.
    mapping(address => bool) public hasPosted;

    event PostedContent(
        address indexed user,
        string post,
        uint256 timestamp
    );

    error PostTooLong();
    error HasAlreadyPosted();
    error EmptyMessage();
    error InvalidIndex();

    function makePost(string calldata message) external {
        if (hasPosted[msg.sender]) revert HasAlreadyPosted();

        uint256 messageLength = bytes(message).length;
        if (messageLength == 0) revert EmptyMessage();
        if (messageLength > MAX_MESSAGE_BYTES) revert PostTooLong();

        hasPosted[msg.sender] = true;

        uint256 timestamp = block.timestamp;
        userPosts.push(
            Post({user: msg.sender, post: message, timestamp: timestamp})
        );

        emit PostedContent(msg.sender, message, timestamp);
    }

    function getPostLength() external view returns (uint256) {
        return userPosts.length;
    }

    function getEntry(uint256 index) external view returns (Post memory) {
        if (index >= userPosts.length) revert InvalidIndex();
        return userPosts[index];
    }

    function getAllEntries() external view returns (Post[] memory) {
        return userPosts;
    }
}
