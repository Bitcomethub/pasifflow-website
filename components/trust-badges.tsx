"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Shield, Star, Award, CheckCircle, Users, ShieldCheck, Trophy } from "lucide-react"

export function TrustBadges() {
    const t = useTranslations("trustBadges")

    const badges = [
        {
            icon: ShieldCheck,
            value: "20+",
            label: t("yearsExperience"),
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: Star,
            value: "4.9/5",
            label: t("googleRating"), // Will update key in translation to be generic 'Score'
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        },
        {
            icon: Users,
            value: "50+",
            label: t("happyInvestors"),
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            icon: Trophy,
            value: "$50M+",
            label: t("transactionsValue"),
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ]

    return (
    return (
        <section className="py-12 bg-transparent relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-white/5 group"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${badge.color}`}>
                                <badge.icon size={32} strokeWidth={1.5} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                            </div>
                            <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
                                {badge.value}
                            </div>
                            <div className="text-sm font-medium text-slate-400 uppercase tracking-wide group-hover:text-primary transition-colors">
                                {badge.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
    )
}
