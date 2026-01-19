"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Shield, Target, Eye, Cpu, Users, ArrowRight } from "lucide-react"

export function AboutSection() {
    const t = useTranslations("about")

    const principles = [
        { icon: Cpu, key: "principle1" },
        { icon: Target, key: "principle2" },
        { icon: Eye, key: "principle3" },
        { icon: Users, key: "principle4" },
    ]

    return (
        <section className="py-24 bg-[#001C32] relative overflow-hidden">
            {/* Navy dark section */}
            <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* LEFT Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EF7202]/20 text-[#EF7202] font-medium text-sm mb-8">
                            <Shield className="h-4 w-4" />
                            {t("badge")}
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                            {t("title")}
                        </h2>

                        <p className="text-lg text-[#C7CBD3] leading-relaxed mb-6">
                            {t("description1")}
                        </p>

                        <p className="text-lg text-[#EF7202] font-medium mb-8">
                            {t("description2")}
                        </p>

                        {/* Quote block */}
                        <div className="border-l-2 border-[#EF7202] pl-6 py-2 mb-8">
                            <p className="text-white font-medium mb-2">
                                {t("transparencyTitle")}
                            </p>
                            <p className="text-[#C7CBD3] leading-relaxed">
                                {t("transparencyDesc")}
                            </p>
                        </div>

                        <a href="#contact" className="inline-flex items-center gap-2 text-[#EF7202] font-medium hover:underline group">
                            Detaylı Bilgi Alın
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    {/* RIGHT - Principles Grid */}
                    <div className="grid sm:grid-cols-2 gap-5">
                        {principles.map((principle, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#EF7202]/30 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#EF7202]/10 flex items-center justify-center mb-4">
                                    <principle.icon className="h-5 w-5 text-[#EF7202]" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">
                                    {t(`${principle.key}Title`)}
                                </h3>
                                <p className="text-[#C7CBD3] text-sm leading-relaxed">
                                    {t(`${principle.key}Desc`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
