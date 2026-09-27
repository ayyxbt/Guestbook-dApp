// context/WalletContext.tsx
"use client"

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react"
import { BrowserProvider, Contract, JsonRpcSigner } from "ethers"
import { GUESTBOOK_ADDRESS, GUESTBOOK_ABI } from "@/lib/guestbook"
import { getWalletConnectProvider } from "@/lib/walletconnect"

type WalletContextType = {
  account: string | null
  signer: JsonRpcSigner | null
  contract: Contract | null
  connecting: boolean
  connectInjected: () => Promise<void>
  connectWalletConnect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | null>(null)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [contract, setContract] = useState<Contract | null>(null)
  const [connecting, setConnecting] = useState(false)

  // Keep a handle on whichever raw provider is active, so disconnect can clean it up properly
  const rawProviderRef = useRef<any>(null)

  const setupFromRawProvider = useCallback(async (rawProvider: any) => {
    const provider = new BrowserProvider(rawProvider)
    const signer = await provider.getSigner()
    const contract = new Contract(GUESTBOOK_ADDRESS, GUESTBOOK_ABI, signer)

    setSigner(signer)
    setAccount(await signer.getAddress())
    setContract(contract)
  }, [])

  const connectInjected = useCallback(async () => {
    if (!window.ethereum) {
      alert("No wallet found. Please install MetaMask or another injected wallet.")
      return
    }
    try {
      setConnecting(true)
      await window.ethereum.request({ method: "eth_requestAccounts" })
      rawProviderRef.current = window.ethereum
      await setupFromRawProvider(window.ethereum)
    } catch (err) {
      console.error("Injected wallet connection failed:", err)
    } finally {
      setConnecting(false)
    }
  }, [setupFromRawProvider])

  const connectWalletConnect = useCallback(async () => {
    try {
      setConnecting(true)
      const wcProvider = await getWalletConnectProvider()
      rawProviderRef.current = wcProvider

      // If the user disconnects from inside their wallet app, clean up our state too
      wcProvider.on("disconnect", () => {
        disconnect()
      })

      await setupFromRawProvider(wcProvider)
    } catch (err) {
      console.error("WalletConnect connection failed:", err)
    } finally {
      setConnecting(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupFromRawProvider])

  const disconnect = useCallback(() => {
    const rawProvider = rawProviderRef.current
    // WalletConnect's provider needs an explicit disconnect call to close the session;
    // an injected wallet (MetaMask) has no such method, hence the optional check.
    if (rawProvider?.disconnect) {
      rawProvider.disconnect()
    }
    rawProviderRef.current = null
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
        connectInjected()
      }
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", () => window.location.reload())

    return () => {
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged)
    }
  }, [connectInjected, disconnect])

  return (
    <WalletContext.Provider
      value={{ account, signer, contract, connecting, connectInjected, connectWalletConnect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider")
  return ctx
}