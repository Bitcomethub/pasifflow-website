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
        <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-accent/80 text-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("title")}</h2>
                        <p className="text-xl text-white/80 mb-8">{t("subtitle")}</p>
                        <p className="text-white/70 mb-8">{t("description")}</p>

                        <div className="grid gap-4">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                                        <feature.icon className="h-5 w-5 text-white" />
                                    </div>
                                    <p className="text-white/90 text-sm leading-relaxed pt-2">{t(feature.key)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Phone Mockup with App Screenshot */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex justify-center"
                    >
                        <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
                            {/* Phone notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10" />

                            {/* App Screenshot */}
                            <Image
                                src="/app-screenshot.png"
                                alt="Pasiflow App Dashboard"
                                fill
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
