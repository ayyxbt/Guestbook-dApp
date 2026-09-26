// context/WalletContext.tsx
"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { BrowserProvider, Contract, JsonRpcSigner } from "ethers"
import { GUESTBOOK_ADDRESS, GUESTBOOK_ABI } from "@/lib/guestbook"

type WalletContextType = {
  account: string | null
  signer: JsonRpcSigner | null
  contract: Contract | null
  connecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)
  const [connecting, setConnecting] = useState(false)

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      alert("No wallet found. Please install MetaMask or another injected wallet.")
      return
    }
    try {
      setConnecting(true)
      const provider = new BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const contract = new Contract(GUESTBOOK_ADDRESS, GUESTBOOK_ABI, signer)

      setSigner(signer)
      setAccount(await signer.getAddress())
      setContract(contract)
    } catch (err) {
      console.error("Wallet connection failed:", err)
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setAccount(null)
    setSigner(null)
    setContract(null)
  }, [])

  useEffect(() => {
    if (!window.ethereum?.on) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else {
        connect()
      }
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", () => window.location.reload())

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged)
    }
  }, [connect, disconnect])

  return (
    <WalletContext.Provider value={{ account, signer, contract, connecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider")
  return ctx
}