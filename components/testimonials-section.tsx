"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
    const t = useTranslations("testimonials")

    const testimonials = Array.from({ length: 15 }, (_, i) => ({
        nameKey: `testimonial${i + 1}Name`,
        roleKey: `testimonial${i + 1}Role`,
        quoteKey: `testimonial${i + 1}Quote`,
        rating: 5,
        avatar: "👤"
    }))

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-[#001C32] mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-[#535454] text-lg max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.nameKey}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index % 3 * 0.1 }}
                            className="break-inside-avoid"
                        >
                            <Card className="p-8 border-[#E5E6E8] hover:border-[#EF7202]/30 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-[#EF7202] text-[#EF7202]" />
                                    ))}
                                </div>

                                <p className="text-[#1F2328] mb-8 leading-relaxed italic text-base">
                                    "{t(testimonial.quoteKey)}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-[#F6F7F9]">
                                    <div className="w-12 h-12 rounded-full bg-[#F6F7F9] text-[#EF7202] flex items-center justify-center font-bold text-lg group-hover:bg-[#EF7202] group-hover:text-white transition-colors">
                                        {t(testimonial.nameKey).charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#001C32]">{t(testimonial.nameKey)}</div>
                                        <div className="text-xs text-[#535454] font-medium uppercase tracking-wider">{t(testimonial.roleKey)}</div>
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
