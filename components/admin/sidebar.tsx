"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
// Use Lucide icons which are standard in shadcn/ui
import {
    LayoutDashboard,
    Building2,
    Wrench,
    Wallet,
    FileText,
    Settings,
    LogOut
} from "lucide-react"

export function AdminSidebar() {
    const pathname = usePathname()

    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin",
            active: pathname === "/admin",
        },
        {
            label: "Properties",
            icon: Building2,
            href: "/admin/properties",
            active: pathname.startsWith("/admin/properties"),
        },
        {
            label: "Maintenance",
            icon: Wrench,
            href: "/admin/maintenance",
            active: pathname.startsWith("/admin/maintenance"),
        },
        {
            label: "Financials",
            icon: Wallet,
            href: "/admin/financials",
            active: pathname.startsWith("/admin/financials"),
        },
        {
            label: "Documents",
            icon: FileText,
            href: "/admin/documents",
            active: pathname.startsWith("/admin/documents"),
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/admin/settings",
            active: pathname.startsWith("/admin/settings"),
        },
    ]

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/admin" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        {/* Placeholder for Logo */}
                        <div className="w-8 h-8 bg-[#B8A074] rounded-lg flex items-center justify-center font-bold text-white">
                            P
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">
                        Pasiflow <span className="text-[#B8A074] text-xs align-top">Admin</span>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                route.active ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.active ? "text-[#B8A074]" : "text-zinc-400")} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <button
                    onClick={() => {
                        localStorage.removeItem("pasiflow_token")
                        localStorage.removeItem("pasiflow_user")
                        window.location.href = "/tr/login" // Refresh to clear state
                    }}
                    className="w-full flex items-center p-3 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition text-left"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    )
}
