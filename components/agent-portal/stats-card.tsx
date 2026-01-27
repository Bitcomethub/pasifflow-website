

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
        <Card className={cn("p-6 flex flex-col justify-between border-slate-100 shadow-sm hover:shadow-md transition-shadow", className)}>
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#C1A05E]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#C1A05E]" />
                </div>
                {trend && (
                    <div className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        trend.positive ? "bg-[#C1A05E]/10 text-[#C1A05E]" : "bg-red-100 text-red-700"
                    )}>
                        {trend.positive ? "+" : "-"}{trend.value}
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
                {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
            </div>
        </Card>
    )
}
