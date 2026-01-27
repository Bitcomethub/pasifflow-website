import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Demo user for client presentations (works without database)
const DEMO_USER = {
    id: "erman-adanir-001",
    email: "erman@pasiflow.com",
    password: "Pasiflow2026!",
    fullName: "Erman Adanır",
    role: "USER",
    isVerified: true
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email ve şifre gereklidir" },
                { status: 400 }
            )
        }

        // Check Primary Demo User
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
            return NextResponse.json({
                user: {
                    id: DEMO_USER.id,
                    email: DEMO_USER.email,
                    fullName: DEMO_USER.fullName,
                    role: DEMO_USER.role,
                    isVerified: DEMO_USER.isVerified
                },
                token: "demo-jwt-token-pasiflow-2026"
            })
        }

        // Check Secondary Demo User (Requested by Client)
        if (email === "demo@pasiflow.com" && password === "Demo123!") {
            return NextResponse.json({
                user: {
                    id: "demo-client-002",
                    email: "demo@pasiflow.com",
                    fullName: "Demo Client",
                    role: "USER",
                    isVerified: true
                },
                token: "demo-jwt-token-client-2026"
            })
        }

        // Check Agent Demo User (New Request)
        if (email === "agent@pasiflow.com" && password === "Agent123!") {
            return NextResponse.json({
                user: {
                    id: "demo-agent-003",
                    email: "agent@pasiflow.com",
                    fullName: "Pasiflow Agent",
                    role: "AGENT",
                    isVerified: true
                },
                token: "demo-jwt-token-agent-2026"
            })
        }

        // For non-demo users, try database (optional - may fail on Vercel)
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (user && (user.passwordHash === password)) {
                return NextResponse.json({
                    user: {
                        id: user.id,
                        email: user.email,
                        fullName: user.fullName,
                        role: user.role,
                        isVerified: user.isVerified
                    },
                    token: `jwt-${user.id}-${Date.now()}`
                })
            }
        } catch (dbError) {
            console.error("Database not available:", dbError)
            // Continue to return invalid credentials
        }

        return NextResponse.json(
            { error: "Geçersiz email veya şifre" },
            { status: 401 }
        )

    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { error: "Sunucu hatası" },
            { status: 500 }
        )
    }
}
