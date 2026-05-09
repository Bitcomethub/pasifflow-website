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

    const properties = await prisma.property.findMany({
        where: { llc: { ownerId: session.userId } },
        orderBy: [{ purchaseDate: "asc" }, { createdAt: "asc" }],
        include: {
            llc: { select: { name: true, formationState: true } },
        },
    })

    return NextResponse.json({ properties })
}
