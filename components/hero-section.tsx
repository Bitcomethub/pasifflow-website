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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-primary/10 blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/10 blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/5 blur-[100px]" />

        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
          >
            <motion.div variants={item} className="flex w-fit items-center gap-3 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm font-medium text-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] hover:bg-white/10 transition-colors backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent shadow-[0_0_10px_rgba(139,92,246,0.6)]"></span>
              </span>
              <span className="tracking-wide text-white/90">{t("badge")}</span>
            </motion.div>

            <motion.div variants={item} className="space-y-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                {t("title")} <br />
                <span className="bg-gradient-to-r from-primary via-blue-400 to-accent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                  {t("titleAccent")}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl border-l-2 border-primary/30 pl-6">
                {t("description")}
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-primary hover:bg-primary/90 text-black font-bold shadow-[0_0_20px_-5px_rgba(14,165,233,0.5)] hover:scale-105 transition-all duration-300" asChild>
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-xl border-white/10 text-white hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 bg-white/5 backdrop-blur-sm"
                asChild
              >
                <a href="#portfoy">
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              {[
                { icon: ShieldCheck, label: "prop1Title", value: "stat1Value", valueKey: true },
                { icon: TrendingUp, label: "prop2Title", value: "stat1Value", valueKey: true },
                { icon: Building2, label: "title", value: "Section 8" },
                { icon: Key, label: "prop3Title", value: "Turnkey" },
              ].map((stat, i) => (
                <div key={i} className="group flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm">
                  <stat.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t(`stat${i + 1}Label`) ? t(`stat${i + 1}Label`) : "Verified"}</span>
                    <span className="block text-xl font-bold text-white tracking-tight">{t(`stat${i + 1}Value`) ? t(`stat${i + 1}Value`) : "100%"}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Content - Floating Portal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:h-[700px] flex items-center justify-center pointer-events-none lg:pointer-events-auto"
          >
            {/* Glowing Ring Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-[80px] opacity-40 animate-pulse-slow" />

            {/* Main Image Container with Portal Effect */}
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-primary/20">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
              <img
                src="/hero-family.png"
                alt="Amerika Yatırım"
                className="w-full h-full object-cover scale-105"
              />

              {/* HUD Overlay 1: Net Income */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-8 left-6 right-6 z-20"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-300 uppercase font-bold tracking-wider mb-1">Net {t("titleAccent")}</p>
                    <p className="text-3xl font-bold text-white tracking-tighter">$1,250<span className="text-lg text-slate-400 font-normal">.00</span></p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/30">
                    <TrendingUp className="text-white h-6 w-6" />
                  </div>
                </div>
              </motion.div>

              {/* HUD Overlay 2: Status Tag */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-6 right-6 z-20"
              >
                <div className="bg-black/60 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-black/20">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-wide">Live Market</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
