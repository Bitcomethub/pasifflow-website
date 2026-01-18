"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, PieChart, Building2, MapPin, Calculator, Clock, Calendar, Lock } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { LeadGenModal } from "@/components/lead-gen-modal"

// City-specific data (numerical only)
const cityData = {
    detroit: {
        minBudget: 75000,
        maxBudget: 110000,
        avgRentRatio: 0.0125, // Monthly rent as % of purchase price
        taxRate: 0.014, // Annual property tax as % of purchase
        insuranceRate: 0.011, // Annual insurance as % of purchase
    },
    cleveland: {
        minBudget: 85000,
        maxBudget: 120000,
        avgRentRatio: 0.012,
        taxRate: 0.010,
        insuranceRate: 0.012,
    },
    memphis: {
        minBudget: 90000,
        maxBudget: 130000,
        avgRentRatio: 0.011,
        taxRate: 0.008,
        insuranceRate: 0.012,
    }
}

const PASIFLOW_SERVICE_FEE = 5000
const CLOSING_COSTS = 3000
const MAINTENANCE_RESERVE_MONTHLY = 100
const MANAGEMENT_FEE_RATE = 0.10 // 10% of monthly rent
const YEARLY_APPRECIATION_RATE = 0.07 // Fixed 7% yearly appreciation

const holdingPeriods = [1, 5, 10, 20, 30]

