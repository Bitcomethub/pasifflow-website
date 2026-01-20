import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "pasiflow-secret-key-change-in-production"

export async function POST(req: Request) {
    try {
        const { email, password, fullName, phone } = await req.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            )
        }

        // Hash password (using 10 rounds to match the mobile app's genSalt(10))
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user in the shared Postgres DB
        const newUser = await prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                fullName,
                phone,
            },
        })

        // Also create a Lead entry for tracking
        await prisma.lead.create({
            data: {
                fullName: fullName || "User Signup",
                email,
                phone: phone || "",
                source: "Website Signup",
            },
        })

        // Generate JWT compatible with the app
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        )

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName },
                token
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
