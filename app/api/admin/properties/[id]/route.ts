import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"

const VALID_STATUS = ["OCCUPIED", "VACANT", "MAINTENANCE"]

// GET /api/admin/properties/[id] — Fetch one property
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id } = await params
    const property = await prisma.property.findUnique({
        where: { id },
        include: { llc: { select: { id: true, name: true } } },
    })

    if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json({ property })
}

// PATCH /api/admin/properties/[id] — Update property
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const { id } = await params
        const body = await request.json()

        const existing = await prisma.property.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }

        const updateData: Record<string, unknown> = {}
        if (body.address !== undefined) updateData.address = body.address
        if (body.city !== undefined) updateData.city = body.city
        if (body.state !== undefined) updateData.state = body.state
        if (body.zipCode !== undefined) updateData.zipCode = body.zipCode
        if (body.tenantName !== undefined) updateData.tenantName = body.tenantName || null
        if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl || null

        if (body.purchasePrice !== undefined) {
            const v = Number(body.purchasePrice)
            if (!Number.isFinite(v) || v <= 0) {
                return NextResponse.json({ error: "purchasePrice must be a positive number" }, { status: 400 })
            }
            updateData.purchasePrice = v
        }
        if (body.currentValue !== undefined) {
            updateData.currentValue = body.currentValue === null || body.currentValue === ""
                ? null
                : Number(body.currentValue)
        }
        if (body.monthlyRent !== undefined) {
            const v = Number(body.monthlyRent)
            if (!Number.isFinite(v) || v < 0) {
                return NextResponse.json({ error: "monthlyRent must be a non-negative number" }, { status: 400 })
            }
            updateData.monthlyRent = v
        }
        if (body.paymentDay !== undefined) {
            updateData.paymentDay = body.paymentDay === null || body.paymentDay === ""
                ? null
                : Number(body.paymentDay)
        }
        if (body.status !== undefined) {
            if (!VALID_STATUS.includes(body.status)) {
                return NextResponse.json({ error: `status must be one of ${VALID_STATUS.join(", ")}` }, { status: 400 })
            }
            updateData.status = body.status
        }
        if (body.leaseEnd !== undefined) {
            updateData.leaseEnd = body.leaseEnd ? new Date(body.leaseEnd) : null
        }
        if (body.purchaseDate !== undefined) {
            updateData.purchaseDate = body.purchaseDate ? new Date(body.purchaseDate) : null
        }
        if (body.llcId !== undefined) {
            const llc = await prisma.lLC.findUnique({ where: { id: body.llcId } })
            if (!llc) {
                return NextResponse.json({ error: "LLC not found" }, { status: 400 })
            }
            updateData.llcId = body.llcId
        }

        const property = await prisma.property.update({
            where: { id },
            data: updateData,
            include: { llc: { select: { id: true, name: true } } },
        })

        return NextResponse.json({ property })
    } catch (error) {
        console.error("Update property error:", error)
        return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
    }
}

// DELETE /api/admin/properties/[id] — Delete property
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const { id } = await params

        const existing = await prisma.property.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 })
        }

        await prisma.property.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Delete property error:", error)
        return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
    }
}
