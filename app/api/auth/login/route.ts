import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            )
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 401 }
            )
        }

        // Verify password (Simple check for Demo/Dev environment)
        // In detailed production, we would use bcrypt.compare(password, user.passwordHash)
        // But for this 'Demo123!' seed, we compare the string or hash.
        // Seed uses: passwordHash: 'Demo123!' or 'hashed_password_placeholder'
        // We will accept if matches literal hash OR if it matches a known "master" password for demo.

        const isValid = user.passwordHash === password || password === 'Demo123!'

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            )
        }

        // Return User Data (exclude password)
        const userData = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            isVerified: user.isVerified
        }

        return NextResponse.json({
            user: userData,
            token: "mock-jwt-token-for-demo" // In real app, sign JWT here
        })

    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
