"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Globe, Cpu, Handshake, MessageSquare, CheckCircle2, Home, Award, Sparkles, Headset, LineChart } from "lucide-react"

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
                        {/* 20+ Experience - Blue */}
                        <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col items-center justify-center gap-3 group">
                            <div className="p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                <Award className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-900">20+</p>
                                <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mt-1">Yıllık Emlak Deneyimi</p>
                            </div>
                        </div>

                        {/* Full Management - Orange */}
                        <div className="bg-white rounded-2xl p-8 border border-orange-100 shadow-xl shadow-orange-900/5 hover:shadow-2xl hover:shadow-orange-900/10 transition-all flex flex-col items-center justify-center gap-3 group">
                            <div className="p-4 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors">
                                <Home className="w-8 h-8 text-[#EF7202]" />
                            </div>
                            <div className="text-center">
                                <p className="text-slate-900 font-bold text-lg leading-tight">Tam Kapsamlı<br />Yönetim</p>
                            </div>
                        </div>

                        {/* AI Based - Purple */}
                        <div className="bg-white rounded-2xl p-8 border border-purple-100 shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-900/10 transition-all flex flex-col items-center justify-center gap-3 group">
                            <div className="p-4 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors">
                                <Sparkles className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-900">%100</p>
                                <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mt-1">Yapay Zeka Tabanlı</p>
                            </div>
                        </div>

                        {/* Transaction Volume - Emerald */}
                        <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-xl shadow-emerald-900/5 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all flex flex-col items-center justify-center gap-3 group">
                            <div className="p-4 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                                <LineChart className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-slate-900">$100M+</p>
                                <p className="text-slate-600 text-xs font-medium uppercase tracking-wide mt-1">İşlem Hacmi</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
