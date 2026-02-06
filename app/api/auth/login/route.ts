import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// All users are admin-provided via environment variables
// No self-registration — site owner creates credentials and provides them
const getUsers = () => [
    {
        id: "agent-001",
        email: process.env.DEMO_AGENT_EMAIL || "",
        passwordHash: process.env.DEMO_AGENT_PASSWORD_HASH || "",
        fullName: "Pasiflow Agent",
        role: "AGENT",
    },
    {
        id: "investor-001",
        email: process.env.DEMO_INVESTOR_EMAIL || "",
        passwordHash: process.env.DEMO_INVESTOR_PASSWORD_HASH || "",
        fullName: "Demo Investor",
        role: "USER",
    },
    // Legacy demo users (keep for backward compatibility)
    {
        id: "erman-adanir-001",
        email: process.env.DEMO_USER_EMAIL || "",
        passwordHash: process.env.DEMO_USER_PASSWORD_HASH || "",
        fullName: "Erman Adanır",
        role: "USER",
    },
    {
        id: "demo-client-002",
        email: process.env.DEMO_CLIENT_EMAIL || "",
        passwordHash: process.env.DEMO_CLIENT_PASSWORD_HASH || "",
        fullName: "Demo Client",
        role: "USER",
    },
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

        // Find matching user from env-provided credentials
        const users = getUsers()
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase())

        if (user) {
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
                    },
                    token
                })
            }
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
