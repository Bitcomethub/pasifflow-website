import { NextResponse } from "next/server"
import { verifyToken, extractBearerToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

const RAPIDAPI_HOST = "private-zillow.p.rapidapi.com"

const FMR_BY_BEDS: Record<number, number> = {
    1: 950,
    2: 1150,
    3: 1450,
    4: 1700,
}

type Section8Score = "A" | "B" | "C"

interface ScoutedListing {
    id: string
    zpid: string | null
    address: string
    city: string
    state: string
    zipcode: string | null
    price: number
    beds: number
    baths: number
    sqft: number | null
    yearBuilt: number | null
    lotSize: number | null
    propertyType: string | null
    imageUrl: string | null
    latitude: number | null
    longitude: number | null
    listingUrl: string
    daysOnMarket: number | null
    // Computed metrics
    fmrRent: number
    capRate: number
    grossYield: number
    monthlyCashFlow: number
    section8Score: Section8Score
    leadPaintRisk: boolean
}

function pickFirst<T>(...values: (T | null | undefined)[]): T | null {
    for (const v of values) {
        if (v !== undefined && v !== null && v !== "") return v as T
    }
    return null
}

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null
    const n = typeof value === "number" ? value : Number(value)
    return Number.isFinite(n) ? n : null
}

function fmrForBeds(beds: number): number {
    if (beds <= 1) return FMR_BY_BEDS[1]
    if (beds >= 4) return FMR_BY_BEDS[4]
    return FMR_BY_BEDS[beds] ?? FMR_BY_BEDS[2]
}

function scoreForCap(capRate: number): Section8Score {
    if (capRate >= 10) return "A"
    if (capRate >= 7) return "B"
    return "C"
}

function normalize(raw: Record<string, unknown>): ScoutedListing | null {
    const r = raw as any

    const price = Number(r.price) || 0
    if (!price || price <= 0) return null

    const beds = Number(r.bedrooms) || 2
    const baths = Number(r.bathrooms) || 1
    const yearBuilt = Number(r.yearBuilt) || 0
    const livingArea = Number(r.livingArea) || 0

    const city = String(r.city || "Detroit")
    const state = String(r.state || "MI")
    const zipcode = r.zipcode ? String(r.zipcode) : null
    const address = r.streetAddress
        ? `${r.streetAddress}, ${city}, ${state} ${r.zipcode ?? ""}`.trim()
        : "Detroit, MI"

    const imageUrl = (r.imgSrc as string) || ""
    const detailUrl = r.hdpUrl ? `https://www.zillow.com${r.hdpUrl}` : ""
    const latitude = Number(r.latitude) || 0
    const longitude = Number(r.longitude) || 0

    const zpid = r.zpid ? String(r.zpid) : null

    const fmrRent = fmrForBeds(beds)
    const annualGross = fmrRent * 12
    const annualNoi = annualGross * 0.55
    const capRate = (annualNoi / price) * 100
    const grossYield = (annualGross / price) * 100
    const monthlyCashFlow = annualNoi / 12

    return {
        id: zpid ?? `${address}-${price}`,
        zpid,
        address,
        city,
        state,
        zipcode,
        price,
        beds,
        baths,
        sqft: livingArea || null,
        yearBuilt: yearBuilt || null,
        lotSize: null,
        propertyType: null,
        imageUrl: imageUrl || null,
        latitude: latitude || null,
        longitude: longitude || null,
        listingUrl: detailUrl || (zpid ? `https://www.zillow.com/homedetails/${zpid}_zpid/` : ""),
        daysOnMarket: null,
        fmrRent,
        capRate: Number(capRate.toFixed(2)),
        grossYield: Number(grossYield.toFixed(2)),
        monthlyCashFlow: Number(monthlyCashFlow.toFixed(0)),
        section8Score: scoreForCap(capRate),
        leadPaintRisk: yearBuilt > 0 && yearBuilt < 1978,
    }
}

function extractResults(data: any): any[] {
    if (!data) return []

    // private-zillow byaddress — searchResults[].property
    const sr = data.searchResults
    if (Array.isArray(sr) && sr.length > 0) {
        console.log("HIT searchResults, count:", sr.length)
        return sr.map((item: any) => {
            const p = item?.property || item
            return {
                zpid: p.zpid,
                price: p.price || p.listingPrice || p.unformattedPrice || 0,
                bedrooms: p.bedrooms || p.beds || 2,
                bathrooms: p.bathrooms || p.baths || 1,
                yearBuilt: p.yearBuilt || 0,
                livingArea: p.livingArea || 0,
                hdpUrl: p.hdpUrl || "",
                imgSrc: p.media?.propertyPhotoLinks?.mediumSizeLink || "",
                streetAddress: p.address?.streetAddress || "",
                city: p.address?.city || "Detroit",
                state: p.address?.state || "MI",
                zipcode: p.address?.zipcode || "",
                latitude: p.location?.latitude || 0,
                longitude: p.location?.longitude || 0,
            }
        })
    }

    return []
}

