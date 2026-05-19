import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { extractBearerToken, verifyToken } from "@/lib/auth"

const ALLOWED_ROLES = new Set(["MANAGER", "ADMIN"])

function requireSession(req: Request) {
    const token = extractBearerToken(req)
    if (!token) return null
    return verifyToken(token)
}

// GET /api/listings — list all (any authenticated user)
export async function GET(req: Request) {
    const session = requireSession(req)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const listings = await prisma.listing.findMany({
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ listings })
}

// POST /api/listings — create (MANAGER or ADMIN)
export async function POST(req: Request) {
    const session = requireSession(req)
    if (!session || !ALLOWED_ROLES.has(session.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const body = await req.json()

        if (!body.address || typeof body.price !== "number") {
            return NextResponse.json(
                { error: "address and price are required" },
                { status: 400 }
            )
        }

        const listing = await prisma.listing.create({
            data: {
                address: body.address,
                price: body.price,
                bedrooms: body.bedrooms ?? 3,
                bathrooms: body.bathrooms ?? 1,
                sqft: body.sqft ?? null,
                landSize: body.landSize ?? null,
                propertyType: body.propertyType ?? "Single Family",
                yearBuilt: body.yearBuilt ?? null,
                monthlyRent: body.monthlyRent ?? 0,
                dscrRate: body.dscrRate ?? 0,
                annualTaxes: body.annualTaxes ?? 0,
                annualInsurance: body.annualInsurance ?? 0,
                renovationItems: JSON.stringify(body.renovationItems ?? []),
                renovationNotes: body.renovationNotes ?? null,
                beforePhotos: JSON.stringify(body.beforePhotos ?? []),
                afterPhotos: JSON.stringify(body.afterPhotos ?? []),
                status: body.status ?? "draft",
                createdBy: session.userId,
            },
        })

        return NextResponse.json({ listing }, { status: 201 })
    } catch (error) {
        console.error("Create listing error:", error)
        return NextResponse.json(
            { error: "Failed to create listing" },
            { status: 500 }
        )
    }
}
