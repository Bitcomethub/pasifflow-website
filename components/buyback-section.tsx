"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Shield, Clock, CheckCircle2, DollarSign, FileCheck, Building2, ArrowRight } from "lucide-react"

export function BuybackSection() {
    const t = useTranslations("buyback")

    const eligibilityItems = [
        { icon: Building2, text: t("eligibility1") },
        { icon: FileCheck, text: t("eligibility2") },
        { icon: CheckCircle2, text: t("eligibility3") },
    ]

    const benefits = [
        t("benefit1"),
        t("benefit2"),
        t("benefit3"),
        t("benefit4"),
    ]

    return (
        <section id="buyback" className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest mb-6 shadow-lg">
                        <Shield className="w-4 h-4" />
                        <span>{t("badge")}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        {t("title")} <span className="text-[#B8A074]">{t("titleAccent")}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left - Core Promise Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card className="p-8 md:p-10 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl relative overflow-hidden">
                            {/* Shield Icon Background */}
                            <div className="absolute -right-8 -top-8 opacity-10">
                                <Shield className="w-40 h-40 text-primary" />
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-[#B8A074]/20 flex items-center justify-center">
                                        <DollarSign className="w-6 h-6 text-[#B8A074]" />
                                    </div>
                                    {t("corePromiseTitle")}
                                </h3>

                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    {t("corePromiseDesc")}
                                </p>

                                {/* Key Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 rounded-xl bg-background/50 border border-primary/10">
                                        <div className="text-3xl font-bold text-primary mb-1">90%</div>
                                        <div className="text-sm text-muted-foreground">{t("appraisalValue")}</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-background/50 border border-primary/10">
                                        <div className="text-3xl font-bold text-primary mb-1">45</div>
                                        <div className="text-sm text-muted-foreground">{t("closingDays")}</div>
                                    </div>
                                </div>

                                {/* Benefits List */}
                                <ul className="space-y-3">
                                    {benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                            <span className="text-foreground">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Right - Eligibility & Time Window */}
                    <div className="space-y-6">
                        {/* Time Window */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Card className="p-6 border-muted bg-card/50">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#B8A074]/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-[#B8A074]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-2">{t("timeWindowTitle")}</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {t("timeWindowDesc")}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Eligibility */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <Card className="p-6 border-muted bg-card/50">
                                <h4 className="font-bold text-foreground mb-4">{t("eligibilityTitle")}</h4>
                                <div className="space-y-3">
                                    {eligibilityItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#B8A074]/10 flex items-center justify-center">
                                                <item.icon className="w-4 h-4 text-[#B8A074]" />
                                            </div>
                                            <span className="text-sm text-muted-foreground">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <div className="inline-block px-12 py-8 bg-[#C1A05E] rounded-[4rem] shadow-2xl shadow-[#C1A05E]/20 max-w-4xl border-2 border-white/20">
                        <p className="text-xl md:text-2xl font-bold text-white italic leading-relaxed">
                            "{t("quote")}"
                        </p>
                    </div>
                </motion.div>

                {/* Disclaimer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-center text-xs text-muted-foreground mt-8 max-w-3xl mx-auto"
                >
                    {t("disclaimer")}
                </motion.p>
            </div>
        </section>
    )
}
