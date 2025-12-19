"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { MapPin, TrendingUp, Shield, DollarSign, Building2, CheckCircle2 } from "lucide-react"
import { useTranslations } from "next-intl"

const cities = [
    {
        id: "detroit",
        name: "Detroit, MI",
        budget: "$75K – $110K",
        risk: "Orta",
        highlight: "Maksimum Nakit Akışı",
        icon: TrendingUp,
        color: "from-orange-500 to-red-500",
        features: [
            "Düşük satın alma maliyetleri",
            "Çok güçlü Section 8 talebi",
            "Kira / ev fiyatı oranı çok yüksek",
            "En yüksek cash flow potansiyeli"
        ],
        ratings: {
            cashFlow: 5,
            security: 3,
            appreciation: 4,
            section8Demand: 5
        },
        bestFor: "Aylık maksimum nakit akışı ve hızlı geri dönüş hedefleyenler"
    },
    {
        id: "cleveland",
        name: "Cleveland, OH",
        budget: "$85K – $120K",
        risk: "Düşük-Orta",
        highlight: "Dengeli & Güvenli",
        icon: Shield,
        color: "from-blue-500 to-cyan-500",
        features: [
            "Daha istikrarlı ekonomi",
            "Mahalle kalitesi daha homojen",
            "Section 8 ödemeleri çok düzenli",
            "Daha az bakım ve sürpriz masraf"
        ],
        ratings: {
            cashFlow: 4,
            security: 4,
            appreciation: 3,
            section8Demand: 4
        },
        bestFor: "Daha az stres ve daha fazla istikrar isteyenler"
    },
    {
        id: "memphis",
        name: "Memphis, TN",
        budget: "$90K – $130K",
        risk: "Orta",
        highlight: "Vergi Avantajı + Büyüme",
        icon: Building2,
        color: "from-green-500 to-emerald-500",
        features: [
            "Eyalet gelir vergisi YOK",
            "Güçlü lojistik ve nüfus artışı",
            "Section 8 sistemi hızlı işliyor",
            "Uzun vadeli değer artışı potansiyeli"
        ],
        ratings: {
            cashFlow: 4,
            security: 4,
            appreciation: 4,
            section8Demand: 4
        },
        bestFor: "Vergi avantajı ve uzun vadeli büyüme isteyenler"
    }
]

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

export function CityComparisonSection() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-2">
                        PASIFLOW Pazar Karşılaştırması
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-primary">
                        Hangi Şehir Size Uygun?
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        PASIFLOW, ABD'de Section 8 sisteminin en güçlü olduğu üç ana pazara odaklanır.
                        Her şehir farklı bir yatırımcı profiline hitap eder.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {cities.map((city, index) => (
                        <motion.div
                            key={city.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Card className="h-full p-6 border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all group overflow-hidden relative">
                                {/* Top gradient bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${city.color}`} />

                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <MapPin size={16} className="text-primary" />
                                            <h3 className="font-bold text-xl">{city.name}</h3>
                                        </div>
                                        <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${city.color} text-white`}>
                                            {city.highlight}
                                        </div>
                                    </div>
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${city.color} text-white`}>
                                        <city.icon size={24} />
                                    </div>
                                </div>

                                {/* Budget & Risk */}
                                <div className="flex justify-between items-center py-3 border-y border-border/50 mb-4">
                                    <div>
                                        <div className="text-xs text-muted-foreground">Bütçe</div>
                                        <div className="font-bold text-primary">{city.budget}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-muted-foreground">Risk</div>
                                        <div className="font-semibold">{city.risk}</div>
                                    </div>
                                </div>

                                {/* Ratings */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Nakit Akışı</span>
                                        <RatingStars count={city.ratings.cashFlow} />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Güvenlik</span>
                                        <RatingStars count={city.ratings.security} />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Değer Artışı</span>
                                        <RatingStars count={city.ratings.appreciation} />
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Section 8 Talebi</span>
                                        <RatingStars count={city.ratings.section8Demand} />
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-2 mb-4">
                                    {city.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Best for */}
                                <div className="pt-4 border-t border-border/50">
                                    <div className="text-xs text-muted-foreground mb-1">En uygun:</div>
                                    <p className="text-sm font-medium">{city.bestFor}</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <p className="text-center text-muted-foreground text-sm mt-8 max-w-2xl mx-auto">
                    PASIFLOW, her yatırımcıyı aynı şehre yönlendirmez. Doğru şehir, doğru yatırımcı profili ile eşleştirilir.
                </p>
            </div>
        </section>
    )
}
