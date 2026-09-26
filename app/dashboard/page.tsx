"use client"

import Navbar from "../components/Dashboard/Navbar"
import MessageComposer from "../components/Dashboard/MessageSection"
import RecentSignatures from "../components/Dashboard/RecentMessages"
import { useGuestbookEntries } from "@/hooks/useGuestbookEntries"

export default function Dashboard() {
    const { entries, loading, refetch } = useGuestbookEntries()

    return (
        <>
            <Navbar />
            <MessageComposer onPosted={refetch} />
            <RecentSignatures entries={entries} globalCount={entries.length} loading={loading} />
        </>
    )
}