"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { MapPin, TrendingUp, Shield, Building2, CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

export function CityComparisonSection() {
    const t = useTranslations("cityComparison")

    const cities = [
        {
            id: "detroit",
            icon: TrendingUp,
            color: "from-primary to-orange-400",
            ratings: {
                cashFlow: 5,
                security: 3,
                appreciation: 4,
                section8Demand: 5
            }
        },
        {
            id: "cleveland",
            icon: Shield,
            color: "from-secondary to-slate-700",
            ratings: {
                cashFlow: 4,
                security: 4,
                appreciation: 3,
                section8Demand: 4
            }
        },
        {
            id: "memphis",
            icon: Building2,
            color: "from-secondary to-slate-700",
            ratings: {
                cashFlow: 4,
                security: 4,
                appreciation: 4,
                section8Demand: 4
            }
        }
    ]

    return (
        <section className="py-24 bg-muted/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center space-y-4 mb-16 max-w-3xl mx-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest mb-4 shadow-lg"
                    >
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        {t("badge")}
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
                        {t("title")}
                    </h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        {t("description")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {cities.map((city, index) => (
                        <motion.div
                            key={city.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: 0.2 + index * 0.15,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                            }}
                        >
                            <Card className="h-full p-6 bg-white border-slate-200 hover:shadow-2xl hover:border-slate-300 transition-all duration-500 group overflow-hidden relative">
                                {/* Top gradient bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${city.color}`} />

                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPin size={16} className="text-primary" />
                                            <h3 className="font-bold text-xl">{t(`cities.${city.id}.name`)}</h3>
                                        </div>
                                        <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${city.color} text-white`}>
                                            {t(`cities.${city.id}.highlight`)}
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${city.color} text-white`}>
                                        <city.icon size={24} />
                                    </div>
                                </div>

                                {/* Budget & Risk */}
                                <div className="flex justify-between items-center py-3 border-y border-border/50 mb-4">
                                    <div>
                                        <div className="text-xs text-muted-foreground">{t("budget")}</div>
                                        <div className="font-bold text-primary">{t(`cities.${city.id}.budget`)}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground">{t("risk")}</div>
                                        <div className="font-semibold">{t(`cities.${city.id}.risk`)}</div>
                                    </div>
                                </div>

                                {/* Ratings */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{t("cashFlow")}</span>
                                        <RatingStars count={city.ratings.cashFlow} />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{t("security")}</span>
                                        <RatingStars count={city.ratings.security} />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{t("appreciation")}</span>
                                        <RatingStars count={city.ratings.appreciation} />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{t("section8Demand")}</span>
                                        <RatingStars count={city.ratings.section8Demand} />
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{t(`cities.${city.id}.features.${i}`)}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Best for */}
                                <div className="pt-4 border-t border-border/50">
                                    <div className="text-xs text-muted-foreground mb-1">{t("bestFor")}</div>
                                    <p className="text-sm font-medium">{t(`cities.${city.id}.bestFor`)}</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-muted-foreground text-sm mt-8 max-w-2xl mx-auto">
                    {t("footer")}
                </p>
            </div>
        </section>
    )
}

function RatingStars({ count, max = 5 }: { count: number, max?: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: max }).map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i < count ? 'bg-accent' : 'bg-muted'}`}
                />
            ))}
        </div>
    )
}
