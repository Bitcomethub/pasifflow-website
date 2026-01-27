"use client"

import { ClientSidebar } from "@/components/dashboard/client-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <ClientSidebar />
      <main className="flex-grow pl-72">
        {children}
      </main>
    </div>
  )
}
