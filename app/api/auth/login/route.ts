import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { authenticateUser } from "@/lib/users"

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

        const user = await authenticateUser(email, password)

        if (!user) {
            return NextResponse.json(
                { error: "Geçersiz email veya şifre" },
                { status: 401 }
            )
        }

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

    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { error: "Sunucu hatası" },
            { status: 500 }
        )
    }
}
