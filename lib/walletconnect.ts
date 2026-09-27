// lib/walletconnect.ts
import { EthereumProvider } from "@walletconnect/ethereum-provider"

const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

export async function getWalletConnectProvider() {
  const provider = await EthereumProvider.init({
    projectId: WALLETCONNECT_PROJECT_ID,
    chains: [11155111], // Sepolia
    showQrModal: true,
  })

  await provider.connect()
  return provider
}