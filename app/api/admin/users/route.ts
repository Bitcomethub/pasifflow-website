import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"

// GET /api/admin/users — List all users
export async function GET(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            role: true,
            isVerified: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ users })
}

// POST /api/admin/users — Create a new user
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
        const { email, password, fullName, phone, role } = body

        if (!email || !password || !fullName) {
            return NextResponse.json(
                { error: "Email, password, and full name are required" },
                { status: 400 }
            )
        }

        if (!["USER", "AGENT", "ADMIN"].includes(role)) {
            return NextResponse.json(
                { error: "Invalid role. Must be USER, AGENT, or ADMIN" },
                { status: 400 }
            )
        }

        const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
        if (existing) {
            return NextResponse.json(
                { error: "A user with this email already exists" },
                { status: 409 }
            )
        }

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                passwordHash,
                fullName,
                phone: phone || null,
                role,
                isVerified: true,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                role: true,
                isVerified: true,
                createdAt: true,
            },
        })

        // If creating an agent, also create an agent profile
        if (role === "AGENT") {
            await prisma.agentProfile.create({
                data: { userId: user.id, level: "STARTER" },
            })
        }

        return NextResponse.json({ user }, { status: 201 })

    } catch (error) {
        console.error("Create user error:", error)
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        )
    }
}
