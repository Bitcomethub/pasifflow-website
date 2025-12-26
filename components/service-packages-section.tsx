"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { GraduationCap, Building2, TrendingUp, DoorOpen } from "lucide-react"

export function ServicePackagesSection() {
    const t = useTranslations("servicePackages")

    const packages = [
        { icon: GraduationCap, titleKey: "package1Title", descKey: "package1Desc", gradient: "from-blue-500 to-cyan-500" },
        { icon: Building2, titleKey: "package2Title", descKey: "package2Desc", gradient: "from-emerald-500 to-green-500" },
        { icon: TrendingUp, titleKey: "package3Title", descKey: "package3Desc", gradient: "from-purple-500 to-indigo-500" },
        { icon: DoorOpen, titleKey: "package4Title", descKey: "package4Desc", gradient: "from-amber-500 to-orange-500" },
    ]

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">{t("title")}</h2>
                    <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-card rounded-2xl p-8 border border-border/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden"
                        >
                            {/* Gradient border effect on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                            <div className="relative">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <pkg.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{t(pkg.titleKey)}</h3>
                                <p className="text-muted-foreground leading-relaxed">{t(pkg.descKey)}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
