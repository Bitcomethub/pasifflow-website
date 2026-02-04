"use client"

import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { TrendingUp, DollarSign, Calendar, Percent, Home, PiggyBank, Calculator, Info } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { useTranslations } from "next-intl"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface PropertyConfig {
    purchasePrice: number
    initialMonthlyRent: number
    monthlyTaxes: number
    monthlyInsurance: number
}

interface Assumptions {
    downPaymentPct: number
    closingCostPct: number
    pasiflowFee: number
    pmPct: number
    rentIncreaseAnnualFlat: number
    appreciationAnnualPct: number
    sellCostPct: number
    loan: {
        enabled: boolean
        interestAnnualPct: number
        termYears: number
    }
}

interface InvestmentCalculatorProps {
    property?: PropertyConfig
    assumptions?: Assumptions
    holdYearsMin?: number
    holdYearsMax?: number
    holdYearsDefault?: number
}

// Default property: 10468 Nottingham St
const defaultProperty: PropertyConfig = {
    purchasePrice: 130000,
    initialMonthlyRent: 1500,
    monthlyTaxes: 127.15,
    monthlyInsurance: 108.33
}

const defaultAssumptions: Assumptions = {
    downPaymentPct: 0.20,
    closingCostPct: 0.07,
    pasiflowFee: 5000,
    pmPct: 0.10,
    rentIncreaseAnnualFlat: 50,
    appreciationAnnualPct: 0.035,
    sellCostPct: 0.06,
    loan: {
        enabled: true,
        interestAnnualPct: 0.07,
        termYears: 30
    }
}

// PMT formula for mortgage calculation
function calculateMortgagePayment(principal: number, annualRate: number, years: number): number {
    const monthlyRate = annualRate / 12
    const numPayments = years * 12
    if (monthlyRate === 0) return principal / numPayments
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
}

