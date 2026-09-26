"use client"

import { useQuery } from "@tanstack/react-query"
import { JsonRpcProvider, Contract } from "ethers"
import { GUESTBOOK_ADDRESS, GUESTBOOK_ABI, RawPost } from "@/lib/guestbook"

const AVATAR_COLORS = ["bg-pink-300", "bg-yellow-300", "bg-blue-300", "bg-green-300", "bg-purple-300"]

export type UIEntry = {
  address: string
  timeAgo: string
  message: string
  avatarColor: string
}

function shortenAddress(addr: string) {
  return `${addr.slice(0, 6).toUpperCase()}...${addr.slice(-4).toUpperCase()}`
}

function timeAgo(timestampSeconds: bigint): string {
  const seconds = Math.floor(Date.now() / 1000) - Number(timestampSeconds)
  if (seconds < 60) return "JUST NOW"
  if (seconds < 3600) return `${Math.floor(seconds / 60)} MINUTES AGO`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} HOURS AGO`
  return `${Math.floor(seconds / 86400)} DAYS AGO`
}

function colorFor(address: string): string {
  const idx = parseInt(address.slice(2, 4), 16) % AVATAR_COLORS.length
  return AVATAR_COLORS[idx]
}

// Read-only RPC endpoint — no wallet needed just to display entries
const READ_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL!

export function useGuestbookEntries() {
  const { 
    data: entries = [], 
    isLoading: loading, 
    refetch 
  } = useQuery({
    queryKey: ["guestbookEntries"],
    queryFn: async () => {
      const provider = new JsonRpcProvider(READ_RPC_URL)
      const contract = new Contract(GUESTBOOK_ADDRESS, GUESTBOOK_ABI, provider)
      
      const raw: RawPost[] = await contract.getAllEntries()

      // Map and reverse the data directly inside the fetcher function
      return raw
        .map((p) => ({
          address: shortenAddress(p.user),
          timeAgo: timeAgo(p.timestamp),
          message: p.post,
          avatarColor: colorFor(p.user),
        }))
        .reverse()
    }
  })

  return { entries, loading, refetch }
}