export function RoiCalculator() {
    const t = useTranslations("roiCalculator")
    const [selectedCity, setSelectedCity] = useState<keyof typeof cityData>("detroit")
    const [purchasePrice, setPurchasePrice] = useState(92500)
    const [holdingPeriod, setHoldingPeriod] = useState(5)
    const [isGuest, setIsGuest] = useState(true)
    const [showLeadModal, setShowLeadModal] = useState(false)

    useEffect(() => {
        const lead = localStorage.getItem("pasiflow_user_lead")
        if (lead) setIsGuest(false)
    }, [])

    const city = cityData[selectedCity]

    // Mortgage / Finance Constants
    const DOWN_PAYMENT_RATE = 0.20
    const ORIGINATION_FEE_RATE = 0.05
    const MORTGAGE_INTEREST_RATE = 0.07 // 7% annual interest assumption
    const MORTGAGE_TERM_YEARS = 30

    // 1. Initial Investment (Cash to Close)
    const downPayment = purchasePrice * DOWN_PAYMENT_RATE
    const financeAmount = purchasePrice - downPayment // Loan Amount
    const originationFee = financeAmount * ORIGINATION_FEE_RATE // Bank Fee
    // Total Cash Needed = Down Payment + Origination Fee + Pasiflow Fee
    // Note: We removed generic 'CLOSING_COSTS' favor of explicit origination fee as requested.
    const totalInvestment = downPayment + originationFee + PASIFLOW_SERVICE_FEE

    // 2. Mortgage Payment (Principal + Interest)
    // Monthly Payment Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const monthlyInterestRate = MORTGAGE_INTEREST_RATE / 12
    const numberOfPayments = MORTGAGE_TERM_YEARS * 12
    const monthlyMortgagePayment = financeAmount * (
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    )
    const yearlyMortgagePayment = monthlyMortgagePayment * 12

    // 3. Rental Income
    const monthlyRent = purchasePrice * city.avgRentRatio
    const yearlyRent = monthlyRent * 12

    // 4. Annual Expenses
    const yearlyPropertyTax = purchasePrice * city.taxRate
    const yearlyInsurance = purchasePrice * city.insuranceRate
    const yearlyManagement = yearlyRent * MANAGEMENT_FEE_RATE
    const yearlyMaintenance = MAINTENANCE_RESERVE_MONTHLY * 12
    const totalOperatingExpenses = yearlyPropertyTax + yearlyInsurance + yearlyManagement + yearlyMaintenance

    // 5. Net Income (Cash Flow)
    // Cash Flow = Gross Rent - Operating Expenses - Mortgage Payment
    const yearlyNetIncome = yearlyRent - totalOperatingExpenses - yearlyMortgagePayment
    const monthlyNetIncome = yearlyNetIncome / 12

    // 6. ROI Calculation (Cash on Cash Return)
    const netRoi = (yearlyNetIncome / totalInvestment) * 100

    // Payback period (Amortisman süresi)
    const paybackYears = yearlyNetIncome > 0 ? totalInvestment / yearlyNetIncome : 0

    // HOLDING PERIOD'A GÖRE DEĞİŞEN DEĞERLER
    // Property value after holding period (7% yearly compound appreciation)
    const futurePropertyValue = purchasePrice * Math.pow(1 + YEARLY_APPRECIATION_RATE, holdingPeriod)
    const appreciationAmount = futurePropertyValue - purchasePrice

    // Mortgage Balance (Principal Remaining) Calculation (Simplified amortization)
    // For simplicity in this view, we can approximate or calculate exactly. Let's do a rough estimate or skip principal paydown for the 'appreciation' focused display.
    // Actually, principal paydown is a gain. Let's include it for accuracy if possible, or stick to appreciation for 'Total Return' to avoid complexity.
    // User asked for specific input structure, I will focus on that.

    const appreciationPercent = (appreciationAmount / purchasePrice) * 100

    // Total rental income over holding period
    const totalRentalIncome = yearlyNetIncome * holdingPeriod

    // Total return (rental income + appreciation)
    // Note: In a leveraged scenario, return on equity is huge because of appreciation on the FULL asset value.
    const totalReturn = totalRentalIncome + appreciationAmount

    // Total ROI over holding period (based on CASH invested)
    const totalRoiPercent = (totalReturn / totalInvestment) * 100

    // Annualized ROI for holding period
    const annualizedRoi = totalRoiPercent / holdingPeriod

    // Doorvest-style metrics
    // Cash on Cash is the primary metric for leveraged deals
    const cashOnCash = netRoi

    // Cap Rate = Net Operating Income (before debt service) / Purchase Price
    const noi = yearlyRent - totalOperatingExpenses
    const capRate = (noi / purchasePrice) * 100

    const getCityName = (key: string) => {
        return t(`city_${key}_name`);
    }

    return (
        <Card className="p-8 sm:p-10 bg-white border-slate-100 shadow-[0_30px_60px_-15px_rgba(30,40,75,0.08)] relative overflow-hidden rounded-[2.5rem]">
            {/* Background blobs for premium feel */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-3 flex items-center justify-center gap-3 text-slate-900 tracking-tight">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calculator className="text-primary w-6 h-6" />
                </div>
                {t("title")}
            </h3>
            <p className="text-center text-muted-foreground text-sm mb-6">
                {t("subtitle")}
            </p>

            <div className="space-y-6 relative z-10">
                {/* City Selection - HIDDEN/REMOVED per client request (Detroit Only) */}
                <div className="hidden">
                    <button onClick={() => setSelectedCity("detroit")} />
                </div>

                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold">
                        <MapPin size={16} />
                        Detroit, MI - Maksimum Nakit Akışı
                    </div>
                </div>

                {/* Purchase Price Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between font-semibold">
                        <span className="flex items-center gap-2">
                            <Building2 size={16} className="text-primary" />
                            {t("purchasePrice")}
                        </span>
                        <span className="text-primary font-bold text-lg">${purchasePrice.toLocaleString()}</span>
                    </div>
                    <Slider
                        value={[purchasePrice]}
                        onValueChange={(vals) => setPurchasePrice(vals[0])}
                        min={city.minBudget}
                        max={city.maxBudget}
                        step={5000}
                        className="py-4 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>${(city.minBudget / 1000).toFixed(0)}K</span>
                        <span>${(city.maxBudget / 1000).toFixed(0)}K</span>
                    </div>
                </div>

                {/* Holding Period Selection */}
                <div className="space-y-2">
                    <label className="font-semibold text-sm flex items-center gap-2">
                        <Calendar size={16} className="text-primary" />
                        {t("holdingPeriod")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {holdingPeriods.map((years) => (
                            <button
                                key={years}
                                onClick={() => setHoldingPeriod(years)}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border-2 transition-all text-xs sm:text-sm font-bold ${holdingPeriod === years
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border hover:border-primary/50 hover:bg-muted"
                                    }`}
                            >
                                {years} {t("years")}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Doorvest-style Investor Highlights */}
                <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-100">
                    <div className="text-center mb-6">
                        <div className="text-xl font-bold text-slate-900 tracking-tight">
                            {t("investorHighlights")} - {holdingPeriod}Y
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <DollarSign size={18} className="text-primary" />
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t("cashOnCash")}</span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                {cashOnCash.toFixed(1)}%
                            </div>
                        </div>
                        <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <PieChart size={18} className="text-accent" />
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t("capRateMetric")}</span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                                {capRate.toFixed(2)}%
                            </div>
                        </div>
                        <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <TrendingUp size={18} className="text-green-600" />
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t("yoyAppreciation")}</span>
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-green-600">
                                7%
                            </div>
                        </div>
                        <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Calendar size={18} className="text-blue-600" />
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t("cashFlowMonth")}</span>
                            </div>
                            <div className={`text-2xl sm:text-3xl font-extrabold ${monthlyNetIncome >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
                                ${Math.round(monthlyNetIncome).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Year ROI Summary - Large Display */}
                <div className="bg-primary text-black rounded-3xl p-8 text-center relative overflow-hidden shadow-xl shadow-primary/20">
                    <div className="text-sm font-bold uppercase tracking-widest text-black/60 mb-2">Year {holdingPeriod} ROI</div>
                    <div className="text-5xl sm:text-6xl font-black mb-3">
                        {`${totalRoiPercent.toFixed(0)}%`}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xl">
                        <TrendingUp size={24} strokeWidth={2.5} />
                        <span className="font-extrabold">↑ {`$${Math.round(totalReturn).toLocaleString()}`}</span>
                    </div>
                </div>

                {/* Holding Period Results - TUTMA SÜRESİNE GÖRE DEĞİŞEN DEĞERLER */}
                <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-4 sm:p-6">
                    <div className="text-center mb-4">
                        <div className="text-lg font-bold text-foreground">
                            {t("projectedReturnTitle", { years: holdingPeriod })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {t("appreciationAssumption")}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-background/60 rounded-lg border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">📈 {t("propertyValue")}</div>
                            <div className="text-xl font-bold text-primary">
                                ${Math.round(futurePropertyValue).toLocaleString()}
                            </div>
                            <div className="text-sm text-green-600 font-semibold">
                                +${Math.round(appreciationAmount).toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                (+%{appreciationPercent.toFixed(0)} {t("appreciation")})
                            </div>
                        </div>
                        <div className="text-center p-4 bg-background/60 rounded-lg border border-border/50">
                            <div className="text-xs text-muted-foreground mb-1">💰 {t("totalRentalIncome")}</div>
                            <div className="text-xl font-bold text-green-600">
                                ${Math.round(totalRentalIncome).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {holdingPeriod} {t("years")} × ${Math.round(yearlyNetIncome).toLocaleString()}
                            </div>
                        </div>
                        <div className="text-center p-4 bg-primary/20 rounded-lg border-2 border-primary/40">
                            <div className="text-xs text-primary font-bold mb-1">🎯 {t("totalReturn")}</div>
                            <div className="text-2xl font-bold text-primary">
                                ${Math.round(totalReturn).toLocaleString()}
                            </div>
                            <div className="text-sm font-semibold text-primary">
                                %{totalRoiPercent.toFixed(0)} {t("totalRoi")}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                ({t("annualizedRoi")} %{annualizedRoi.toFixed(1)})
                            </div>
                        </div>
                    </div>
                </div>

                {/* GUEST OVERLAY - Calculator Gating */}
                {isGuest && (
                    <div className="absolute inset-0 z-50 bg-white/40 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8">
                        <div className="bg-white/90 border border-white/40 p-10 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(30,40,75,0.2)] max-w-md backdrop-blur-2xl transform hover:scale-[1.01] transition-all duration-500">
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <Lock className="w-10 h-10 text-primary" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4 text-slate-900 tracking-tight">Yatırım Hesaplayıcıyı Açın</h3>
                            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                                Detaylı ROI analizlerini, nakit akışını ve amortisman sürelerini görmek için ücretsiz üye olun.
                            </p>
                            <Button
                                className="w-full h-14 text-lg font-bold bg-primary text-black hover:bg-primary/90 rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => setShowLeadModal(true)}
                            >
                                Hemen Üye Ol
                            </Button>
                        </div>
                    </div>
                )}

                {/* Expense Breakdown */}
                <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                    <div className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <PieChart size={16} className="text-primary" />
                        {t("costBreakdown")}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("propertyPrice")}:</span>
                            <span className="font-medium">${purchasePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-blue-600 font-medium"> {/* Highlight Finance */}
                            <span className="text-muted-foreground">Peşinat (%20):</span>
                            <span>${downPayment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-blue-600 font-medium">
                            <span className="text-muted-foreground">Kredi Tutarı:</span>
                            <span>${financeAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Dosya Masrafı (%5):</span>
                            <span className="font-medium">${Math.round(originationFee).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("serviceFee")}:</span>
                            <span className="font-medium">${PASIFLOW_SERVICE_FEE.toLocaleString()}</span>
                        </div>

                        <div className="col-span-1 sm:col-span-2 border-t border-border/50 my-1"></div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Mortgage (Yıllık):</span>
                            <span className="font-medium text-red-500">-${Math.round(yearlyMortgagePayment).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("annualTax")}:</span>
                            <span className="font-medium">-${Math.round(yearlyPropertyTax).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("annualInsurance")}:</span>
                            <span className="font-medium">-${Math.round(yearlyInsurance).toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between font-bold text-primary border-t border-border/50 pt-2 mt-2">
                            <span>Toplam Nakit Girişi:</span>
                            <span>${Math.round(totalInvestment).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                    {t("disclaimer")}
                </p>
            </div>

            <LeadGenModal
                open={showLeadModal}
                onOpenChange={setShowLeadModal}
                onSuccess={() => {
                    setIsGuest(false)
                    setShowLeadModal(false)
                }}
                triggerSource="gated-content"
            />
        </Card>
    )
}
