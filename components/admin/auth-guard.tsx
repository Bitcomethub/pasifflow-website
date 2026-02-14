"use client"

import { useAuthGuard } from "@/hooks/use-auth-guard"

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
    const isAuthed = useAuthGuard("ADMIN")

    if (!isAuthed) return null

    return <>{children}</>
}
