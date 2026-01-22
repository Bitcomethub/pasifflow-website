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
            color: "text-slate-600",
            bg: "bg-slate-100"
        },
        {
            icon: Trophy,
            value: "$100M+",
            label: t("transactionsValue"),
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ]

    return (
        <section className="py-12 bg-transparent relative overflow-hidden border-t border-slate-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-white transition-all duration-500 border border-transparent hover:border-slate-100 hover:shadow-[0_20px_40px_-20px_rgba(30,40,75,0.1)] group"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${badge.bg}`}>
                                <badge.icon size={36} strokeWidth={1.5} className={badge.color} />
                            </div>
                            <div className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                                {badge.value}
                            </div>
                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest group-hover:text-primary transition-colors">
                                {badge.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
