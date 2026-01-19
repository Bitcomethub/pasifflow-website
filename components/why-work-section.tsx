"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Globe, Cpu, Handshake, MessageSquare, CheckCircle2, Home, Award, Sparkles, Headset, LineChart, ShieldCheck, Users, Trophy, Star } from "lucide-react"

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
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">20+</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">YILLIK EMLAK DENEYİMİ</p>
                            </div>
                        </div>

                        {/* Customer Satisfaction - Yellow */}
                        <div className="flex flex-col items-center justify-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center transition-transform group-hover:scale-110">
                                <Star className="w-8 h-8 fill-current" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">4.9/5</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">MÜŞTERİ MEMNUNİYETİ</p>
                            </div>
                        </div>

                        {/* Happy Investors - Green */}
                        <div className="flex flex-col items-center justify-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center transition-transform group-hover:scale-110">
                                <Users className="w-8 h-8" />
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900">50+</p>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">MUTLU YATIRIMCI</p>
                            </div>
                        </div>

                        {/* Transaction Volume - Purple */}
                        <div className="flex flex-col items-center justify-center gap-4 group">
                            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
                                <Trophy className="w-8 h-8" />
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
