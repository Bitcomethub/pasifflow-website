"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key, ArrowRight, Star, Users, Trophy } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#F5F5F5] pt-24 pb-16 md:pt-32 md:pb-24">
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight text-[#3D4852] leading-[1.15]">
                {t("title")} <br />
                <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#535454] block mt-3 mb-4">
                  {t("subtitle")}
                </span>
                <span className="relative inline-block h-[1.2em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentTitleIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[#B8A074] inline-block"
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
                className="h-14 px-8 text-base rounded-lg bg-[#B8A074] hover:bg-[#a38d5d] text-white font-semibold shadow-lg transition-all duration-300"
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
                className="h-14 px-8 text-base rounded-lg border-2 border-[#E5E5E5] text-[#3D4852] hover:bg-[#E5E5E5] font-semibold transition-all duration-300"
                asChild
              >
                <a href="#portfoy">
                  {t("ctaSecondary")}
                </a>
              </Button>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D4852]/50 via-transparent to-transparent" />


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
