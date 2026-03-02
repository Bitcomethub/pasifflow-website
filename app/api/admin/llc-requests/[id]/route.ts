import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"
import { sendLlcLinkEmail } from "@/lib/mail"

// PATCH /api/admin/llc-requests/[id] — Update status, send formation link
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

    const { id } = await params

    try {
        const body = await request.json()
        const { status, formationLink } = body

        const existing = await prisma.llcRequest.findUnique({ where: { id } })
        if (!existing) {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

        const updateData: Record<string, unknown> = {}

        if (status) {
            updateData.status = status
        }

        if (formationLink) {
            updateData.formationLink = formationLink
            updateData.linkSentAt = new Date()
            updateData.status = "LINK_SENT"

            // Send formation link email
            await sendLlcLinkEmail({
                email: existing.email,
                fullName: existing.fullName,
                llcName: existing.llcName,
                formationLink,
            })
        }

        const updated = await prisma.llcRequest.update({
            where: { id },
            data: updateData,
        })

        return NextResponse.json({ request: updated })
    } catch (error) {
        console.error("Update LLC request error:", error)
        return NextResponse.json(
            { error: "Failed to update request" },
            { status: 500 }
        )
    }
}
