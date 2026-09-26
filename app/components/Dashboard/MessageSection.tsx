"use client"

import { useState } from "react"
import { useWallet } from "@/context/WalletContext"

const MAX_CHARS = 140

export default function MessageComposer({ onPosted }: { onPosted?: () => void }) {
  const { account, contract, connect } = useWallet()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "signing" | "broadcasting">("idle")
  const [error, setError] = useState<string | null>(null)

  const charCount = message.length
  const isOverLimit = charCount > MAX_CHARS
  const isEmpty = charCount === 0
  const isBusy = status !== "idle"

  async function handleSubmit() {
    setError(null)

    if (!account || !contract) {
      await connect()
      return
    }

    try {
      setStatus("signing")

      await contract.makePost.staticCall(message)

      const tx = await contract.makePost(message)
      setStatus("broadcasting")
      await tx.wait()

      setMessage("")
      onPosted?.()
    } catch (err: any) {
      setError(decodeError(err))
    } finally {
      setStatus("idle")
    }
  }

  function decodeError(err: any): string {
    const name = err?.revert?.name ?? err?.errorName ?? err?.data?.errorName
    switch (name) {
      case "EmptyMessage":
        return "Your message can't be empty."
      case "PostTooLong":
        return "Your message is too long."
      case "HasAlreadyPosted":
        return "This address has already posted to the guestbook."
      default:
        if (err?.code === "ACTION_REJECTED") return "Signature request was rejected."
        return "Something went wrong broadcasting your message."
    }
  }

  return (
    <section className="w-full bg-white px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl">

          <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Type a message.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Your words will be stored on the blockchain.
              </p>
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-5">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type a word or sentence and get it stored on the blockchain"
              rows={3}
              disabled={isBusy}
              className="w-full bg-transparent resize-none outline-none text-sm sm:text-base text-gray-800 placeholder:text-gray-300"
            />

            <div className="flex justify-end mt-2 sm:mt-3">
              <span
                className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-white ${
                  isOverLimit ? "text-red-500" : "text-gray-400"
                }`}
              >
                {charCount} / {MAX_CHARS}
              </span>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-xs sm:text-sm text-red-500 font-medium">{error}</p>
          )}

          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={handleSubmit}
              disabled={isEmpty || isOverLimit || isBusy}
              className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "signing" && "Waiting for signature..."}
              {status === "broadcasting" && "Broadcasting..."}
              {status === "idle" && (!account ? "Connect to Post" : "Sign & Broadcast")}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}