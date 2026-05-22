"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Menu, X } from "lucide-react"

export function AdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="h-full relative">
            {/* Desktop sidebar */}
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <AdminSidebar />
            </div>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-[70] md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile sidebar drawer */}
            <div
                className={`fixed inset-y-0 left-0 z-[80] w-72 transform transition-transform duration-300 ease-in-out md:hidden ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <AdminSidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Mobile top bar */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-14 bg-[#1A1A1A] flex items-center justify-between px-4 md:hidden border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#B8A074] rounded-lg flex items-center justify-center font-bold text-white text-sm">
                        P
                    </div>
                    <span className="text-white font-bold text-base">
                        Pasiflow <span className="text-[#B8A074] text-[10px] align-top">Admin</span>
                    </span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                    aria-expanded={sidebarOpen}
                >
                    {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <main className="md:pl-72 pt-14 md:pt-0 pb-10">
                {children}
            </main>
        </div>
    )
}
