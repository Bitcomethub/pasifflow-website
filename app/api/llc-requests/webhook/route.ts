import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import { sendLeadNotification } from "@/lib/mail"
import type Stripe from "stripe"

export async function POST(req: Request) {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")

    if (!signature) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err) {
        console.error("Webhook signature verification failed:", err)
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session
        const llcRequestId = session.metadata?.llcRequestId

        if (llcRequestId) {
            const llcRequest = await prisma.llcRequest.update({
                where: { id: llcRequestId },
                data: {
                    paymentStatus: "PAID",
                    stripePaymentId: session.payment_intent as string,
                },
            })

            // Send admin notification
            await sendLeadNotification({
                fullName: llcRequest.fullName,
                email: llcRequest.email,
                phone: llcRequest.phone,
                source: `LLC Formation — ${llcRequest.llcName} ($${llcRequest.amountPaid})`,
            })
        }
    }

    return NextResponse.json({ received: true })
}
