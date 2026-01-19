"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key, ArrowRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  // Rotating titles - cycles every 3 seconds
  const rotatingTitles = [
    t("titleAccent"),
    "Pasif Gelir",
    "Finansal Özgürlük"
  ]

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % rotatingTitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [rotatingTitles.length])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#faf9f6] pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Fundrise-style cream background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf9f6] via-[#f7f5f0] to-[#f5f3ed]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT-ALIGNED Text Content - Fundrise Style */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 text-left"
          >
            {/* Premium Headline with Rotating Title */}
            <motion.div variants={item} className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-serif font-normal tracking-tight text-[#151513] leading-[1.15]">
                {t("title")} <br />
                <span className="relative inline-block h-[1.2em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentTitleIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[#a3452b] inline-block"
                    >
                      {rotatingTitles[currentTitleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#4a4a47] leading-relaxed max-w-lg font-light">
                {t("description")}
              </p>
            </motion.div>

            {/* Email Capture / CTA - Fundrise Style */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-lg bg-[#a3452b] hover:bg-[#8a3a24] text-white font-medium shadow-lg transition-all duration-300"
                asChild
              >
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-lg border-2 border-[#d1d0cb] text-[#151513] hover:bg-[#f0efea] hover:border-[#bbbab6] font-medium transition-all duration-300"
                asChild
              >
                <a href="#portfoy">
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>

            {/* Trust Signals - Fundrise Style */}
            <motion.div variants={item} className="pt-8 border-t border-[#e5e4df]">
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#6b6b67]">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#a3452b] text-[#a3452b]" />
                  ))}
                  <span className="ml-2 font-medium">4.9/5</span>
                </div>
                <span className="hidden sm:block">•</span>
                <span>500+ Yatırımcı</span>
                <span className="hidden sm:block">•</span>
                <span>$250M+ İşlem Hacmi</span>
              </div>
            </motion.div>

            {/* Key Stats Row - Professional */}
            <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {[
                { icon: ShieldCheck, label: t("stat1Label") || "Garanti", value: t("stat1Value") || "%100" },
                { icon: TrendingUp, label: t("stat2Label") || "Getiri", value: t("stat2Value") || "%8-12" },
                { icon: Building2, label: t("stat3Label") || "Mülk", value: t("stat3Value") || "150+" },
                { icon: Key, label: t("stat4Label") || "Anahtar", value: t("stat4Value") || "Teslim" },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <p className="text-2xl md:text-3xl font-serif font-normal text-[#151513]">{stat.value}</p>
                  <p className="text-sm text-[#6b6b67] mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT Visual Content - Premium Property Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative hidden lg:block"
          >
            {/* Main Image Container */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-family.png"
                alt="Amerika Yatırım"
                className="w-full h-full object-cover"
              />

              {/* Minimal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Simple Stats Card - Bottom */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="bg-white p-5 rounded-xl shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#6b6b67] uppercase tracking-wider font-medium">Net Aylık Gelir</p>
                      <p className="text-2xl font-serif text-[#151513] mt-1">$1,250<span className="text-sm text-[#9b9b97] font-sans">/ay</span></p>
                    </div>
                    <div className="h-11 w-11 rounded-lg bg-[#22c55e] flex items-center justify-center">
                      <TrendingUp className="text-white h-5 w-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
