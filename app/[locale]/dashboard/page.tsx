"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Building2,
    Wallet,
    DollarSign,
    FileText,
    TrendingUp,
    ArrowUpRight,
    Sparkles,
    Zap,
    Check,
    Clock,
    AlertCircle,
    Download,
    ChevronRight,
    Shield,
    Target,
    CalendarDays,
    Loader2,
} from "lucide-react"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import { useRef } from "react"
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

// Animated counter component
function AnimatedValue({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const motionValue = useMotionValue(0)
    const spring = useSpring(motionValue, { stiffness: 50, damping: 20 })
    const [display, setDisplay] = useState("0")

    useEffect(() => {
        if (isInView) motionValue.set(value)
    }, [isInView, value, motionValue])

    useEffect(() => {
        const unsubscribe = spring.on("change", (v) => {
            setDisplay(Math.round(v).toLocaleString())
        })
        return unsubscribe
    }, [spring])

    return <span ref={ref}>{prefix}{display}{suffix}</span>
}

// Mini sparkline component
function Sparkline({ data, color = "#C1A05E", height = 32, width = 80 }: { data: number[]; color?: string; height?: number; width?: number }) {
    const chartData = data.map((v, i) => ({ v, i }))
    return (
        <ResponsiveContainer width={width} height={height}>
            <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                <defs>
                    <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#spark-${color.replace("#", "")})`} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

// Property shape returned by /api/properties (matches API route)
type ApiProperty = {
    id: string
    address: string
    city: string
    state: string
    zipCode: string
    purchasePrice: number
    monthlyRent: number
    status: string
    roi: string
    annualReturn: number
}

// Payment shape returned by /api/mobile/payments
type ApiPayment = {
    id: string
    property: string
    amount: number
    date: string
    status: string
    tenant: string | null
    period: string
}

// Investment process steps (Pasiflow founded Nov 2025; today ~Mayıs 2026)
const processSteps = [
    { title: "Mülk Seçimi", status: "completed" as const, date: "12 Kas 2025" },
    { title: "Due Diligence", status: "completed" as const, date: "28 Kas 2025" },
    { title: "LLC Kurulumu", status: "active" as const, date: "Devam ediyor" },
    { title: "Kapanış", status: "pending" as const },
    { title: "Kiracı Yerleştirme", status: "pending" as const },
]

const PIE_COLORS = ["#C1A05E", "#1F2328", "#A8B0B8", "#7C8995", "#54616C"]

export default function DashboardPage() {
    const [userName, setUserName] = useState("Investor")
    const [properties, setProperties] = useState<ApiProperty[]>([])
    const [payments, setPayments] = useState<ApiPayment[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem("pasiflow_user")
        if (stored) {
            try {
                const user = JSON.parse(stored)
                if (user.fullName) setUserName(user.fullName)
            } catch { /* ignore */ }
        }

        const token = typeof window !== "undefined" ? localStorage.getItem("pasiflow_token") : null
        if (!token) { setLoading(false); return }
        const headers = { Authorization: `Bearer ${token}` }

        Promise.all([
            fetch("/api/properties", { headers }).then((r) => (r.ok ? r.json() as Promise<{ properties: ApiProperty[] }> : { properties: [] })),
            fetch("/api/mobile/payments", { headers }).then((r) => (r.ok ? r.json() as Promise<ApiPayment[]> : [])),
        ])
            .then(([propRes, payRes]) => {
                setProperties(propRes.properties ?? [])
                setPayments(Array.isArray(payRes) ? payRes : [])
            })
            .catch(() => { setProperties([]); setPayments([]) })
            .finally(() => setLoading(false))
    }, [])

    // Derived numbers from real DB data
    const totalValue = properties.reduce((s, p) => s + p.purchasePrice, 0)
    const totalMonthlyRent = properties.reduce((s, p) => s + p.monthlyRent, 0)
    const totalAnnualReturn = properties.reduce((s, p) => s + p.annualReturn, 0)
    const avgRoi = properties.length
        ? (properties.reduce((s, p) => s + parseFloat(p.roi || "0"), 0) / properties.length).toFixed(1)
        : "0.0"

    // Portfolio donut: group by ZIP code, show top buckets
    const zipMap = new Map<string, number>()
    for (const p of properties) {
        const key = `${p.city} ${p.zipCode}`
        zipMap.set(key, (zipMap.get(key) ?? 0) + p.purchasePrice)
    }
    const portfolioData = Array.from(zipMap.entries())
        .map(([name, value], i) => ({ name, value, color: PIE_COLORS[i % PIE_COLORS.length] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)

    // Sparkline approximations from real totals (cumulative growth pattern, last point = current)
    const spark = (target: number) => {
        if (target === 0) return [0, 0, 0, 0, 0, 0, 0]
        return [0.72, 0.78, 0.83, 0.88, 0.92, 0.96, 1].map((m) => Math.round(target * m))
    }

    const stats = [
        { title: "Toplam Portföy", value: totalValue, prefix: "$", icon: Building2, trend: properties.length ? `${properties.length} mülk` : "—", trendUp: true, spark: spark(totalValue) },
        { title: "Aylık Kira Geliri", value: totalMonthlyRent, prefix: "$", icon: Wallet, subtitle: `Yıllık: $${totalAnnualReturn.toLocaleString()}`, spark: spark(totalMonthlyRent) },
        { title: "Ortalama ROI", value: parseFloat(avgRoi), suffix: "%", icon: DollarSign, subtitle: `${properties.length} mülk üzerinden`, spark: spark(parseFloat(avgRoi)) },
        { title: "Aktif Mülkler", value: properties.length, icon: FileText, subtitle: "Tümü kiralı" },
    ]

    // 7-month income/expense series anchored to current monthlyRent (Pasiflow founded Nov 2025)
    const monthLabels = ["Kas", "Ara", "Oca", "Şub", "Mar", "Nis", "May"]
    const revenueData = monthLabels.map((m, i) => ({
        month: m,
        gelir: Math.round(totalMonthlyRent * (0.5 + 0.08 * i)),
        gider: Math.round(totalMonthlyRent * (0.1 + 0.02 * i)),
    }))

    // Recent transactions from /api/mobile/payments (latest first, top 5)
    const fmtDate = (iso: string) => {
        const d = new Date(iso)
        if (Number.isNaN(d.getTime())) return iso
        return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short" })
    }
    const transactions = payments.slice(0, 5).map((p) => ({
        title: "Kira Ödemesi",
        desc: `Detroit - ${p.property}`,
        amount: `+$${p.amount.toLocaleString()}`,
        date: fmtDate(p.date),
        type: "income" as const,
    }))

    // "Bu Ay Net" = sum of this calendar month's paid rent
    const now = new Date()
    const monthNet = payments.reduce((sum, p) => {
        const d = new Date(p.date)
        return d.getUTCFullYear() === now.getUTCFullYear() && d.getUTCMonth() === now.getUTCMonth() && p.status === "paid"
            ? sum + p.amount
            : sum
    }, 0)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-[#C1A05E] animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-8 p-6 md:p-8">
            {/* Welcome Hero */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#1F2328]/5 rounded-full blur-3xl" />

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <CalendarDays size={14} className="text-[#A8B0B8]" />
                            <span className="text-xs text-[#A8B0B8] font-medium">
                                {new Date().toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight">
                            Hoş Geldiniz, <span className="text-[#C1A05E]">{userName}</span>
                        </h1>
                        <p className="text-[#A8B0B8] mt-2 font-medium">
                            Portföy durumunuz ve güncel piyasa verileri aşağıda özetlenmiştir.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-slate-200 text-slate-600 hover:text-[#C1A05E] hover:border-[#C1A05E]/30 rounded-xl">
                            <Download size={15} className="mr-2" />
                            Rapor İndir
                        </Button>
                        <Button className="bg-[#1F2328] text-white hover:bg-[#C1A05E] rounded-xl shadow-lg transition-all duration-300">
                            Yeni Mülk İncele
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        whileHover={{ y: -4 }}
                        className="relative bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:border-[#C1A05E]/20 transition-all duration-300 overflow-hidden group"
                    >
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#C1A05E]/5 rounded-full blur-2xl group-hover:bg-[#C1A05E]/10 transition-colors" />

                        <div className="flex items-start justify-between mb-3 relative">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C1A05E]/10 to-[#C1A05E]/20 flex items-center justify-center">
                                <stat.icon size={20} className="text-[#C1A05E]" />
                            </div>
                            {stat.trend && (
                                <span className={cn(
                                    "text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-0.5",
                                    stat.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                                )}>
                                    <TrendingUp size={11} />
                                    {stat.trend}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-[#A8B0B8] font-semibold uppercase tracking-wider mb-1">{stat.title}</p>
                        <p className="text-2xl font-extrabold text-[#1F2328] tracking-tight">
                            <AnimatedValue value={stat.value} prefix={stat.prefix || ""} suffix={(stat as { suffix?: string }).suffix || ""} />
                        </p>
                        {stat.subtitle && <p className="text-xs text-[#A8B0B8] mt-1">{stat.subtitle}</p>}
                        {stat.spark && (
                            <div className="mt-3 -mx-1">
                                <Sparkline data={stat.spark} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue Chart - 2 columns */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-[#1F2328]">Gelir & Gider</h3>
                            <p className="text-xs text-[#A8B0B8] mt-0.5">Son 12 ay</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#C1A05E]" />
                                <span className="text-[#A8B0B8] font-medium">Gelir</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#A8B0B8]" />
                                <span className="text-[#A8B0B8] font-medium">Gider</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                            <defs>
                                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#C1A05E" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#C1A05E" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#A8B0B8" stopOpacity={0.15} />
                                    <stop offset="100%" stopColor="#A8B0B8" stopOpacity={0} />
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
                            <Area type="monotone" dataKey="gelir" stroke="#C1A05E" strokeWidth={2} fill="url(#goldGrad)" name="Gelir" />
                            <Area type="monotone" dataKey="gider" stroke="#A8B0B8" strokeWidth={1.5} fill="url(#silverGrad)" name="Gider" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Portfolio Allocation Donut */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                >
                    <h3 className="text-lg font-bold text-[#1F2328] mb-2">Portföy Dağılımı</h3>
                    <p className="text-xs text-[#A8B0B8] mb-4">Şehre göre yatırım</p>

                    <div className="relative flex justify-center">
                        <ResponsiveContainer width={200} height={200}>
                            <PieChart>
                                <Pie
                                    data={portfolioData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                    strokeWidth={0}
                                >
                                    {portfolioData.map((entry, idx) => (
                                        <Cell key={idx} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: "#1F2328", border: "none", borderRadius: "12px", color: "white", fontSize: "12px" }}
                                    formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-2xl font-extrabold text-[#1F2328]">{properties.length}</p>
                                <p className="text-[10px] text-[#A8B0B8] font-semibold uppercase tracking-wider">Mülk</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mt-4">
                        {portfolioData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-slate-600 font-medium">{item.name}</span>
                                </div>
                                <span className="font-bold text-[#1F2328]">${(item.value / 1000).toFixed(0)}K</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Investment Process Tracker */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Target size={18} className="text-[#C1A05E]" />
                        <h3 className="text-lg font-bold text-[#1F2328]">Yatırım Süreci</h3>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#C1A05E] via-[#C1A05E]/40 to-slate-200" />

                        <div className="space-y-5">
                            {processSteps.map((step, i) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.08 }}
                                    className="flex items-start gap-4 relative"
                                >
                                    <div className={cn(
                                        "w-[31px] h-[31px] rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2",
                                        step.status === "completed" && "bg-[#C1A05E] border-[#C1A05E] text-white",
                                        step.status === "active" && "bg-white border-[#C1A05E] text-[#C1A05E]",
                                        step.status === "pending" && "bg-white border-slate-200 text-slate-300",
                                    )}>
                                        {step.status === "completed" ? (
                                            <Check size={14} strokeWidth={3} />
                                        ) : step.status === "active" ? (
                                            <motion.div
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-2.5 h-2.5 rounded-full bg-[#C1A05E]"
                                            />
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-slate-200" />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-1">
                                        <p className={cn(
                                            "text-sm font-semibold",
                                            step.status === "completed" ? "text-[#1F2328]" : step.status === "active" ? "text-[#C1A05E]" : "text-slate-400"
                                        )}>{step.title}</p>
                                        {step.date && (
                                            <p className="text-[11px] text-[#A8B0B8] mt-0.5">{step.date}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Rental Status + Opportunity */}
                <div className="space-y-5">
                    {/* Rental Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#1F2328]">Kira Durumu</h3>
                            <Sparkles size={14} className="text-[#C1A05E]" />
                        </div>
                        {[
                            { label: "Ödendi", count: properties.length, total: Math.max(properties.length, 1), color: "emerald", icon: Check },
                            { label: "Bekleniyor", count: 0, total: Math.max(properties.length, 1), color: "amber", icon: Clock },
                            { label: "Gecikmiş", count: 0, total: Math.max(properties.length, 1), color: "red", icon: AlertCircle },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.55 + i * 0.08 }}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl mb-2 last:mb-0 border transition-all",
                                    item.color === "emerald" && "bg-emerald-50/50 border-emerald-100",
                                    item.color === "amber" && "bg-amber-50/50 border-amber-100",
                                    item.color === "red" && "bg-red-50/50 border-red-100",
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center",
                                    item.color === "emerald" && "bg-emerald-100 text-emerald-600",
                                    item.color === "amber" && "bg-amber-100 text-amber-600",
                                    item.color === "red" && "bg-red-100 text-red-600",
                                )}>
                                    <item.icon size={14} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                                        <span className="text-sm font-bold text-[#1F2328]">{item.count} Mülk</span>
                                    </div>
                                    <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.count / item.total) * 100}%` }}
                                            transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                            className={cn(
                                                "h-full rounded-full",
                                                item.color === "emerald" && "bg-emerald-500",
                                                item.color === "amber" && "bg-amber-500",
                                                item.color === "red" && "bg-red-500",
                                            )}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Opportunity Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ y: -3 }}
                        className="relative overflow-hidden bg-[#1F2328] p-5 rounded-2xl text-white cursor-pointer group"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#C1A05E]/15 to-transparent"
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#C1A05E]/10 rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-9 h-9 bg-[#C1A05E]/20 rounded-xl flex items-center justify-center">
                                    <Zap size={16} className="text-[#C1A05E]" />
                                </div>
                                <div className="px-2 py-0.5 bg-[#C1A05E]/20 rounded-md text-[#C1A05E] text-[10px] font-bold uppercase tracking-wider">Yeni</div>
                            </div>
                            <h3 className="text-sm font-bold mb-1">Yeni Fırsat!</h3>
                            <p className="text-slate-400 text-xs mb-4">Detroit'te %16 net ROI getiren off-market portföy.</p>
                            <Button size="sm" className="w-full bg-[#C1A05E] hover:bg-[#a38d5d] text-white text-xs font-bold rounded-xl h-9">
                                İncele <ChevronRight size={14} className="ml-1" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="font-bold text-[#1F2328]">Son Aktiviteler</h3>
                        <Button variant="ghost" size="sm" className="text-[#A8B0B8] text-xs font-bold hover:text-[#C1A05E]">
                            Tümü <ArrowUpRight size={12} className="ml-1" />
                        </Button>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {transactions.length === 0 ? (
                            <p className="px-5 py-6 text-sm text-[#A8B0B8] text-center">Henüz ödeme kaydı yok.</p>
                        ) : (
                            transactions.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.55 + i * 0.06 }}
                                    className="px-5 py-3.5 hover:bg-slate-50/50 transition-colors cursor-pointer flex items-center gap-3"
                                >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-emerald-50 text-emerald-500">
                                        <TrendingUp size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#1F2328] truncate">{item.title}</p>
                                        <p className="text-[11px] text-[#A8B0B8] truncate">{item.desc}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-emerald-600">{item.amount}</p>
                                        <p className="text-[10px] text-[#A8B0B8]">{item.date}</p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <div className="p-4 bg-[#C1A05E]/5 border-t border-[#C1A05E]/10">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#A8B0B8] font-medium">Bu Ay Net</span>
                            <span className="font-bold text-[#C1A05E]">+${monthNet.toLocaleString()}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Trust Badges */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center justify-center gap-4"
            >
                {[
                    { icon: Shield, label: "Section 8 Garantili", active: true },
                    { icon: Building2, label: "3 Mülk Sahibi", active: true },
                    { icon: Target, label: "Portföy $500K", active: false, progress: "85%" },
                ].map((badge, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -2, scale: 1.02 }}
                        className={cn(
                            "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all",
                            badge.active
                                ? "bg-[#C1A05E]/5 border-[#C1A05E]/20 text-[#C1A05E]"
                                : "bg-slate-50 border-slate-200 text-slate-400"
                        )}
                    >
                        <badge.icon size={16} />
                        <span className="text-xs font-bold">{badge.label}</span>
                        {badge.progress && (
                            <span className="text-[10px] font-bold bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-md">{badge.progress}</span>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
