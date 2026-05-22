"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function AboutSection() {
    const t = useTranslations("aboutSection")

    return (
        <section className="relative w-full bg-white">
            {/* Hero Section - Clean, Minimal, Fundrise-style */}
            <div className="relative w-full py-20 sm:py-28 md:py-40 bg-[#F5F5F5] overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-4xl"
                    >

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#C1A05E] leading-[1.15]">
                            {t("title")}
                        </h1>
                    </motion.div>
                </div>
                {/* Subtle diagonal accent */}
                <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/5 -skew-x-12 translate-x-1/3" />
            </div>

            {/* Stats Strip — Track Record */}
            <div className="border-b border-border bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-8 text-center"
                    >
                        {t("statsTitle")}
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                        {[
                            { value: t("stat1Value"), label: t("stat1Label") },
                            { value: t("stat2Value"), label: t("stat2Label") },
                            { value: t("stat3Value"), label: t("stat3Label") },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center md:text-left md:border-l md:border-border md:pl-8 first:md:border-l-0 first:md:pl-0"
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C1A05E] tracking-tight mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-secondary font-medium leading-snug">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Section - Storytelling */}
            <div className="py-14 sm:py-20 md:py-28">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Opening Statement */}
                        <p className="text-xl md:text-2xl text-secondary font-medium leading-relaxed mb-12">
                            {t("opening")}
                        </p>

                        {/* Body Paragraphs - Lighter gray for flow */}
                        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                            <p>{t("p1")}</p>
                            <p className="text-secondary font-medium">{t("p2")}</p>
                            <p className="text-2xl font-bold text-primary">{t("p3")}</p>
                            <p>{t("p4")}</p>
                        </div>

                        {/* First Question Highlight */}
                        <div className="my-16 py-8 border-y border-border">
                            <p className="text-lg text-muted-foreground italic">
                                {t("questionIntro")}
                            </p>
                            <p className="text-xl md:text-2xl font-medium text-secondary mt-4">
                                {t("question")}
                            </p>
                        </div>

                        {/* Focus Areas */}
                        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">

                            <p>
                                {t("method")}
                            </p>
                        </div>

                        {/* Blockquote - Featured Quote */}
                        <blockquote className="my-16 pl-6 border-l-4 border-[#C1A05E] bg-[#3D4852] py-8 pr-8 rounded-r-lg shadow-xl">
                            <p className="text-xl md:text-2xl font-medium text-white italic leading-relaxed">
                                {t("quote1")}
                            </p>
                        </blockquote>

                        {/* Vision */}
                        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                {t("vision")}
                            </p>
                            <p className="text-secondary font-medium">
                                {t("visionIntro")}
                            </p>
                        </div>

                        {/* Second Blockquote */}
                        <blockquote className="my-12 pl-6 border-l-4 border-slate-300 py-4">
                            <p className="text-xl font-medium text-secondary italic">
                                {t("quote2")}
                            </p>
                        </blockquote>

                        {/* Closing Statement */}
                        <div className="space-y-6 text-lg leading-relaxed">
                            <p className="text-2xl font-bold text-secondary">
                                {t("welcome")}
                            </p>
                            <p className="text-muted-foreground">
                                {t("closing")}
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mt-16 pt-8 border-t border-border flex items-center gap-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                                <Image
                                    src="/erman-adanir.jpg"
                                    alt="Erman Adanır"
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: 'center 15%' }}
                                />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-secondary">Erman Adanır</p>
                                <p className="text-muted-foreground">{t("founderRole")}, <span className="font-semibold">Pasiflow LLC</span></p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
