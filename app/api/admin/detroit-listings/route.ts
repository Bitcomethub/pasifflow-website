import { NextResponse } from "next/server"
import { verifyToken, extractBearerToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

const RAPIDAPI_HOST = "private-zillow.p.rapidapi.com"
const RAPIDAPI_FALLBACK_KEY = "bfac230979mshb0e411388f96540p188140jsnc71dc68249d0"

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
    const price = toNumber(
        pickFirst(raw.price, raw.listPrice, raw.unformattedPrice, (raw as any).hdpData?.homeInfo?.price)
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

    const address = String(
        pickFirst(
            raw.address,
            (raw as any).streetAddress,
            (raw as any).addressStreet,
            (raw as any).hdpData?.homeInfo?.streetAddress
        ) ?? "Unknown address"
    )
    const city = String(
        pickFirst(raw.city, (raw as any).addressCity, (raw as any).hdpData?.homeInfo?.city) ?? "Detroit"
    )
    const state = String(
        pickFirst(raw.state, (raw as any).addressState, (raw as any).hdpData?.homeInfo?.state) ?? "MI"
    )
    const zipcode = pickFirst(
        raw.zipcode,
        (raw as any).addressZipcode,
        (raw as any).hdpData?.homeInfo?.zipcode
    )

    const zpidRaw = pickFirst(raw.zpid, (raw as any).id, (raw as any).hdpData?.homeInfo?.zpid)
    const zpid = zpidRaw ? String(zpidRaw) : null

    const imageUrl = pickFirst(
        raw.imgSrc,
        (raw as any).image,
        (raw as any).photo,
        Array.isArray((raw as any).photos) ? (raw as any).photos[0]?.url ?? (raw as any).photos[0] : null
    ) as string | null

    const latitude = toNumber(
        pickFirst((raw as any).latitude, (raw as any).latLong?.latitude, (raw as any).hdpData?.homeInfo?.latitude)
    )
    const longitude = toNumber(
        pickFirst((raw as any).longitude, (raw as any).latLong?.longitude, (raw as any).hdpData?.homeInfo?.longitude)
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

function extractResults(payload: unknown): Record<string, unknown>[] {
    if (Array.isArray(payload)) return payload as Record<string, unknown>[]
    if (!payload || typeof payload !== "object") return []
    const obj = payload as Record<string, unknown>
    const candidates = [
        obj.results,
        obj.props,
        obj.data,
        obj.listings,
        (obj as any).searchResults?.listings,
        (obj as any).cat1?.searchResults?.mapResults,
        (obj as any).cat1?.searchResults?.listResults,
    ]
    for (const c of candidates) {
        if (Array.isArray(c)) return c as Record<string, unknown>[]
    }
    return []
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

    const url = new URL(request.url)
    const priceMax = url.searchParams.get("price_max") ?? "125000"
    const page = url.searchParams.get("page") ?? "1"

    const rapidKey = process.env.RAPIDAPI_KEY || RAPIDAPI_FALLBACK_KEY

    const upstreamUrl =
        `https://${RAPIDAPI_HOST}/search/bymls` +
        `?city=Detroit&state=MI&listing_type=for_sale&price_max=${encodeURIComponent(priceMax)}&page=${encodeURIComponent(page)}`

    try {
        const upstream = await fetch(upstreamUrl, {
            headers: {
                "x-rapidapi-key": rapidKey,
                "x-rapidapi-host": RAPIDAPI_HOST,
            },
            // Cache server-side for 5 minutes to spare the RapidAPI quota.
            next: { revalidate: 300 },
        })

        if (!upstream.ok) {
            const text = await upstream.text().catch(() => "")
            return NextResponse.json(
                { error: "Upstream RapidAPI error", status: upstream.status, detail: text.slice(0, 500) },
                { status: 502 }
            )
        }

        const raw = await upstream.json()
        const results = extractResults(raw)

        const listings = results
            .map((item) => normalize(item))
            .filter((l): l is ScoutedListing => l !== null)
            // Final guard: enforce the $125k ceiling client-trusted.
            .filter((l) => l.price <= Number(priceMax))
            // Highest cap rate first — most interesting deals on top.
            .sort((a, b) => b.capRate - a.capRate)

        const totalPrice = listings.reduce((sum, l) => sum + l.price, 0)
        const totalCap = listings.reduce((sum, l) => sum + l.capRate, 0)
        const aCount = listings.filter((l) => l.section8Score === "A").length

        return NextResponse.json({
            count: listings.length,
            stats: {
                total: listings.length,
                avgPrice: listings.length ? Math.round(totalPrice / listings.length) : 0,
                avgCapRate: listings.length ? Number((totalCap / listings.length).toFixed(2)) : 0,
                aScoreCount: aCount,
            },
            listings,
        })
    } catch (error) {
        console.error("[detroit-listings] fetch failed:", error)
        return NextResponse.json(
            { error: "Failed to fetch Detroit listings" },
            { status: 500 }
        )
    }
}
