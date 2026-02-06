"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, Calendar, DollarSign, CheckCircle, Info, Wallet, Sparkles, Target, ChartLine, Shield, ArrowUpRight, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Helper functions
function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n))
}

function roundToStep(value: number, step: number) {
    return Math.round(value / step) * step
}

// Currency formatter
const USD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
})

// Calculator texts config
type CalculatorTexts = {
    badge: string
    title: string
    descriptionLines: string[]
    year6Title: string
    year6Bullets: string[]
    growthTitle: string
    returnLine: string
    disclaimer: string
    labels: {
        investment: string
        monthlyIncome: string
        yearlyIncome: string
        investmentRangeHint: string
        monthlyExampleHint: string
        annualReturnLabel: string
        formulaLabel: string
        capitalRecovery: string
        totalReturn6Y: string
        projectedValue: string
        perMonth: string
        perYear: string
        years: string
        yearlyAppreciation: string
    }
}

const TR_TEXTS: CalculatorTexts = {
    badge: "Yatırım Hesaplayıcı",
    title: "$30.000 başlangıç sermayesi",
    descriptionLines: [
        "Öngörülebilir gelir modeli.",
        "Ortalama 6 yılda sermaye geri dönüşü hedefi."
    ],
    year6Title: "6. yılın sonunda:",
    year6Bullets: [
        "Başlangıç sermayesi geri alınır",
        "Pozitif kazanç başlar",
        "Kira ve değer artışı ek kazanç sağlar",
    ],
    growthTitle: "Yatırım büyüdükçe aylık gelir de büyür",
    returnLine: "Ortalama %15 getiri | Hedef aralık: %12 – %20",
    disclaimer: "Bu değerler hedef ve projeksiyondur. Piyasa koşullarına göre değişiklik gösterebilir.",
    labels: {
        investment: "Toplam Yatırım",
        monthlyIncome: "Aylık Gelir",
        yearlyIncome: "Yıllık Gelir",
        investmentRangeHint: "$30K → $5M",
        monthlyExampleHint: "$30,000 → $375/ay",
        annualReturnLabel: "Yıllık getiri",
        formulaLabel: "Formül",
        capitalRecovery: "Sermaye Geri Dönüşü",
        totalReturn6Y: "6 Yıllık Toplam Kazanç",
        projectedValue: "Tahmini Portföy Değeri",
        perMonth: "/ay",
        perYear: "/yıl",
        years: "yıl",
        yearlyAppreciation: "+3.5% yıllık değer artışı",
    },
}

const EN_TEXTS: CalculatorTexts = {
    badge: "Investment Calculator",
    title: "$30,000 starting capital",
    descriptionLines: [
        "Predictable income model.",
        "Target capital recovery in approximately 6 years."
    ],
    year6Title: "At the end of year 6:",
    year6Bullets: [
        "Initial capital is recovered",
        "Positive earnings begin",
        "Rent and appreciation provide additional income",
    ],
    growthTitle: "As investment grows, monthly income grows too",
    returnLine: "Average 15% return | Target range: 12% – 20%",
    disclaimer: "These values are targets and projections. They may vary based on market conditions.",
    labels: {
        investment: "Total Investment",
        monthlyIncome: "Monthly Income",
        yearlyIncome: "Yearly Income",
        investmentRangeHint: "$30K → $5M",
        monthlyExampleHint: "$30,000 → $375/mo",
        annualReturnLabel: "Annual return",
        formulaLabel: "Formula",
        capitalRecovery: "Capital Recovery",
        totalReturn6Y: "6-Year Total Return",
        projectedValue: "Projected Portfolio Value",
        perMonth: "/mo",
        perYear: "/yr",
        years: "years",
        yearlyAppreciation: "+3.5% yearly appreciation",
    },
}

type Props = {
    texts?: CalculatorTexts
    minInvestment?: number
    maxInvestment?: number
    step?: number
    annualReturn?: number
    defaultInvestment?: number
    locale?: string
}

