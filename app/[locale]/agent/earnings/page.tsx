"use client"

import { useEffect, useState } from "react"
import { Loader2, DollarSign, TrendingUp, Wallet, Filter, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

type AgentDashboard = {
    stats: {
        totalEarnings: number
        monthlyPassive: number
        annualPassive: number
        completedSales: number
    }
    earningsSeries: { month: string; komisyon: number; pasif: number }[]
    commissions: { id: string; amount: number; type: string; description: string; date: string }[]
    sales: { id: string; propertyAddress: string; salePrice: number; commission: number; clientName: string; status: string; saleDate: string }[]
}

type Row = {
    id: string
    title: string
    subtitle: string
    amount: number
    date: string
    type: "SALE" | "REFERRAL" | "PASSIVE" | "BONUS"
}

const fmtUsd = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

const fmtDate = (iso: string): string => {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

export default function EarningsPage() {
    const [data, setData] = useState<AgentDashboard | null>(null)
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<"ALL" | "SALE" | "PASSIVE" | "BONUS">("ALL")

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("pasiflow_token") : null
        if (!token) { setLoading(false); return }
        fetch("/api/agent/dashboard", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => (r.ok ? r.json() as Promise<AgentDashboard> : null))
            .then((d) => setData(d))
            .catch(() => setData(null))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-[#C1A05E] animate-spin" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="p-10">
                <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
                    <p className="text-[#1F2328] font-semibold">Kazanç verileri yüklenemedi</p>
                    <p className="text-[#A8B0B8] text-sm mt-1">Lütfen giriş yaptığınızdan emin olun.</p>
                </div>
            </div>
        )
    }

    const rows: Row[] = [
        ...data.sales.map((s): Row => ({
            id: s.id,
            title: `Satış komisyonu — ${s.clientName}`,
            subtitle: s.propertyAddress,
            amount: s.commission,
            date: s.saleDate,
            type: "SALE",
        })),
        ...data.commissions.map((c): Row => ({
            id: c.id,
            title: c.description || `${c.type} geliri`,
            subtitle: c.type === "PASSIVE" ? "Aylık yönetim payı" : c.type === "BONUS" ? "Performans bonusu" : "Yönlendirme",
            amount: c.amount,
            date: c.date,
            type: c.type as Row["type"],
        })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const filtered = filter === "ALL" ? rows : rows.filter((r) => r.type === filter)
    const ytdTotal = rows
        .filter((r) => new Date(r.date).getUTCFullYear() === new Date().getUTCFullYear())
        .reduce((s, r) => s + r.amount, 0)

    const stats = [
        { label: "Toplam Kazanç", value: data.stats.totalEarnings, icon: DollarSign, color: "text-[#C1A05E]", bg: "bg-[#C1A05E]/10" },
        { label: "Bu Yıl (YTD)", value: ytdTotal, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Aylık Pasif Gelir", value: data.stats.monthlyPassive, icon: Wallet, color: "text-blue-600", bg: "bg-blue-50" },
    ]

    return (
        <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight relative">Kazançlarım</h1>
                <p className="text-[#A8B0B8] mt-2 font-medium relative text-sm md:text-base">Komisyon, pasif gelir ve bonusların tam dökümü.</p>
            </motion.div>

            <div className="grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-3">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                    >
                        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <p className="text-xs text-[#A8B0B8] font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-extrabold text-[#1F2328] tracking-tight">{fmtUsd(stat.value)}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6"
            >
                <h3 className="text-lg font-bold text-[#1F2328] mb-1">Aylık Kazanç Trendi</h3>
                <p className="text-xs text-[#A8B0B8] mb-6">Son 12 ay — komisyon + pasif gelir</p>
                <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={data.earningsSeries} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                        <defs>
                            <linearGradient id="earnGold" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#C1A05E" stopOpacity={0.22} />
                                <stop offset="100%" stopColor="#C1A05E" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="earnCharcoal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1F2328" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#1F2328" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#A8B0B8", fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A8B0B8", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                        <Tooltip
                            contentStyle={{ background: "#1F2328", border: "none", borderRadius: 12, color: "white", fontSize: 12 }}
                            formatter={(value: number) => [fmtUsd(value), ""]}
                        />
                        <Area type="monotone" dataKey="komisyon" stroke="#C1A05E" strokeWidth={2} fill="url(#earnGold)" name="Komisyon" />
                        <Area type="monotone" dataKey="pasif" stroke="#1F2328" strokeWidth={1.5} fill="url(#earnCharcoal)" name="Pasif Gelir" />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
                <div className="p-4 sm:p-5 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-[#C1A05E]" />
                        <h3 className="font-bold text-[#1F2328]">Kazanç Geçmişi</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl overflow-x-auto">
                        {(["ALL", "SALE", "PASSIVE", "BONUS"] as const).map((key) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex-shrink-0 whitespace-nowrap",
                                    filter === key ? "bg-white text-[#1F2328] shadow-sm" : "text-[#A8B0B8] hover:text-slate-600"
                                )}
                            >
                                {key === "ALL" ? "Tümü" : key === "SALE" ? "Satış" : key === "PASSIVE" ? "Pasif" : "Bonus"}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {filtered.length === 0 ? (
                        <p className="px-5 py-12 text-center text-sm text-[#A8B0B8]">Henüz kazanç kaydı yok.</p>
                    ) : (
                        filtered.map((row) => (
                            <div key={row.id} className="px-5 py-4 hover:bg-slate-50/50 transition-colors flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-500">
                                    <ArrowUpRight size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#1F2328] truncate">{row.title}</p>
                                    <p className="text-[11px] text-[#A8B0B8] truncate">{row.subtitle} · {fmtDate(row.date)}</p>
                                </div>
                                <div className="font-bold text-sm text-emerald-600">+{fmtUsd(row.amount)}</div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 bg-[#C1A05E]/5 border-t border-[#C1A05E]/10 flex items-center justify-between text-sm">
                    <span className="text-[#A8B0B8] font-medium">Toplam Kazanç ({filter === "ALL" ? "Tümü" : filter === "SALE" ? "Satış" : filter === "PASSIVE" ? "Pasif" : "Bonus"})</span>
                    <span className="font-bold text-[#C1A05E]">{fmtUsd(filtered.reduce((s, r) => s + r.amount, 0))}</span>
                </div>
            </motion.div>

            <div className="flex justify-end">
                <Button variant="outline" className="border-slate-200 text-slate-600 hover:text-[#C1A05E] hover:border-[#C1A05E]/30 rounded-xl">
                    CSV Olarak İndir
                </Button>
            </div>
        </div>
    )
}
