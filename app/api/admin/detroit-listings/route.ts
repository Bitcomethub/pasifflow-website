import { NextRequest, NextResponse } from "next/server"
import { verifyToken, extractBearerToken } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

const HOST = "private-zillow.p.rapidapi.com"
// HUD 2025 Detroit-Warren-Dearborn MSA Fair Market Rents
const FMR: Record<number, number> = { 1: 855, 2: 1024, 3: 1311, 4: 1542 }

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

type RehabBand = "low" | "medium" | "high"

function buildInsights(args: {
  price: number
  beds: number
  livingArea: number
  leadPaintRisk: boolean
  rent: number
}) {
  const { price, beds, livingArea, leadPaintRisk, rent } = args

  // Rehab tahmini fiyat bandına göre — düşük fiyat = daha derin rehab varsayımı
  const rehabEstimate: RehabBand = price < 30000 ? "high" : price < 60000 ? "medium" : "low"
  const rehabCost = rehabEstimate === "high" ? 35000 : rehabEstimate === "medium" ? 20000 : 10000

  const allInCost = price + rehabCost
  const netAnnualRent = rent * 12 * 0.55
  const realCapRate = allInCost > 0 ? (netAnnualRent / allInCost) * 100 : 0
  const paybackYears = netAnnualRent > 0 ? allInCost / netAnnualRent : 0

  // Section 8 uygunluk skoru (0-100)
  let s8Score = 0
  if (beds >= 3) s8Score += 25
  if (!leadPaintRisk) s8Score += 20
  if (price >= 25000) s8Score += 20
  if (realCapRate >= 8) s8Score += 20
  if (livingArea >= 1000) s8Score += 15

  const investorType =
    realCapRate >= 12 ? "Agresif yatırımcı" : realCapRate >= 8 ? "Orta profil yatırımcı" : "Muhafazakar yatırımcı"

  const warnings: string[] = []
  if (leadPaintRisk) warnings.push("Lead paint testi + renovasyon zorunlu ($3-8k)")
  if (price < 25000) warnings.push("Harap risk yüksek, fiziksel inspection şart")
  if (beds < 2) warnings.push("1BR Section 8 talebi düşük")
  if (rehabEstimate === "high") warnings.push("Yüksek rehab bütçesi gerekli (~$35k)")

  const highlights: string[] = []
  if (beds >= 3) highlights.push("3BR+ — Section 8 yüksek talep")
  if (!leadPaintRisk) highlights.push("1978+ yapı — lead paint yok")
  if (realCapRate >= 10) highlights.push(`Rehab dahil %${realCapRate.toFixed(1)} cap rate`)
  if (livingArea >= 1200) highlights.push("Geniş alan — kaliteli kiracı çeker")

  return {
    rehabEstimate,
    rehabCost,
    allInCost,
    realCapRate,
    paybackYears,
    s8Score,
    investorType,
    warnings,
    highlights,
  }
}

function buildUrl(priceMax: number, page: number) {
  return `https://${HOST}/search/byaddress?location=Detroit%2C+MI&status_type=For_Sale&price_max=${priceMax}&page=${page}`
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
    // Zillow paginates Detroit results — pull all 5 pages in parallel (~200/page = ~1000 raw rows)
    const pageResponses = await Promise.all(
      [1, 2, 3, 4, 5].map((page) =>
        fetch(buildUrl(priceMax, page), {
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": HOST,
          },
          cache: "no-store",
        })
      )
    )

    const firstFailure = pageResponses.find((r) => !r.ok)
    if (firstFailure) {
      return NextResponse.json({ error: `Upstream ${firstFailure.status}` }, { status: 502 })
    }

    const datas = await Promise.all(pageResponses.map((r) => r.json()))
    const allResults: any[] = datas.flatMap((d) =>
      Array.isArray(d?.searchResults) ? d.searchResults : []
    )

    // Parse — every Zillow row we can read counts toward totalAvailable
    const allListings = allResults
      .map((item: any) => {
        const p = item?.property
        if (!p) return null

        // Only active "For Sale" listings — drop withdrawn/pasif rows upstream
        const listingStatus = p.listing?.listingStatus
        const marketingStatus = p.listing?.marketingStatus
        if (listingStatus !== "forSale" || marketingStatus !== "active") return null

        // PRICE — p.price bir object: {value: 209900, pricePerSquareFoot: 161}
        const price = Number(
          p.price?.value ?? p.price ?? p.listingPrice ?? p.unformattedPrice ?? 0
        )
        if (!Number.isFinite(price)) return null

        const beds = Number(p.bedrooms || 2)
        const baths = Number(p.bathrooms || 1)
        const livingArea = Number(p.livingArea || 0)
        const yearBuilt = Number(p.yearBuilt || 0)
        const leadPaintRisk = yearBuilt > 0 && yearBuilt < 1978
        const metrics = calcMetrics(price, beds)
        const insights = buildInsights({
          price,
          beds,
          livingArea,
          leadPaintRisk,
          rent: metrics.rent,
        })

        // DETAIL URL — zpid ile doğrudan Zillow detayfsayfası kanonik URL
        const detailUrl = `https://www.zillow.com/homedetails/${p.zpid}_zpid/`

        // PHOTOS — prefer highResolution gallery; fall back to medium, then single thumb
        const highRes: string[] = Array.isArray(p.media?.allPropertyPhotos?.highResolution)
          ? p.media.allPropertyPhotos.highResolution.slice(0, 10)
          : []
        const medium: string[] = Array.isArray(p.media?.allPropertyPhotos?.medium)
          ? p.media.allPropertyPhotos.medium.slice(0, 10)
          : []
        const fallback = [p.media?.propertyPhotoLinks?.mediumSizeLink].filter(Boolean) as string[]
        const photos = highRes.length > 0 ? highRes : medium.length > 0 ? medium : fallback

        return {
          zpid: p.zpid,
          price,
          beds,
          baths,
          yearBuilt,
          livingArea,
          address: p.address?.streetAddress
            ? `${p.address.streetAddress}, ${p.address.city}, ${p.address.state}`
            : "Detroit, MI",
          imageUrl: p.media?.propertyPhotoLinks?.mediumSizeLink || photos[0] || "",
          photos,
          detailUrl,
          lat: p.location?.latitude || 0,
          lng: p.location?.longitude || 0,
          leadPaintRisk,
          ...metrics,
          ...insights,
        }
      })
      .filter(Boolean) as any[]

    // Quality filter — drop sub-$10k parcels/teardowns and >50% capRate data artifacts
    const listings = allListings
      .filter((l) => l.price > 10000 && l.price <= priceMax && l.capRate <= 50)
      .sort((a, b) => b.capRate - a.capRate)

    const total = listings.length
    const avgPrice = total > 0 ? listings.reduce((a, b) => a + b.price, 0) / total : 0
    const avgCapRate = total > 0 ? listings.reduce((a, b) => a + b.capRate, 0) / total : 0
    const aScoreCount = listings.filter((l) => l.score === "A").length

    return NextResponse.json({
      listings,
      count: total,
      totalAvailable: allListings.length,
      stats: { total, avgPrice, avgCapRate, aScoreCount },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
