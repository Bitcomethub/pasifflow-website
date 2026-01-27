"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    DollarSign,
    FileText,
    Settings,
    LogOut,
    TrendingUp,
    Gift
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/agent/dashboard" },
    { name: "Referanslarım", icon: Users, href: "/agent/referrals" },
    { name: "Kazançlarım", icon: DollarSign, href: "/agent/earnings" },
    { name: "Pazarlama Araçları", icon: Gift, href: "/agent/marketing" },
    { name: "Eğitimler", icon: FileText, href: "/agent/academy" },
]

export function AgentSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-72 h-screen flex flex-col bg-white border-r border-slate-100 fixed top-0 left-0 z-40">
            <div className="p-8">
                <Logo size="md" theme="light" />
                <div className="mt-2 px-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C1A05E] bg-[#C1A05E]/10 px-2 py-0.5 rounded">Agent Portal</span>
                </div>
            </div>

            <nav className="flex-grow px-4 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group",
                            pathname === item.href
                                ? "bg-[#C1A05E] text-white shadow-lg shadow-[#C1A05E]/20"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5",
                            pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-slate-900"
                        )} />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 mt-auto space-y-1 border-t border-slate-50">
                <Link
                    href="/agent/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                    <Settings className="w-5 h-5 text-slate-400" />
                    Ayarlar
                </Link>
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/5 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    Çıkış Yap
                </button>
            </div>
        </aside>
    )
}
