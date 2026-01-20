"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, Globe, Cpu, MessageCircle, ShieldCheck, Layout, Headphones } from "lucide-react"

export function WhyWorkSection() {
    const t = useTranslations("whyWork")

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                {t("title")}
                            </h2>
                            <p className="text-lg text-slate-600">
                                {t("subtitle")}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: MapPin,
                                    title: t("features.localExpertise.title"),
                                    description: t("features.localExpertise.description")
                                },
                                {
                                    icon: Globe,
                                    title: t("features.globalExperience.title"),
                                    description: t("features.globalExperience.description")
                                },
                                {
                                    icon: Cpu,
                                    title: t("features.techDriven.title"),
                                    description: t("features.techDriven.description")
                                },
                                {
                                    icon: MessageCircle,
                                    title: t("features.fastCommunication.title"),
                                    description: t("features.fastCommunication.description")
                                }
                            ].map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FEEBE5] text-[#EF7202] flex items-center justify-center">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#001C32] mb-1">{feature.title}</h3>
                                        <p className="text-[#535454] leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {[
                            { label: t("stat1Label"), value: t("stat1Value"), icon: ShieldCheck },
                            { label: t("stat2Label"), value: t("stat2Value"), icon: Layout },
                            { label: t("stat3Label"), value: t("stat3Value"), icon: Cpu },
                            { label: t("stat4Label"), value: t("stat4Value"), icon: Headphones },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-[#E5E6E8] hover:shadow-md transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-[#FEEBE5] text-[#EF7202] flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <p className="text-2xl font-bold text-[#001C32] mb-1">{stat.value}</p>
                                <p className="text-sm text-[#535454] font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
