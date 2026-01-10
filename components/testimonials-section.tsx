"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
    const t = useTranslations("testimonials")

    const testimonials = [
        {
            nameKey: "testimonial1Name",
            roleKey: "testimonial1Role",
            quoteKey: "testimonial1Quote",
            rating: 5,
            avatar: "🇹🇷"
        },
        {
            nameKey: "testimonial2Name",
            roleKey: "testimonial2Role",
            quoteKey: "testimonial2Quote",
            rating: 5,
            avatar: "🇦🇪"
        },
        {
            nameKey: "testimonial3Name",
            roleKey: "testimonial3Role",
            quoteKey: "testimonial3Quote",
            rating: 5,
            avatar: "🇷🇺"
        },
    ]

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.nameKey}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 h-full border-border/50 hover:shadow-lg transition-shadow relative">
                                <Quote className="absolute top-4 right-4 text-primary/10" size={40} />

                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-foreground mb-6 leading-relaxed">
                                    "{t(testimonial.quoteKey)}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground">{t(testimonial.nameKey)}</div>
                                        <div className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
