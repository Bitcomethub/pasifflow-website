import { NextRequest, NextResponse } from "next/server"
import { verifyToken, extractBearerToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

interface AnalysisInput {
    address?: string
    price?: number
    beds?: number
    baths?: number
    livingArea?: number
    yearBuilt?: number | null
    leadPaintRisk?: boolean
    rent?: number
    capRate?: number
}

interface AnalysisResult {
    renovationLevel: "cosmetic" | "moderate" | "full_gut"
    renovationCostMin: number
    renovationCostMax: number
    renovationItems: string[]
    section8PassChance: "high" | "medium" | "low"
    timeToRent: string
    neighborhoodTier: "A" | "B" | "C" | "D"
    investmentVerdict: "strong_buy" | "buy" | "hold" | "avoid"
    verdictReason: string
    keyRisks: string[]
    keyOpportunities: string[]
    allInCostMin: number
    allInCostMax: number
    realisticCapRate: number
}

function buildPrompt(listing: AnalysisInput): string {
    const price = listing.price ?? 0
    return `You are a Detroit real estate investment expert specializing in Section 8 HCV program and Detroit property market.

Property details:
- Address: ${listing.address ?? "Detroit, MI"}
- List price: $${price.toLocaleString()}
- Beds: ${listing.beds ?? "?"} | Baths: ${listing.baths ?? "?"}
- Living area: ${listing.livingArea ?? 0} sqft
- Year built: ${listing.yearBuilt ?? "unknown"}
- Lead paint risk: ${listing.leadPaintRisk ? "YES (pre-1978)" : "NO"}
- HUD FMR rent: $${listing.rent ?? 0}/mo
- Cap rate: ${typeof listing.capRate === "number" ? listing.capRate.toFixed(1) : "?"}%

Respond ONLY with valid JSON, no markdown, no explanation:
{
  "renovationLevel": "cosmetic|moderate|full_gut",
  "renovationCostMin": number,
  "renovationCostMax": number,
  "renovationItems": ["item1", "item2", "item3"],
  "section8PassChance": "high|medium|low",
  "timeToRent": "1-2 months|3-4 months|6+ months",
  "neighborhoodTier": "A|B|C|D",
  "investmentVerdict": "strong_buy|buy|hold|avoid",
  "verdictReason": "2-3 sentence explanation in Turkish",
  "keyRisks": ["risk1", "risk2"],
  "keyOpportunities": ["opportunity1", "opportunity2"],
  "allInCostMin": number,
  "allInCostMax": number,
  "realisticCapRate": number
}`
}

export async function POST(req: NextRequest) {
    const token = extractBearerToken(req)
    const user = token ? verifyToken(token) : null
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY
    if (!openRouterKey) {
        return NextResponse.json(
            { error: "OPENROUTER_API_KEY not configured. Add it to .env.local and Vercel." },
            { status: 500 }
        )
    }

    let listing: AnalysisInput
    try {
        listing = (await req.json()) as AnalysisInput
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${openRouterKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://www.pasiflow.com",
                "X-Title": "Pasiflow Detroit Scout",
            },
            body: JSON.stringify({
                model: "anthropic/claude-sonnet-4-5",
                max_tokens: 1000,
                temperature: 0.3,
                messages: [{ role: "user", content: buildPrompt(listing) }],
            }),
        })

        if (!response.ok) {
            const text = await response.text().catch(() => "")
            return NextResponse.json(
                { error: `OpenRouter ${response.status}`, detail: text.slice(0, 500) },
                { status: 502 }
            )
        }

        const data = await response.json()
        const content: string = data?.choices?.[0]?.message?.content ?? ""
        const cleaned = content.replace(/```json|```/g, "").trim()

        try {
            const analysis = JSON.parse(cleaned) as AnalysisResult
            return NextResponse.json(analysis)
        } catch {
            return NextResponse.json(
                { error: "Parse failed", raw: cleaned.slice(0, 500) },
                { status: 502 }
            )
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error"
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
