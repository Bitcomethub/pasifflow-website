"use client"

import { useState, useEffect } from "react"
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
import { motion } from "framer-motion"

interface ClientSidebarProps {
    onClose?: () => void
}

export function ClientSidebar({ onClose }: ClientSidebarProps) {
    const pathname = usePathname()
    const t = useTranslations("nav")
    const [user, setUser] = useState<{ fullName?: string; email?: string } | null>(null)

    useEffect(() => {
        try {
            const stored = localStorage.getItem("pasiflow_user")
            if (stored) setUser(JSON.parse(stored))
        } catch {
            // ignore parse errors
        }
    }, [])

    const initials = user?.fullName
        ? user.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
        : "PF"

    const menuItems = [
        { title: t("dashboard"), href: "/dashboard", icon: LayoutDashboard },
        { title: t("myPortfolio"), href: "/dashboard/properties", icon: Home },
        { title: t("financials"), href: "/dashboard/financials", icon: Wallet },
        { title: t("documents"), href: "/dashboard/documents", icon: FileText },
        { title: t("support"), href: "/dashboard/support", icon: LifeBuoy }
    ]

    const handleNavClick = () => onClose?.()

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-[#1F2328] text-white transition-transform">
            <div className="flex h-20 items-center justify-start border-b border-white/10 px-6">
                <Link href="/dashboard" onClick={handleNavClick}>
                    <Logo size="md" theme="dark" showMotto={false} />
                </Link>
            </div>

            <div className="px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                    {t("investorPanel")}
                </motion.div>
                <nav className="space-y-1">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={item.href}
                                onClick={handleNavClick}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                    pathname === item.href
                                        ? "bg-[#C1A05E] text-white shadow-lg shadow-[#C1A05E]/20"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white/5 rounded-xl"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <item.icon className={cn(
                                    "h-5 w-5 relative z-10 transition-colors",
                                    pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-white"
                                )} />
                                <span className="relative z-10">{item.title}</span>
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="activeClientIndicator"
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#C1A05E] rounded-l-full"
                                    />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 mb-4 px-4 text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                    {t("account")}
                </motion.div>
                <nav className="space-y-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <Link
                            href="/dashboard/settings"
                            onClick={handleNavClick}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group",
                                pathname === "/dashboard/settings"
                                    ? "bg-[#C1A05E] text-white"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Settings className="h-5 w-5 transition-transform group-hover:rotate-90" />
                            {t("settings")}
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            onClick={() => {
                                localStorage.removeItem("pasiflow_token");
                                localStorage.removeItem("pasiflow_user");
                                window.location.href = "/";
                            }}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all hover:bg-red-500/10 hover:text-red-500 group"
                            aria-label="Log out"
                        >
                            <LogOut className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            {t("logout")}
                        </button>
                    </motion.div>
                </nav>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-0 right-0 px-6"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl bg-white/5 p-4 border border-white/10 flex items-center gap-3 cursor-pointer"
                >
                    <div className="h-10 w-10 rounded-full bg-[#C1A05E] flex items-center justify-center font-bold text-white relative">
                        {initials}
                        <motion.span
                            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#1F2328] rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <div className="overflow-hidden">
                        <p className="truncate text-sm font-bold text-white">{user?.fullName || "Pasiflow"}</p>
                        <p className="truncate text-xs text-slate-400">{user?.email || ""}</p>
                    </div>
                </motion.div>
            </motion.div>
        </aside>
    )
}
