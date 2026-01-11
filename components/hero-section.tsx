"use client"

import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Gradients - Bomb Effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 w-[50vw] h-[50vw] rounded-full bg-teal-500/5 blur-[150px] -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={item} className="flex w-fit max-w-full items-center gap-3 rounded-full bg-primary/5 border border-primary/10 px-3 py-2 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-primary shadow-sm hover:bg-primary/10 transition-colors cursor-default text-left leading-snug">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="break-words">{t("badge")}</span>
            </motion.div>

            <motion.div variants={item} className="space-y-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
                {t("title")} <br />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {t("titleAccent")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t("description")}
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300 ring-2 ring-primary/20 hover:ring-primary/40" asChild>
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full border-2 border-primary/10 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all duration-300 bg-background/50 backdrop-blur-sm"
                asChild
              >
                <a href="#portfoy">
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 pt-6 sm:pt-8 border-t border-border/50">
              {[
                { icon: ShieldCheck, label: "prop1Title", value: "stat1Value", valueKey: true },
                { icon: TrendingUp, label: "prop2Title", value: "stat1Value", valueKey: true },
                { icon: Building2, label: "title", value: "Section 8" }, // Using section8 title ref
                { icon: Key, label: "prop3Title", value: "Turnkey" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 sm:gap-2 items-start p-2 sm:p-3 rounded-lg hover:bg-white/50 hover:shadow-sm transition-all border border-transparent hover:border-border/40">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  {/* Note: Simplified labels for aesthetics, mapping to valueProps or manual checks would be ideal in real app. 
                      Here reusing logic somewhat loosely or just hardcoding common terms if translation keys are complex. 
                      Let's use static keys for simplicity and robustness in this specific visual block. */}
                  <span className="text-xs sm:text-sm font-semibold text-foreground/80 line-clamp-1">{t(`stat${i + 1}Label`) ? t(`stat${i + 1}Label`) : "Verified"}</span>
                  <span className="text-sm sm:text-lg font-bold text-primary line-clamp-1">{t(`stat${i + 1}Value`) ? t(`stat${i + 1}Value`) : "100%"}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Content - Floating Cards / Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[600px] flex items-center justify-center p-6"
          >
            {/* Main Image Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/50 outline outline-1 outline-border/20 max-w-md lg:max-w-full mx-auto transform hover:rotate-1 transition-transform duration-500 bg-white shadow-primary/10">
              <img
                src="/hero-family.png"
                alt="Amerika Yatırım"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
              />

              {/* Floating Overlay Card 1: Monthly Income - Hidden on mobile */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="hidden md:flex absolute bottom-8 left-8 bg-white/95 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] items-center gap-5 pr-8"
              >
                <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                  <span className="text-green-600 font-bold text-lg">$</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Net {t("titleAccent")}</p>
                  <p className="text-2xl font-bold text-foreground">$1,250.00</p>
                </div>
              </motion.div>

              {/* Floating Overlay Card 2: Status - Responsive sizing */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-4 right-4 md:top-8 md:right-8 bg-teal-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl shadow-lg shadow-teal-600/30 font-bold text-xs md:text-sm flex items-center gap-1.5 md:gap-2.5 backdrop-blur-md border border-teal-500/50"
              >
                <ShieldCheck size={14} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden sm:inline">Section 8 Verified</span>
                <span className="sm:hidden">S8 ✓</span>
              </motion.div>
            </div>

            {/* Background Decorative Rings - Rotating */}
            <div className="absolute -z-10 w-[120%] h-[120%] border border-primary/5 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute -z-10 w-[90%] h-[90%] border border-accent/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
