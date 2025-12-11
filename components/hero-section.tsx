"use client"

import { Button } from "@/components/ui/button"
import { Building2, TrendingUp, ShieldCheck, Key } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
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
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent/5 blur-[100px]" />
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
            <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full bg-primary/5 border border-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm hover:bg-primary/10 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Türkiye'den Amerika'ya Pasif Gelir
            </motion.div>

            <motion.div variants={item} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
                Devlet Garantili <br />
                <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">
                  Dolar Geliri
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Amerika'da <span className="text-foreground font-semibold">%12'ye kadar net kira getirisi</span> ile her ay düzenli pasif gelir. Tüm süreç A'dan Z'ye PasifFlow tarafından yönetilir.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 hover:scale-105 transition-all duration-300">
                Ücretsiz Danışmanlık Al
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full border-2 border-border/50 hover:bg-accent/10 hover:text-accent-foreground hover:border-accent/50 transition-all duration-300 bg-background/50 backdrop-blur-sm"
              >
                Portföyü İncele
              </Button>
            </motion.div>

            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/50">
              {[
                { icon: ShieldCheck, label: "Devlet Garantisi" },
                { icon: TrendingUp, label: "%12 Net Getiri" },
                { icon: Building2, label: "Section 8" },
                { icon: Key, label: "Anahtar Teslim" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2 items-start p-2 rounded-lg hover:bg-accent/5 transition-colors">
                  <stat.icon className="h-6 w-6 text-accent" />
                  <span className="text-sm font-semibold text-foreground/80">{stat.label}</span>
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
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-background/50 outline outline-1 outline-border/20 max-w-md lg:max-w-full mx-auto transform hover:rotate-1 transition-transform duration-500">
              <img
                src="/happy-turkish-family-in-front-of-american-suburban.jpg"
                alt="Amerika Yatırım"
                className="w-full h-full object-cover"
              />

              {/* Floating Overlay Card 1: Monthly Income */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-lg p-4 rounded-xl border border-border/50 shadow-xl flex items-center gap-4"
              >
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">$</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Aylık Kira Geliri</p>
                  <p className="text-lg font-bold text-foreground">$1,250.00</p>
                </div>
              </motion.div>

              {/* Floating Overlay Card 2: Status */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-6 right-6 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2"
              >
                <ShieldCheck size={16} />
                Devlet Garantili
              </motion.div>
            </div>

            {/* Background Decorative Rings */}
            <div className="absolute -z-10 w-[120%] h-[120%] border border-primary/5 rounded-full animate-[spin_50s_linear_infinite]" />
            <div className="absolute -z-10 w-[90%] h-[90%] border border-accent/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
