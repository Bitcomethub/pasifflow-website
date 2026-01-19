"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"

export function AboutSection() {
    const t = useTranslations("about")

    return (
        <section className="relative w-full bg-[#F6F7F9]">
            {/* HERO VIDEO/IMAGE SECTION - Fundrise Style */}
            <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center justify-center">
                {/* Background Image (Miami Office) */}
                <div className="absolute inset-0 z-0">
                    {/* Placeholder for Miami Office Video/Image - using a high quality office abstract for now */}
                    <img
                        src="/hero-family.png"
                        alt="Pasiflow Miami Office"
                        className="w-full h-full object-cover opacity-90 grayscale-[20%]"
                    />
                    {/* Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Centered Hero Content */}
                <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-[#EF7202] mb-4">
                            {t("badge") || "HAKKIMIZDA"}
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                            {t("description1")}
                        </p>
                    </motion.div>

                    {/* Play Button Style Indicator (Visual only as requested) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col items-center gap-4 pt-4"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all hover:scale-105 group">
                            <Play className="w-8 h-8 text-white fill-white group-hover:text-[#EF7202] group-hover:fill-[#EF7202] transition-colors ml-1" />
                        </div>
                        <span className="text-sm font-semibold tracking-wider uppercase text-white/80">Pasiflow Hikayesini İzle</span>
                    </motion.div>
                </div>
            </div>

            {/* Content Band - Values */}
            <div className="py-24 container mx-auto px-6 md:px-12 lg:px-16">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl lg:text-4xl font-serif text-[#1F2328] leading-relaxed"
                    >
                        "{t("description2")}"
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-[#E5E6E8]">
                        <div className="space-y-3">
                            <h3 className="text-[#EF7202] font-bold text-lg uppercase tracking-wide">Şeffaflık</h3>
                            <p className="text-[#535454] leading-relaxed">{t("transparencyDesc")}</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-[#EF7202] font-bold text-lg uppercase tracking-wide">Teknoloji</h3>
                            <p className="text-[#535454] leading-relaxed">Veri odaklı analizlerle en doğru yatırım kararları.</p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-[#EF7202] font-bold text-lg uppercase tracking-wide">Güven</h3>
                            <p className="text-[#535454] leading-relaxed">Amerika'da yerleşik hukuk ve yönetim ekibi.</p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <a href="#contact" className="inline-flex items-center gap-2 text-[#EF7202] font-bold text-lg hover:underline group">
                            Yönetim Ekibiyle Tanışın
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
