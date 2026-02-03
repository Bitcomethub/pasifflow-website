"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key, ArrowRight, Star, Users, Trophy } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")
  const ref = useRef<HTMLDivElement>(null)

  // Rotating titles - cycles every 3 seconds
  const rotatingTitles = t.raw("rotatingTitles") as string[]

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % rotatingTitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [rotatingTitles.length])

  // Scroll-based parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

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
    <section ref={ref} className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#F5F5F5] pt-20 pb-12 md:pt-40 md:pb-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute top-20 right-[10%] w-96 h-96 bg-[#B8A074]/5 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]), opacity }}
          className="absolute bottom-20 left-[5%] w-64 h-64 bg-[#3D4852]/5 rounded-full blur-3xl"
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-[#B8A074]/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT-ALIGNED Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5 sm:space-y-6 text-left"
          >
            {/* Animated badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8A074]/10 rounded-full border border-[#B8A074]/20"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-[#B8A074] rounded-full"
              />
              <span className="text-xs font-semibold text-[#B8A074] uppercase tracking-wider">
                {t("badge") || "Premium Investment"}
              </span>
            </motion.div>

            {/* Premium Headline with Rotating Title */}
            <motion.div variants={item} className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight text-[#3D4852] leading-[1.15]">
                {t("title")} <br />
                <span className="text-xl sm:text-2xl md:text-3xl font-medium text-[#535454] block mt-2 mb-3">
                  {t("subText")}
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
              <p className="text-base sm:text-lg text-[#535454] leading-relaxed max-w-lg">
                {t("description")}
              </p>
            </motion.div>

            {/* CTA Buttons with enhanced hover effects */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-lg bg-[#B8A074] hover:bg-[#a38d5d] text-white font-semibold shadow-lg shadow-[#B8A074]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#B8A074]/30"
                  asChild
                >
                  <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                    {t("ctaPrimary")}
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-lg border-2 border-[#E5E5E5] text-[#3D4852] hover:bg-[#E5E5E5] hover:border-[#B8A074]/50 font-semibold transition-all duration-300"
                  asChild
                >
                  <a href="#portfoy">
                    {t("ctaSecondary")}
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={item}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-3">
                {["https://randomuser.me/api/portraits/men/32.jpg", "https://randomuser.me/api/portraits/women/44.jpg", "https://randomuser.me/api/portraits/men/46.jpg"].map((src, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    src={src}
                    alt="Investor"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-[#3D4852]">500+</span>
                <span className="text-[#535454] ml-1">{t("investors") || "Happy Investors"}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT Visual Content with enhanced effects */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Decorative frame */}
            <motion.div
              style={{ scale }}
              className="relative"
            >
              {/* Corner accents */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#B8A074]/30 rounded-tl-lg" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#B8A074]/30 rounded-br-lg" />

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-family.png"
                  alt="Amerika Yatırım"
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D4852]/50 via-transparent to-transparent" />

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#B8A074]/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-[#B8A074]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#535454] uppercase tracking-wider">ROI</p>
                      <p className="text-lg font-bold text-[#3D4852]">12.5% Avg</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
