import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { verifyToken, extractBearerToken } from "@/lib/auth"

// PATCH /api/admin/users/[id] — Update user
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
        const { email, password, fullName, phone, role } = body

        const existing = await prisma.user.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const updateData: Record<string, unknown> = {}
        if (email) updateData.email = email.toLowerCase()
        if (fullName) updateData.fullName = fullName
        if (phone !== undefined) updateData.phone = phone || null
        if (role && ["USER", "AGENT", "ADMIN"].includes(role)) updateData.role = role
        if (password) updateData.passwordHash = await bcrypt.hash(password, 12)

        const user = await prisma.user.update({
            where: { id },
            data: updateData,
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

        return NextResponse.json({ user })

    } catch (error) {
        console.error("Update user error:", error)
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        )
    }
}

// DELETE /api/admin/users/[id] — Delete user
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

        // Prevent deleting yourself
        if (payload.userId === id) {
            return NextResponse.json(
                { error: "Cannot delete your own account" },
                { status: 400 }
            )
        }

        const existing = await prisma.user.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Delete agent profile if exists
        if (existing.role === "AGENT") {
            await prisma.agentProfile.deleteMany({ where: { userId: id } })
        }

        await prisma.user.delete({ where: { id } })

        return NextResponse.json({ success: true })

    } catch (error) {
        console.error("Delete user error:", error)
        return NextResponse.json(
            { error: "Failed to delete user" },
            { status: 500 }
        )
    }
}
