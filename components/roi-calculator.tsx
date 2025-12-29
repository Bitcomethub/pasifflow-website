"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, PieChart, Building2, MapPin, Calculator, Clock, Calendar } from "lucide-react"
import { useTranslations } from "next-intl"

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

const holdingPeriods = [1, 2, 3, 5, 10]

export function RoiCalculator() {
    const t = useTranslations("roiCalculator")
    const [selectedCity, setSelectedCity] = useState<keyof typeof cityData>("detroit")
    const [purchasePrice, setPurchasePrice] = useState(92500)
    const [holdingPeriod, setHoldingPeriod] = useState(5)

    const city = cityData[selectedCity]

    // Calculations based on PDF formula
    const monthlyRent = purchasePrice * city.avgRentRatio
    const yearlyRent = monthlyRent * 12

    // Annual expenses
    const yearlyPropertyTax = purchasePrice * city.taxRate
    const yearlyInsurance = purchasePrice * city.insuranceRate
    const yearlyManagement = yearlyRent * MANAGEMENT_FEE_RATE
    const yearlyMaintenance = MAINTENANCE_RESERVE_MONTHLY * 12
    const totalYearlyExpenses = yearlyPropertyTax + yearlyInsurance + yearlyManagement + yearlyMaintenance

    // Net income
    const yearlyNetIncome = yearlyRent - totalYearlyExpenses
    const monthlyNetIncome = yearlyNetIncome / 12

    // Total investment (purchase + Pasiflow fee + Closing costs)
    const totalInvestment = purchasePrice + PASIFLOW_SERVICE_FEE + CLOSING_COSTS

    // ROI calculation (Net ROI % per year)
    const netRoi = (yearlyNetIncome / totalInvestment) * 100

    // Payback period (Amortisman süresi) - sadece kira geliriyle
    const paybackYears = totalInvestment / yearlyNetIncome

    // HOLDING PERIOD'A GÖRE DEĞİŞEN DEĞERLER
    // Property value after holding period (7% yearly compound appreciation)
    const futurePropertyValue = purchasePrice * Math.pow(1 + YEARLY_APPRECIATION_RATE, holdingPeriod)
    const appreciationAmount = futurePropertyValue - purchasePrice
    const appreciationPercent = (appreciationAmount / purchasePrice) * 100

    // Total rental income over holding period
    const totalRentalIncome = yearlyNetIncome * holdingPeriod

    // Total return (rental income + appreciation)
    const totalReturn = totalRentalIncome + appreciationAmount

    // Total ROI over holding period (based on initial investment)
    const totalRoiPercent = (totalReturn / totalInvestment) * 100

    // Annualized ROI for holding period
    const annualizedRoi = totalRoiPercent / holdingPeriod

    const getCityName = (key: string) => {
        return t(`city_${key}_name`);
    }

    return (
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-card to-secondary/10 border-border/50 shadow-2xl relative overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-xl sm:text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2">
                <Calculator className="text-accent" />
                {t("title")}
            </h3>
            <p className="text-center text-muted-foreground text-sm mb-6">
                {t("subtitle")}
            </p>

            <div className="space-y-6 relative z-10">
                {/* City Selection */}
                <div className="space-y-2">
                    <label className="font-semibold text-sm flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        {t("cityLabel")}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {(Object.keys(cityData) as Array<keyof typeof cityData>).map((cityKey) => (
                            <button
                                key={cityKey}
                                onClick={() => {
                                    setSelectedCity(cityKey)
                                    const c = cityData[cityKey]
                                    setPurchasePrice(Math.round((c.minBudget + c.maxBudget) / 2))
                                }}
                                className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${selectedCity === cityKey
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:border-primary/50 hover:bg-muted"
                                    }`}
                            >
                                <div className="font-bold">{getCityName(cityKey)}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {t(`city_${cityKey}_highlight`)}
                                </div>
                            </button>
                        ))}
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

                {/* Key Results - Yıllık Sabit Değerler */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center shadow-sm">
                        <div className="text-muted-foreground text-xs font-semibold uppercase mb-1">{t("netMonthly")}</div>
                        <div className="text-lg sm:text-xl font-bold text-green-600 flex items-center justify-center gap-1">
                            <DollarSign size={16} />
                            {Math.round(monthlyNetIncome).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center shadow-sm">
                        <div className="text-muted-foreground text-xs font-semibold uppercase mb-1">{t("netYearly")}</div>
                        <div className="text-lg sm:text-xl font-bold text-green-600 flex items-center justify-center gap-1">
                            <DollarSign size={16} />
                            {Math.round(yearlyNetIncome).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-primary/10 backdrop-blur-sm p-4 rounded-xl border border-primary/30 text-center shadow-sm">
                        <div className="text-primary text-xs font-semibold uppercase mb-1">{t("roiYearly")}</div>
                        <div className="text-lg sm:text-xl font-bold text-primary flex items-center justify-center gap-1">
                            <TrendingUp size={16} />
                            %{netRoi.toFixed(1)}
                        </div>
                    </div>
                    <div className="bg-accent/10 backdrop-blur-sm p-4 rounded-xl border border-accent/30 text-center shadow-sm">
                        <div className="text-accent-foreground text-xs font-semibold uppercase mb-1">{t("payback")}</div>
                        <div className="text-lg sm:text-xl font-bold text-accent flex items-center justify-center gap-1">
                            <Clock size={16} />
                            {paybackYears.toFixed(1)} {t("years")}
                        </div>
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
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("serviceFee")}:</span>
                            <span className="font-medium">${PASIFLOW_SERVICE_FEE.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("closingCosts")}:</span>
                            <span className="font-medium">${CLOSING_COSTS.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("annualTax")}:</span>
                            <span className="font-medium">${Math.round(yearlyPropertyTax).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("annualInsurance")}:</span>
                            <span className="font-medium">${Math.round(yearlyInsurance).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("managementFee")}:</span>
                            <span className="font-medium">${Math.round(yearlyManagement).toLocaleString()}{t("perYear")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">{t("maintenanceReserve")}:</span>
                            <span className="font-medium">${Math.round(yearlyMaintenance).toLocaleString()}{t("perYear")}</span>
                        </div>
                        <div className="flex justify-between font-bold text-primary border-t border-border/50 pt-2 mt-2">
                            <span>{t("totalCapital")}:</span>
                            <span>${totalInvestment.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                    {t("disclaimer")}
                </p>
            </div>
        </Card>
    )
}
