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
                    {badges.map((badge, index) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{
                                delay: index * 0.15,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="relative flex flex-col items-center text-center p-6 rounded-3xl bg-white/50 hover:bg-white transition-all duration-500 border border-transparent hover:border-[#B8A074]/20 group cursor-default"
                        >
                            {/* Animated glow effect */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#B8A074]/5 to-transparent pointer-events-none"
                            />

                            {/* Icon container with enhanced effects */}
                            <div className={`relative w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${badge.bg}`}>
                                {/* Animated border gradient */}
                                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-br from-[#B8A074] to-[#a38d5d] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                                <motion.div
                                    animate={{
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.5
                                    }}
                                >
                                    <badge.icon size={28} strokeWidth={1.5} className={`${badge.color} relative z-10`} />
                                </motion.div>

                                {/* Sparkle effect */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="absolute top-1 right-1 w-2 h-2 bg-[#B8A074] rounded-full"
                                />
                            </div>

                            {/* Value with animated count effect */}
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                <span className="text-2xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-1 block bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">
                                    {badge.value}
                                </span>
                                {/* Underline accent */}
                                <motion.div
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    whileInView={{ scaleX: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#B8A074] rounded-full"
                                />
                            </motion.div>

                            <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider group-hover:text-[#B8A074] transition-colors duration-300 mt-2">
                                {badge.label}
                            </div>

                            {/* Floating particles on hover */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileHover={{
                                            opacity: [0, 0.5, 0],
                                            y: -20
                                        }}
                                        transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                        className="absolute w-1 h-1 bg-[#B8A074] rounded-full"
                                        style={{
                                            left: `${20 + i * 30}%`,
                                            top: "60%"
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
