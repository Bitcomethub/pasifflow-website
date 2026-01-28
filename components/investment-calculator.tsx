"use client"

import { useState, useMemo } from "react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { TrendingUp, DollarSign, Calendar, Percent, Home, PiggyBank, Calculator } from "lucide-react"

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

        for (let t = 1; t <= holdYears; t++) {
            // Rent for this year (linear increase)
            const monthlyRent = R0 + assumptions.rentIncreaseAnnualFlat * (t - 1)
            const grossRent = 12 * monthlyRent

            // Operating expenses
            const pmFee = assumptions.pmPct * grossRent
            const opEx = 12 * fixedMonthly + pmFee

            // Debt service
            const debtService = assumptions.loan.enabled ? 12 * monthlyMortgage : 0

            // Net cash flow for this year
            const netCF = grossRent - opEx - debtService
            cumulativeCashFlow += netCF

            // Property value with appreciation
            const propertyValue = P * Math.pow(1 + assumptions.appreciationAnnualPct, t)

            // Calculate loan balance after t years (simplified)
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

        // Exit scenario
        const finalYear = yearlyData[holdYears - 1]
        const salePrice = finalYear.propertyValue
        const sellingCosts = assumptions.sellCostPct * salePrice
        const netProceeds = salePrice - sellingCosts - loanBalance

        // Total profit
        const totalProfit = cumulativeCashFlow + netProceeds - totalCash

        // Total return %
        const totalReturnPct = (totalProfit / totalCash) * 100

        // CAGR
        const cagr = (Math.pow((totalCash + totalProfit) / totalCash, 1 / holdYears) - 1) * 100

        // Average monthly cash flow
        const avgMonthlyCashFlow = cumulativeCashFlow / holdYears / 12

        return {
            totalCash,
            downPayment,
            closingCosts,
            monthlyMortgage,
            avgMonthlyCashFlow,
            totalProfit,
            totalReturnPct,
            cagr,
            yearlyData,
            finalEquity: finalYear.equity,
            finalPropertyValue: finalYear.propertyValue
        }
    }, [holdYears, property, assumptions])

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
    }

    return (
        <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C1A05E]/10 text-[#C1A05E] font-bold text-sm mb-4">
                        <Calculator className="w-4 h-4" />
                        Yatırım Hesaplayıcı
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Potansiyel Getirinizi Hesaplayın
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Section 8 garantili kira geliri ile yatırımınızın uzun vadeli getirisini görün
                    </p>
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
                                    <p className="text-sm text-slate-500 font-medium">Yatırım Süresi</p>
                                    <p className="text-2xl font-bold text-slate-900">{holdYears} Yıl</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-slate-500">Yıllık Getiri (CAGR)</p>
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
                            <span>{holdYearsMin} yıl</span>
                            <span>{holdYearsMax} yıl</span>
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
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Toplam Yatırım</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{formatCurrency(results.totalCash)}</p>
                    </Card>

                    <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Ort. Aylık Gelir</p>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(results.avgMonthlyCashFlow)}</p>
                    </Card>

                    <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-[#C1A05E]/10 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-[#C1A05E]" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Toplam Kâr ({holdYears} yıl)</p>
                        </div>
                        <p className="text-2xl font-bold text-[#C1A05E]">{formatCurrency(results.totalProfit)}</p>
                    </Card>

                    <Card className="p-6 bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Percent className="w-5 h-5 text-primary" />
                            </div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Toplam Getiri</p>
                        </div>
                        <p className="text-2xl font-bold text-primary">%{results.totalReturnPct.toFixed(0)}</p>
                    </Card>
                </div>

                {/* Property Summary Card */}
                <div className="max-w-4xl mx-auto">
                    <Card className="p-8 bg-gradient-to-br from-[#1F2328] to-[#2a3038] text-white border-0 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <Home className="w-6 h-6 text-[#C1A05E]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">10468 Nottingham St</h3>
                                <p className="text-white/60">Detroit, MI 48224 • Section 8</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Satın Alma Fiyatı</p>
                                <p className="text-xl font-bold">{formatCurrency(property.purchasePrice)}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Peşinat (%20)</p>
                                <p className="text-xl font-bold">{formatCurrency(results.downPayment)}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Aylık Kira</p>
                                <p className="text-xl font-bold text-[#C1A05E]">{formatCurrency(property.initialMonthlyRent)}</p>
                            </div>
                            <div>
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Aylık Mortgage</p>
                                <p className="text-xl font-bold">{formatCurrency(results.monthlyMortgage)}</p>
                            </div>
                        </div>

                        {/* Assumptions Panel */}
                        <div className="border-t border-white/10 pt-6">
                            <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Varsayımlar</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-white/50">Peşinat</span>
                                    <span className="font-medium">%20</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/50">Kira Artışı</span>
                                    <span className="font-medium">+$50/yıl</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/50">Değer Artışı</span>
                                    <span className="font-medium">%3.5/yıl</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/50">Satış Masrafı</span>
                                    <span className="font-medium">%6</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Investor Message */}
                <div className="text-center mt-12 max-w-2xl mx-auto">
                    <blockquote className="text-lg text-slate-600 italic">
                        "Bu yatırımda fark yaratan şey şehirler arası mesafe değil, doğru sistemdir.
                        Operasyon Pasiflow tarafından yönetilir, yatırımcı yalnızca nakit akışını izler."
                    </blockquote>
                </div>
            </div>
        </section>
    )
}
