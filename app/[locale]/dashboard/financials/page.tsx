"use client"

import { useState, useEffect, useRef } from "react"
import {
    ArrowDownLeft,
    ArrowUpRight,
    DollarSign,
    Wallet,
    TrendingUp,
    PieChart as PieChartIcon,
    CalendarDays,
    Filter,
    Loader2,
} from "lucide-react"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"

// Animated counter
function AnimatedValue({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const motionVal = useMotionValue(0)
    const spring = useSpring(motionVal, { stiffness: 50, damping: 20 })
    const [display, setDisplay] = useState("0")

    useEffect(() => {
        if (isInView) motionVal.set(value)
    }, [isInView, value, motionVal])

    useEffect(() => {
        const unsub = spring.on("change", (v) => {
            setDisplay(Math.round(v).toLocaleString())
        })
        return unsub
    }, [spring])

    return <span ref={ref}>{prefix}{display}{suffix}</span>
}

type ApiTx = {
    id: string
    type: "INCOME" | "EXPENSE"
    category: string
    amount: number
    description: string | null
    date: string
    propertyAddress: string
    propertyId: string
    llcName: string
}

type ApiFinancials = {
    summary: { totalIncome: number; totalExpense: number; netOperatingIncome: number }
    transactions: ApiTx[]
    monthlyData: { month: string; revenue: number; expenses: number }[]
}

const EXPENSE_PALETTE = ["#ef4444", "#f97316", "#eab308", "#A8B0B8", "#7C8995"]
const INCOME_PALETTE = ["#C1A05E", "#1F2328", "#A8B0B8", "#54616C"]

function formatRelativeDate(iso: string): string {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ""
    const today = new Date()
    const diff = Math.round((today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 0) return "Bugün"
    if (diff === 1) return "Dün"
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" })
}

export default function FinancialsPage() {
    const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all")
    const [data, setData] = useState<ApiFinancials | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("pasiflow_token") : null
        if (!token) { setLoading(false); return }
        fetch("/api/mobile/financials", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => (r.ok ? r.json() as Promise<ApiFinancials> : null))
            .then((d) => setData(d))
            .catch(() => setData(null))
            .finally(() => setLoading(false))
    }, [])

    const summary = data?.summary ?? { totalIncome: 0, totalExpense: 0, netOperatingIncome: 0 }
    const apiTxs = data?.transactions ?? []
    const monthly = data?.monthlyData ?? []

    // Map API ledger rows to the UI shape and filter
    const uiTxs = apiTxs.map((t) => ({
        desc: t.description || `${t.category} - ${t.propertyAddress}`,
        amount: `${t.type === "INCOME" ? "+" : "-"}$${Math.abs(t.amount).toLocaleString()}`,
        date: formatRelativeDate(t.date),
        type: t.type === "INCOME" ? "income" : "expense",
        category: t.category,
    }))
    const filteredTransactions = uiTxs.filter((t) => {
        if (activeTab === "income") return t.type === "income"
        if (activeTab === "expense") return t.type === "expense"
        return true
    })

    // Derive income/expense category breakdowns from real transactions
    const sumByCategory = (type: "INCOME" | "EXPENSE") => {
        const map = new Map<string, number>()
        for (const t of apiTxs) {
            if (t.type !== type) continue
            const key = t.category || "Diğer"
            map.set(key, (map.get(key) ?? 0) + Math.abs(t.amount))
        }
        return Array.from(map.entries()).map(([name, value], i) => ({
            name,
            value,
            color: (type === "INCOME" ? INCOME_PALETTE : EXPENSE_PALETTE)[i % 4],
        }))
    }
    const incomeBreakdown = sumByCategory("INCOME")
    const expenseBreakdown = sumByCategory("EXPENSE")

    // Chart series — re-label "Gelir/Gider" for the chart
    const revenueChartData = monthly.map((m) => ({ month: m.month, gelir: m.revenue, gider: m.expenses }))

    const stats = [
        { title: "Toplam Gelir", value: summary.totalIncome, prefix: "$", change: "Bu dönem", positive: true, icon: DollarSign, bgColor: "bg-emerald-50", borderColor: "border-emerald-200", iconColor: "text-emerald-600" },
        { title: "Toplam Gider", value: summary.totalExpense, prefix: "$", change: "Bu dönem", positive: false, icon: ArrowDownLeft, bgColor: "bg-red-50", borderColor: "border-red-200", iconColor: "text-red-500" },
        { title: "Net Kâr", value: summary.netOperatingIncome, prefix: "$", change: "Net", positive: summary.netOperatingIncome >= 0, icon: Wallet, bgColor: "bg-[#C1A05E]/10", borderColor: "border-[#C1A05E]/20", iconColor: "text-[#C1A05E]" },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-[#C1A05E] animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-8 p-6 md:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />

                <div className="relative flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarDays size={14} className="text-[#A8B0B8]" />
                            <span className="text-xs text-[#A8B0B8] font-medium">Kasım 2025 — Mayıs 2026</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight">Finansal Durum</h1>
                        <p className="text-[#A8B0B8] mt-2 font-medium">Gelir ve giderlerinizi buradan takip edebilirsiniz.</p>
                    </div>
                    <Button variant="outline" className="border-slate-200 text-slate-600 hover:text-[#C1A05E] hover:border-[#C1A05E]/30 rounded-xl w-fit">
                        <Filter size={14} className="mr-2" />
                        Filtrele
                    </Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid gap-5 md:grid-cols-3">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        whileHover={{ y: -4 }}
                        className={cn(
                            "relative bg-white rounded-2xl border p-5 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group",
                            stat.borderColor
                        )}
                    >
                        <div className={cn("absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-2xl", stat.bgColor)} />

                        <div className="flex items-start justify-between mb-3 relative">
                            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", stat.bgColor)}>
                                <stat.icon size={20} className={stat.iconColor} />
                            </div>
                            <span className={cn(
                                "text-xs font-bold px-2 py-1 rounded-lg",
                                stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                            )}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-xs text-[#A8B0B8] font-semibold uppercase tracking-wider mb-1">{stat.title}</p>
                        <p className="text-2xl font-extrabold text-[#1F2328] tracking-tight">
                            <AnimatedValue value={stat.value} prefix={stat.prefix} />
                        </p>
                        <p className="text-xs text-[#A8B0B8] mt-1">Kasım 2025 — bugün</p>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Chart + Donut Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue vs Expense Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-[#1F2328]">Gelir vs Gider</h3>
                            <p className="text-xs text-[#A8B0B8] mt-0.5">Son 12 ay trendi</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#C1A05E]" />
                                <span className="text-[#A8B0B8] font-medium">Gelir</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                                <span className="text-[#A8B0B8] font-medium">Gider</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={revenueChartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                            <defs>
                                <linearGradient id="finGoldGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#C1A05E" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#C1A05E" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="finRedGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.12} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#A8B0B8", fontSize: 11 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#A8B0B8", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                            <Tooltip
                                contentStyle={{ background: "#1F2328", border: "none", borderRadius: "12px", color: "white", fontSize: "12px" }}
                                labelStyle={{ color: "#A8B0B8" }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                            />
                            <Area type="monotone" dataKey="gelir" stroke="#C1A05E" strokeWidth={2} fill="url(#finGoldGrad)" name="Gelir" />
                            <Area type="monotone" dataKey="gider" stroke="#ef4444" strokeWidth={1.5} fill="url(#finRedGrad)" name="Gider" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Donut Charts */}
                <div className="space-y-5">
                    {/* Income Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <PieChartIcon size={16} className="text-[#C1A05E]" />
                            <h3 className="font-bold text-[#1F2328] text-sm">Gelir Dağılımı</h3>
                        </div>
                        <div className="relative flex justify-center">
                            <ResponsiveContainer width={140} height={140}>
                                <PieChart>
                                    <Pie
                                        data={incomeBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={42}
                                        outerRadius={65}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {incomeBreakdown.map((entry, idx) => (
                                            <Cell key={idx} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ background: "#1F2328", border: "none", borderRadius: "10px", color: "white", fontSize: "11px" }}
                                        formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-lg font-extrabold text-[#1F2328]">${(summary.totalIncome / 1000).toFixed(1)}K</p>
                                    <p className="text-[9px] text-[#A8B0B8] font-semibold">TOPLAM</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1.5 mt-2">
                            {incomeBreakdown.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-[#1F2328]">${(item.value / 1000).toFixed(1)}K</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Expense Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <PieChartIcon size={16} className="text-red-400" />
                            <h3 className="font-bold text-[#1F2328] text-sm">Gider Dağılımı</h3>
                        </div>
                        <div className="relative flex justify-center">
                            <ResponsiveContainer width={140} height={140}>
                                <PieChart>
                                    <Pie
                                        data={expenseBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={42}
                                        outerRadius={65}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {expenseBreakdown.map((entry, idx) => (
                                            <Cell key={idx} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ background: "#1F2328", border: "none", borderRadius: "10px", color: "white", fontSize: "11px" }}
                                        formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-lg font-extrabold text-[#1F2328]">${(summary.totalExpense / 1000).toFixed(1)}K</p>
                                    <p className="text-[9px] text-[#A8B0B8] font-semibold">TOPLAM</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1.5 mt-2">
                            {expenseBreakdown.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-slate-600">{item.name}</span>
                                    </div>
                                    <span className="font-bold text-[#1F2328]">${(item.value / 1000).toFixed(1)}K</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Transactions Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
                <div className="p-5 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-[#C1A05E]" />
                        <h3 className="font-bold text-[#1F2328]">Son İşlemler</h3>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl">
                        {[
                            { key: "all" as const, label: "Tümü" },
                            { key: "income" as const, label: "Gelir" },
                            { key: "expense" as const, label: "Gider" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={cn(
                                    "px-3 py-1.5 text-xs font-bold rounded-lg transition-all",
                                    activeTab === tab.key
                                        ? "bg-white text-[#1F2328] shadow-sm"
                                        : "text-[#A8B0B8] hover:text-slate-600"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {filteredTransactions.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.55 + i * 0.05 }}
                            className="px-5 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer flex items-center gap-3 group"
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                item.type === "income" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-400"
                            )}>
                                {item.type === "income"
                                    ? <ArrowUpRight size={18} />
                                    : <ArrowDownLeft size={18} />
                                }
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1F2328] truncate">{item.desc}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-[#A8B0B8]">{item.date}</span>
                                    <span className={cn(
                                        "text-[9px] font-bold px-1.5 py-0.5 rounded-md",
                                        item.type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                                    )}>
                                        {item.category}
                                    </span>
                                </div>
                            </div>
                            <div className={cn(
                                "font-bold text-sm group-hover:scale-105 transition-transform",
                                item.type === "income" ? "text-emerald-600" : "text-red-500"
                            )}>
                                {item.amount}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="p-4 bg-[#C1A05E]/5 border-t border-[#C1A05E]/10">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-[#A8B0B8] font-medium">Toplam Net Gelir</span>
                        <span className={cn("font-bold", summary.netOperatingIncome >= 0 ? "text-[#C1A05E]" : "text-red-500")}>
                            {summary.netOperatingIncome >= 0 ? "+" : "-"}${Math.abs(summary.netOperatingIncome).toLocaleString()}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
