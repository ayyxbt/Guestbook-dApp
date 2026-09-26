// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

struct Post{
    address user;
    string post;
    uint256 timestamp;
}

//max string

uint256 public constant MaxWords = 140;

Post[] private UserPosts;

//mapping to check if a user has posted before
mapping(address => bool) public hasPosted;

event PostedContent(address indexed user, string post, uint256 timestamp)

//custom errors
//when the users post is more than 140 words
error PostTooLong()
//when the user has already posted()
error HasAlreadyPosted()
//when a user tries to post an empty message
error EmptyMessage()

//function for the user to make a post
function MakePost(string calldata _message) external {
    //check if the user has already made a post
    if(hasPosted[msg.sender]) revert HasAlreadyPosted()

    uint256 messageLength = bytes(_message).length
    if(messageLength == 0) revert EmptyMessage()
    if(messageLength > MaxWords) revert PostTooLong()

    hasPosted[msg.sender] = true

    UserPosts.push(
        Posts({user: msg.sender, post: _message, timestamp: block.timestamp})
    )

emit PostedContent(msg.sender, _message, block.timestamp);

//function to get the post lengths
function GetPostLength() external view returns(uint256){
    return UserPosts.length;
}
//function to return an entry by its index
function getEntry(uint256 _index) external view returns (Post memory){
    return UserPosts[_index];
}
//function to return all entries
function getAllEntries() external view returns (Post[] memory){
    return UserPosts;
}

} 