import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

// Use environment variable for database URL if available, fallback to SQLite for dev
const databaseUrl = process.env.DATABASE_URL || "file:./dev.db"

export const db = globalThis.prisma || new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl,
        },
    },
})

// Also export as 'prisma' for compatibility with existing code
export const prisma = db

if (process.env.NODE_ENV !== "production") globalThis.prisma = db
