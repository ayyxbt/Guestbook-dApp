# GDGoC Guestbook

An on-chain guestbook where visitors sign a permanent, wallet-verified message. Every entry is stored directly on the blockchain — connect a wallet to sign, or just browse the ledger with no wallet needed.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Blockchain:** Solidity, Hardhat, ethers.js v6
- **Wallet connection:** MetaMask / injected wallet (via `window.ethereum`)

## Network

- **Chain:** Ethereum
- **Network:** Sepolia Testnet <!-- update if different -->

## Deployed Contract

- **Contract Address:** `0x8A808Df403923426465705a799C81Fa972F5f148`
- **Block Explorer:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x8A808Df403923426465705a799C81Fa972F5f148)

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MetaMask](https://metamask.org/) (or another injected wallet extension) installed in your browser
- A wallet funded with Sepolia testnet ETH (get some from a [Sepolia faucet](https://sepoliafaucet.com/)) if you plan to post entries

### 1. Clone the repository

```bash
git clone https://github.com/ayyxbt/Guestbook-dApp.git
cd Guestbook-dApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` (or `.env.local`) file in the project root with:

```
NEXT_PUBLIC_RPC_URL=your-sepolia-rpc-url-here
```

Get a free RPC URL from [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/) by creating a free account and setting up an app for the Sepolia network.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Connect your wallet

Make sure MetaMask is set to the **Sepolia** network, then click "Connect Wallet" to sign the guestbook.

## Smart Contract Development (optional)

If you want to modify or redeploy the contract:

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

To deploy to Sepolia, configure your deployer wallet's private key and an RPC URL in `contracts/hardhat.config.ts`, then run your deployment script/Ignition module targeting the `sepolia` network.