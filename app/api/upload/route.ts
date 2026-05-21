import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { extractBearerToken, verifyToken } from "@/lib/auth"

const ALLOWED_ROLES = new Set(["MANAGER", "ADMIN"])
const MAX_BYTES = 8 * 1024 * 1024 // 8 MB
const ALLOWED_TYPES = new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
])

export async function POST(req: Request) {
    const token = extractBearerToken(req)
    const session = token ? verifyToken(token) : null

    if (!session || !ALLOWED_ROLES.has(session.role)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN
    if (!blobToken) {
        console.error("BLOB_READ_WRITE_TOKEN is not configured")
        return NextResponse.json(
            { error: "Storage is not configured" },
            { status: 500 }
        )
    }

    try {
        const form = await req.formData()
        const file = form.get("file") as File | null

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        if (!ALLOWED_TYPES.has(file.type)) {
            return NextResponse.json(
                { error: "Unsupported file type" },
                { status: 415 }
            )
        }

        if (file.size > MAX_BYTES) {
            return NextResponse.json({ error: "File too large" }, { status: 413 })
        }

        const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "")
        const safeExt = ext.length > 0 && ext.length <= 5 ? ext : "jpg"
        const key = `listings/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`

        const blob = await put(key, file, {
            access: "public",
            token: blobToken,
            contentType: file.type,
        })

        return NextResponse.json({ url: blob.url })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}

export const runtime = "nodejs"
