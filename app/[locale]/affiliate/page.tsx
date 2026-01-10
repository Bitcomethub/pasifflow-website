"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
    Users,
    DollarSign,
    Share2,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Gift,
    BarChart3,
    Clock,
    Shield
} from "lucide-react"

export default function AffiliatePage() {
    const t = useTranslations("affiliate")

    const steps = [
        { icon: Users, key: "step1" },
        { icon: Share2, key: "step2" },
        { icon: DollarSign, key: "step3" },
    ]

    const benefits = [
        { icon: Gift, key: "benefit1" },
        { icon: BarChart3, key: "benefit2" },
        { icon: Clock, key: "benefit3" },
        { icon: Shield, key: "benefit4" },
    ]

    return (
        <>
            <Header />
            <main className="min-h-screen bg-background">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 px-4 py-2">
                                {t("badge")}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                                {t("heroTitle")} <br />
                                <span className="text-primary">{t("heroTitleAccent")}</span>
                            </h1>
                            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                                {t("heroDescription")}
                            </p>
                            <Button
                                size="lg"
                                className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/20"
                                asChild
                            >
                                <a href="https://wa.me/13056903146?text=I'm%20interested%20in%20the%20affiliate%20program" target="_blank" rel="noopener noreferrer">
                                    {t("ctaButton")}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {t("howItWorksTitle")}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                {t("howItWorksSubtitle")}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="p-8 text-center h-full border-border/50 hover:border-primary/50 transition-colors">
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <step.icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="text-4xl font-bold text-primary/30 mb-2">0{index + 1}</div>
                                        <h3 className="text-xl font-bold text-foreground mb-3">
                                            {t(`${step.key}Title`)}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {t(`${step.key}Desc`)}
                                        </p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {t("benefitsTitle")}
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="p-6 h-full border-border/50 hover:shadow-lg transition-shadow">
                                        <benefit.icon className="w-10 h-10 text-accent mb-4" />
                                        <h3 className="text-lg font-bold text-foreground mb-2">
                                            {t(`${benefit.key}Title`)}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t(`${benefit.key}Desc`)}
                                        </p>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Commission Structure */}
                <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                {t("commissionTitle")}
                            </h2>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                                <div className="text-6xl md:text-8xl font-bold mb-2">$1,000</div>
                                <div className="text-xl opacity-80">{t("commissionPerSale")}</div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6 text-left">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <span>{t("commissionFeature1")}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <span>{t("commissionFeature2")}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                                    <span>{t("commissionFeature3")}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center max-w-2xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {t("ctaTitle")}
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8">
                                {t("ctaDescription")}
                            </p>
                            <Button
                                size="lg"
                                className="h-14 px-8 text-lg bg-accent text-white hover:bg-accent/90 shadow-xl"
                                asChild
                            >
                                <a href="https://wa.me/13056903146?text=I'm%20interested%20in%20the%20affiliate%20program" target="_blank" rel="noopener noreferrer">
                                    {t("ctaButton")}
                                    <TrendingUp className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
