import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Wallet, Wrench } from "lucide-react"
import { db } from "@/lib/db"
import { RevenueChart, type RevenuePoint } from "@/components/admin/revenue-chart"

export const dynamic = "force-dynamic"

const fmtUsd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

const MONTH_LABELS_TR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"]

export default async function AdminDashboardPage() {
    // 6-month revenue window starts from the first day of (currentMonth - 5)
    const now = new Date()
    const windowStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5, 1))

    const [
        propertyCount,
        valueAgg,
        occupiedCount,
        rentAgg,
        activeMaintenanceCount,
        recentPayments,
        revenuePayments,
    ] = await Promise.all([
        db.property.count(),
        db.property.aggregate({ _sum: { purchasePrice: true } }),
        db.property.count({ where: { status: "OCCUPIED" } }),
        db.property.aggregate({ _sum: { monthlyRent: true } }),
        db.maintenanceRequest.count({
            where: { status: { in: ["PENDING", "SCHEDULED", "IN_PROGRESS"] } },
        }),
        db.payment.findMany({
            orderBy: { date: "desc" },
            take: 5,
            include: { property: { select: { address: true } } },
        }),
        db.payment.findMany({
            where: { date: { gte: windowStart }, status: "PAID" },
            select: { amount: true, date: true },
        }),
    ])

    const totalValue = valueAgg._sum.purchasePrice ?? 0
    const totalRent = rentAgg._sum.monthlyRent ?? 0
    const occupancyRate = propertyCount > 0 ? Math.round((occupiedCount / propertyCount) * 100) : 0

    // Build 6-month series: for each month in the window, sum PAID payments
    const buckets = new Map<string, number>()
    for (let i = 0; i < 6; i++) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - i), 1))
        const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`
        buckets.set(key, 0)
    }
    for (const p of revenuePayments) {
        const key = `${p.date.getUTCFullYear()}-${p.date.getUTCMonth()}`
        if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + p.amount)
    }
    const revenueSeries: RevenuePoint[] = Array.from(buckets.entries()).map(([key, revenue]) => {
        const [, monthStr] = key.split("-")
        return { month: MONTH_LABELS_TR[Number(monthStr)], revenue: Math.round(revenue) }
    })

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Mayıs 2026</span>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Toplam Mülk Değeri
                        </CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{fmtUsd(totalValue)}</div>
                        <p className="text-xs text-muted-foreground">
                            {propertyCount} mülk portföyde
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Aktif Bakım Talepleri
                        </CardTitle>
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeMaintenanceCount}</div>
                        <p className="text-xs text-muted-foreground">
                            {activeMaintenanceCount === 0 ? "Aktif talep yok" : "Beklemede veya devam ediyor"}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Aylık Toplam Kira
                        </CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{fmtUsd(totalRent)}</div>
                        <p className="text-xs text-muted-foreground">
                            Yıllık {fmtUsd(totalRent * 12)}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Aktif Kiracılar
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{occupiedCount}</div>
                        <p className="text-xs text-muted-foreground">
                            %{occupancyRate} doluluk oranı
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Gelir Grafiği</CardTitle>
                        <p className="text-xs text-muted-foreground">Son 6 ay — ödenmiş kira toplamı</p>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <RevenueChart data={revenueSeries} />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Son Aktiviteler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {recentPayments.length === 0 ? (
                                <p className="text-sm text-muted-foreground">Henüz ödeme yok.</p>
                            ) : (
                                recentPayments.map((p) => (
                                    <div key={p.id} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{p.property.address} — Kira</p>
                                            <p className="text-sm text-muted-foreground">{p.period}</p>
                                        </div>
                                        <div className="ml-auto font-medium">+{fmtUsd(p.amount)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
