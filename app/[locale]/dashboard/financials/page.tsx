import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, DollarSign, Wallet } from "lucide-react"

export default function FinancialsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Finansal Durum</h1>
                <p className="text-slate-500 mt-2">Gelir ve giderlerinizi buradan takip edebilirsiniz.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,345</div>
                        <p className="text-xs text-muted-foreground">+20.1% geçen aydan beri</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Gider</CardTitle>
                        <ArrowDownLeft className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,234</div>
                        <p className="text-xs text-muted-foreground">+4% geçen aydan beri</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Kâr</CardTitle>
                        <Wallet className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$11,111</div>
                        <p className="text-xs text-muted-foreground">+18% geçen aydan beri</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Son İşlemler</CardTitle>
                    <CardDescription>Hesabınızdaki son finansal hareketler.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {[
                            { desc: "Kira Ödemesi - Miami Apt", amount: "+$3,200", date: "Bugün", icon: ArrowUpRight, color: "text-green-500" },
                            { desc: "Bakım Onarım - HVAC", amount: "-$150", date: "Dün", icon: ArrowDownLeft, color: "text-red-500" },
                            { desc: "Kira Ödemesi - Austin Loft", amount: "+$2,100", date: "12 Ocak", icon: ArrowUpRight, color: "text-green-500" },
                            { desc: "Yıllık Emlak Vergisi", amount: "-$850", date: "10 Ocak", icon: ArrowDownLeft, color: "text-red-500" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center">
                                <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${item.color.replace('text', 'border')} bg-slate-50`}>
                                    <item.icon className={`h-5 w-5 ${item.color}`} />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{item.desc}</p>
                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                </div>
                                <div className={`ml-auto font-medium ${item.color}`}>{item.amount}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
