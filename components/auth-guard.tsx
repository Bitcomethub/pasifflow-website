"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type StoredUser = {
    id: string
    email: string
    fullName?: string | null
    role: string
}

type AuthGuardProps = {
    children: React.ReactNode
    allowedRoles: string[]
    loginPath?: string
}

function resolveLoginPath(explicit?: string): string {
    if (explicit) return explicit
    if (typeof window === "undefined") return "/tr/login"
    const stored = localStorage.getItem("pasiflow_locale")
    const locale = stored === "en" || stored === "tr" ? stored : "tr"
    return `/${locale}/login`
}

export function AuthGuard({
    children,
    allowedRoles,
    loginPath,
}: AuthGuardProps) {
    const router = useRouter()
    const [authorized, setAuthorized] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const target = resolveLoginPath(loginPath)
        try {
            const token = localStorage.getItem("pasiflow_token")
            const raw = localStorage.getItem("pasiflow_user")

            if (!token || !raw) {
                router.replace(target)
                return
            }

            const parsed: StoredUser = JSON.parse(raw)
            if (!allowedRoles.includes(parsed.role)) {
                router.replace(target)
                return
            }

            setAuthorized(true)
        } catch {
            router.replace(target)
        } finally {
            setChecking(false)
        }
    }, [router, loginPath, allowedRoles])

    if (checking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-3">
                <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-gray-900 animate-spin" />
                <p className="text-sm text-gray-500">Verifying access…</p>
            </div>
        )
    }

    if (!authorized) return null

    return <>{children}</>
}
