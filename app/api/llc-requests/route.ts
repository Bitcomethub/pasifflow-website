import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { stripe } from "@/lib/stripe"

const llcRequestSchema = z.object({
    llcName: z.string().min(1).max(200),
    alternativeName: z.string().max(200).optional().default(""),
    entityType: z.enum(["LLC", "C-CORP", "S-CORP"]).default("LLC"),
    managementType: z.enum(["MEMBER", "MANAGER"]).default("MEMBER"),
    fullName: z.string().min(1).max(200),
    email: z.string().email().max(200),
    phone: z.string().min(1).max(50),
    country: z.string().min(1).max(100),
    passportNumber: z.string().min(1).max(50),
    mailingAddress: z.string().min(1).max(500),
    virtualOffice: z.boolean().default(false),
    bankAccount: z.boolean().default(false),
    itinApplication: z.boolean().default(false),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const parsed = llcRequestSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid form data", details: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const data = parsed.data
        const amount = 499 + (data.itinApplication ? 350 : 0)

        // Create the LLC request record
        const llcRequest = await prisma.llcRequest.create({
            data: {
                llcName: data.llcName,
                alternativeName: data.alternativeName || null,
                entityType: data.entityType,
                managementType: data.managementType,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                country: data.country,
                passportNumber: data.passportNumber,
                mailingAddress: data.mailingAddress,
                virtualOffice: data.virtualOffice,
                bankAccount: data.bankAccount,
                itinApplication: data.itinApplication,
                amountPaid: amount,
                paymentStatus: "PENDING",
                status: "PENDING",
            },
        })

        // Create Stripe Checkout Session
        const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            customer_email: data.email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `LLC Formation — ${data.llcName}`,
                            description: `Wyoming ${data.entityType} Formation Package${data.itinApplication ? " + ITIN Application" : ""}`,
                        },
                        unit_amount: amount * 100, // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                llcRequestId: llcRequest.id,
            },
            success_url: `${origin}/llc-formation?payment=success`,
            cancel_url: `${origin}/llc-formation#form`,
        })

        // Store stripe session ID
        await prisma.llcRequest.update({
            where: { id: llcRequest.id },
            data: { stripeSessionId: session.id },
        })

        return NextResponse.json({ sessionUrl: session.url })
    } catch (error) {
        console.error("LLC request error:", error)
        return NextResponse.json(
            { error: "Failed to create LLC request" },
            { status: 500 }
        )
    }
}
