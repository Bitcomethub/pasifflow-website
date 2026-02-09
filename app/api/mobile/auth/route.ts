import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { authenticateUser } from "@/lib/users"

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "E-posta ve şifre gereklidir." },
                { status: 400 }
            )
        }

        if (!JWT_SECRET) {
            console.error("JWT_SECRET not configured")
            return NextResponse.json(
                { success: false, message: "Sunucu yapılandırma hatası." },
                { status: 500 }
            )
        }

        const user = await authenticateUser(email, password)

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Geçersiz e-posta veya şifre." },
                { status: 401 }
            )
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                role: user.role === "AGENT" ? "agent" : "client",
                token: token
            }
        })

    } catch (error) {
        console.error("Auth error:", error)
        return NextResponse.json(
            { success: false, message: "Sunucu hatası." },
            { status: 500 }
        )
    }
}
