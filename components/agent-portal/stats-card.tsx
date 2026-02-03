"use client"

import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AgentStatsCardProps {
    title: string
    value: string
    subtitle?: string
    icon: LucideIcon
    trend?: {
        value: string
        positive: boolean
    }
    className?: string
}

export function AgentStatsCard({ title, value, subtitle, icon: Icon, trend, className }: AgentStatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Card className={cn("p-6 flex flex-col justify-between border-slate-100 shadow-sm overflow-hidden relative", className)}>
                {/* Animated Background Gradient */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#C1A05E]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                />

                <div className="flex items-start justify-between mb-4 relative z-10">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C1A05E]/10 to-[#C1A05E]/20 flex items-center justify-center border border-[#C1A05E]/20"
                    >
                        <Icon className="w-6 h-6 text-[#C1A05E]" />
                    </motion.div>
                    {trend && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className={cn(
                                "text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1",
                                trend.positive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                            )}
                        >
                            <motion.span
                                animate={{ y: trend.positive ? [-1, 1, -1] : 0 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                {trend.positive ? "↑" : "↓"}
                            </motion.span>
                            {trend.value}
                        </motion.div>
                    )}
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl font-bold text-slate-900 tracking-tight"
                    >
                        {value}
                    </motion.h3>
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xs text-slate-400 mt-2 font-medium"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </div>

                {/* Decorative Elements */}
                <motion.div
                    className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#C1A05E]/5 rounded-full blur-2xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </Card>
        </motion.div>
    )
}
