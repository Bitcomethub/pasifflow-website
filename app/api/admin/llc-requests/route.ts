import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"

// GET /api/admin/llc-requests — List all LLC requests
export async function GET(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const requests = await prisma.llcRequest.findMany({
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ requests })
}
