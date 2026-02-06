"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, Calendar, DollarSign, CheckCircle, Info, Wallet, Sparkles, Target, ChartLine, Shield, ArrowUpRight } from "lucide-react"

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

    // All calculations - FIXED: Use 6 years as per site owner spec
    const calculations = React.useMemo(() => {
        const monthlyIncome = Math.round((investment * annualReturn) / 12)
        const yearlyIncome = Math.round(investment * annualReturn)
        const capitalRecoveryYears = 6 // FIXED: Site owner specified 6 years, not calculated
        const totalReturn6Y = yearlyIncome * 6
        const appreciationRate = 0.035 // 3.5% yearly appreciation
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

    // Year projection data for chart - DYNAMIC based on yearlyIncome
    const yearData = React.useMemo(() => {
        return [1, 2, 3, 4, 5, 6].map(year => ({
            year,
            income: calculations.yearlyIncome,
            cumulative: calculations.yearlyIncome * year
        }))
    }, [calculations.yearlyIncome])

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
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-sm font-bold uppercase tracking-widest mb-6 border border-[#B8A074]/20 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        {t.badge}
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                        {t.growthTitle.split(" ").slice(0, 3).join(" ")}
                        <br />
                        <span className="bg-gradient-to-r from-[#B8A074] to-[#D4C4A0] bg-clip-text text-transparent">
                            {t.growthTitle.split(" ").slice(3).join(" ")}
                        </span>
                    </h2>

                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
                        {t.returnLine}
                    </p>
                </div>

                {/* Main Calculator Grid */}
                <div className="grid lg:grid-cols-5 gap-6 max-w-7xl mx-auto">

                    {/* Left Side - Investment Control (2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Investment Slider Card */}
                        <Card className="p-6 md:p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B8A074] to-[#8B7355] flex items-center justify-center">
                                    <Wallet className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white/50 text-sm">{t.labels.investment}</p>
                                    <p className="text-3xl md:text-4xl font-bold text-white">{USD.format(investment)}</p>
                                </div>
                            </div>

                            {/* Premium Slider */}
                            <div className="relative py-4">
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-white/10 rounded-full" />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-[#B8A074] to-[#D4C4A0] rounded-full transition-all duration-150"
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
                                <span className="text-[#B8A074]">{t.labels.investmentRangeHint}</span>
                                <span>{USD.format(maxInvestment)}</span>
                            </div>
                        </Card>

                        {/* 6th Year Callout - FIXED: Dark theme with visible text */}
                        <Card className="p-6 bg-[#0F1012] backdrop-blur-xl border border-[#B8A074]/30 rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-5 h-5 text-[#B8A074]" />
                                <span className="font-bold text-white">{t.year6Title}</span>
                            </div>
                            <ul className="space-y-3">
                                {t.year6Bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-3 h-3 text-green-400" />
                                        </div>
                                        <span className="text-sm text-white/80">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>

                    {/* Right Side - Results (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Main Income Display */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Monthly Income - Hero Card */}
                            <Card className="p-6 md:p-8 bg-gradient-to-br from-[#B8A074] to-[#8B7355] rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-5 h-5 text-white/70" />
                                        <span className="text-sm font-medium text-white/70">{t.labels.monthlyIncome}</span>
                                    </div>
                                    <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                                        {USD.format(calculations.monthlyIncome)}
                                    </div>
                                    <div className="text-white/60 text-sm">/ay</div>
                                </div>
                            </Card>

                            {/* Yearly Income */}
                            <Card className="p-6 md:p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-5 h-5 text-[#B8A074]" />
                                    <span className="text-sm font-medium text-white/50">{t.labels.yearlyIncome}</span>
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                    {USD.format(calculations.yearlyIncome)}
                                </div>
                                <div className="text-[#B8A074] text-sm font-medium">{t.labels.annualReturnLabel}: %{Math.round(annualReturn * 100)}</div>
                            </Card>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl text-center">
                                <Target className="w-6 h-6 text-[#B8A074] mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{calculations.capitalRecoveryYears}</div>
                                <div className="text-xs text-white/50 mt-1">{t.labels.capitalRecovery}</div>
                                <div className="text-xs text-[#B8A074]">yıl</div>
                            </Card>

                            <Card className="p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl text-center">
                                <ChartLine className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{USD.format(calculations.totalReturn6Y)}</div>
                                <div className="text-xs text-white/50 mt-1">{t.labels.totalReturn6Y}</div>
                            </Card>

                            <Card className="p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl text-center">
                                <ArrowUpRight className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{USD.format(calculations.projectedValue6Y)}</div>
                                <div className="text-xs text-white/50 mt-1">{t.labels.projectedValue}</div>
                                <div className="text-xs text-blue-400">+3.5%/yıl</div>
                            </Card>
                        </div>

                        {/* Visual Progress Chart - FIXED: Dynamic bars */}
                        <Card className="p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-white/70 text-sm font-medium">6 Yıllık Kazanç Projeksiyonu</span>
                                <span className="text-[#B8A074] text-sm font-bold">{USD.format(maxCumulative)} toplam</span>
                            </div>
                            <div className="flex items-end gap-3 h-32">
                                {yearData.map((data, i) => {
                                    const heightPercent = maxCumulative > 0 ? (data.cumulative / maxCumulative) * 100 : 0
                                    return (
                                        <div key={data.year} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="text-xs text-white/60 font-medium">
                                                {USD.format(data.cumulative)}
                                            </div>
                                            <div
                                                className="w-full bg-gradient-to-t from-[#B8A074] to-[#D4C4A0] rounded-t-lg transition-all duration-500 min-h-[8px]"
                                                style={{
                                                    height: `${Math.max(heightPercent, 5)}%`,
                                                    opacity: 0.6 + (i * 0.07)
                                                }}
                                            />
                                            <span className="text-xs text-white/50 font-medium">{data.year}Y</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                                <Shield className="w-3 h-3" />
                                <span>Yıl 6'da sermaye tamamen geri alınır</span>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-10 text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-white/40 max-w-2xl">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        <p>{t.disclaimer}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
