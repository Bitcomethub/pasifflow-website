import { NextResponse } from "next/server"

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

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.error("Signup proxy error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
