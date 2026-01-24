"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MapPin, TrendingUp, Shield, Building2, Info } from "lucide-react"
import { DetroitNeighborhoodMap } from "@/components/detroit-map"

export default function MapPage() {
    const t = useTranslations("map")

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <MapPin size={16} />
                        İnteraktif Harita
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Detroit Mahalle Rehberi
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Detroit&apos;in yatırım potansiyeli en yüksek mahallelerini keşfedin.
                        Her bölge için fiyat, ROI ve risk analizine ulaşın.
                    </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                    {[
                        { icon: Building2, label: "10 Mahalle", desc: "Analiz Edildi" },
                        { icon: TrendingUp, label: "%4-15", desc: "ROI Aralığı" },
                        { icon: Shield, label: "Section 8", desc: "Destekli" },
                        { icon: MapPin, label: "Gerçek Zamanlı", desc: "Veri" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                            <p className="font-bold text-gray-900">{stat.label}</p>
                            <p className="text-xs text-gray-500">{stat.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Map */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <DetroitNeighborhoodMap />
                </motion.div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-primary/5 border border-primary/10 rounded-xl p-6 flex items-start gap-4"
                >
                    <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-secondary mb-1">Harita Nasıl Kullanılır?</h3>
                        <p className="text-sm text-muted-foreground">
                            Haritadaki renkli işaretçilere tıklayarak her mahallenin detaylı yatırım bilgilerine ulaşabilirsiniz.
                            Yeşil işaretçiler düşük riskli premium mahalleleri, sarı orta segmenti, kırmızı yüksek getirili bölgeleri
                            ve mavi yükselen/trendy alanları temsil eder.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
