"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Building2, TrendingUp, ShieldCheck, Scale, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WhyUsaPage() {
    const t = useTranslations("whyUsa")

    const sections = [
        { id: "section1", icon: TrendingUp },
        { id: "section2", icon: Building2 },
        { id: "section3", icon: ShieldCheck },
        { id: "section4", icon: Scale },
    ]

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Hero Section of the Page */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center mb-16 space-y-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Content Sections */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group"
                        >
                            <div className="h-12 w-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <section.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                                {t(`${section.id}Title`)}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {t(`${section.id}Desc`)}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* "Loop" / Next Step Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
                >
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold">{t("ctaTitle")}</h2>
                        <p className="text-primary-foreground/90 text-lg">
                            {t("ctaDesc")}
                        </p>
                        <Link href="/vergilendirme" passHref>
                            <Button size="lg" variant="secondary" className="font-semibold text-primary gap-2 hover:scale-105 transition-transform bg-white hover:bg-white/90">
                                {t("ctaButton")}
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
