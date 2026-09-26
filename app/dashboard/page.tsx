"use client"

import Navbar from "../components/Dashboard/Navbar"
import MessageComposer from "../components/Dashboard/MessageSection"
import RecentSignatures from "../components/Dashboard/RecentMessages"
import { useGuestbookEntries } from "@/hooks/useGuestbookEntries"

export default function Dashboard() {
    const { refetch } = useGuestbookEntries()

    return (
        <>
            <Navbar />
            <MessageComposer onPosted={refetch} />
            <RecentSignatures />
        </>
    )
}