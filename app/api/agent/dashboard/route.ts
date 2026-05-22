import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { verifyToken, extractBearerToken } from "@/lib/auth"

const MONTH_LABELS_TR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]

export async function GET(request: Request) {
    try {
        const token = extractBearerToken(request)
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

        const payload = verifyToken(token)
        if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 })

        const user = await prisma.user.findUnique({
            where: { email: payload.email },
            include: { agentProfile: { include: { sales: true, commissions: true } } },
        })

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

        const profile = user.agentProfile
        const sales = profile?.sales ?? []
        const commissions = profile?.commissions ?? []

        // Stat totals
        const completedSales = sales.filter((s) => s.status === "COMPLETED")
        const totalReferrals = sales.length
        const totalEarnings = sales.reduce((s, x) => s + x.commission, 0)
            + commissions.reduce((s, x) => s + x.amount, 0)

        const passiveCommissions = commissions.filter((c) => c.type === "PASSIVE")
        const monthlyPassive = passiveCommissions.reduce((s, x) => s + x.amount, 0) || estimateMonthlyPassive(sales)
        const annualPassive = monthlyPassive * 12

        // 12-month earnings series (commission per month + passive per month)
        const now = new Date()
        const monthBuckets = new Map<string, { komisyon: number; pasif: number }>()
        for (let i = 11; i >= 0; i--) {
            const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1))
            monthBuckets.set(`${d.getUTCFullYear()}-${d.getUTCMonth()}`, { komisyon: 0, pasif: 0 })
        }
        for (const s of sales) {
            const key = `${s.saleDate.getUTCFullYear()}-${s.saleDate.getUTCMonth()}`
            const bucket = monthBuckets.get(key)
            if (bucket) bucket.komisyon += s.commission
        }
        for (const c of commissions) {
            const key = `${c.createdAt.getUTCFullYear()}-${c.createdAt.getUTCMonth()}`
            const bucket = monthBuckets.get(key)
            if (!bucket) continue
            if (c.type === "PASSIVE") bucket.pasif += c.amount
            else bucket.komisyon += c.amount
        }
        const earningsSeries = Array.from(monthBuckets.entries()).map(([key, v]) => {
            const month = Number(key.split("-")[1])
            return { month: MONTH_LABELS_TR[month], komisyon: Math.round(v.komisyon), pasif: Math.round(v.pasif) }
        })

        // Referrals list — group sales by client name so each unique client is one referral
        const clientMap = new Map<string, { name: string; properties: number; totalCommission: number; latestDate: Date; latestStatus: string }>()
        for (const s of sales) {
            const existing = clientMap.get(s.clientName)
            if (existing) {
                existing.properties += 1
                existing.totalCommission += s.commission
                if (s.saleDate > existing.latestDate) {
                    existing.latestDate = s.saleDate
                    existing.latestStatus = s.status
                }
            } else {
                clientMap.set(s.clientName, {
                    name: s.clientName,
                    properties: 1,
                    totalCommission: s.commission,
                    latestDate: s.saleDate,
                    latestStatus: s.status,
                })
            }
        }
        const referrals = Array.from(clientMap.values())
            .sort((a, b) => b.latestDate.getTime() - a.latestDate.getTime())
            .map((c) => ({
                name: c.name,
                properties: c.properties,
                status: mapStatus(c.latestStatus),
                monthlyPassive: Math.round((c.totalCommission * 0.005) * 100) / 100,
                date: c.latestDate.toISOString(),
            }))

        // Pipeline counts: bucketed by status
        const pipeline = {
            contact: sales.filter((s) => s.status === "CONTACT").length,
            meeting: sales.filter((s) => s.status === "MEETING").length,
            dueDiligence: sales.filter((s) => s.status === "DUE_DILIGENCE").length,
            closing: sales.filter((s) => s.status === "PENDING").length,
            completed: completedSales.length,
        }

        // Monthly goal — completed sales this calendar month, target=8 (placeholder)
        const monthlyActual = completedSales.filter((s) => {
            return s.saleDate.getUTCFullYear() === now.getUTCFullYear() && s.saleDate.getUTCMonth() === now.getUTCMonth()
        }).length

        return NextResponse.json({
            name: user.fullName,
            level: profile?.level ?? "STARTER",
            stats: {
                totalReferrals,
                totalEarnings: Math.round(totalEarnings),
                monthlyPassive: Math.round(monthlyPassive),
                annualPassive: Math.round(annualPassive),
                completedSales: completedSales.length,
            },
            earningsSeries,
            pipeline,
            referrals,
            monthlyGoal: { target: 8, actual: monthlyActual },
            commissions: commissions
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((c) => ({
                    id: c.id,
                    amount: c.amount,
                    type: c.type,
                    description: c.description,
                    date: c.createdAt.toISOString(),
                })),
            sales: sales
                .sort((a, b) => b.saleDate.getTime() - a.saleDate.getTime())
                .map((s) => ({
                    id: s.id,
                    propertyAddress: s.propertyAddress,
                    salePrice: s.salePrice,
                    commission: s.commission,
                    clientName: s.clientName,
                    status: s.status,
                    saleDate: s.saleDate.toISOString(),
                })),
        })
    } catch (e) {
        console.error("Agent dashboard API error:", e)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

function mapStatus(status: string): string {
    if (status === "COMPLETED") return "Aktif"
    if (status === "PENDING") return "Kapanışta"
    return "Görüşmede"
}

// Estimate ~0.5% of total sale prices per month as passive income if no PASSIVE commissions are recorded yet
function estimateMonthlyPassive(sales: { salePrice: number; status: string }[]): number {
    return sales
        .filter((s) => s.status === "COMPLETED")
        .reduce((s, x) => s + x.salePrice * 0.005 / 12, 0)
}
