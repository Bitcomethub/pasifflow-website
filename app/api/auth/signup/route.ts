import { NextResponse } from "next/server"

// Signup is disabled — all credentials are provided by Pasiflow admin
export async function POST() {
    return NextResponse.json(
        { error: "Registration is disabled. Credentials are provided by Pasiflow." },
        { status: 403 }
    )
}
