"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowRight, Trophy } from "lucide-react"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  // Rotating titles - cycles every 3 seconds
  const rotatingTitles = t.raw("rotatingTitles") as string[]

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % rotatingTitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [rotatingTitles.length])

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#F5F5F5] pt-20 pb-12 md:pt-40 md:pb-24">
      {/* Decorative background elements - static for better performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-[10%] w-96 h-96 bg-[#B8A074]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[5%] w-64 h-64 bg-[#3D4852]/5 rounded-full blur-3xl" />
        {/* Static decorative dots */}
        <div className="absolute w-2 h-2 bg-[#B8A074]/30 rounded-full" style={{ left: '15%', top: '20%' }} />
        <div className="absolute w-2 h-2 bg-[#B8A074]/30 rounded-full" style={{ left: '30%', top: '45%' }} />
        <div className="absolute w-2 h-2 bg-[#B8A074]/30 rounded-full" style={{ left: '45%', top: '70%' }} />
        <div className="absolute w-2 h-2 bg-[#B8A074]/30 rounded-full" style={{ left: '60%', top: '25%' }} />
        <div className="absolute w-2 h-2 bg-[#B8A074]/30 rounded-full" style={{ left: '75%', top: '50%' }} />
        <div className="absolute w-2 h-2 bg-[#B8A074]/30 rounded-full" style={{ left: '90%', top: '75%' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT-ALIGNED Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8A074]/10 rounded-full">
              <Trophy className="w-4 h-4 text-[#B8A074]" />
              <span className="text-sm font-medium text-[#B8A074]">{t("badge")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2328] leading-tight">
              {t("headline")}{" "}
              <span className="text-[#B8A074]">{rotatingTitles[currentTitleIndex]}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#6B7280] max-w-xl leading-relaxed">
              {t("subheadline")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#1F2328] hover:bg-[#2D353F] text-white px-8 py-6 text-lg rounded-xl transition-colors"
                asChild
              >
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")} <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#E5E6E8] text-[#3D4852] hover:bg-[#F6F7F9] px-8 py-6 text-lg rounded-xl transition-colors"
                asChild
              >
                <a href="#portfoy">{t("ctaSecondary")}</a>
              </Button>
            </div>
          </div>

          {/* RIGHT-ALIGNED Visual Content with Property Image */}
          <div className="relative hidden lg:block">
            {/* Property Image - Taller to show more */}
            <div className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/investment-house.png"
                alt="American Investment Property"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle gradient overlay at bottom only */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Compact Stats Card - Bottom Right Corner */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-white/50 max-w-[200px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[10px] text-[#6B7280] uppercase tracking-wide">{t("statROI")}</div>
                  <div className="text-lg font-bold text-[#B8A074]">12-15%</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#6B7280] uppercase tracking-wide">{t("statGuarantee")}</div>
                  <div className="text-lg font-bold text-[#1F2328]">Section 8</div>
                </div>
              </div>
            </div>

            {/* Floating Badge - Top Right */}
            <div className="absolute top-4 right-4 bg-[#1F2328] text-white px-4 py-2 rounded-xl shadow-lg z-10">
              <div className="text-[10px] font-medium opacity-80">{t("floatingBadge")}</div>
              <div className="text-base font-bold text-[#B8A074]">{t("floatingBadgeValue")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
