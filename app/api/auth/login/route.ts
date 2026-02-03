import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Demo users from environment variables (for client presentations)
const getDemoUsers = () => [
    {
        id: "erman-adanir-001",
        email: process.env.DEMO_USER_EMAIL || "",
        passwordHash: process.env.DEMO_USER_PASSWORD_HASH || "",
        fullName: "Erman Adanır",
        role: "USER",
        isVerified: true
    },
    {
        id: "demo-client-002",
        email: process.env.DEMO_CLIENT_EMAIL || "",
        passwordHash: process.env.DEMO_CLIENT_PASSWORD_HASH || "",
        fullName: "Demo Client",
        role: "USER",
        isVerified: true
    },
    {
        id: "demo-agent-003",
        email: process.env.DEMO_AGENT_EMAIL || "",
        passwordHash: process.env.DEMO_AGENT_PASSWORD_HASH || "",
        fullName: "Pasiflow Agent",
        role: "AGENT",
        isVerified: true
    }
].filter(u => u.email && u.passwordHash)

const JWT_SECRET = process.env.JWT_SECRET

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

        if (!JWT_SECRET) {
            console.error("JWT_SECRET not configured")
            return NextResponse.json(
                { error: "Sunucu yapılandırma hatası" },
                { status: 500 }
            )
        }

        // Check demo users first (from env variables)
        const demoUsers = getDemoUsers()
        const demoUser = demoUsers.find(u => u.email === email)

        if (demoUser) {
            const isValidPassword = await bcrypt.compare(password, demoUser.passwordHash)
            if (isValidPassword) {
                const token = jwt.sign(
                    { userId: demoUser.id, email: demoUser.email, role: demoUser.role },
                    JWT_SECRET,
                    { expiresIn: "7d" }
                )

                return NextResponse.json({
                    user: {
                        id: demoUser.id,
                        email: demoUser.email,
                        fullName: demoUser.fullName,
                        role: demoUser.role,
                        isVerified: demoUser.isVerified
                    },
                    token
                })
            }
        }

        // For non-demo users, check database
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })

            if (user && user.passwordHash) {
                const isValidPassword = await bcrypt.compare(password, user.passwordHash)

                if (isValidPassword) {
                    const token = jwt.sign(
                        { userId: user.id, email: user.email, role: user.role },
                        JWT_SECRET,
                        { expiresIn: "7d" }
                    )

                    return NextResponse.json({
                        user: {
                            id: user.id,
                            email: user.email,
                            fullName: user.fullName,
                            role: user.role,
                            isVerified: user.isVerified
                        },
                        token
                    })
                }
            }
        } catch (dbError) {
            console.error("Database error:", dbError)
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
