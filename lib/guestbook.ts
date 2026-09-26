// lib/guestbook.ts
export const GUESTBOOK_ADDRESS = "0x8A808Df403923426465705a799C81Fa972F5f148"

export const GUESTBOOK_ABI = [
  "error EmptyMessage()",
  "error HasAlreadyPosted()",
  "error InvalidIndex()",
  "error PostTooLong()",
  "event PostedContent(address indexed user, string post, uint256 timestamp)",
  "function MAX_MESSAGE_BYTES() view returns (uint256)",
  "function getAllEntries() view returns (tuple(address user, string post, uint256 timestamp)[])",
  "function getEntry(uint256 index) view returns (tuple(address user, string post, uint256 timestamp))",
  "function getPostLength() view returns (uint256)",
  "function hasPosted(address) view returns (bool)",
  "function makePost(string message)",
] as const

export type RawPost = {
  user: string
  post: string
  timestamp: bigint
}