type AttemptOutcome = {
    endpoint: string
    upstreamUrl: string
    status: number
    rawPreview: string
    rawSample: unknown
    results: Record<string, unknown>[]
    error?: string
}

async function callUpstream(
    endpoint: "bymls" | "byaddress",
    params: Record<string, string>,
    rapidKey: string
): Promise<AttemptOutcome> {
    const query = new URLSearchParams(params).toString()
    const upstreamUrl = `https://${RAPIDAPI_HOST}/search/${endpoint}?${query}`
    try {
        const upstream = await fetch(upstreamUrl, {
            headers: {
                "x-rapidapi-key": rapidKey,
                "x-rapidapi-host": RAPIDAPI_HOST,
            },
            next: { revalidate: 300 },
        })
        const text = await upstream.text()
        const preview = text.slice(0, 500)
        console.log(`[detroit-listings] /${endpoint} status=${upstream.status} preview=${preview}`)

        let parsed: unknown = null
        try {
            parsed = JSON.parse(text)
        } catch {
            parsed = null
        }
        // Diagnostic: what does the raw upstream payload actually look like?
        const data: any = parsed
        console.log(`[detroit-listings] /${endpoint} RAW KEYS:`, data && typeof data === "object" ? Object.keys(data) : typeof data)
        console.log(`[detroit-listings] /${endpoint} searchResults length:`, data?.searchResults?.length)
        console.log(`[detroit-listings] /${endpoint} FIRST ITEM:`, JSON.stringify(data?.searchResults?.[0]))
        const results = extractResults(parsed)
        const rawSample = Array.isArray(parsed)
            ? (parsed as unknown[]).slice(0, 1)
            : parsed && typeof parsed === "object"
                ? Object.keys(parsed as object).slice(0, 20)
                : null

        return {
            endpoint,
            upstreamUrl,
            status: upstream.status,
            rawPreview: preview,
            rawSample,
            results,
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error"
        console.error(`[detroit-listings] /${endpoint} fetch threw: ${message}`)
        return {
            endpoint,
            upstreamUrl,
            status: 0,
            rawPreview: "",
            rawSample: null,
            results: [],
            error: message,
        }
    }
}

export async function GET(request: Request) {
    const token = extractBearerToken(request)
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload || payload.role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const rapidKey = process.env.RAPIDAPI_KEY
    if (!rapidKey) {
        return NextResponse.json(
            { error: "RAPIDAPI_KEY is not configured on this deployment" },
            { status: 500 }
        )
    }

    const url = new URL(request.url)
    const priceMax = url.searchParams.get("price_max") ?? "125000"
    const debug = url.searchParams.get("debug") === "1"

    // Attempt 1 (primary): /search/byaddress — confirmed shape is
    //   { searchResults: [{ property: {...} }] }
    // Note: status_type uses underscore form "For_Sale" (bymls rejected "ForSale").
    const attempts: AttemptOutcome[] = []
    const first = await callUpstream(
        "byaddress",
        {
            location: "Detroit, MI",
            status_type: "For_Sale",
            price_max: priceMax,
            page: "1",
        },
        rapidKey
    )
    attempts.push(first)

    let chosen = first
    if (first.results.length === 0) {
        // Attempt 2 (fallback): /search/bymls with the corrected underscore form.
        const second = await callUpstream(
            "bymls",
            {
                location: "Detroit, MI",
                status_type: "For_Sale",
                price_max: priceMax,
                page: "1",
            },
            rapidKey
        )
        attempts.push(second)
        if (second.results.length > 0) {
            chosen = second
        }
    }

    const listings = chosen.results
        .map((item) => normalize(item))
        .filter((l): l is ScoutedListing => l !== null)
        .filter((l) => l.price <= Number(priceMax))
        .sort((a, b) => b.capRate - a.capRate)

    const totalPrice = listings.reduce((sum, l) => sum + l.price, 0)
    const totalCap = listings.reduce((sum, l) => sum + l.capRate, 0)
    const aCount = listings.filter((l) => l.section8Score === "A").length

    return NextResponse.json({
        count: listings.length,
        endpointUsed: chosen.endpoint,
        upstreamStatus: chosen.status,
        stats: {
            total: listings.length,
            avgPrice: listings.length ? Math.round(totalPrice / listings.length) : 0,
            avgCapRate: listings.length ? Number((totalCap / listings.length).toFixed(2)) : 0,
            aScoreCount: aCount,
        },
        listings,
        ...(debug
            ? {
                debug: attempts.map((a) => ({
                    endpoint: a.endpoint,
                    upstreamUrl: a.upstreamUrl,
                    status: a.status,
                    resultsFound: a.results.length,
                    rawPreview: a.rawPreview,
                    rawSample: a.rawSample,
                    error: a.error,
                })),
            }
            : {}),
    })
}
