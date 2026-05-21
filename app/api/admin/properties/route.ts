import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"

const VALID_STATUS = ["OCCUPIED", "VACANT", "MAINTENANCE"]

// GET /api/admin/properties — List all properties (with LLC name)
export async function GET(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const properties = await prisma.property.findMany({
        include: {
            llc: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ properties })
}

// POST /api/admin/properties — Create a new property
export async function POST(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    try {
        const body = await request.json()
        const {
            address,
            city,
            state,
            zipCode,
            purchasePrice,
            currentValue,
            monthlyRent,
            status,
            tenantName,
            leaseEnd,
            paymentDay,
            imageUrl,
            purchaseDate,
            llcId,
        } = body

        if (!address || !city || !state || !zipCode || !llcId) {
            return NextResponse.json(
                { error: "address, city, state, zipCode, and llcId are required" },
                { status: 400 }
            )
        }

        const purchase = Number(purchasePrice)
        const rent = Number(monthlyRent)
        if (!Number.isFinite(purchase) || purchase <= 0) {
            return NextResponse.json({ error: "purchasePrice must be a positive number" }, { status: 400 })
        }
        if (!Number.isFinite(rent) || rent < 0) {
            return NextResponse.json({ error: "monthlyRent must be a non-negative number" }, { status: 400 })
        }

        if (status && !VALID_STATUS.includes(status)) {
            return NextResponse.json({ error: `status must be one of ${VALID_STATUS.join(", ")}` }, { status: 400 })
        }

        const llc = await prisma.lLC.findUnique({ where: { id: llcId } })
        if (!llc) {
            return NextResponse.json({ error: "LLC not found" }, { status: 400 })
        }

        const property = await prisma.property.create({
            data: {
                address,
                city,
                state,
                zipCode,
                purchasePrice: purchase,
                currentValue: currentValue ? Number(currentValue) : null,
                monthlyRent: rent,
                status: status || "OCCUPIED",
                tenantName: tenantName || null,
                leaseEnd: leaseEnd ? new Date(leaseEnd) : null,
                paymentDay: paymentDay ? Number(paymentDay) : null,
                imageUrl: imageUrl || null,
                purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
                llcId,
            },
            include: { llc: { select: { id: true, name: true } } },
        })

        return NextResponse.json({ property }, { status: 201 })
    } catch (error) {
        console.error("Create property error:", error)
        return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
    }
}
