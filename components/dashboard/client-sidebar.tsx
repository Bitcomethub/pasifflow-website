"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Home,
    Wallet,
    FileText,
    LifeBuoy,
    Settings,
    LogOut
} from "lucide-react"
import { Logo } from "@/components/logo"
import { useTranslations } from "next-intl"

export function ClientSidebar() {
    const pathname = usePathname()
    const t = useTranslations("nav")

    const menuItems = [
        {
            title: t("dashboard"),
            href: "/dashboard",
            icon: LayoutDashboard
        },
        {
            title: t("myPortfolio"),
            href: "/dashboard/properties",
            icon: Home
        },
        {
            title: t("financials"),
            href: "/dashboard/financials",
            icon: Wallet
        },
        {
            title: t("documents"),
            href: "/dashboard/documents",
            icon: FileText
        },
        {
            title: t("support"),
            href: "/dashboard/support",
            icon: LifeBuoy
        }
    ]

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-[#1F2328] text-white transition-transform">
            <div className="flex h-20 items-center justify-start border-b border-white/10 px-6">
                <Link href="/dashboard">
                    <Logo size="md" theme="dark" showMotto={false} />
                </Link>
            </div>

            <div className="px-4 py-8">
                <div className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("investorPanel")}
                </div>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-[#C1A05E] text-white shadow-lg shadow-[#C1A05E]/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="mt-8 mb-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("account")}
                </div>
                <nav className="space-y-1">
                    <Link
                        href="/dashboard/settings"
                        className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                            pathname === "/dashboard/settings"
                                ? "bg-[#C1A05E] text-white"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <Settings className="h-5 w-5" />
                        {t("settings")}
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem("pasiflow_token");
                            localStorage.removeItem("pasiflow_user");
                            window.location.href = "/";
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                        <LogOut className="h-5 w-5" />
                        {t("logout")}
                    </button>
                </nav>
            </div>

            {/* User Profile Mini - Bottom */}
            <div className="absolute bottom-6 left-0 right-0 px-6">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#C1A05E] flex items-center justify-center font-bold text-white">
                        DA
                    </div>
                    <div className="overflow-hidden">
                        <p className="truncate text-sm font-bold text-white">Demo Hesap</p>
                        <p className="truncate text-xs text-slate-400">demo@pasiflow.com</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}
