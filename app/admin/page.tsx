import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Wallet, Wrench } from "lucide-react"
import { db } from "@/lib/db"

const fmtUsd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

export default async function AdminDashboardPage() {
    const [propertyCount, valueAgg, occupiedCount, rentAgg, recentPayments] = await Promise.all([
        db.property.count(),
        db.property.aggregate({ _sum: { purchasePrice: true } }),
        db.property.count({ where: { status: "OCCUPIED" } }),
        db.property.aggregate({ _sum: { monthlyRent: true } }),
        db.payment.findMany({
            orderBy: { date: "desc" },
            take: 5,
            include: { property: { select: { address: true } } },
        }),
    ])

    const totalValue = valueAgg._sum.purchasePrice ?? 0
    const totalRent = rentAgg._sum.monthlyRent ?? 0
    const occupancyRate = propertyCount > 0 ? Math.round((occupiedCount / propertyCount) * 100) : 0

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
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">
                            Aktif talep yok
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
                        <CardTitle>Genel Bakış</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-md">
                            Gelir Grafiği Buraya Gelecek
                        </div>
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
