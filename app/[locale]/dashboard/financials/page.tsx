"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, DollarSign, Wallet, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function FinancialsPage() {
    const stats = [
        { title: "Toplam Gelir", value: "$12,345", change: "+20.1%", positive: true, icon: DollarSign, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
        { title: "Toplam Gider", value: "$1,234", change: "+4%", positive: false, icon: ArrowDownLeft, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
        { title: "Net Kâr", value: "$11,111", change: "+18%", positive: true, icon: Wallet, color: "text-[#C1A05E]", bg: "bg-[#C1A05E]/10", border: "border-[#C1A05E]/20" },
    ]

    const transactions = [
        { desc: "Kira Ödemesi - Miami Apt", amount: "+$3,200", date: "Bugün", icon: ArrowUpRight, color: "text-green-600", bgColor: "bg-green-50" },
        { desc: "Bakım Onarım - HVAC", amount: "-$150", date: "Dün", icon: ArrowDownLeft, color: "text-red-600", bgColor: "bg-red-50" },
        { desc: "Kira Ödemesi - Austin Loft", amount: "+$2,100", date: "12 Ocak", icon: ArrowUpRight, color: "text-green-600", bgColor: "bg-green-50" },
        { desc: "Yıllık Emlak Vergisi", amount: "-$850", date: "10 Ocak", icon: ArrowDownLeft, color: "text-red-600", bgColor: "bg-red-50" },
    ]

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-slate-900">Finansal Durum</h1>
                <p className="text-slate-500 mt-2">Gelir ve giderlerinizi buradan takip edebilirsiniz.</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className={`border ${stat.border} ${stat.bg} hover:shadow-md transition-all`}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                <p className={`text-xs mt-1 font-semibold ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                                    {stat.change} geçen aydan beri
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="rounded-2xl border-slate-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#C1A05E]" />
                            Son İşlemler
                        </CardTitle>
                        <CardDescription>Hesabınızdaki son finansal hareketler.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transactions.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="flex items-center p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                >
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bgColor}`}>
                                        <item.icon className={`h-5 w-5 ${item.color}`} />
                                    </div>
                                    <div className="ml-4 space-y-1 flex-1">
                                        <p className="text-sm font-semibold leading-none text-slate-900">{item.desc}</p>
                                        <p className="text-xs text-slate-500">{item.date}</p>
                                    </div>
                                    <div className={`font-bold text-sm ${item.color} group-hover:scale-105 transition-transform`}>
                                        {item.amount}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
