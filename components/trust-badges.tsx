"use client"

import { useTranslations } from "next-intl"
import { Shield, Star, Award, CheckCircle, Users, ShieldCheck, Trophy } from "lucide-react"

export function TrustBadges() {
    const t = useTranslations("trustBadges")

    const badges = [
        {
            icon: ShieldCheck,
            value: "20+",
            label: t("yearsExperience"),
            color: "text-[#C1A05E]",
            bg: "bg-[#C1A05E]/10",
            accent: "bg-[#C1A05E]"
        },
        {
            icon: Star,
            value: "4.9/5",
            label: t("googleRating"),
            color: "text-[#C1A05E]",
            bg: "bg-[#C1A05E]/10",
            accent: "bg-[#C1A05E]"
        },
        {
            icon: Users,
            value: "500+",
            label: t("happyInvestors"),
            color: "text-[#C1A05E]",
            bg: "bg-[#C1A05E]/10",
            accent: "bg-[#C1A05E]"
        },
        {
            icon: Trophy,
            value: "$100M+",
            label: t("transactionsValue"),
            color: "text-[#C1A05E]",
            bg: "bg-[#C1A05E]/10",
            accent: "bg-[#C1A05E]"
        }
    ]

    return (
        <section className="py-8 bg-transparent relative overflow-hidden border-t border-slate-200">
            {/* Decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8A074]/30 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {badges.map((badge) => (
                        <div
                            key={badge.label}
                            className="relative flex flex-col items-center text-center p-6 rounded-3xl bg-white/50 hover:bg-white transition-all duration-500 border border-transparent hover:border-[#B8A074]/20 group cursor-default"
                        >
                            {/* Icon container with hover effects */}
                            <div className={`relative w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${badge.bg}`}>
                                {/* Static border gradient */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-[#B8A074] to-[#a38d5d] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                                <badge.icon size={28} strokeWidth={1.5} className={`${badge.color} relative z-10`} />
                            </div>

                            {/* Value */}
                            <div className="relative">
                                <span className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-1 block bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
                                    {badge.value}
                                </span>
                                {/* Static underline accent */}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#B8A074] rounded-full" />
                            </div>

                            {/* Label */}
                            <span className="text-sm md:text-base text-slate-600 font-medium mt-3">
                                {badge.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
