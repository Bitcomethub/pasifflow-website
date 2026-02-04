"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key, ArrowRight, Trophy } from "lucide-react"
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

          {/* RIGHT-ALIGNED Visual Content */}
          <div className="relative hidden lg:block">
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-[#E5E6E8]">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm">{t("statProperties")}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#1F2328]">2,500+</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm">{t("statROI")}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#B8A074]">12-15%</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-sm">{t("statGuarantee")}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#1F2328]">Section 8</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#6B7280]">
                    <Key className="w-5 h-5" />
                    <span className="text-sm">{t("statKeys")}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#1F2328]">850+</div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 right-4 bg-[#1F2328] text-white px-5 py-2.5 rounded-xl shadow-lg z-10">
                <div className="text-xs font-medium">{t("floatingBadge")}</div>
                <div className="text-lg font-bold text-[#B8A074]">{t("floatingBadgeValue")}</div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#B8A074]/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
