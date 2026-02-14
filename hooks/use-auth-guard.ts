"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useAuthGuard(requiredRole?: string) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthed, setIsAuthed] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("pasiflow_token")
        const userStr = localStorage.getItem("pasiflow_user")
        const user = userStr ? JSON.parse(userStr) : null

        if (!token || !user) {
            const locale = pathname.startsWith("/en") ? "en" : "tr"
            router.replace(`/${locale}/login`)
            return
        }

        if (requiredRole && user.role !== requiredRole) {
            router.replace("/")
            return
        }

        setIsAuthed(true)
    }, [router, pathname, requiredRole])

    return isAuthed
}
