"use client"

import { Progress } from "@/components/ui/progress"
import { Award, ChevronRight } from "lucide-react"

interface TierProgressProps {
    currentSales: number
}

const TIERS = [
    { name: "BAŞLANGIÇ", min: 0, max: 9, commission: "$1,500", passive: "1%" },
    { name: "GROWTH", min: 10, max: 49, commission: "$1,750", passive: "1.5%" },
    { name: "ELITE", min: 50, max: 99, commission: "$2,000", passive: "2%" },
    { name: "MASTER", min: 100, max: 999, commission: "$2,500", passive: "3%" },
]

export function AgentTierProgress({ currentSales }: TierProgressProps) {
    const currentTierIndex = TIERS.findIndex(t => currentSales >= t.min && currentSales <= t.max)
    const currentTier = TIERS[currentTierIndex] || TIERS[0]
    const nextTier = TIERS[currentTierIndex + 1]

    const progressValue = nextTier
        ? ((currentSales - currentTier.min) / (nextTier.min - currentTier.min)) * 100
        : 100

    return (
        <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C1A05E]/10 rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C1A05E] flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-[#C1A05E] tracking-widest uppercase mb-0.5">Mevcut Seviye</p>
                        <h4 className="text-xl font-bold tracking-tight">{currentTier.name}</h4>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-white leading-none">{currentSales}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase mt-1">Toplam Satış</p>
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">İlerleme</span>
                    {nextTier && (
                        <span className="text-white font-bold">{nextTier.min - currentSales} satış sonra {nextTier.name}</span>
                    )}
                </div>
                <Progress value={progressValue} className="h-2 bg-white/10" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 relative z-10 pt-6 border-t border-white/5">
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Satış Başı</p>
                    <p className="text-lg font-bold text-[#C1A05E]">{currentTier.commission}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Pasif Gelir</p>
                    <p className="text-lg font-bold text-[#C1A05E]">{currentTier.passive}</p>
                </div>
            </div>
        </div>
    )
}
