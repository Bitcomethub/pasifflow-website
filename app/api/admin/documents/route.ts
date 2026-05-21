import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"

// GET /api/admin/documents — List all documents with related entity names
export async function GET(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const documents = await prisma.document.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { id: true, fullName: true, email: true } },
            llc: { select: { id: true, name: true } },
            property: { select: { id: true, address: true } },
            lease: { select: { id: true, tenantName: true } },
            maintenanceRequest: { select: { id: true, title: true } },
        },
    })

    return NextResponse.json({ documents })
}

// DELETE /api/admin/documents?id=... — Delete a document
export async function DELETE(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    if (!id) {
        return NextResponse.json({ error: "id query parameter is required" }, { status: 400 })
    }

    try {
        const existing = await prisma.document.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 })
        }

        await prisma.document.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Delete document error:", error)
        return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
    }
}
