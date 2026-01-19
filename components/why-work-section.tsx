"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Globe, Cpu, Handshake, MessageSquare, CheckCircle2, Home } from "lucide-react"

export function WhyWorkSection() {
    const t = useTranslations("whyWork")

    const reasons = [
        { icon: MapPin, key: "reason1" },
        { icon: Globe, key: "reason2" },
        { icon: Cpu, key: "reason3" },
        { icon: MessageSquare, key: "reason5" },
    ]

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t("title")}</h2>
                        <p className="text-lg text-muted-foreground mb-10">{t("subtitle")}</p>

                        <div className="space-y-5">
                            {reasons.map((reason, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <reason.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="text-foreground/90 leading-relaxed pt-2">{t(reason.key)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Stats/Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-md hover:shadow-lg transition-shadow">
                            <p className="text-4xl font-bold text-slate-900 mb-2">20+</p>
                            <p className="text-slate-600 text-sm font-medium">Amerika Emlak Tecrübesi</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-2">
                            <Home className="w-12 h-12 text-[#EF7202] mb-2" />
                            <p className="text-slate-600 text-sm font-medium">Tam Kapsamlı Yönetim</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-md hover:shadow-lg transition-shadow">
                            <p className="text-4xl font-bold text-emerald-600 mb-2">%100</p>
                            <p className="text-slate-600 text-sm font-medium">Yapay Zeka Tabanlı</p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-md hover:shadow-lg transition-shadow">
                            <p className="text-4xl font-bold text-slate-900 mb-2">7/24</p>
                            <p className="text-slate-600 text-sm font-medium">Destek</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
