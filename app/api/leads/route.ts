import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { sendLeadNotification } from "@/lib/mail"
import { z } from "zod"

const leadSchema = z.object({
    fullName: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır"),
    email: z.string().email("Geçerli bir e-posta adresi giriniz"),
    phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
    budget: z.string().optional(),
    source: z.string().optional(),
    message: z.string().optional(),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validatedData = leadSchema.parse(body)

        const lead = await prisma.lead.create({
            data: {
                fullName: validatedData.fullName,
                email: validatedData.email,
                phone: validatedData.phone,
                budget: validatedData.budget,
                source: validatedData.source || "Website Form",
                message: validatedData.message,
            },
        })

        // Send notification
        await sendLeadNotification({
            fullName: lead.fullName,
            email: lead.email,
            phone: lead.phone || undefined,
            source: lead.source,
            budget: lead.budget || undefined
        }).catch(err => console.error("Notification error:", err))

        // n8n webhook — async, non-blocking
        fetch("https://n8n-production-bdb9.up.railway.app/webhook/new-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullName: lead.fullName,
                email: lead.email,
                phone: lead.phone,
                source: lead.source,
                budget: lead.budget,
                createdAt: lead.createdAt,
            }),
        }).catch(err => console.error("n8n webhook error:", err))

        return NextResponse.json({ success: true, lead }, { status: 201 })
    } catch (error) {
        console.error("Lead creation error:", error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Validation error", details: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
