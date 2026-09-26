"use client"

import { useState } from "react"
import { useWallet } from "@/context/WalletContext"
import BrandDots from "../GoogleBrandedDots"

function shortenAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { account, connecting, connect, disconnect } = useWallet()

  const label = connecting ? "Connecting..." : account ? shortenAddress(account) : "Connect Wallet"

  function handleClick() {
    if (account) {
      disconnect()
    } else {
      connect()
    }
  }

  return (
    <div className="w-full relative px-4 sm:px-6 py-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white rounded-full px-3 sm:px-4 py-2 shadow-sm w-fit shrink-0">
          <BrandDots size={16} />
          <p className="font-semibold text-xs sm:text-sm text-gray-800 whitespace-nowrap">
            GDGoC <span className="text-gray-400 font-semibold">Guestbook</span>
          </p>
        </div>

        <button
          onClick={handleClick}
          disabled={connecting}
          className="hidden md:flex items-center gap-2 bg-gray-900 text-white rounded-full px-5 py-3 shadow-sm text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors shrink-0 disabled:opacity-60"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M13 12h7l-2-2m0 4l2-2" />
          </svg>
          {label}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-white rounded-full p-2.5 shadow-sm shrink-0"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-800 transition-transform duration-300 ${menuOpen ? "rotate-90" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu — always rendered, animated via grid-rows */}
      <div
        className={`md:hidden grid transition-all duration-300 ease-in-out ${
          menuOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-4">
            <button
              onClick={handleClick}
              disabled={connecting}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white rounded-full px-5 py-3 text-xs font-semibold hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}