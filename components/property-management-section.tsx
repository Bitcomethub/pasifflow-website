"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Users, Wrench, FileText, Scale } from "lucide-react"

export function PropertyManagementSection() {
    const t = useTranslations("propertyManagement")

    const services = [
        { icon: Users, titleKey: "service1Title", descKey: "service1Desc", color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: Wrench, titleKey: "service2Title", descKey: "service2Desc", color: "text-amber-500", bg: "bg-amber-500/10" },
        { icon: FileText, titleKey: "service3Title", descKey: "service3Desc", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { icon: Scale, titleKey: "service4Title", descKey: "service4Desc", color: "text-purple-500", bg: "bg-purple-500/10" },
    ]

    return (
        <section className="py-24 bg-muted/20">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-background rounded-2xl p-6 border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-5`}>
                                <service.icon className={`h-7 w-7 ${service.color}`} />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{t(service.titleKey)}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{t(service.descKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
