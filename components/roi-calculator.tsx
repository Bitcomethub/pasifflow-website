"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, Building2, MapPin, Calculator, Calendar, Lock } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { LeadGenModal } from "@/components/lead-gen-modal"
import Link from "next/link"
import { useLocale } from "next-intl"

const cityData = {
    detroit: {
        minBudget: 75000,
        maxBudget: 110000,
        avgRentRatio: 0.0125,
        taxRate: 0.014,
        insuranceRate: 0.011,
    },
}

const PASIFLOW_SERVICE_FEE = 5000
const MAINTENANCE_RESERVE_MONTHLY = 100
const MANAGEMENT_FEE_RATE = 0.10
const YEARLY_APPRECIATION_RATE = 0.07

const holdingPeriods = [1, 5, 10, 20]

export function RoiCalculator() {
    const t = useTranslations("roiCalculator")
    const locale = useLocale()
    const [selectedCity] = useState<keyof typeof cityData>("detroit")
    const [purchasePrice, setPurchasePrice] = useState(92500)
    const [holdingPeriod, setHoldingPeriod] = useState(5)
    const [isGuest, setIsGuest] = useState(true)
    const [showLeadModal, setShowLeadModal] = useState(false)

    useEffect(() => {
        const lead = localStorage.getItem("pasiflow_user_lead")
        if (lead) setIsGuest(false)
    }, [])

    const city = cityData[selectedCity]

    const DOWN_PAYMENT_RATE = 0.20
    const ORIGINATION_FEE_RATE = 0.05
    const MORTGAGE_INTEREST_RATE = 0.07
    const MORTGAGE_TERM_YEARS = 30

    const downPayment = purchasePrice * DOWN_PAYMENT_RATE
    const financeAmount = purchasePrice - downPayment
    const originationFee = financeAmount * ORIGINATION_FEE_RATE
    const totalInvestment = downPayment + originationFee + PASIFLOW_SERVICE_FEE

    const monthlyInterestRate = MORTGAGE_INTEREST_RATE / 12
    const numberOfPayments = MORTGAGE_TERM_YEARS * 12
    const monthlyMortgagePayment = financeAmount * (
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    )
    const yearlyMortgagePayment = monthlyMortgagePayment * 12

    const monthlyRent = purchasePrice * city.avgRentRatio
    const yearlyRent = monthlyRent * 12

    const yearlyPropertyTax = purchasePrice * city.taxRate
    const yearlyInsurance = purchasePrice * city.insuranceRate
    const yearlyManagement = yearlyRent * MANAGEMENT_FEE_RATE
    const yearlyMaintenance = MAINTENANCE_RESERVE_MONTHLY * 12
    const totalOperatingExpenses = yearlyPropertyTax + yearlyInsurance + yearlyManagement + yearlyMaintenance

    const yearlyNetIncome = yearlyRent - totalOperatingExpenses - yearlyMortgagePayment
    const monthlyNetIncome = yearlyNetIncome / 12

    const netRoi = (yearlyNetIncome / totalInvestment) * 100

    const futurePropertyValue = purchasePrice * Math.pow(1 + YEARLY_APPRECIATION_RATE, holdingPeriod)
    const appreciationAmount = futurePropertyValue - purchasePrice
    const totalRentalIncome = yearlyNetIncome * holdingPeriod
    const totalReturn = totalRentalIncome + appreciationAmount
    const totalRoiPercent = (totalReturn / totalInvestment) * 100

    return (
        <Card className="p-6 sm:p-8 bg-white border-[#e5e4df] shadow-lg relative overflow-hidden rounded-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#a3452b]/10 rounded-lg flex items-center justify-center">
                    <Calculator className="text-[#a3452b] w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-[#151513]">{t("title")}</h3>
                    <p className="text-sm text-[#6b6b67]">Detroit, MI</p>
                </div>
            </div>

            <div className="space-y-5 relative z-10">
                {/* Purchase Price Slider */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2 text-[#6b6b67]">
                            <Building2 size={14} className="text-[#a3452b]" />
                            {t("purchasePrice")}
                        </span>
                        <span className="text-[#a3452b] font-semibold">${purchasePrice.toLocaleString()}</span>
                    </div>
                    <Slider
                        value={[purchasePrice]}
                        onValueChange={(vals) => setPurchasePrice(vals[0])}
                        min={city.minBudget}
                        max={city.maxBudget}
                        step={5000}
                        className="py-2 cursor-pointer"
                    />
                </div>

                {/* Holding Period - Compact */}
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm text-[#6b6b67] flex items-center gap-1">
                        <Calendar size={14} className="text-[#a3452b]" />
                        Süre:
                    </span>
                    {holdingPeriods.map((years) => (
                        <button
                            key={years}
                            onClick={() => setHoldingPeriod(years)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${holdingPeriod === years
                                ? "bg-[#a3452b] text-white"
                                : "bg-[#f5f3ed] text-[#151513] hover:bg-[#e5e4df]"
                                }`}
                        >
                            {years}Y
                        </button>
                    ))}
                </div>

                {/* Main Metrics - 2x2 Compact Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#faf9f6] rounded-xl p-4 text-center border border-[#e5e4df]">
                        <p className="text-xs text-[#6b6b67] mb-1">Aylık Nakit Akışı</p>
                        <p className={`text-2xl font-bold ${monthlyNetIncome >= 0 ? 'text-primary' : 'text-secondary'}`}>
                            ${Math.round(monthlyNetIncome)}
                        </p>
                    </div>
                    <div className="bg-[#faf9f6] rounded-xl p-4 text-center border border-[#e5e4df]">
                        <p className="text-xs text-[#6b6b67] mb-1">Cash-on-Cash</p>
                        <p className="text-2xl font-bold text-[#151513]">{netRoi.toFixed(1)}%</p>
                    </div>
                    <div className="bg-[#faf9f6] rounded-xl p-4 text-center border border-[#e5e4df]">
                        <p className="text-xs text-[#6b6b67] mb-1">{holdingPeriod}Y Değer Artışı</p>
                        <p className="text-2xl font-bold text-[#22c55e]">+${Math.round(appreciationAmount / 1000)}K</p>
                    </div>
                    <div className="bg-[#a3452b] rounded-xl p-4 text-center">
                        <p className="text-xs text-white/70 mb-1">{holdingPeriod}Y Toplam ROI</p>
                        <p className="text-2xl font-bold text-white">{totalRoiPercent.toFixed(0)}%</p>
                    </div>
                </div>

                {/* Investment Summary - Single Line */}
                <div className="bg-[#f5f3ed] rounded-lg p-3 flex items-center justify-between text-sm">
                    <span className="text-[#6b6b67]">Toplam Yatırım:</span>
                    <span className="font-semibold text-[#151513]">${Math.round(totalInvestment).toLocaleString()}</span>
                </div>

                {/* GUEST OVERLAY */}
                {isGuest && (
                    <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 rounded-2xl">
                        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm border border-[#e5e4df]">
                            <div className="w-14 h-14 bg-[#a3452b]/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                                <Lock className="w-7 h-7 text-[#a3452b]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-[#151513]">Hesaplayıcıyı Açın</h3>
                            <p className="text-[#6b6b67] text-sm mb-6">
                                ROI analizlerini görmek için ücretsiz üye olun.
                            </p>
                            <Button
                                className="w-full h-12 font-medium bg-[#a3452b] hover:bg-[#8a3a24] text-white rounded-lg"
                                asChild
                            >
                                <Link href={`/${locale}/signup`}>
                                    Ücretsiz Başla
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}

                <p className="text-xs text-center text-[#9b9b97]">
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
        </Card >
    )
}
