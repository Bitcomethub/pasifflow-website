"use client"

import { Progress } from "@/components/ui/progress"
import { Award, ChevronRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl overflow-hidden relative"
        >
            {/* Animated Background Accents */}
            <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-[#C1A05E]/10 rounded-full -mr-16 -mt-16 blur-2xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-[#C1A05E]/5 rounded-full -ml-12 -mb-12 blur-2xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />

            {/* Floating Sparkles */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        top: `${20 + i * 20}%`,
                        right: `${10 + i * 15}%`,
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    >
                        <Sparkles className="w-4 h-4 text-[#C1A05E]" />
                    </motion.div>
                </motion.div>
            ))}

            <div className="flex items-start justify-between mb-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-10 h-10 rounded-xl bg-[#C1A05E] flex items-center justify-center shadow-lg shadow-[#C1A05E]/30"
                    >
                        <Award className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <p className="text-xs font-bold text-[#C1A05E] tracking-widest uppercase mb-0.5">Mevcut Seviye</p>
                        <h4 className="text-xl font-bold tracking-tight">{currentTier.name}</h4>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="text-right"
                >
                    <motion.p
                        key={currentSales}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-white leading-none"
                    >
                        {currentSales}
                    </motion.p>
                    <p className="text-xs text-slate-400 font-bold uppercase mt-1">Toplam Satış</p>
                </motion.div>
            </div>

            <motion.div
                className="space-y-3 relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-medium">İlerleme</span>
                    {nextTier && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-white font-bold flex items-center gap-2"
                        >
                            {nextTier.min - currentSales} satış sonra
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                {nextTier.name}
                            </motion.span>
                            <ChevronRight className="w-4 h-4" />
                        </motion.span>
                    )}
                </div>
                <div className="relative">
                    <Progress
                        value={progressValue}
                        className="h-3 bg-white/10 rounded-full overflow-hidden"
                    />
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C1A05E] to-[#D4B46E] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressValue}%` }}
                        transition={{ type: "spring", duration: 1 }}
                    />
                </div>
            </motion.div>

            <motion.div
                className="mt-8 grid grid-cols-2 gap-4 relative z-10 pt-6 border-t border-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                >
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Satış Başı</p>
                    <p className="text-lg font-bold text-[#C1A05E]">{currentTier.commission}</p>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                >
                    <p className="text-xs text-slate-400 font-bold uppercase mb-1">Pasif Gelir</p>
                    <p className="text-lg font-bold text-[#C1A05E]">{currentTier.passive}</p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
