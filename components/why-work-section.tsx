"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Globe, Cpu, MessageCircle, ShieldCheck, Layout, Headphones } from "lucide-react"

export function WhyWorkSection() {
    const t = useTranslations("whyWork")

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="space-y-12">
                    {/* Header (Centered) */}
                    <div className="text-center max-w-3xl mx-auto space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-bold text-slate-900"
                        >
                            {t("title")}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-slate-600"
                        >
                            {t("subtitle")}
                        </motion.p>
                    </div>

                    {/* Stats Grid - Side by Side (4 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { label: t("stat1Label"), value: t("stat1Value"), icon: ShieldCheck },
                            { label: t("stat2Label"), value: t("stat2Value"), icon: Layout },
                            { label: t("stat3Label"), value: t("stat3Value"), icon: Cpu },
                            { label: t("stat4Label"), value: t("stat4Value"), icon: Headphones },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E6E8] hover:shadow-md transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#FEEBE5] text-[#EF7202] flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <p className="text-2xl font-bold text-[#001C32] mb-1">{stat.value}</p>
                                <p className="text-sm text-[#535454] font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
