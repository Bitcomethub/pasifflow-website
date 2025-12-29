"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Shield, Target, Eye, Cpu, Users, TrendingUp } from "lucide-react"

export function AboutSection() {
    const t = useTranslations("about")

    const principles = [
        { icon: Cpu, key: "principle1" },
        { icon: Target, key: "principle2" },
        { icon: Eye, key: "principle3" },
        { icon: Users, key: "principle4" },
    ]

    return (
        <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                            <Shield className="h-4 w-4" />
                            {t("badge")}
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            {t("title")}
                        </h2>
                    </motion.div>

                    {/* Main Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 shadow-xl mb-12"
                    >
                        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                            {t("description1")}
                        </p>
                        <p className="text-lg md:text-xl text-primary font-semibold mb-6">
                            {t("description2")}
                        </p>
                        <div className="border-l-4 border-accent pl-6 py-2">
                            <p className="text-lg text-foreground font-medium mb-2">
                                {t("transparencyTitle")}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                {t("transparencyDesc")}
                            </p>
                        </div>
                    </motion.div>

                    {/* Principles Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {principles.map((principle, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
                            >
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <principle.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground mb-1">
                                        {t(`${principle.key}Title`)}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {t(`${principle.key}Desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
