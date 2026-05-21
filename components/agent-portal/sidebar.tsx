"use client"

import { Link, useRouter, usePathname } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import {
    LayoutDashboard,
    Users,
    DollarSign,
    FileText,
    Settings,
    LogOut,
    Gift
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

interface AgentSidebarProps {
    onClose?: () => void
}

export function AgentSidebar({ onClose }: AgentSidebarProps) {
    const pathname = usePathname()
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations("nav")

    const menuItems = [
        { name: t("agentDashboard"), icon: LayoutDashboard, href: "/agent/dashboard" },
        { name: t("agentReferrals"), icon: Users, href: "/agent/referrals" },
        { name: t("agentEarnings"), icon: DollarSign, href: "/agent/earnings" },
        { name: t("agentMarketing"), icon: Gift, href: "/agent/marketing" },
        { name: t("agentAcademy"), icon: FileText, href: "/agent/academy" },
    ]

    const handleNavClick = () => onClose?.()

    const handleLogout = () => {
        localStorage.removeItem("pasiflow_token")
        localStorage.removeItem("pasiflow_user")
        router.push("/login", { locale })
    }

    return (
        <aside className="w-72 h-screen flex flex-col bg-white border-r border-slate-100 fixed top-0 left-0 z-40">
            <div className="p-8">
                <Logo size="md" theme="light" />
                <div className="mt-2 px-1">
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#C1A05E] bg-[#C1A05E]/10 px-2 py-0.5 rounded inline-block"
                    >
                        {t("agentPortal")}
                    </motion.span>
                </div>
            </div>

            <nav className="flex-grow px-4 space-y-1">
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
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative overflow-hidden",
                                pathname === item.href
                                    ? "bg-[#C1A05E] text-white shadow-lg shadow-[#C1A05E]/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <motion.div
                                className="absolute inset-0 bg-[#C1A05E]/10 rounded-xl"
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                            <item.icon className={cn(
                                "w-5 h-5 relative z-10 transition-colors",
                                pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-slate-900"
                            )} />
                            <span className="relative z-10">{item.name}</span>
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-l-full"
                                />
                            )}
                        </Link>
                    </motion.div>
                ))}
            </nav>

            <div className="p-4 mt-auto space-y-1 border-t border-slate-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        href="/agent/settings"
                        onClick={handleNavClick}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
                    >
                        <Settings className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                        {t("settings")}
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                >
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/5 transition-all group"
                        aria-label={t("logout")}
                    >
                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        {t("logout")}
                    </button>
                </motion.div>
            </div>
        </aside>
    )
}
