import { NextRequest, NextResponse } from "next/server"
import { verifyToken, extractBearerToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const HOST = "private-zillow.p.rapidapi.com"
const FMR: Record<number, number> = { 1: 950, 2: 1150, 3: 1450, 4: 1700 }

function getFMR(beds: number) {
  return FMR[Math.min(Math.max(beds, 1), 4)]
}

function calcMetrics(price: number, beds: number) {
  const rent = getFMR(beds)
  const capRate = price > 0 ? ((rent * 12 * 0.55) / price) * 100 : 0
  const grossYield = price > 0 ? ((rent * 12) / price) * 100 : 0
  const cashFlow = (rent * 12 * 0.55) / 12
  const score = capRate >= 10 ? "A" : capRate >= 7 ? "B" : "C"
  return { rent, capRate, grossYield, cashFlow, score }
}

export async function GET(req: NextRequest) {
  // Auth
  const token = extractBearerToken(req)
  const user = token ? verifyToken(token) : null
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const priceMax = Number(searchParams.get("price_max") || 125000)

  const apiKey = process.env.RAPIDAPI_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "RAPIDAPI_KEY not configured" }, { status: 500 })
  }

  try {
    const url = `https://${HOST}/search/byaddress?location=Detroit%2C+MI&status_type=For_Sale&price_max=${priceMax}&page=1`

    const res = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": HOST,
      },
      cache: "no-store",
    })

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream ${res.status}` }, { status: 502 })
    }

    const data = await res.json()

    // Extract — searchResults[].property yapısı
    const searchResults = data?.searchResults
    if (!Array.isArray(searchResults) || searchResults.length === 0) {
      return NextResponse.json({ listings: [], count: 0, stats: { total: 0, avgPrice: 0, avgCapRate: 0, aScoreCount: 0 } })
    }

    // Map ve filtrele — sadece $priceMax altı, max 50 listing
    const listings = searchResults
      .map((item: any) => {
        const p = item?.property
        if (!p) return null

        const price = Number(
          p.price ?? p.unformattedPrice ?? p.listingPrice ??
          p.priceForHDP ?? p.hdpData?.homeInfo?.price ?? 0
        )
        if (price <= 0 || price > priceMax) return null

        const beds = Number(p.bedrooms || 2)
        const baths = Number(p.bathrooms || 1)
        const metrics = calcMetrics(price, beds)

        const hdpUrl = p.hdpUrl ?? p.detailUrl ?? p.url ?? ""
        const detailUrl = hdpUrl
          ? (hdpUrl.startsWith("http") ? hdpUrl : `https://www.zillow.com${hdpUrl}`)
          : `https://www.zillow.com/homes/${p.zpid}_zpid/`

        return {
          zpid: p.zpid,
          price,
          beds,
          baths,
          yearBuilt: Number(p.yearBuilt || 0),
          livingArea: Number(p.livingArea || 0),
          address: p.address?.streetAddress
            ? `${p.address.streetAddress}, ${p.address.city}, ${p.address.state}`
            : "Detroit, MI",
          imageUrl: p.media?.propertyPhotoLinks?.mediumSizeLink || "",
          detailUrl,
          lat: p.location?.latitude || 0,
          lng: p.location?.longitude || 0,
          leadPaintRisk: Number(p.yearBuilt || 0) > 0 && Number(p.yearBuilt || 0) < 1978,
          ...metrics,
        }
      })
      .filter(Boolean)
      .slice(0, 50) // max 50, cache limit aşmasın

    const total = listings.length
    const avgPrice = total > 0 ? listings.reduce((a: number, b: any) => a + b.price, 0) / total : 0
    const avgCapRate = total > 0 ? listings.reduce((a: number, b: any) => a + b.capRate, 0) / total : 0
    const aScoreCount = listings.filter((l: any) => l.score === "A").length

    return NextResponse.json({
      listings,
      count: total,
      stats: { total, avgPrice, avgCapRate, aScoreCount },
    })

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
