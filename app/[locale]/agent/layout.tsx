"use client"

import { AgentSidebar } from "@/components/agent-portal/sidebar"

export default function AgentLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <AgentSidebar />
            <main className="flex-grow pl-72">
                {children}
            </main>
        </div>
    )
}
