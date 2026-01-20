"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

export function AboutSection() {
    const t = useTranslations("about")

    return (
        <section className="relative w-full bg-white">
            {/* HERO SECTION - Fundrise Style */}
            <div className="relative w-full py-24 md:py-32 bg-[#F6F7F9] overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#EF7202]">
                            {t("badge") || "HAKKIMIZDA"}
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#001C32] leading-[1.1]">
                            {t("title")}
                        </h1>
                        <p className="text-lg md:text-2xl text-[#535454] font-medium max-w-2xl mx-auto leading-relaxed">
                            {t("description1")}
                        </p>
                    </motion.div>
                </div>
                {/* Subtle Geometric Background */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EF7202]/5 -skew-x-12 translate-x-1/2" />
            </div>

            {/* Video/Image Parallax Band */}
            <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
                <img
                    src="/hero-family.png"
                    alt="Pasiflow Miami Office"
                    className="w-full h-full object-cover grayscale-[20%]"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Band - Values */}
            <div className="py-24 container mx-auto px-6 md:px-12 lg:px-16">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#1F2328] leading-relaxed"
                    >
                        "{t("description2")}"
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-[#E5E6E8]">
                        <div className="space-y-3">
                            <h3 className="text-[#EF7202] font-bold text-lg uppercase tracking-wide">{t("transparencyTitle")}</h3>
                            <p className="text-[#535454] leading-relaxed">{t("transparencyDesc")}</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-[#EF7202] font-bold text-lg uppercase tracking-wide">{t("technologyTitle")}</h3>
                            <p className="text-[#535454] leading-relaxed">{t("technologyDesc")}</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-[#EF7202] font-bold text-lg uppercase tracking-wide">{t("trustTitle")}</h3>
                            <p className="text-[#535454] leading-relaxed">{t("trustDesc")}</p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <a href="#contact" className="inline-flex items-center gap-2 text-[#EF7202] font-bold text-lg hover:underline group">
                            {t("ctaTeam")}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
