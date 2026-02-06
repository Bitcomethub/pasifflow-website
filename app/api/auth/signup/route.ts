import { NextResponse } from "next/server"
import { sendLeadNotification } from "@/lib/mail"

// Use the Railway backend API for authentication
const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://pasiflow-api-production.up.railway.app"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Forward the registration request to the backend API
        const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || "Registration failed" },
                { status: response.status }
            )
        }

        // Send notification to admin
        await sendLeadNotification({
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            source: "Signup Form"
        }).catch(err => console.error("Notification error:", err))

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.error("Signup proxy error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
