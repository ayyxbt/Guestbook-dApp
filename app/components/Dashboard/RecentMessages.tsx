// components/Dashboard/RecentMessages.tsx
"use client"

import { UIEntry, useGuestbookEntries } from "@/hooks/useGuestbookEntries"

function EntryCard({ entry }: { entry: UIEntry }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${entry.avatarColor} shrink-0`} />
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-bold tracking-wide text-gray-800">
              {entry.address}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-gray-400">
              {entry.timeAgo}
            </span>
          </div>
        </div>

      
      </div>

      {/* Message bubble */}
      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          {entry.message}
        </p>
      </div>
    </div>
  )
}

function EntryCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm animate-pulse">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 shrink-0" />
        <div className="flex flex-col gap-2">
          <span className="w-20 h-3 rounded bg-gray-100" />
          <span className="w-16 h-2 rounded bg-gray-100" />
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
        <div className="w-full h-3 rounded bg-gray-100 mb-2" />
        <div className="w-2/3 h-3 rounded bg-gray-100" />
      </div>
    </div>
  )
}

export default function RecentSignatures() {
  // 1. Fetch data directly inside the component using the TanStack Query hook
  const { entries, loading } = useGuestbookEntries()
  
  // 2. Derive global count dynamically from the fetched array length
  const globalCount = entries.length

  return (
    <section className="w-full bg-white px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <p className="text-[10px] sm:text-xs font-bold tracking-widest text-blue-500 mb-1">
              THE LEDGER
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Recent Signatures
            </h2>
          </div>

          <div className="bg-white rounded-full px-3 sm:px-4 py-2 shadow-sm shrink-0">
            <p className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-gray-400">
              GLOBAL COUNT:{" "}
              <span className="text-gray-900 font-bold">
                {globalCount.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* Entries list */}
        {loading ? (
          <div className="flex flex-col gap-4 sm:gap-5">
            <EntryCardSkeleton />
            <EntryCardSkeleton />
            <EntryCardSkeleton />
          </div>
        ) : entries.length > 0 ? (
          <div className="flex flex-col gap-4 sm:gap-5">
            {entries.map((entry, i) => (
              <EntryCard key={i} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-sm text-gray-400 font-medium">
              No signatures yet. Be the first to sign the ledger.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}