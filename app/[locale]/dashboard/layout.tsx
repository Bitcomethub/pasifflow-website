"use client"

import { useState, useEffect } from "react"
import { useLocale, useTranslations } from "next-intl"
import { ClientSidebar } from "@/components/dashboard/client-sidebar"
import { Menu, X, Shield } from "lucide-react"
import { Logo } from "@/components/logo"
import { Link } from "@/i18n/navigation"
import { AuthGuard } from "@/components/auth-guard"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = useLocale()
  const tCommon = useTranslations("common")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem("pasiflow_user")
      if (stored) {
        const parsed = JSON.parse(stored)
        setIsAdmin(parsed?.role === "ADMIN")
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  return (
    <AuthGuard allowedRoles={["USER", "ADMIN"]} loginPath={`/${locale}/login`}>
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
        {isAdmin && (
          <div className="flex justify-end px-6 md:px-10 pt-4">
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#C1A05E] transition-colors border border-slate-200 hover:border-[#C1A05E]/40 bg-white rounded-full px-3 py-1.5"
            >
              <Shield className="h-3.5 w-3.5" />
              {tCommon("adminPanel")}
            </a>
          </div>
        )}
        <div className="p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
