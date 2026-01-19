"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key, ArrowRight, Star, Users, Trophy } from "lucide-react"
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#F6F7F9] pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT-ALIGNED Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8 text-left"
          >
            {/* Premium Headline with Rotating Title */}
            <motion.div variants={item} className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight text-[#1F2328] leading-[1.15]">
                {t("title")} <br />
                <span className="relative inline-block h-[1.2em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentTitleIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[#EF7202] inline-block"
                    >
                      {rotatingTitles[currentTitleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-[#535454] leading-relaxed max-w-lg">
                {t("description")}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-lg bg-[#EF7202] hover:bg-[#d86502] text-white font-semibold shadow-lg transition-all duration-300"
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
                className="h-14 px-8 text-base rounded-lg border-2 border-[#E5E6E8] text-[#1F2328] hover:bg-[#E5E6E8] font-semibold transition-all duration-300"
                asChild
              >
                <a href="#portfoy">
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>

            {/* Trust Signals */}
            <motion.div variants={item} className="pt-8 border-t border-[#E5E6E8]">
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-sm text-[#535454]">

                {/* 1. 20+ Experience */}
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#EF7202]" />
                  <span className="font-medium text-[#1F2328]">20+ Yıllık Emlak Deneyimi</span>
                </div>

                <span className="hidden sm:block text-[#C7CBD3]">•</span>

                {/* 2. Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#EF7202] text-[#EF7202]" />
                    ))}
                  </div>
                  <span className="font-medium text-[#1F2328]">4.9/5 Müşteri Memnuniyeti</span>
                </div>

                <span className="hidden sm:block text-[#C7CBD3]">•</span>

                {/* 3. Investors */}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#1F2328]">50+ Mutlu Yatırımcı</span>
                </div>

                <span className="hidden sm:block text-[#C7CBD3]">•</span>

                {/* 4. Volume */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 text-[#EF7202] flex items-center justify-center font-bold">$</div>
                  <span className="font-medium text-[#1F2328]">$250M+ İşlem Hacmi</span>
                </div>

              </div>
            </motion.div>

            {/* Key Stats Row - Replaced with Colorful Trust Boxes */}
            <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 min-w-full">
              {/* 1. 20+ Experience - Blue */}
              <div className="flex flex-col items-center justify-center gap-3 group p-4 rounded-2xl hover:bg-white/50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">20+</p>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">YILLIK EMLAK DENEYİMİ</p>
                </div>
              </div>

              {/* 2. Customer Satisfaction - Yellow */}
              <div className="flex flex-col items-center justify-center gap-3 group p-4 rounded-2xl hover:bg-white/50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Star className="w-7 h-7 fill-current" />
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">4.9/5</p>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">MÜŞTERİ MEMNUNİYETİ</p>
                </div>
              </div>

              {/* 3. Happy Investors - Green */}
              <div className="flex flex-col items-center justify-center gap-3 group p-4 rounded-2xl hover:bg-white/50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Users className="w-7 h-7" />
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">50+</p>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">MUTLU YATIRIMCI</p>
                </div>
              </div>

              {/* 4. Transaction Volume - Purple */}
              <div className="flex flex-col items-center justify-center gap-3 group p-4 rounded-2xl hover:bg-white/50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-slate-900">$250M+</p>
                  <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">İŞLEM HACMİ</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-family.png"
                alt="Amerika Yatırım"
                className="w-full h-full object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001C32]/50 via-transparent to-transparent" />


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
