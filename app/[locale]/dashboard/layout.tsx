"use client"

import { useState } from "react"
import { ClientSidebar } from "@/components/dashboard/client-sidebar"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile, fixed on md+ */}
      <div className="hidden md:block">
        <ClientSidebar />
      </div>

      {/* Mobile sidebar drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ClientSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 h-16 bg-[#1F2328] flex items-center justify-between px-4 md:hidden">
        <Link href="/dashboard">
          <Logo size="sm" theme="dark" showMotto={false} />
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <main className="flex-grow md:pl-72 pt-16 md:pt-0">
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
