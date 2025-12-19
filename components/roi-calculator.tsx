"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, PieChart, Building2, MapPin, Calculator, Clock } from "lucide-react"
import { useTranslations } from "next-intl"

// City-specific data based on PDF
const cityData = {
    detroit: {
        name: "Detroit, MI",
        minBudget: 75000,
        maxBudget: 110000,
        avgRentRatio: 0.0125, // Monthly rent as % of purchase price
        taxRate: 0.014, // Annual property tax as % of purchase
        insuranceRate: 0.011, // Annual insurance as % of purchase
        appreciationRate: 0.08, // 5-year appreciation (annual)
        riskLevel: "Orta",
        highlight: "Maksimum Nakit Akışı"
    },
    cleveland: {
        name: "Cleveland, OH",
        minBudget: 85000,
        maxBudget: 120000,
        avgRentRatio: 0.012,
        taxRate: 0.010,
        insuranceRate: 0.012,
        appreciationRate: 0.06,
        riskLevel: "Düşük-Orta",
        highlight: "Dengeli & Güvenli"
    },
    memphis: {
        name: "Memphis, TN",
        minBudget: 90000,
        maxBudget: 130000,
        avgRentRatio: 0.011,
        taxRate: 0.008, // No state income tax advantage
        insuranceRate: 0.012,
        appreciationRate: 0.10,
        riskLevel: "Orta",
        highlight: "Vergi Avantajı + Büyüme"
    }
}

const PASIFLOW_SERVICE_FEE = 5000
const MANAGEMENT_FEE_RATE = 0.10 // 10% of monthly rent

