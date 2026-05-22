"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Smartphone, Clock, BarChart3, FolderOpen, MessageCircle, TrendingUp } from "lucide-react"
import Image from "next/image"

export function AppFeaturesSection() {
    const t = useTranslations("appFeatures")

    const features = [
        { icon: Clock, key: "feature1" },
        { icon: Smartphone, key: "feature2" },
        { icon: BarChart3, key: "feature3" },
        { icon: FolderOpen, key: "feature4" },
        { icon: MessageCircle, key: "feature5" },
        { icon: TrendingUp, key: "feature6" },
    ]

    return (
        <section className="py-14 sm:py-20 lg:py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#B8A074]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#3D4852]/30 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-5 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#B8A074] text-white font-bold text-xs uppercase tracking-widest mb-6 shadow-lg">
                            <Smartphone className="w-4 h-4" />
                            <span>{t("badge")}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">{t("title")}</h2>
                        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8">{t("subtitle")}</p>
                        <p className="text-white/60 mb-8">{t("description")}</p>

                        <div className="grid gap-4">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#B8A074] flex items-center justify-center shadow-md">
                                        <feature.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <p className="text-white text-sm leading-relaxed pt-2 font-medium">{t(feature.key)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Phone Mockup with App Screenshot */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center order-first lg:order-last mb-8 lg:mb-0"
                    >
                        <div className="relative w-48 h-96 lg:w-[300px] lg:h-[600px] bg-[#3D4852] rounded-[2rem] lg:rounded-[3rem] border-4 border-[#B8A074]/30 shadow-2xl overflow-hidden">
                            {/* Phone notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#3D4852] rounded-b-2xl z-10" />

                            {/* App Screenshot */}
                            <Image
                                src="/app-screenshot.png"
                                alt="Pasiflow App Dashboard"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <a
                                href="https://app.pasiflow.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform hover:scale-105"
                            >
                                <img
                                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                    alt="Download on App Store"
                                    className="h-12"
                                />
                            </a>
                        </div>
                        <p className="text-white/60 text-sm mt-4 italic">{t("badgeText")}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
