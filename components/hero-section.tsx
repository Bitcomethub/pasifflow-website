"use client"

import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function HeroSection() {
  const t = useTranslations("hero")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Clean Gradient Background - Corporate */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/30" />
        {/* Subtle Grid - Tech Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
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
            <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="tracking-wide">{t("badge")}</span>
            </motion.div>

            <motion.div variants={item} className="space-y-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {t("title")} <br />
                <span className="text-primary">
                  {t("titleAccent")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
                {t("description")}
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-base rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-300 group" asChild>
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full border-2 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 font-semibold transition-all duration-300"
                asChild
              >
                <a href="#portfoy">
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6">
              {[
                { icon: ShieldCheck, label: "stat1Label", value: "stat1Value" },
                { icon: TrendingUp, label: "stat2Label", value: "stat2Value" },
                { icon: Building2, label: "stat3Label", value: "stat3Value" },
                { icon: Key, label: "stat4Label", value: "stat4Value" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{t(stat.label) || "Data"}</span>
                  <span className="text-lg font-bold text-slate-900">{t(stat.value) || "100%"}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Content - Professional Dashboard Style */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main Image Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200">
              <img
                src="/hero-family.png"
                alt="Amerika Yatırım"
                className="w-full h-full object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />

              {/* HUD 1: Net Income - Bottom */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-5 left-5 right-5 z-20"
              >
                <div className="bg-white p-5 rounded-2xl shadow-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-0.5">Net Monthly Income</p>
                    <p className="text-3xl font-bold text-slate-900">$1,250<span className="text-base text-slate-400 font-normal">/mo</span></p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <TrendingUp className="text-white h-6 w-6" />
                  </div>
                </div>
              </motion.div>

              {/* HUD 2: Status Tag - Top Right */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-5 right-5 z-20"
              >
                <div className="bg-slate-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-semibold tracking-wide">Live Market</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