export function RoiCalculator() {
    const [selectedCity, setSelectedCity] = useState<keyof typeof cityData>("detroit")
    const [purchasePrice, setPurchasePrice] = useState(100000)

    const city = cityData[selectedCity]

    // Calculations based on PDF formula
    const calculations = useMemo(() => {
        // Monthly rent estimate
        const monthlyRent = purchasePrice * city.avgRentRatio
        const yearlyRent = monthlyRent * 12

        // Annual expenses
        const yearlyPropertyTax = purchasePrice * city.taxRate
        const yearlyInsurance = purchasePrice * city.insuranceRate
        const yearlyManagement = yearlyRent * MANAGEMENT_FEE_RATE

        const totalYearlyExpenses = yearlyPropertyTax + yearlyInsurance + yearlyManagement

        // Net income
        const yearlyNetIncome = yearlyRent - totalYearlyExpenses
        const monthlyNetIncome = yearlyNetIncome / 12

        // Total investment (purchase + Pasiflow fee)
        const totalInvestment = purchasePrice + PASIFLOW_SERVICE_FEE

        // ROI calculation (Net ROI %)
        const netRoi = (yearlyNetIncome / totalInvestment) * 100

        // Payback period (Amortisman süresi)
        const paybackYears = totalInvestment / yearlyNetIncome

        // 5-year appreciation
        const appreciation5Years = purchasePrice * (Math.pow(1 + city.appreciationRate, 5) - 1)

        // Total 5-year return (income + appreciation)
        const total5YearReturn = (yearlyNetIncome * 5) + appreciation5Years

        return {
            monthlyRent,
            monthlyNetIncome,
            yearlyNetIncome,
            yearlyPropertyTax,
            yearlyInsurance,
            yearlyManagement,
            totalInvestment,
            netRoi,
            paybackYears,
            appreciation5Years,
            total5YearReturn
        }
    }, [purchasePrice, city])

    return (
        <Card className="p-8 bg-gradient-to-br from-card to-secondary/10 border-border/50 shadow-2xl relative overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-center mb-2 flex items-center justify-center gap-2">
                <Calculator className="text-accent" />
                Yatırım Getiri Hesaplayıcı
            </h3>
            <p className="text-center text-muted-foreground text-sm mb-6">
                Gerçek verilerle net ROI hesaplaması ($5,000 Pasiflow ücreti dahil)
            </p>

            <div className="space-y-6 relative z-10">
                {/* City Selection */}
                <div className="space-y-2">
                    <label className="font-semibold text-sm flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        Yatırım Şehri Seçin
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {(Object.keys(cityData) as Array<keyof typeof cityData>).map((cityKey) => (
                            <button
                                key={cityKey}
                                onClick={() => {
                                    setSelectedCity(cityKey)
                                    // Reset to city's average budget
                                    const c = cityData[cityKey]
                                    setPurchasePrice(Math.round((c.minBudget + c.maxBudget) / 2))
                                }}
                                className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${selectedCity === cityKey
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border hover:border-primary/50 hover:bg-muted"
                                    }`}
                            >
                                <div className="font-bold">{cityData[cityKey].name}</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {cityData[cityKey].highlight}
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
                            Satın Alma Fiyatı
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

                {/* Key Results */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center shadow-sm">
                        <div className="text-muted-foreground text-xs font-semibold uppercase mb-1">Aylık Net Gelir</div>
                        <div className="text-xl font-bold text-green-600 flex items-center justify-center gap-1">
                            <DollarSign size={16} />
                            {Math.round(calculations.monthlyNetIncome).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center shadow-sm">
                        <div className="text-muted-foreground text-xs font-semibold uppercase mb-1">Yıllık Net Gelir</div>
                        <div className="text-xl font-bold text-green-600 flex items-center justify-center gap-1">
                            <DollarSign size={16} />
                            {Math.round(calculations.yearlyNetIncome).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-primary/10 backdrop-blur-sm p-4 rounded-xl border border-primary/30 text-center shadow-sm">
                        <div className="text-primary text-xs font-semibold uppercase mb-1">Net ROI</div>
                        <div className="text-xl font-bold text-primary flex items-center justify-center gap-1">
                            <TrendingUp size={16} />
                            %{calculations.netRoi.toFixed(1)}
                        </div>
                    </div>
                    <div className="bg-accent/10 backdrop-blur-sm p-4 rounded-xl border border-accent/30 text-center shadow-sm">
                        <div className="text-accent-foreground text-xs font-semibold uppercase mb-1">Amortisman</div>
                        <div className="text-xl font-bold text-accent flex items-center justify-center gap-1">
                            <Clock size={16} />
                            {calculations.paybackYears.toFixed(1)} Yıl
                        </div>
                    </div>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                    <div className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <PieChart size={16} className="text-primary" />
                        Maliyet Detayları
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Mülk Fiyatı:</span>
                            <span className="font-medium">${purchasePrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Pasiflow Ücreti:</span>
                            <span className="font-medium">${PASIFLOW_SERVICE_FEE.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Yıllık Emlak Vergisi:</span>
                            <span className="font-medium">${Math.round(calculations.yearlyPropertyTax).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Yıllık Sigorta:</span>
                            <span className="font-medium">${Math.round(calculations.yearlyInsurance).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Yönetim (%10):</span>
                            <span className="font-medium">${Math.round(calculations.yearlyManagement).toLocaleString()}/yıl</span>
                        </div>
                        <div className="flex justify-between font-semibold text-primary">
                            <span>Toplam Yatırım:</span>
                            <span>${calculations.totalInvestment.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* 5-Year Projection */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4">
                    <div className="text-center">
                        <div className="text-sm font-semibold text-muted-foreground mb-1">5 Yıllık Toplam Getiri Tahmini</div>
                        <div className="text-2xl font-bold text-primary">
                            ${Math.round(calculations.total5YearReturn).toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            (Kira geliri + %{(city.appreciationRate * 100).toFixed(0)}/yıl değer artışı)
                        </div>
                    </div>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                    * Rakamlar {city.name} piyasa ortalamalarına dayalı tahminlerdir. Kesin sonuçlar mülk özelinde değişebilir.
                </p>
            </div>
        </Card>
    )
}
