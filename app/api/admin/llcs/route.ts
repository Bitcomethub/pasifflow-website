import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"

// GET /api/admin/llcs — Lightweight list for dropdowns
export async function GET(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const llcs = await prisma.lLC.findMany({
        select: {
            id: true,
            name: true,
            formationState: true,
            owner: { select: { fullName: true, email: true } },
        },
        orderBy: { name: "asc" },
    })

    return NextResponse.json({ llcs })
}
