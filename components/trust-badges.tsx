"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Shield, Star, Award, CheckCircle, Users } from "lucide-react"

export function TrustBadges() {
    const t = useTranslations("trustBadges")

    const badges = [
        {
            icon: Shield,
            value: "20+",
            labelKey: "yearsExperience",
            color: "text-primary"
        },
        {
            icon: Star,
            value: "4.9",
            labelKey: "googleRating",
            color: "text-amber-500"
        },
        {
            icon: Users,
            value: "500+",
            labelKey: "happyInvestors",
            color: "text-green-500"
        },
        {
            icon: Award,
            value: "$50M+",
            labelKey: "transactionsValue",
            color: "text-blue-500"
        },
    ]

    return (
        <section className="py-12 bg-muted/30 border-y border-border/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={badge.labelKey}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className={`w-14 h-14 rounded-full bg-background border border-border/50 flex items-center justify-center mb-3 shadow-sm ${badge.color}`}>
                                <badge.icon size={24} />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-foreground">{badge.value}</div>
                            <div className="text-sm text-muted-foreground">{t(badge.labelKey)}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
