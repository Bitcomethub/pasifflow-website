"use client"

import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

export function TestimonialsSection() {
    const t = useTranslations("testimonials")
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { align: "start", loop: true, dragFree: true },
        [Autoplay({ delay: 3000, stopOnInteraction: false }) as any]
    )

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const testimonials = Array.from({ length: 15 }, (_, i) => ({
        nameKey: `testimonial${i + 1}Name`,
        roleKey: `testimonial${i + 1}Role`,
        quoteKey: `testimonial${i + 1}Quote`,
        rating: 5,
    }))

    return (
        <section className="py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            {t("title")}
                        </h2>
                        <p className="text-slate-600 text-base max-w-xl">
                            {t("subtitle")}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollPrev}
                            className="rounded-full w-10 h-10 border-2 hover:bg-primary/5 hover:border-primary/30"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollNext}
                            className="rounded-full w-10 h-10 border-2 hover:bg-primary/5 hover:border-primary/30"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
                    <div className="flex gap-5">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.nameKey}
                                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                            >
                                <Card className="p-6 h-full border-slate-100 bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                                    {/* Stars */}
                                    <div className="flex gap-0.5 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={14} className="fill-primary text-primary" />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-slate-700 mb-6 leading-relaxed text-sm line-clamp-4">
                                        "{t(testimonial.quoteKey)}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#B8A074] text-white flex items-center justify-center font-bold text-sm">
                                            {t(testimonial.nameKey).charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">{t(testimonial.nameKey)}</div>
                                            <div className="text-xs text-slate-500">{t(testimonial.roleKey)}</div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
