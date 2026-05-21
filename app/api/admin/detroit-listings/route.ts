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
    const price = Number(
        (raw as any).price
        || (raw as any).listingPrice
        || (raw as any).unformattedPrice
        || 0
    )
    if (!price || price <= 0) return null

    const beds = toNumber(
        pickFirst(raw.bedrooms, raw.beds, (raw as any).hdpData?.homeInfo?.bedrooms)
    ) ?? 0
    const baths = toNumber(
        pickFirst(raw.bathrooms, raw.baths, (raw as any).hdpData?.homeInfo?.bathrooms)
    ) ?? 0
    const sqft = toNumber(
        pickFirst(raw.livingArea, raw.sqft, raw.area, (raw as any).hdpData?.homeInfo?.livingArea)
    )
    const yearBuilt = toNumber(
        pickFirst(raw.yearBuilt, (raw as any).hdpData?.homeInfo?.yearBuilt)
    )
    const lotSize = toNumber(pickFirst(raw.lotAreaValue, raw.lotSize))

    const streetAddress = (raw as any).streetAddress as string | undefined
    const city = String((raw as any).city ?? "Detroit")
    const state = String((raw as any).state ?? "MI")
    const zipcode = (raw as any).zipcode as string | null | undefined
    const address = streetAddress
        ? `${streetAddress}, ${city}, ${state}`
        : typeof raw.address === "string"
            ? (raw.address as string)
            : "Detroit, MI"

    const zpidRaw = pickFirst(raw.zpid, (raw as any).id, (raw as any).hdpData?.homeInfo?.zpid)
    const zpid = zpidRaw ? String(zpidRaw) : null

    const imageUrl = ((raw as any).imgSrc || (raw as any).image || "") as string

    const locationObj = (raw as any).location as Record<string, unknown> | undefined
    const latitude = toNumber(
        pickFirst(
            (raw as any).latitude,
            locationObj?.latitude,
            (raw as any).latLong?.latitude,
            (raw as any).hdpData?.homeInfo?.latitude
        )
    )
    const longitude = toNumber(
        pickFirst(
            (raw as any).longitude,
            locationObj?.longitude,
            (raw as any).latLong?.longitude,
            (raw as any).hdpData?.homeInfo?.longitude
        )
    )

    const detailUrl = pickFirst(
        (raw as any).detailUrl,
        (raw as any).hdpUrl,
        (raw as any).url
    ) as string | null
    const listingUrl = detailUrl
        ? (detailUrl.startsWith("http") ? detailUrl : `https://www.zillow.com${detailUrl}`)
        : zpid
            ? `https://www.zillow.com/homedetails/${zpid}_zpid/`
            : `https://www.zillow.com/homes/${encodeURIComponent(address)}_rb/`

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
        zipcode: zipcode ? String(zipcode) : null,
        price,
        beds,
        baths,
        sqft,
        yearBuilt,
        lotSize,
        propertyType: (pickFirst((raw as any).homeType, (raw as any).propertyType) as string | null) ?? null,
        imageUrl: imageUrl ?? null,
        latitude,
        longitude,
        listingUrl,
        daysOnMarket: toNumber((raw as any).daysOnZillow ?? (raw as any).daysOnMarket),
        fmrRent,
        capRate: Number(capRate.toFixed(2)),
        grossYield: Number(grossYield.toFixed(2)),
        monthlyCashFlow: Number(monthlyCashFlow.toFixed(0)),
        section8Score: scoreForCap(capRate),
        leadPaintRisk: yearBuilt !== null && yearBuilt < 1978,
    }
}

function extractResults(data: any): any[] {
    // Primary: searchResults wrapper (private-zillow byaddress)
    if (Array.isArray(data?.searchResults) && data.searchResults.length > 0) {
        return data.searchResults.map((item: any) => {
            const prop = item?.property ?? item
            return {
                ...prop,
                imgSrc:
                    prop?.media?.propertyPhotoLinks?.mediumSizeLink
                    || prop?.media?.propertyPhotoLinks?.smallSizeLink
                    || prop?.imgSrc
                    || "",
                streetAddress: prop?.address?.streetAddress || "",
                city: prop?.address?.city || "Detroit",
                state: prop?.address?.state || "MI",
                zipcode: prop?.address?.zipcode || "",
            }
        })
    }
    // Fallbacks
    for (const key of ["results", "props", "listings", "mapResults", "listResults"]) {
        if (Array.isArray(data?.[key]) && data[key].length > 0) return data[key]
    }
    for (const cat of ["cat1", "cat2"]) {
        const sr = data?.[cat]?.searchResults
        if (sr?.mapResults?.length) return sr.mapResults
        if (sr?.listResults?.length) return sr.listResults
    }
    if (Array.isArray(data) && data.length > 0) return data
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
