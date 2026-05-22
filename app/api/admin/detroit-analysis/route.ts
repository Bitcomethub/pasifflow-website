import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import { verifyToken, extractBearerToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
})

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

const SYSTEM_PROMPT = `You are a Detroit real estate investment expert specializing in the Section 8 HCV program and Detroit's residential rental market. You know neighborhood tiers, lead paint compliance costs, HUD FMR levels, typical rehab costs by condition, Section 8 inspection requirements, and realistic time-to-rent figures. Always respond with strict JSON only.`

function buildUserPrompt(listing: AnalysisInput): string {
    const price = listing.price ?? 0
    return `Analyze this Detroit property for buy-and-hold Section 8 rental.

Property details:
- Address: ${listing.address ?? "Detroit, MI"}
- List price: $${price.toLocaleString()}
- Beds: ${listing.beds ?? "?"} | Baths: ${listing.baths ?? "?"}
- Living area: ${listing.livingArea ?? 0} sqft
- Year built: ${listing.yearBuilt ?? "unknown"}
- Lead paint risk: ${listing.leadPaintRisk ? "YES (pre-1978)" : "NO"}
- HUD FMR rent: $${listing.rent ?? 0}/mo
- Cap rate (gross, before rehab): ${typeof listing.capRate === "number" ? listing.capRate.toFixed(1) : "?"}%

Return ONLY this JSON schema (no markdown, no commentary):
{
  "renovationLevel": "cosmetic" | "moderate" | "full_gut",
  "renovationCostMin": number,
  "renovationCostMax": number,
  "renovationItems": [3-6 specific items expected to be needed],
  "section8PassChance": "high" | "medium" | "low",
  "timeToRent": "1-2 months" | "3-4 months" | "6+ months",
  "neighborhoodTier": "A" | "B" | "C" | "D",
  "investmentVerdict": "strong_buy" | "buy" | "hold" | "avoid",
  "verdictReason": "2-3 sentence explanation in Turkish",
  "keyRisks": [2-3 short risk bullets in Turkish],
  "keyOpportunities": [2-3 short opportunity bullets in Turkish],
  "allInCostMin": number,
  "allInCostMax": number,
  "realisticCapRate": number
}

Cost guidance: cosmetic = $5-15k, moderate = $15-35k, full_gut = $35-70k+. All-in cost = list price + renovation. Realistic cap rate = (FMR rent * 12 * 0.55) / all-in cost * 100. Use Detroit neighborhood knowledge for tier and Section 8 chance.`
}

export async function POST(req: NextRequest) {
    const token = extractBearerToken(req)
    const user = token ? verifyToken(token) : null
    if (!user || user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 })
    }

    let listing: AnalysisInput
    try {
        listing = (await req.json()) as AnalysisInput
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.3,
            max_tokens: 1200,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: buildUserPrompt(listing) },
            ],
        })

        const content = completion.choices[0]?.message?.content ?? ""
        try {
            const analysis = JSON.parse(content) as AnalysisResult
            return NextResponse.json(analysis)
        } catch {
            return NextResponse.json(
                { error: "Parse failed", raw: content.slice(0, 500) },
                { status: 502 }
            )
        }
    } catch (err) {
        const e = err as { status?: number; message?: string }
        if (e?.status === 429) {
            return NextResponse.json(
                { error: "Çok fazla istek. Birkaç saniye bekleyip tekrar deneyin." },
                { status: 429 }
            )
        }
        return NextResponse.json(
            { error: e?.message || "AI analizi başarısız oldu" },
            { status: 500 }
        )
    }
}
