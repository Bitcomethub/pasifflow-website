// Unified user authentication via Prisma database
// All users (investors, agents, admins) are stored in the DB
// The CTO creates credentials via the admin panel — no self-registration

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export interface AppUser {
    id: string
    email: string
    fullName: string | null
    role: string
    phone: string | null
}

/**
 * Authenticate a user by email and password against the Prisma DB.
 * Returns the user (without passwordHash) if credentials are valid, null otherwise.
 */
export async function authenticateUser(email: string, password: string): Promise<AppUser | null> {
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    })

    if (!user) return null

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) return null

    return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
    }
}

/**
 * Find a user by ID (for JWT-based lookups after token verification).
 */
export async function getUserById(id: string): Promise<AppUser | null> {
    const user = await prisma.user.findUnique({
        where: { id },
    })

    if (!user) return null

    return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
    }
}

/**
 * Find a user by email.
 */
export async function getUserByEmail(email: string): Promise<AppUser | null> {
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
    })

    if (!user) return null

    return {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
    }
}
