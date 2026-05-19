import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { extractBearerToken, verifyToken } from "@/lib/auth"

const ALLOWED_ROLES = new Set(["MANAGER", "ADMIN"])

function requireSession(req: Request) {
    const token = extractBearerToken(req)
    if (!token) return null
    return verifyToken(token)
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = requireSession(req)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await context.params
    const listing = await prisma.listing.findUnique({ where: { id } })

    if (!listing) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json({ listing })
}

export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = requireSession(req)
    if (!session || !ALLOWED_ROLES.has(session.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const { id } = await context.params
        const body = await req.json()

        const data: Record<string, unknown> = {}
        if (body.address !== undefined) data.address = body.address
        if (body.price !== undefined) data.price = body.price
        if (body.bedrooms !== undefined) data.bedrooms = body.bedrooms
        if (body.bathrooms !== undefined) data.bathrooms = body.bathrooms
        if (body.sqft !== undefined) data.sqft = body.sqft
        if (body.landSize !== undefined) data.landSize = body.landSize
        if (body.propertyType !== undefined) data.propertyType = body.propertyType
        if (body.yearBuilt !== undefined) data.yearBuilt = body.yearBuilt
        if (body.monthlyRent !== undefined) data.monthlyRent = body.monthlyRent
        if (body.dscrRate !== undefined) data.dscrRate = body.dscrRate
        if (body.annualTaxes !== undefined) data.annualTaxes = body.annualTaxes
        if (body.annualInsurance !== undefined) data.annualInsurance = body.annualInsurance
        if (body.renovationItems !== undefined)
            data.renovationItems = JSON.stringify(body.renovationItems)
        if (body.renovationNotes !== undefined) data.renovationNotes = body.renovationNotes
        if (body.beforePhotos !== undefined)
            data.beforePhotos = JSON.stringify(body.beforePhotos)
        if (body.afterPhotos !== undefined)
            data.afterPhotos = JSON.stringify(body.afterPhotos)
        if (body.status !== undefined) data.status = body.status

        const listing = await prisma.listing.update({ where: { id }, data })

        return NextResponse.json({ listing })
    } catch (error) {
        console.error("Update listing error:", error)
        return NextResponse.json(
            { error: "Failed to update listing" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = requireSession(req)
    if (!session || !ALLOWED_ROLES.has(session.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const { id } = await context.params
        await prisma.listing.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Delete listing error:", error)
        return NextResponse.json(
            { error: "Failed to delete listing" },
            { status: 500 }
        )
    }
}
