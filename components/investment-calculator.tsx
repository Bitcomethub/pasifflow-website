"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, Calendar, DollarSign, CheckCircle, Info, Wallet, ArrowRight } from "lucide-react"

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
        investmentRangeHint: string
        monthlyExampleHint: string
        annualReturnLabel: string
        formulaLabel: string
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
        investmentRangeHint: "$30,000 → $5,000,000",
        monthlyExampleHint: "$30,000 → $375/ay",
        annualReturnLabel: "Yıllık getiri (varsayım)",
        formulaLabel: "Formül",
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
        investmentRangeHint: "$30,000 → $5,000,000",
        monthlyExampleHint: "$30,000 → $375/mo",
        annualReturnLabel: "Annual return (assumption)",
        formulaLabel: "Formula",
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
    // Use locale-appropriate texts
    const t = texts || (locale === "en" ? EN_TEXTS : TR_TEXTS)

    const [investment, setInvestment] = React.useState<number>(() =>
        clamp(roundToStep(defaultInvestment, step), minInvestment, maxInvestment)
    )

    const monthlyIncome = React.useMemo(() => {
        return Math.round((investment * annualReturn) / 12)
    }, [investment, annualReturn])

    const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = Number(e.target.value)
        const next = clamp(roundToStep(raw, step), minInvestment, maxInvestment)
        setInvestment(next)
    }

    // Calculate percentage for slider track fill
    const sliderPercentage = ((investment - minInvestment) / (maxInvestment - minInvestment)) * 100

    return (
        <section id="calculator" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8A074]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1F2328]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <Card className="max-w-3xl mx-auto p-6 md:p-10 bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/50 rounded-3xl">

                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-xs font-bold uppercase tracking-wider border border-[#B8A074]/20">
                            <TrendingUp className="w-4 h-4" />
                            {t.badge}
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1F2328] mb-3">
                            {t.title}
                        </h1>
                        <div className="space-y-1 text-base md:text-lg text-[#535454]">
                            {t.descriptionLines.map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>

                    {/* 6th Year Callout */}
                    <div className="bg-gradient-to-r from-[#B8A074]/10 to-[#B8A074]/5 border border-[#B8A074]/20 rounded-2xl p-5 mb-8">
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-5 h-5 text-[#B8A074]" />
                            <span className="font-bold text-[#1F2328]">{t.year6Title}</span>
                        </div>
                        <ul className="space-y-2">
                            {t.year6Bullets.map((bullet, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span className="text-sm text-[#535454]">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Growth Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-lg md:text-xl font-bold text-[#1F2328] mb-1">
                            {t.growthTitle}
                        </h2>
                        <p className="text-sm text-[#B8A074] font-semibold">
                            {t.returnLine}
                        </p>
                    </div>

                    {/* Calculator Controls */}
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Investment Slider */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-[#B8A074]" />
                                    <span className="text-sm font-bold text-[#1F2328]">{t.labels.investment}</span>
                                </div>
                                <span className="text-2xl md:text-3xl font-bold text-[#1F2328]">
                                    {USD.format(investment)}
                                </span>
                            </div>

                            {/* Custom Styled Slider */}
                            <div className="relative mt-4 mb-2">
                                <input
                                    type="range"
                                    min={minInvestment}
                                    max={maxInvestment}
                                    step={step}
                                    value={investment}
                                    onChange={onSliderChange}
                                    aria-label={t.labels.investment}
                                    className="w-full h-3 rounded-full appearance-none cursor-pointer bg-slate-200"
                                    style={{
                                        background: `linear-gradient(to right, #B8A074 0%, #B8A074 ${sliderPercentage}%, #e2e8f0 ${sliderPercentage}%, #e2e8f0 100%)`
                                    }}
                                />
                            </div>

                            <div className="flex justify-between text-xs text-[#6B7280] mt-2">
                                <span>{USD.format(minInvestment)}</span>
                                <span className="hidden sm:inline">{t.labels.investmentRangeHint}</span>
                                <span>{USD.format(maxInvestment)}</span>
                            </div>
                        </div>

                        {/* Monthly Income Display */}
                        <div className="bg-gradient-to-br from-[#1F2328] to-[#2D353F] rounded-2xl p-5 text-white">
                            <div className="flex items-center gap-2 mb-3">
                                <DollarSign className="w-5 h-5 text-[#B8A074]" />
                                <span className="text-sm font-bold text-white/80">{t.labels.monthlyIncome}</span>
                            </div>

                            <div className="text-3xl md:text-4xl font-bold text-[#B8A074] mb-2">
                                {USD.format(monthlyIncome)}
                                <span className="text-base font-normal text-white/50 ml-1">/ay</span>
                            </div>

                            <div className="text-xs text-white/50 mb-4">
                                {t.labels.monthlyExampleHint}
                            </div>

                            {/* Formula Info Box */}
                            <div className="bg-white/10 rounded-xl p-3 text-xs">
                                <div className="flex items-center justify-between text-white/70">
                                    <span>{t.labels.annualReturnLabel}</span>
                                    <span className="font-semibold text-[#B8A074]">%{Math.round(annualReturn * 100)}</span>
                                </div>
                                <div className="flex items-center justify-between text-white/70 mt-1">
                                    <span>{t.labels.formulaLabel}</span>
                                    <span className="font-mono text-white/50">Yatırım × {annualReturn} / 12</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-8 pt-5 border-t border-slate-200">
                        <div className="flex items-start gap-2 text-xs text-[#6B7280]">
                            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <p>{t.disclaimer}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