export function InvestmentCalculator({
    texts,
    minInvestment = 30_000,
    maxInvestment = 5_000_000,
    step = 5_000,
    annualReturn = 0.15,
    defaultInvestment = 30_000,
    locale = "tr",
}: Props) {
    const t = texts || (locale === "en" ? EN_TEXTS : TR_TEXTS)

    const [investment, setInvestment] = React.useState<number>(() =>
        clamp(roundToStep(defaultInvestment, step), minInvestment, maxInvestment)
    )
    const [hoveredBar, setHoveredBar] = React.useState<number | null>(null)

    // All calculations
    const calculations = React.useMemo(() => {
        const monthlyIncome = Math.round((investment * annualReturn) / 12)
        const yearlyIncome = Math.round(investment * annualReturn)
        const capitalRecoveryYears = 6
        const totalReturn6Y = yearlyIncome * 6
        const appreciationRate = 0.035
        const projectedValue6Y = Math.round(investment * Math.pow(1 + appreciationRate, 6))
        const progressToMax = ((investment - minInvestment) / (maxInvestment - minInvestment)) * 100

        return {
            monthlyIncome,
            yearlyIncome,
            capitalRecoveryYears,
            totalReturn6Y,
            projectedValue6Y,
            progressToMax
        }
    }, [investment, annualReturn, minInvestment, maxInvestment])

    const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = Number(e.target.value)
        const next = clamp(roundToStep(raw, step), minInvestment, maxInvestment)
        setInvestment(next)
    }

    // Year projection data for chart
    const yearData = React.useMemo(() => {
        const appreciationRate = 0.035
        return [1, 2, 3, 4, 5, 6].map(year => ({
            year,
            income: calculations.yearlyIncome,
            cumulative: calculations.yearlyIncome * year,
            portfolioValue: Math.round(investment * Math.pow(1 + appreciationRate, year)),
            monthlyAtYear: Math.round((investment * Math.pow(1 + appreciationRate, year) * annualReturn) / 12),
        }))
    }, [calculations.yearlyIncome, investment, annualReturn])

    const maxCumulative = calculations.yearlyIncome * 6

    return (
        <section id="calculator" className="py-20 md:py-32 bg-gradient-to-b from-[#0A0B0D] via-[#0F1012] to-[#0A0B0D] relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#B8A074]/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#B8A074]/5 rounded-full blur-[100px]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8A074]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8A074]/30 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-sm font-bold uppercase tracking-widest mb-6 border border-[#B8A074]/20 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4" />
                        {t.badge}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
                    >
                        {t.growthTitle.split(" ").slice(0, 3).join(" ")}
                        <br />
                        <span className="bg-gradient-to-r from-[#B8A074] to-[#D4C4A0] bg-clip-text text-transparent">
                            {t.growthTitle.split(" ").slice(3).join(" ")}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto"
                    >
                        {t.returnLine}
                    </motion.p>
                </div>

                {/* Main Calculator Grid */}
                <div className="grid lg:grid-cols-5 gap-6 max-w-7xl mx-auto">

                    {/* Left Side - Investment Control (2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Investment Slider Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-6 md:p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B8A074] to-[#8B7355] flex items-center justify-center shadow-lg shadow-[#B8A074]/20"
                                    >
                                        <Wallet className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <p className="text-white/50 text-sm font-medium">{t.labels.investment}</p>
                                        <motion.p
                                            key={investment}
                                            initial={{ scale: 1.05 }}
                                            animate={{ scale: 1 }}
                                            className="text-3xl md:text-4xl font-bold text-white"
                                        >
                                            {USD.format(investment)}
                                        </motion.p>
                                    </div>
                                </div>

                                {/* Premium Slider */}
                                <div className="relative py-4">
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-white/10 rounded-full" />
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-[#B8A074] to-[#D4C4A0] rounded-full"
                                        style={{ width: `${calculations.progressToMax}%` }}
                                        layout
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                    {/* Glow effect on slider track */}
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2 h-6 bg-[#B8A074]/20 rounded-full blur-sm"
                                        style={{ width: `${calculations.progressToMax}%` }}
                                    />
                                    <input
                                        type="range"
                                        min={minInvestment}
                                        max={maxInvestment}
                                        step={step}
                                        value={investment}
                                        onChange={onSliderChange}
                                        className="relative w-full h-8 appearance-none bg-transparent cursor-pointer z-10"
                                        style={{ WebkitAppearance: 'none' }}
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-white/40 mt-2">
                                    <span>{USD.format(minInvestment)}</span>
                                    <span className="text-[#B8A074] font-medium">{t.labels.investmentRangeHint}</span>
                                    <span>{USD.format(maxInvestment)}</span>
                                </div>
                            </Card>
                        </motion.div>

                        {/* 6th Year Callout */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card className="p-6 bg-[#0F1012] backdrop-blur-xl border border-[#B8A074]/30 rounded-3xl relative overflow-hidden">
                                {/* Decorative glow */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#B8A074]/10 rounded-full blur-3xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Calendar className="w-5 h-5 text-[#B8A074]" />
                                        <span className="font-bold text-white">{t.year6Title}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {t.year6Bullets.map((bullet, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + i * 0.1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.2 }}
                                                    className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 border border-green-500/30"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                                                </motion.div>
                                                <span className="text-sm text-white/80">{bullet}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Side - Results (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Main Income Display */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Monthly Income - Hero Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                            >
                                <Card className="p-5 md:p-6 bg-gradient-to-br from-[#B8A074] to-[#8B7355] rounded-2xl relative overflow-hidden h-full">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                                    <div className="relative">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                                <DollarSign className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">{t.labels.monthlyIncome}</span>
                                        </div>
                                        <motion.div
                                            key={calculations.monthlyIncome}
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-baseline gap-1"
                                        >
                                            <span className="text-3xl md:text-4xl font-bold text-white">
                                                {USD.format(calculations.monthlyIncome)}
                                            </span>
                                            <span className="text-base text-white/70 font-medium">{t.labels.perMonth}</span>
                                        </motion.div>
                                    </div>
                                </Card>
                            </motion.div>

                            {/* Yearly Income */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <Card className="p-5 md:p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl h-full">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#B8A074]/20 flex items-center justify-center">
                                            <TrendingUp className="w-4 h-4 text-[#B8A074]" />
                                        </div>
                                        <span className="text-sm font-semibold text-white/70 uppercase tracking-wide">{t.labels.yearlyIncome}</span>
                                    </div>
                                    <motion.div
                                        key={calculations.yearlyIncome}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        className="flex items-baseline gap-1"
                                    >
                                        <span className="text-3xl md:text-4xl font-bold text-white">
                                            {USD.format(calculations.yearlyIncome)}
                                        </span>
                                        <span className="text-base text-white/50 font-medium">{t.labels.perYear}</span>
                                    </motion.div>
                                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#B8A074]/10 rounded-full">
                                        <Zap className="w-3 h-3 text-[#B8A074]" />
                                        <span className="text-xs text-[#B8A074] font-bold">
                                            {t.labels.annualReturnLabel}: %{Math.round(annualReturn * 100)}
                                        </span>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    icon: Target,
                                    iconColor: "text-[#B8A074]",
                                    bgColor: "bg-[#B8A074]/10",
                                    label: t.labels.capitalRecovery,
                                    value: `${calculations.capitalRecoveryYears}`,
                                    suffix: t.labels.years,
                                    delay: 0
                                },
                                {
                                    icon: ChartLine,
                                    iconColor: "text-emerald-400",
                                    bgColor: "bg-emerald-500/10",
                                    label: t.labels.totalReturn6Y,
                                    value: USD.format(calculations.totalReturn6Y),
                                    suffix: "",
                                    delay: 0.05
                                },
                                {
                                    icon: ArrowUpRight,
                                    iconColor: "text-blue-400",
                                    bgColor: "bg-blue-500/10",
                                    label: t.labels.projectedValue,
                                    value: USD.format(calculations.projectedValue6Y),
                                    suffix: "",
                                    extra: t.labels.yearlyAppreciation,
                                    extraColor: "text-blue-400",
                                    delay: 0.1
                                }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + stat.delay }}
                                    whileHover={{ y: -3, scale: 1.02 }}
                                >
                                    <Card className="p-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <div className={`w-6 h-6 rounded-md ${stat.bgColor} flex items-center justify-center`}>
                                                <stat.icon className={`w-3.5 h-3.5 ${stat.iconColor}`} />
                                            </div>
                                            <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wide leading-tight">{stat.label}</span>
                                        </div>
                                        <motion.div
                                            key={stat.value}
                                            initial={{ scale: 1.05 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-baseline gap-1"
                                        >
                                            <span className="text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                                            {stat.suffix && <span className="text-sm text-white/50 font-medium">{stat.suffix}</span>}
                                        </motion.div>
                                        {(stat as any).extra && (
                                            <div className={`mt-1 text-xs font-medium ${(stat as any).extraColor}`}>{(stat as any).extra}</div>
                                        )}
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Enhanced Visual Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-5 md:p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl relative overflow-hidden">
                                {/* Background grid lines */}
                                <div className="absolute inset-0 pointer-events-none">
                                    {[25, 50, 75].map(pct => (
                                        <div
                                            key={pct}
                                            className="absolute left-0 right-0 border-t border-white/[0.03]"
                                            style={{ bottom: `${pct}%` }}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-[#B8A074]/10 flex items-center justify-center">
                                                <ChartLine className="w-4 h-4 text-[#B8A074]" />
                                            </div>
                                            <span className="text-white/70 text-sm font-semibold uppercase tracking-wide">
                                                6 {locale === "en" ? "Year Projection" : "Yıllık Kazanç Projeksiyonu"}
                                            </span>
                                        </div>
                                        <motion.div
                                            key={maxCumulative}
                                            initial={{ scale: 1.1 }}
                                            animate={{ scale: 1 }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#B8A074]/10 rounded-full border border-[#B8A074]/20"
                                        >
                                            <TrendingUp className="w-3.5 h-3.5 text-[#B8A074]" />
                                            <span className="text-[#B8A074] text-sm font-bold">{USD.format(maxCumulative)}</span>
                                        </motion.div>
                                    </div>

                                    {/* Chart Area */}
                                    <div className="relative" style={{ height: '200px' }}>
                                        {/* Y-axis labels */}
                                        <div className="absolute left-0 top-0 bottom-8 w-16 flex flex-col justify-between text-right pr-3 pointer-events-none">
                                            <span className="text-[10px] text-white/30 font-mono">{USD.format(maxCumulative)}</span>
                                            <span className="text-[10px] text-white/30 font-mono">{USD.format(maxCumulative / 2)}</span>
                                            <span className="text-[10px] text-white/30 font-mono">$0</span>
                                        </div>

                                        {/* Bars */}
                                        <div className="absolute left-16 right-0 top-0 bottom-0 flex items-end gap-3 pb-8">
                                            {yearData.map((data, i) => {
                                                const barHeight = maxCumulative > 0
                                                    ? Math.max(8, (data.cumulative / maxCumulative) * 100)
                                                    : 8
                                                const isHovered = hoveredBar === i
                                                const isRecoveryYear = i === 5 // Year 6

                                                return (
                                                    <div
                                                        key={data.year}
                                                        className="flex-1 flex flex-col items-center justify-end h-full relative"
                                                        onMouseEnter={() => setHoveredBar(i)}
                                                        onMouseLeave={() => setHoveredBar(null)}
                                                    >
                                                        {/* Tooltip */}
                                                        <AnimatePresence>
                                                            {isHovered && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                                    className="absolute bottom-full mb-2 z-20 pointer-events-none"
                                                                >
                                                                    <div className="bg-[#1a1b1e] border border-white/20 rounded-xl px-3 py-2.5 shadow-2xl min-w-[140px]">
                                                                        <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1.5">
                                                                            {locale === "en" ? "Year" : "Yıl"} {data.year}
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <div className="flex justify-between gap-4">
                                                                                <span className="text-[10px] text-white/50">{locale === "en" ? "Cumulative" : "Kümülatif"}</span>
                                                                                <span className="text-xs font-bold text-[#B8A074]">{USD.format(data.cumulative)}</span>
                                                                            </div>
                                                                            <div className="flex justify-between gap-4">
                                                                                <span className="text-[10px] text-white/50">{locale === "en" ? "Monthly" : "Aylık"}</span>
                                                                                <span className="text-xs font-bold text-white">{USD.format(data.monthlyAtYear)}</span>
                                                                            </div>
                                                                            <div className="flex justify-between gap-4">
                                                                                <span className="text-[10px] text-white/50">{locale === "en" ? "Portfolio" : "Portföy"}</span>
                                                                                <span className="text-xs font-bold text-blue-400">{USD.format(data.portfolioValue)}</span>
                                                                            </div>
                                                                        </div>
                                                                        {/* Arrow */}
                                                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#1a1b1e] border-r border-b border-white/20 rotate-45" />
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>

                                                        {/* Value label above bar */}
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            whileInView={{ opacity: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 0.4 + i * 0.1 }}
                                                            className={`text-[10px] font-bold whitespace-nowrap mb-1.5 transition-colors ${isHovered ? 'text-[#D4C4A0]' : 'text-white/50'}`}
                                                        >
                                                            {USD.format(data.cumulative)}
                                                        </motion.div>

                                                        {/* Bar */}
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            whileInView={{ height: `${barHeight}%` }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                                                            whileHover={{ scaleX: 1.1 }}
                                                            className={`w-full rounded-t-lg cursor-pointer relative overflow-hidden transition-all ${isRecoveryYear ? 'shadow-lg shadow-[#B8A074]/20' : ''}`}
                                                            style={{
                                                                background: isRecoveryYear
                                                                    ? 'linear-gradient(to top, #B8A074, #D4C4A0)'
                                                                    : isHovered
                                                                        ? 'linear-gradient(to top, #B8A074, #C4AD82)'
                                                                        : `linear-gradient(to top, rgba(184,160,116,${0.3 + i * 0.1}), rgba(212,196,160,${0.3 + i * 0.1}))`,
                                                            }}
                                                        >
                                                            {/* Shimmer effect on hover */}
                                                            {isHovered && (
                                                                <motion.div
                                                                    initial={{ x: '-100%' }}
                                                                    animate={{ x: '200%' }}
                                                                    transition={{ duration: 0.8 }}
                                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                                                />
                                                            )}
                                                            {/* Recovery year indicator */}
                                                            {isRecoveryYear && (
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    whileInView={{ scale: 1 }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ delay: 1 }}
                                                                    className="absolute top-2 left-1/2 -translate-x-1/2"
                                                                >
                                                                    <CheckCircle className="w-4 h-4 text-white drop-shadow-lg" />
                                                                </motion.div>
                                                            )}
                                                        </motion.div>

                                                        {/* X-axis label */}
                                                        <div className={`mt-2 text-xs font-bold transition-colors ${isRecoveryYear ? 'text-[#B8A074]' : isHovered ? 'text-white/80' : 'text-white/40'}`}>
                                                            {data.year}{locale === "en" ? "Y" : ".Yıl"}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        {/* Investment line (horizontal reference) */}
                                        {maxCumulative > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, scaleX: 0 }}
                                                whileInView={{ opacity: 1, scaleX: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.8 }}
                                                className="absolute left-16 right-0 border-t-2 border-dashed border-white/20"
                                                style={{
                                                    bottom: `${Math.max(8, (investment / maxCumulative) * 100)}%`,
                                                    marginBottom: '32px'
                                                }}
                                            >
                                                <span className="absolute -top-4 right-0 text-[9px] text-white/40 font-mono bg-[#0F1012] px-1.5 py-0.5 rounded">
                                                    {locale === "en" ? "Investment" : "Yatırım"}: {USD.format(investment)}
                                                </span>
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Legend */}
                                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#B8A074]/40 to-[#D4C4A0]/40" />
                                            <span className="text-[11px] text-white/50 font-medium">{locale === "en" ? "Cumulative Income" : "Kümülatif Gelir"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#B8A074] to-[#D4C4A0]" />
                                            <span className="text-[11px] text-white/50 font-medium">{locale === "en" ? "Capital Recovery Year" : "Sermaye Geri Dönüş Yılı"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-0 border-t-2 border-dashed border-white/30" />
                                            <span className="text-[11px] text-white/50 font-medium">{locale === "en" ? "Initial Investment" : "Başlangıç Yatırımı"}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* Disclaimer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 text-center"
                >
                    <div className="inline-flex items-center gap-2 text-xs text-white/40 max-w-2xl px-4 py-2 bg-white/[0.02] rounded-full border border-white/5">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <p>{t.disclaimer}</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