export function InvestmentCalculator({
    property = defaultProperty,
    assumptions = defaultAssumptions,
    holdYearsMin = 1,
    holdYearsMax = 30,
    holdYearsDefault = 5
}: InvestmentCalculatorProps) {
    const [holdYears, setHoldYears] = useState(holdYearsDefault)
    const t = useTranslations("roiCalculator")
    const tFee = useTranslations("pasiflowFeeModal")

    const results = useMemo(() => {
        const P = property.purchasePrice
        const R0 = property.initialMonthlyRent

        // Upfront Cash
        const downPayment = assumptions.downPaymentPct * P
        const closingCosts = assumptions.closingCostPct * P
        const totalCash = downPayment + closingCosts + assumptions.pasiflowFee

        // Loan
        const loanAmount = (1 - assumptions.downPaymentPct) * P
        const monthlyMortgage = assumptions.loan.enabled
            ? calculateMortgagePayment(loanAmount, assumptions.loan.interestAnnualPct, assumptions.loan.termYears)
            : 0

        // Fixed monthly expenses
        const fixedMonthly = property.monthlyTaxes + property.monthlyInsurance

        // Calculate yearly cash flows and build amortization
        let loanBalance = loanAmount
        const monthlyRate = assumptions.loan.interestAnnualPct / 12
        let cumulativeCashFlow = 0
        const yearlyData: { year: number; rent: number; cashFlow: number; propertyValue: number; equity: number; cumulative: number }[] = []

        for (let t = 1; t <= 30; t++) {
            const monthlyRent = R0 + assumptions.rentIncreaseAnnualFlat * (t - 1)
            const grossRent = 12 * monthlyRent
            const pmFee = assumptions.pmPct * grossRent
            const opEx = 12 * fixedMonthly + pmFee
            const debtService = assumptions.loan.enabled ? 12 * monthlyMortgage : 0
            const netCF = grossRent - opEx - debtService

            cumulativeCashFlow += netCF
            const propertyValue = P * Math.pow(1 + assumptions.appreciationAnnualPct, t)

            if (assumptions.loan.enabled) {
                for (let m = 0; m < 12; m++) {
                    const interest = loanBalance * monthlyRate
                    const principal = monthlyMortgage - interest
                    loanBalance = Math.max(0, loanBalance - principal)
                }
            }

            const equity = propertyValue - loanBalance

            yearlyData.push({
                year: t,
                rent: monthlyRent,
                cashFlow: netCF,
                propertyValue,
                equity,
                cumulative: cumulativeCashFlow
            })
        }

        const chartData = yearlyData.slice(0, holdYears);
        const finalYear = chartData[chartData.length - 1]
        const cumulativeCF_at_Hold = finalYear.cumulative;
        const salePrice = finalYear.propertyValue
        const sellingCosts = assumptions.sellCostPct * salePrice
        const loanBalanceAtExit = finalYear.propertyValue - finalYear.equity
        const netProceeds = salePrice - sellingCosts - loanBalanceAtExit
        const totalProfit = cumulativeCF_at_Hold + netProceeds - totalCash
        const totalReturnPct = (totalProfit / totalCash) * 100
        const cagr = (Math.pow((totalCash + totalProfit) / totalCash, 1 / holdYears) - 1) * 100
        const avgMonthlyCashFlow = cumulativeCF_at_Hold / holdYears / 12

        // Cash on Cash Calculation
        // Yearly Net Cash Flow / Total Cash Invested
        // Using Year 1 cash flow for standard Coc, or average? User said "above like" which meant Nottingham card.
        // Nottingham card usually shows current Coc.
        const year1CashFlow = yearlyData[0].cashFlow;
        const cashOnCash = (year1CashFlow / totalCash) * 100;

        return {
            totalCash,
            downPayment,
            closingCosts,
            monthlyMortgage,
            avgMonthlyCashFlow,
            totalProfit,
            totalReturnPct,
            cagr,
            chartData,
            finalEquity: finalYear.equity,
            finalPropertyValue: finalYear.propertyValue,
            cashOnCash
        }
    }, [holdYears, property, assumptions])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    const formatK = (value: number) => {
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`
        return `$${value}`
    }

    return (
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C1A05E]/10 text-[#C1A05E] font-bold text-sm mb-4">
                        <Calculator className="w-4 h-4" />
                        {t("title")}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        {t("subtitle")}
                    </h2>
                </div>

                {/* Hold Time Slider */}
                <div className="max-w-3xl mx-auto mb-12">
                    <Card className="p-8 bg-white border-slate-200 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[#C1A05E]/10 flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-[#C1A05E]" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">{t("duration")}</p>
                                    <p className="text-2xl font-bold text-slate-900">{holdYears} {t("years")}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500">{t("annualizedRoi")}</p>
                                <p className="text-3xl font-bold text-[#C1A05E]">%{results.cagr.toFixed(1)}</p>
                            </div>
                        </div>
                        <Slider
                            value={[holdYears]}
                            onValueChange={(value) => setHoldYears(value[0])}
                            min={holdYearsMin}
                            max={holdYearsMax}
                            step={1}
                            className="w-full"
                        />
                        <div className="flex justify-between mt-2 text-xs text-slate-400">
                            <span>{holdYearsMin} {t("years")}</span>
                            <span>{holdYearsMax} {t("years")}</span>
                        </div>
                    </Card>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                                <PiggyBank className="w-5 h-5 text-slate-600" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("upfrontCash")}</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{formatCurrency(results.totalCash)}</p>
                    </Card>

                    <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("cashFlowMonth")}</p>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(results.avgMonthlyCashFlow)}</p>
                    </Card>

                    <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-[#C1A05E]/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-[#C1A05E]" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("totalReturn")} ({holdYears} {t("years")})</p>
                        </div>
                        <p className="text-2xl font-bold text-[#C1A05E]">{formatCurrency(results.totalProfit)}</p>
                    </Card>

                    <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Percent className="w-5 h-5 text-primary" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("cashOnCash")}</p>
                        </div>
                        <p className="text-2xl font-bold text-primary">%{results.cashOnCash.toFixed(1)}</p>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Chart 1: Property Value vs Equity */}
                    <Card className="p-6 border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">{t("propertyValue")} & {t("equity")}</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={results.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1F2328" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#1F2328" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#C1A05E" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#C1A05E" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year" />
                                    <YAxis tickFormatter={formatK} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                    <Legend />
                                    <Area type="monotone" dataKey="propertyValue" name={t("propertyValue")} stroke="#1F2328" fillOpacity={1} fill="url(#colorValue)" />
                                    <Area type="monotone" dataKey="equity" name={t("equity")} stroke="#C1A05E" fillOpacity={1} fill="url(#colorEquity)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Chart 2: Net Cash Flow */}
                    <Card className="p-6 border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">{t("monthlyCashFlow")}</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={results.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="year" />
                                    <YAxis tickFormatter={formatK} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{ fill: '#f1f5f9' }} />
                                    <Bar dataKey="cashFlow" name={t("cashFlowMonth")} fill="#22c55e" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Property Summary Card */}
                <div className="max-w-4xl mx-auto">
                    <Card className="p-8 bg-gradient-to-br from-[#1F2328] to-[#2a3038] text-white border-0 shadow-xl">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Home className="w-6 h-6 text-[#C1A05E]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">10468 Nottingham St</h3>
                                    <p className="text-white/60">Detroit, MI 48224 • Section 8</p>
                                </div>
                            </div>
                            <div className="hidden md:block text-right">
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{t("cashOnCash")}</p>
                                <p className="text-3xl font-bold text-[#C1A05E]">%{results.cashOnCash.toFixed(1)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("purchasePrice")}</p>
                                <p className="text-xl font-bold">{formatCurrency(property.purchasePrice)}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("downPaymentAmount")}</p>
                                <p className="text-xl font-bold">{formatCurrency(results.downPayment)}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("monthlyRentLabel")}</p>
                                <p className="text-xl font-bold text-[#C1A05E]">{formatCurrency(property.initialMonthlyRent)}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">{t("monthlyMortgage")}</p>
                                <p className="text-xl font-bold">{formatCurrency(results.monthlyMortgage)}</p>
                            </div>
                        </div>

                        {/* Detailed Assumptions & Pasiflow Fee Modal */}
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-white/40 text-xs uppercase tracking-wider">{t("costBreakdown")}</p>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="flex items-center gap-2 text-xs font-semibold text-[#C1A05E] hover:text-[#d4b97a] transition-colors bg-white/5 px-3 py-1.5 rounded-full">
                                            <Info className="w-3.5 h-3.5" />
                                            {t("pasiflowFee")}: {formatCurrency(assumptions.pasiflowFee)}
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl bg-white text-slate-900 border-none shadow-2xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[#C1A05E]/10 flex items-center justify-center">
                                                    <Calculator className="w-6 h-6 text-[#C1A05E]" />
                                                </div>
                                                {tFee("title")}
                                            </DialogTitle>
                                            <DialogDescription className="text-base text-slate-600 pt-4 leading-relaxed">
                                                {tFee("description")}
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="py-6 border-y border-slate-100">
                                            <h4 className="font-bold text-slate-900 mb-4">{tFee("scopeTitle")}</h4>
                                            <ul className="space-y-3">
                                                {/* Manual mapping for items array */}
                                                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                                    <li key={i} className="flex gap-3 text-sm text-slate-700 hover:text-slate-900 transition-colors">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C1A05E] shrink-0" />
                                                        {tFee(`items.${i}`)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pt-4 text-xs text-slate-400 italic">
                                            {tFee("footer")}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex justify-between md:block border-b border-white/5 pb-2 md:border-0 md:pb-0">
                                    <span className="text-white/50 block mb-1">{t("closingCosts")}</span>
                                    <span className="font-medium">{formatCurrency(results.closingCosts)}</span>
                                </div>
                                <div className="flex justify-between md:block border-b border-white/5 pb-2 md:border-0 md:pb-0">
                                    <span className="text-white/50 block mb-1">{t("yoyAppreciation")}</span>
                                    <span className="font-medium">%3.5</span>
                                </div>
                                <div className="flex justify-between md:block border-b border-white/5 pb-2 md:border-0 md:pb-0">
                                    <span className="text-white/50 block mb-1">{t("payback")}</span>
                                    <span className="font-medium">6-8 {t("years")}</span>
                                </div>
                                <div className="flex justify-between md:block border-b border-white/5 pb-2 md:border-0 md:pb-0">
                                    <span className="text-white/50 block mb-1">{t("saleCost")}</span>
                                    <span className="font-medium">%6</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Investor Message */}
                <div className="text-center mt-12 max-w-2xl mx-auto">
                    <blockquote className="text-lg text-slate-600 italic">
                        "{t("quote")}"
                    </blockquote>
                </div>
            </div>
        </section>
    )
}
