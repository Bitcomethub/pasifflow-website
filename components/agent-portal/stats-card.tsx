"use client"

import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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
        <Card className={cn("p-6 flex flex-col justify-between border-slate-100 shadow-sm overflow-hidden relative", className)}>
            {/* Static Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C1A05E]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C1A05E]/10 to-[#C1A05E]/20 flex items-center justify-center border border-[#C1A05E]/20">
                    <Icon className="w-6 h-6 text-[#C1A05E]" />
                </div>
                {trend && (
                    <div className={cn(
                        "text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1",
                        trend.positive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    )}>
                        <span>{trend.positive ? "↑" : "↓"}</span>
                        {trend.value}
                    </div>
                )}
            </div>
            <div className="relative z-10">
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {value}
                </h3>
                {subtitle && (
                    <p className="text-xs text-slate-400 mt-2 font-medium">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Static Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#C1A05E]/5 rounded-full blur-2xl" />
        </Card>
    )
}
