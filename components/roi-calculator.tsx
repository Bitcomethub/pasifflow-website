"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp, PieChart } from "lucide-react"

export function RoiCalculator() {
    const [investment, setInvestment] = useState(100000)

    // Assumptions
    const monthlyRent = investment * 0.012 // ~1.2% rule roughly or slightly aggressive
    const netYearly = investment * 0.11 // ~11% net cap rate
    const appreciation5Years = investment * 0.45 // ~45% over 5 years

    return (
        <Card className="p-8 bg-gradient-to-br from-card to-secondary/10 border-border/50 shadow-2xl relative overflow-hidden">
            {/* Background blobs for premium feel */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                <PieChart className="text-accent" />
                Yatırım Getiri Hesaplayıcı
            </h3>

            <div className="space-y-8 relative z-10">
                <div className="space-y-4">
                    <div className="flex justify-between font-semibold">
                        <span>Yatırım Tutarı</span>
                        <span className="text-primary font-bold text-lg">${investment.toLocaleString()}</span>
                    </div>
                    <Slider
                        value={[investment]}
                        onValueChange={(vals) => setInvestment(vals[0])}
                        min={80000}
                        max={200000}
                        step={5000}
                        className="py-4 cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$80K</span>
                        <span>$200K</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center shadow-sm">
                        <div className="text-muted-foreground text-xs font-semibold uppercase mb-1">Aylık Kira (Tahmini)</div>
                        <div className="text-xl font-bold text-primary flex items-center justify-center gap-1">
                            <DollarSign size={16} />
                            {Math.round(monthlyRent).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center shadow-sm">
                        <div className="text-muted-foreground text-xs font-semibold uppercase mb-1">Yıllık Net Getiri</div>
                        <div className="text-xl font-bold text-green-600 flex items-center justify-center gap-1">
                            <DollarSign size={16} />
                            {Math.round(netYearly).toLocaleString()}
                        </div>
                    </div>
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-xl border border-border/50 text-center shadow-sm">
                        <div className="text-muted-foreground text-xs font-semibold uppercase mb-1">5 Yıllık Değer Artışı</div>
                        <div className="text-xl font-bold text-accent flex items-center justify-center gap-1">
                            <TrendingUp size={16} />
                            {Math.round(appreciation5Years).toLocaleString()}
                        </div>
                    </div>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                    * Rakamlar piyasa ortalamalarına dayalı tahminlerdir. Kesin sonuçlar mülk özelinde değişebilir.
                </p>
            </div>
        </Card>
    )
}
