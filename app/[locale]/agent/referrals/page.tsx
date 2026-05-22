"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
    Loader2,
    Search,
    Users,
    CheckCircle2,
    Clock,
    PlusCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AgentDashboard = {
    referrals: { name: string; properties: number; status: string; monthlyPassive: number; date: string }[]
    pipeline: {
        contact: number
        meeting: number
        dueDiligence: number
        closing: number
        completed: number
    }
    sales: { id: string; propertyAddress: string; salePrice: number; commission: number; clientName: string; status: string; saleDate: string }[]
}

const fmtUsd = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

const fmtDate = (iso: string): string => {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
}

export default function ReferralsPage() {
    const [data, setData] = useState<AgentDashboard | null>(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<"ALL" | "Aktif" | "Kapanışta" | "Görüşmede">("ALL")

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("pasiflow_token") : null
        if (!token) { setLoading(false); return }
        fetch("/api/agent/dashboard", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => (r.ok ? r.json() as Promise<AgentDashboard> : null))
            .then((d) => setData(d))
            .catch(() => setData(null))
            .finally(() => setLoading(false))
    }, [])

    const filteredReferrals = useMemo(() => {
        if (!data) return []
        const lower = search.toLowerCase().trim()
        return data.referrals
            .filter((r) => (statusFilter === "ALL" ? true : r.status === statusFilter))
            .filter((r) => (lower ? r.name.toLowerCase().includes(lower) : true))
    }, [data, search, statusFilter])

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
                    <p className="text-[#1F2328] font-semibold">Referans verisi yüklenemedi</p>
                    <p className="text-[#A8B0B8] text-sm mt-1">Lütfen giriş yaptığınızdan emin olun.</p>
                </div>
            </div>
        )
    }

    const totals = {
        all: data.referrals.length,
        active: data.referrals.filter((r) => r.status === "Aktif").length,
        closing: data.referrals.filter((r) => r.status === "Kapanışta").length,
        meeting: data.referrals.filter((r) => r.status === "Görüşmede").length,
        passiveTotal: data.referrals.reduce((s, r) => s + r.monthlyPassive, 0),
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight">Referanslarım</h1>
                        <p className="text-[#A8B0B8] mt-2 font-medium text-sm md:text-base">
                            Yönlendirdiğiniz tüm yatırımcılar ve mevcut süreçleri.
                        </p>
                    </div>
                    <Button className="bg-[#1F2328] text-white hover:bg-[#C1A05E] rounded-xl shadow-lg transition-all w-full sm:w-auto">
                        <PlusCircle size={16} className="mr-2" />
                        Yeni Referans Ekle
                    </Button>
                </div>
            </motion.div>

            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Toplam", value: totals.all, icon: Users, bg: "bg-[#C1A05E]/10", color: "text-[#C1A05E]" },
                    { label: "Aktif", value: totals.active, icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
                    { label: "Kapanışta", value: totals.closing, icon: Clock, bg: "bg-blue-50", color: "text-blue-600" },
                    { label: "Görüşmede", value: totals.meeting, icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
                    >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", s.bg)}>
                            <s.icon size={18} className={s.color} />
                        </div>
                        <p className="text-xs text-[#A8B0B8] font-semibold uppercase tracking-wider mb-1">{s.label}</p>
                        <p className="text-2xl font-extrabold text-[#1F2328] tracking-tight">{s.value}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
                <div className="p-4 sm:p-5 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="İsme göre ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-10 bg-slate-50 border-none rounded-xl"
                        />
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl overflow-x-auto">
                        {(["ALL", "Aktif", "Kapanışta", "Görüşmede"] as const).map((key) => (
                            <button
                                key={key}
                                onClick={() => setStatusFilter(key)}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex-shrink-0 whitespace-nowrap",
                                    statusFilter === key ? "bg-white text-[#1F2328] shadow-sm" : "text-[#A8B0B8] hover:text-slate-600"
                                )}
                            >
                                {key === "ALL" ? "Tümü" : key}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[640px]">
                        <thead>
                            <tr className="bg-slate-50/50 text-[#A8B0B8] text-[10px] font-bold uppercase tracking-widest">
                                <th className="py-3 px-5">Yatırımcı</th>
                                <th className="py-3 px-5">Mülk</th>
                                <th className="py-3 px-5">Durum</th>
                                <th className="py-3 px-5">Pasif Gelir</th>
                                <th className="py-3 px-5 hidden md:table-cell">Son Aktivite</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredReferrals.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm text-[#A8B0B8]">
                                        Eşleşen referans yok.
                                    </td>
                                </tr>
                            )}
                            {filteredReferrals.map((ref, i) => (
                                <motion.tr
                                    key={`${ref.name}-${i}`}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + i * 0.04 }}
                                    className="hover:bg-slate-50/50 transition-all"
                                >
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C1A05E]/20 to-[#C1A05E]/10 flex items-center justify-center text-[#C1A05E] font-bold text-xs flex-shrink-0">
                                                {ref.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                            </div>
                                            <span className="font-semibold text-sm text-slate-900">{ref.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-sm text-slate-600">{ref.properties} Mülk</td>
                                    <td className="py-4 px-5">
                                        <span className={cn(
                                            "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1",
                                            ref.status === "Aktif" && "bg-emerald-50 text-emerald-600",
                                            ref.status === "Kapanışta" && "bg-blue-50 text-blue-600",
                                            ref.status === "Görüşmede" && "bg-amber-50 text-amber-600",
                                        )}>
                                            <span className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                ref.status === "Aktif" && "bg-emerald-500",
                                                ref.status === "Kapanışta" && "bg-blue-500",
                                                ref.status === "Görüşmede" && "bg-amber-500",
                                            )} />
                                            {ref.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 font-bold text-sm text-[#1F2328]">
                                        {ref.monthlyPassive > 0 ? `$${ref.monthlyPassive.toFixed(2)}/ay` : "-"}
                                    </td>
                                    <td className="py-4 px-5 text-xs text-[#A8B0B8] hidden md:table-cell">
                                        {fmtDate(ref.date)}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-[#C1A05E]/5 border-t border-[#C1A05E]/10 flex items-center justify-between text-sm">
                    <span className="text-[#A8B0B8] font-medium">Toplam Aylık Pasif Gelir</span>
                    <span className="font-bold text-[#C1A05E]">
                        {totals.passiveTotal > 0 ? `$${totals.passiveTotal.toFixed(2)}/ay` : "$0/ay"}
                    </span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
                <h3 className="font-bold text-[#1F2328] mb-1">Tamamlanan Satışlar</h3>
                <p className="text-xs text-[#A8B0B8] mb-4">Sistemde kayıtlı tüm satış işlemleri</p>
                {data.sales.length === 0 ? (
                    <p className="py-10 text-center text-sm text-[#A8B0B8]">Henüz tamamlanan satış yok.</p>
                ) : (
                    <ul className="divide-y divide-slate-50">
                        {data.sales.map((s) => (
                            <li key={s.id} className="py-3 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-[#1F2328] truncate">{s.propertyAddress}</p>
                                    <p className="text-[11px] text-[#A8B0B8] truncate">{s.clientName} · {fmtDate(s.saleDate)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-[#C1A05E]">{fmtUsd(s.commission)}</p>
                                    <p className="text-[10px] text-[#A8B0B8]">Satış: {fmtUsd(s.salePrice)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </div>
    )
}
