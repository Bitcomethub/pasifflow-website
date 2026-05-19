"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import Link from "next/link"
import { Building2, Home, Plus, LogOut, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ManagerUser = {
    id: string
    email: string
    fullName?: string | null
    role: string
}

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const locale = useLocale()
    const [user, setUser] = useState<ManagerUser | null>(null)
    const [checking, setChecking] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        try {
            const raw = localStorage.getItem("pasiflow_user")
            if (!raw) {
                router.replace(`/${locale}/login`)
                return
            }
            const parsed: ManagerUser = JSON.parse(raw)
            if (parsed.role !== "MANAGER" && parsed.role !== "ADMIN") {
                router.replace(`/${locale}/login`)
                return
            }
            setUser(parsed)
        } catch {
            router.replace(`/${locale}/login`)
            return
        } finally {
            setChecking(false)
        }
    }, [router, locale])

    const handleLogout = () => {
        localStorage.removeItem("pasiflow_token")
        localStorage.removeItem("pasiflow_user")
        router.push(`/${locale}/login`)
    }

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0E1014]">
                <div className="w-8 h-8 border-2 border-[#C1A05E]/30 border-t-[#C1A05E] rounded-full animate-spin" />
            </div>
        )
    }

    if (!user) return null

    const initials = (user.fullName || user.email).split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()

    const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => (
        <aside className="flex flex-col h-full bg-[#1F2328] text-white w-72">
            <div className="px-6 pt-7 pb-8 border-b border-white/5">
                <Link href={`/${locale}/manager`} className="flex items-center gap-3" onClick={onNavigate}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C1A05E] to-[#8B7340] flex items-center justify-center font-bold shadow-lg shadow-[#C1A05E]/20">
                        P
                    </div>
                    <div>
                        <div className="text-lg font-bold leading-tight tracking-tight">PASIFLOW</div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#C1A05E] font-medium mt-0.5">
                            Detroit Manager
                        </div>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-3 py-6 space-y-1">
                <SidebarItem icon={Home} label="All Listings" view="list" onNavigate={onNavigate} />
                <SidebarItem icon={Plus} label="New Listing" view="new" onNavigate={onNavigate} highlight />
            </nav>

            <div className="px-3 py-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
                    <div className="w-9 h-9 rounded-full bg-[#C1A05E] flex items-center justify-center font-semibold text-sm">
                        {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold truncate">{user.fullName || "Manager"}</div>
                        <div className="text-[11px] text-white/40 truncate">{user.email}</div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-3 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <LogOut size={16} />
                    Sign out
                </button>
            </div>
        </aside>
    )

    return (
        <div className="min-h-screen flex bg-[#F6F7F9]">
            {/* Desktop sidebar */}
            <div className="hidden md:block fixed inset-y-0 left-0">
                <Sidebar />
            </div>

            {/* Mobile top bar */}
            <div className="fixed top-0 left-0 right-0 z-30 h-14 bg-[#1F2328] flex items-center justify-between px-4 md:hidden text-white">
                <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-[#C1A05E]" />
                    <span className="text-sm font-semibold">Detroit Manager</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label="Toggle menu"
                    className="p-2 rounded-lg hover:bg-white/10"
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <div className="absolute inset-y-0 left-0">
                        <Sidebar onNavigate={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            <main className="flex-1 md:pl-72 pt-14 md:pt-0">
                <div className="p-4 md:p-10 max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    )
}

function SidebarItem({
    icon: Icon,
    label,
    view,
    onNavigate,
    highlight,
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>
    label: string
    view: "list" | "new"
    onNavigate?: () => void
    highlight?: boolean
}) {
    const dispatch = () => {
        window.dispatchEvent(new CustomEvent("manager:view", { detail: view }))
        onNavigate?.()
    }
    return (
        <button
            onClick={dispatch}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                highlight
                    ? "text-[#C1A05E] hover:bg-[#C1A05E]/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
            )}
        >
            <Icon size={16} />
            {label}
        </button>
    )
}
