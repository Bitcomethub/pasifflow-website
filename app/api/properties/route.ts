import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { extractBearerToken, verifyToken } from "@/lib/auth"

export async function GET(req: Request) {
    const token = extractBearerToken(req)
    const session = token ? verifyToken(token) : null

    if (!session) {
        return NextResponse.json(
            { error: "Yetkisiz" },
            { status: 401 }
        )
    }

    const rows = await prisma.property.findMany({
        where: { llc: { ownerId: session.userId } },
        orderBy: [{ purchaseDate: "asc" }, { createdAt: "asc" }],
        include: {
            llc: { select: { name: true, formationState: true } },
        },
    })

    const properties = rows.map((p) => {
        const annualReturn = p.monthlyRent * 12
        const roi = ((annualReturn / p.purchasePrice) * 100).toFixed(1)
        return { ...p, roi, annualReturn }
    })

    return NextResponse.json({ properties })
}
