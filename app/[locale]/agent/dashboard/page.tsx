"use client"

import { useState, useEffect, useRef } from "react"
import { AgentTierProgress } from "@/components/agent-portal/tier-progress"
import {
    Users,
    DollarSign,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    Search,
    Bell,
    Sparkles,
    Zap,
    Target,
    ChevronRight,
    CalendarDays,
    UserPlus,
    Eye,
    FileCheck,
    HandCoins,
    CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

// Animated counter component
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

// Mini sparkline component
function Sparkline({ data, color = "#C1A05E", height = 32, width = 80 }: { data: number[]; color?: string; height?: number; width?: number }) {
    const chartData = data.map((v, i) => ({ v, i }))
    const gradientId = `agent-spark-${color.replace("#", "")}-${Math.random().toString(36).slice(2, 6)}`
    return (
        <ResponsiveContainer width={width} height={height}>
            <AreaChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#${gradientId})`} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

// Monthly earnings chart data
const earningsData = [
    { month: "Oca", komisyon: 4500, pasif: 800 },
    { month: "Şub", komisyon: 6000, pasif: 850 },
    { month: "Mar", komisyon: 3000, pasif: 900 },
    { month: "Nis", komisyon: 7500, pasif: 950 },
    { month: "May", komisyon: 4500, pasif: 1000 },
    { month: "Haz", komisyon: 9000, pasif: 1050 },
    { month: "Tem", komisyon: 6000, pasif: 1100 },
    { month: "Ağu", komisyon: 7500, pasif: 1150 },
    { month: "Eyl", komisyon: 10500, pasif: 1200 },
    { month: "Eki", komisyon: 9000, pasif: 1300 },
    { month: "Kas", komisyon: 12000, pasif: 1350 },
    { month: "Ara", komisyon: 10500, pasif: 1458 },
]

// Referral pipeline stages
const pipelineStages = [
    { label: "İletişim", count: 12, icon: UserPlus, color: "#A8B0B8" },
    { label: "Görüşme", count: 8, icon: Eye, color: "#1F2328" },
    { label: "Due Diligence", count: 5, icon: FileCheck, color: "#C1A05E" },
    { label: "Kapanış", count: 3, icon: HandCoins, color: "#C1A05E" },
    { label: "Tamamlandı", count: 54, icon: CheckCircle2, color: "#22c55e" },
]

export default function AgentDashboard() {
    const isAuthed = useAuthGuard("AGENT")
    const [agentName, setAgentName] = useState("Agent")
    const [agentInitials, setAgentInitials] = useState("PA")

    useEffect(() => {
        const stored = localStorage.getItem("pasiflow_user")
        if (stored) {
            try {
                const user = JSON.parse(stored)
                if (user.fullName) {
                    setAgentName(user.fullName.split(" ")[0])
                    setAgentInitials(
                        user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                    )
                }
            } catch { /* ignore */ }
        }
    }, [])

    if (!isAuthed) return null

    const stats = [
        { title: "Toplam Referans", value: 54, icon: Users, trend: "+12%", trendUp: true, spark: [30, 34, 38, 40, 44, 48, 54] },
        { title: "Toplam Kazanç", value: 108000, prefix: "$", icon: DollarSign, spark: [45000, 55000, 65000, 75000, 85000, 95000, 108000] },
        { title: "Aylık Pasif Gelir", value: 1458, prefix: "$", icon: TrendingUp, trend: "+$210", trendUp: true, subtitle: "Canlı (Mgmt %)", spark: [800, 900, 1000, 1050, 1200, 1350, 1458] },
        { title: "Yıllık Pasif Gelir", value: 17496, prefix: "$", icon: Calendar, subtitle: "Projeksiyon", spark: [9600, 10800, 12000, 13200, 15600, 16200, 17496] },
    ]

    const referrals = [
        { name: "Mustafa Kılıç", properties: 3, status: "Aktif", income: "$40.50/ay", date: "12 Oca 2025" },
        { name: "Selin Yılmaz", properties: 1, status: "Kapanışta", income: "$13.50/ay", date: "3 Şub 2025" },
        { name: "Ahmet Bakır", properties: 5, status: "Aktif", income: "$67.50/ay", date: "28 Ara 2024" },
        { name: "Deniz Toprak", properties: 2, status: "Görüşmede", income: "-", date: "8 Şub 2025" },
        { name: "Elif Şahin", properties: 4, status: "Aktif", income: "$54.00/ay", date: "15 Kas 2024" },
    ]

    // Monthly goal
    const monthlyGoal = 8
    const monthlyActual = 6
    const goalPercent = Math.round((monthlyActual / monthlyGoal) * 100)

    return (
        <>
            {/* Top Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-30"
            >
                <div className="flex items-center gap-4 flex-grow max-w-xl">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Referans ara..."
                            className="pl-10 h-10 bg-slate-50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#C1A05E]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        <motion.span
                            className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.button>
                    <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-900">{agentName}</p>
                            <p className="text-xs text-[#C1A05E] font-bold">Elite Agent</p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 rounded-full bg-[#1F2328] flex items-center justify-center text-white font-bold relative"
                        >
                            {agentInitials}
                            <motion.span
                                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#C1A05E] border-2 border-white rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            <div className="p-6 md:p-10 space-y-8">
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
                                Hoş Geldiniz, <span className="text-[#C1A05E]">{agentName}</span>
                            </h1>
                            <p className="text-[#A8B0B8] mt-2 font-medium flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#C1A05E]" />
                                Bu ayki performansınız harika gidiyor. İşte özet verileriniz.
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <Button variant="outline" className="border-slate-200 text-slate-600 hover:text-[#C1A05E] hover:border-[#C1A05E]/30 rounded-xl">
                                <Target size={15} className="mr-2" />
                                Hedeflerim
                            </Button>
                            <Button className="bg-[#1F2328] text-white hover:bg-[#C1A05E] rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Yeni Referans Ekle
                            </Button>
                        </motion.div>
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
                                <AnimatedValue value={stat.value} prefix={stat.prefix || ""} />
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

                {/* Main Content Grid: Earnings Chart + Pipeline */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Earnings Chart - 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-[#1F2328]">Kazanç Grafiği</h3>
                                <p className="text-xs text-[#A8B0B8] mt-0.5">Son 12 ay — komisyon + pasif gelir</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#C1A05E]" />
                                    <span className="text-[#A8B0B8] font-medium">Komisyon</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#1F2328]" />
                                    <span className="text-[#A8B0B8] font-medium">Pasif Gelir</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={earningsData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                                <defs>
                                    <linearGradient id="agentGoldGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#C1A05E" stopOpacity={0.2} />
                                        <stop offset="100%" stopColor="#C1A05E" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="agentCharcoalGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#1F2328" stopOpacity={0.15} />
                                        <stop offset="100%" stopColor="#1F2328" stopOpacity={0} />
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
                                <Area type="monotone" dataKey="komisyon" stroke="#C1A05E" strokeWidth={2} fill="url(#agentGoldGrad)" name="Komisyon" />
                                <Area type="monotone" dataKey="pasif" stroke="#1F2328" strokeWidth={1.5} fill="url(#agentCharcoalGrad)" name="Pasif Gelir" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Monthly Goal + Quick Tip */}
                    <div className="space-y-5">
                        {/* Monthly Goal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                        >
                            <div className="flex items-center gap-2 mb-5">
                                <Target size={18} className="text-[#C1A05E]" />
                                <h3 className="text-lg font-bold text-[#1F2328]">Aylık Hedef</h3>
                            </div>

                            <div className="relative flex justify-center mb-4">
                                <svg width="160" height="160" viewBox="0 0 160 160">
                                    <circle cx="80" cy="80" r="65" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                                    <motion.circle
                                        cx="80" cy="80" r="65"
                                        fill="none"
                                        stroke="#C1A05E"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray={`${2 * Math.PI * 65}`}
                                        strokeDashoffset={`${2 * Math.PI * 65 * (1 - goalPercent / 100)}`}
                                        transform="rotate(-90 80 80)"
                                        initial={{ strokeDashoffset: 2 * Math.PI * 65 }}
                                        animate={{ strokeDashoffset: 2 * Math.PI * 65 * (1 - goalPercent / 100) }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-3xl font-extrabold text-[#1F2328]">{monthlyActual}</p>
                                        <p className="text-xs text-[#A8B0B8] font-semibold">/ {monthlyGoal} satış</p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-[#A8B0B8] font-medium">
                                    {monthlyGoal - monthlyActual} satış daha hedefe ulaşırsınız
                                </p>
                                <p className="text-xs font-bold text-[#C1A05E] mt-1">{goalPercent}% tamamlandı</p>
                            </div>
                        </motion.div>

                        {/* Quick Tip Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
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
                                        <Sparkles size={16} className="text-[#C1A05E]" />
                                    </div>
                                    <div className="px-2 py-0.5 bg-[#C1A05E]/20 rounded-md text-[#C1A05E] text-[10px] font-bold uppercase tracking-wider">İpucu</div>
                                </div>
                                <h3 className="text-sm font-bold mb-1">Satışlarınızı Artırın</h3>
                                <p className="text-slate-400 text-xs mb-4">100 satışa ulaştığınızda %3 pasif gelir oranına hak kazanacaksınız.</p>
                                <Button size="sm" className="w-full bg-[#C1A05E] hover:bg-[#a38d5d] text-white text-xs font-bold rounded-xl h-9">
                                    Akademiye Göz At <ChevronRight size={14} className="ml-1" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Referral Pipeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <Users size={18} className="text-[#C1A05E]" />
                        <h3 className="text-lg font-bold text-[#1F2328]">Referans Pipeline</h3>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch gap-2">
                        {pipelineStages.map((stage, i) => (
                            <motion.div
                                key={stage.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.08 }}
                                whileHover={{ y: -3, scale: 1.02 }}
                                className="flex-1 relative bg-slate-50 rounded-xl p-4 text-center border border-slate-100 hover:border-[#C1A05E]/30 hover:shadow-md transition-all group"
                            >
                                <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                                    style={{ backgroundColor: `${stage.color}15` }}
                                >
                                    <stage.icon size={18} style={{ color: stage.color }} />
                                </div>
                                <p className="text-2xl font-extrabold text-[#1F2328]">{stage.count}</p>
                                <p className="text-[10px] text-[#A8B0B8] font-semibold uppercase tracking-wider mt-0.5">{stage.label}</p>

                                {/* Arrow connector (hidden on last item and on small screens) */}
                                {i < pipelineStages.length - 1 && (
                                    <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                                        <ChevronRight size={16} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Section: Tier Progress + Recent Referrals */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Tier Progress */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <AgentTierProgress currentSales={54} />
                    </motion.div>

                    {/* Recent Referrals Table */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div className="p-5 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-[#C1A05E]" />
                                <h3 className="font-bold text-[#1F2328]">Son Referanslar</h3>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[#A8B0B8] text-xs font-bold hover:text-[#C1A05E]">
                                Tümünü Gör <ArrowUpRight size={12} className="ml-1" />
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-[#A8B0B8] text-[10px] font-bold uppercase tracking-widest">
                                        <th className="py-3 px-5">Yatırımcı</th>
                                        <th className="py-3 px-5">Mülk</th>
                                        <th className="py-3 px-5">Durum</th>
                                        <th className="py-3 px-5">Pasif Gelir</th>
                                        <th className="py-3 px-5 hidden md:table-cell">Tarih</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {referrals.map((ref, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.55 + i * 0.06 }}
                                            className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                                        >
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C1A05E]/20 to-[#C1A05E]/10 flex items-center justify-center text-[#C1A05E] font-bold text-xs flex-shrink-0">
                                                        {ref.name.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    <span className="font-semibold text-sm text-slate-900 group-hover:text-[#C1A05E] transition-colors">{ref.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-5 text-sm text-slate-600">
                                                {ref.properties} Mülk
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className={cn(
                                                    "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1",
                                                    ref.status === "Aktif" && "bg-emerald-50 text-emerald-600",
                                                    ref.status === "Kapanışta" && "bg-blue-50 text-blue-600",
                                                    ref.status === "Görüşmede" && "bg-amber-50 text-amber-600"
                                                )}>
                                                    <span className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        ref.status === "Aktif" && "bg-emerald-500",
                                                        ref.status === "Kapanışta" && "bg-blue-500",
                                                        ref.status === "Görüşmede" && "bg-amber-500"
                                                    )} />
                                                    {ref.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5 font-bold text-sm text-[#1F2328] tracking-tight group-hover:text-[#C1A05E] transition-colors">
                                                {ref.income}
                                            </td>
                                            <td className="py-4 px-5 text-xs text-[#A8B0B8] hidden md:table-cell">
                                                {ref.date}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 bg-[#C1A05E]/5 border-t border-[#C1A05E]/10">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#A8B0B8] font-medium">Toplam Aylık Pasif Gelir</span>
                                <span className="font-bold text-[#C1A05E]">$175.50/ay</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
