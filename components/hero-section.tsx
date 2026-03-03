"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
  const t = useTranslations("hero")

  const rotatingTitles = t.raw("rotatingTitles") as string[]

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % rotatingTitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [rotatingTitles.length])

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[#F8F8F6] via-[#F5F5F5] to-[#EDE9E0] pt-20 pb-12 md:pt-40 md:pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT-ALIGNED Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-[#C1A05E]/20 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#C1A05E] animate-pulse" />
              <span className="text-sm font-semibold text-[#1F2328]">{t("badge")}</span>
            </motion.div>

            {/* Main Headline with animated title swap */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2328] leading-[1.1]"
            >
              {t("headline")}{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTitleIndex}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="text-[#C1A05E] inline-block"
                  >
                    {rotatingTitles[currentTitleIndex]}
                  </motion.span>
                </AnimatePresence>
                {/* Underline accent */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#C1A05E] to-[#C1A05E]/30 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-[#6B7280] max-w-xl leading-relaxed"
            >
              {t("subheadline")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button
                size="lg"
                className="bg-[#1F2328] hover:bg-[#2D353F] text-white px-8 py-6 text-lg rounded-xl transition-all shadow-lg shadow-[#1F2328]/20 hover:shadow-xl hover:shadow-[#1F2328]/30 hover:-translate-y-0.5"
                asChild
              >
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")} <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#E5E6E8] text-[#3D4852] hover:bg-white hover:border-[#C1A05E]/30 px-8 py-6 text-lg rounded-xl transition-all hover:shadow-md"
                asChild
              >
                <a href="#portfoy">{t("ctaSecondary")}</a>
              </Button>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center gap-4 pt-4"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white bg-gradient-to-br from-[#C1A05E] to-[#8B7340] flex items-center justify-center text-white text-xs font-bold shadow-sm"
                  >
                    {["EA", "MK", "SY", "AB"][i]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-[#6B7280]">
                <span className="font-bold text-[#1F2328]">100+</span> {t("badge")}
              </div>
            </motion.div>
          </div>

          {/* RIGHT-ALIGNED Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Property Image */}
            <div className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <Image
                src="/investment-house.png"
                alt="American Investment Property"
                fill
                className="object-cover"
                priority
              />
              {/* Premium gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2328]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F2328]/10 to-transparent" />
            </div>

            {/* Compact Stats Card - Bottom Right Corner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 min-w-[220px]"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">{t("statROI")}</div>
                  <div className="text-2xl font-bold text-[#C1A05E]">12-15%</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">{t("statGuarantee")}</div>
                  <div className="text-2xl font-bold text-[#1F2328]">Section 8</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-[#6B7280] font-medium">Live ROI Data</span>
              </div>
            </motion.div>

            {/* Floating Badge - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute top-4 right-4 bg-[#1F2328]/90 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-lg z-10 border border-white/10"
            >
              <div className="text-[10px] font-semibold opacity-80 uppercase tracking-wider">{t("floatingBadge")}</div>
              <div className="text-lg font-bold text-[#C1A05E]">{t("floatingBadgeValue")}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
