"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { FileText, Landmark, Calculator, ArrowRight, CheckCircle2, Building2, TrendingDown, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function TaxationPage() {
    const t = useTranslations("taxation")

    const sections = [
        { id: "section1", icon: Landmark },
        { id: "section2", icon: FileText },
        { id: "section3", icon: Calculator },
        { id: "section4", icon: TrendingDown },
        { id: "section5", icon: HeadphonesIcon },
    ]

    const lifecycleSteps = [
        "lifecycle1",
        "lifecycle2",
        "lifecycle3",
        "lifecycle4",
        "lifecycle5",
    ]

    return (
        <div className="min-h-screen">
            <Header />
            <main className="bg-background pt-24 pb-20">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center mb-16 space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
                            <CheckCircle2 size={16} />
                            IRS & Vergi Uyumu
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {t("subtitle")}
                        </p>
                        <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto pt-4">
                            {t("intro")}
                        </p>
                    </motion.div>

                    {/* Content Sections */}
                    <div className="grid gap-8 max-w-4xl mx-auto mb-16">
                        {sections.map((section, index) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-colors border border-transparent hover:border-border/50"
                            >
                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary border border-border/20">
                                    <section.icon size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-foreground">
                                        {t(`${section.id}Title`)}
                                    </h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {t(`${section.id}Desc`)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tax Lifecycle Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto mb-16"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
                            {t("lifecycleTitle")}
                        </h2>
                        <div className="grid md:grid-cols-5 gap-4">
                            {lifecycleSteps.map((step, i) => (
                                <div key={i} className="relative text-center p-4">
                                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/20">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-foreground/80">{t(step)}</p>
                                    {i < lifecycleSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-0.5 bg-border" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Buttons Row */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg" className="font-semibold text-lg px-8 h-14 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                            Ücretsiz Danışmanlık Al
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="font-semibold text-lg h-14 border-2 gap-2 bg-green-500 text-white hover:bg-green-600 border-green-500 hover:border-green-600"
                            asChild
                        >
                            <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                                WhatsApp'tan Yaz
                            </a>
                        </Button>
                    </div>

                    {/* Final CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-2xl shadow-primary/5"
                    >
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-foreground">{t("ctaTitle")}</h2>
                            <p className="text-muted-foreground text-lg">
                                {t("ctaDesc")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button size="lg" className="font-semibold text-lg px-8 h-14 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                    {t("ctaButton")}
                                </Button>
                                <Link href="/neden-amerika" passHref>
                                    <Button size="lg" variant="outline" className="font-semibold text-lg h-14 border-2">
                                        Neden Amerika?
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
