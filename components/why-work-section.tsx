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
                        className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4"
                    >
                        {/* 20+ Experience - Blue */}
                        <div className="flex flex-col items-center justify-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
                                <Award className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">20+</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">YILLIK EMLAK DENEYİMİ</p>
                            </div>
                        </div>

                        {/* Full Management - Orange */}
                        <div className="flex flex-col items-center justify-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#EF7202] flex items-center justify-center transition-transform group-hover:scale-110">
                                <Home className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <Home className="w-8 h-8 text-[#EF7202] mx-auto mb-2 hidden" /> {/* Hidden but kept for structure logic if needed */}
                                <p className="text-slate-900 font-bold text-lg leading-tight">Tam Kapsamlı<br />Yönetim</p>
                            </div>
                        </div>

                        {/* AI Based - Purple */}
                        <div className="flex flex-col items-center justify-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">%100</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">YAPAY ZEKA TABANLI</p>
                            </div>
                        </div>

                        {/* Transaction Volume - Emerald */}
                        <div className="flex flex-col items-center justify-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110">
                                <LineChart className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">$100M+</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">İŞLEM HACMİ</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
