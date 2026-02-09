import jwt from "jsonwebtoken"

interface JWTPayload {
    userId: string
    email: string
    role: string
}

export function verifyToken(token: string): JWTPayload | null {
    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) return null
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload
    } catch {
        return null
    }
}

export function extractBearerToken(request: Request): string | null {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) return null
    return authHeader.slice(7)
}
