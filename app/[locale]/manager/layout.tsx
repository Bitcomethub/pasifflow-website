"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import Link from "next/link"
import { Menu, X } from "lucide-react"
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
    const [activeView, setActiveView] = useState<"list" | "new">("list")

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

    useEffect(() => {
        const onActive = (e: Event) => {
            const detail = (e as CustomEvent).detail as "list" | "new"
            setActiveView(detail)
        }
        window.addEventListener("manager:active", onActive)
        return () => window.removeEventListener("manager:active", onActive)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("pasiflow_token")
        localStorage.removeItem("pasiflow_user")
        router.push(`/${locale}/login`)
    }

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F6F4EE]">
                <div className="w-2 h-2 rounded-full bg-[#1F2328] animate-pulse" />
            </div>
        )
    }

    if (!user) return null

    const dispatchView = (view: "list" | "new") => {
        window.dispatchEvent(new CustomEvent("manager:view", { detail: view }))
        setSidebarOpen(false)
    }

    const Sidebar = () => (
        <aside className="flex flex-col h-full w-64 bg-[#F6F4EE] border-r border-[#E2DDD0]">
            {/* Wordmark */}
            <div className="px-7 pt-9 pb-8">
                <Link href={`/${locale}/manager`} className="block">
                    <div className="eyebrow text-[10px]">Pasiflow</div>
                    <div className="display text-[26px] mt-1.5 leading-none">
                        Detroit
                        <br />
                        <span className="italic text-[#C1A05E]">Manager</span>
                    </div>
                </Link>
            </div>

            <hr className="rule mx-7" />

            {/* Nav — minimal, numbered, editorial */}
            <nav className="flex-1 px-7 pt-7 pb-4 flex flex-col gap-1">
                <NavRow
                    label="All listings"
                    index="01"
                    active={activeView === "list"}
                    onClick={() => dispatchView("list")}
                />
                <NavRow
                    label="New listing"
                    index="02"
                    active={activeView === "new"}
                    onClick={() => dispatchView("new")}
                />
            </nav>

            <hr className="rule mx-7" />

            {/* Foot — Justin's identity */}
            <div className="px-7 py-6">
                <div className="eyebrow text-[9px]">Signed in</div>
                <div className="display text-[18px] mt-1.5 leading-tight">
                    {user.fullName || "Manager"}
                </div>
                <div className="text-[12px] text-[#6C7585] mt-0.5 truncate">{user.email}</div>
                <button
                    onClick={handleLogout}
                    className="mt-5 text-[11px] eyebrow text-[#6C7585] hover:text-[#1F2328] transition-colors"
                >
                    Sign out →
                </button>
            </div>
        </aside>
    )

    return (
        <div className="manager-surface min-h-screen flex">
            {/* Desktop sidebar */}
            <div className="hidden md:block fixed inset-y-0 left-0 z-20">
                <Sidebar />
            </div>

            {/* Mobile bar — flat, no rounded button */}
            <div className="fixed top-0 left-0 right-0 z-30 h-12 bg-[#F6F4EE] border-b border-[#E2DDD0] flex items-center justify-between px-5 md:hidden">
                <div>
                    <div className="eyebrow text-[9px]">Pasiflow</div>
                    <div className="display text-[15px] leading-none mt-0.5">
                        Detroit <span className="italic text-[#C1A05E]">Manager</span>
                    </div>
                </div>
                <button
                    onClick={() => setSidebarOpen((s) => !s)}
                    aria-label="Toggle menu"
                    className="text-[#1F2328] p-1.5"
                >
                    {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {sidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-[#1F2328]/40" onClick={() => setSidebarOpen(false)} />
                    <div className="absolute inset-y-0 left-0">
                        <Sidebar />
                    </div>
                </div>
            )}

            <main className="flex-1 md:pl-64 pt-12 md:pt-0 min-w-0">
                <div className="px-6 py-10 md:px-14 md:py-16 max-w-[1180px]">{children}</div>
            </main>
        </div>
    )
}

function NavRow({
    label,
    index,
    active,
    onClick,
}: {
    label: string
    index: string
    active: boolean
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group flex items-baseline gap-3 py-2 text-left transition-colors",
                active ? "text-[#1F2328]" : "text-[#6C7585] hover:text-[#1F2328]"
            )}
        >
            <span
                className={cn(
                    "figure-numeral text-[13px] w-6 transition-colors",
                    active ? "text-[#C1A05E]" : "text-[#A8AEB6] group-hover:text-[#C1A05E]"
                )}
            >
                {index}
            </span>
            <span className="text-[15px] tracking-tight">
                {label}
            </span>
            {active && <span className="ml-auto text-[#C1A05E] text-[15px] leading-none">·</span>}
        </button>
    )
}
