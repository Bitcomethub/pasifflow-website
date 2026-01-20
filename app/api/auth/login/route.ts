import { NextResponse } from "next/server"

// Use the Railway backend API for authentication
const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://pasiflow-api-production.up.railway.app"

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Forward the login request to the backend API
        const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || "Login failed" },
                { status: response.status }
            )
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error("Login proxy error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
