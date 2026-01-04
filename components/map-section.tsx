"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

import Link from "next/link"

export function MapSection() {
  const t = useTranslations("map")

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />
      {/* Soft gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t("title")}</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-12">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto aspect-[16/9] bg-white/10 rounded-3xl border border-white/20 p-2 md:p-4 backdrop-blur-md shadow-2xl"
        >
          {/* Light Premium Map Style */}
          <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center group shadow-inner">
            {/* Abstract Map Background - Inverted/Light opacity */}
            <div className="absolute inset-0 opacity-80 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/1a/Blank_US_Map_(states_only).svg')] bg-contain bg-center bg-no-repeat filter invert brightness-0 saturate-100 opacity-20"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Animated Pins/Hotspots - Now linking to Portfolio */}
              <Link href="#portfoy" className="absolute top-[35%] right-[25%] flex flex-col items-center group/pin cursor-pointer">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-accent border-2 border-white"></span>
                </span>
                <span className="mt-2 text-sm font-bold text-white drop-shadow-md opacity-0 group-hover/pin:opacity-100 transition-opacity bg-primary/80 px-2 py-1 rounded backdrop-blur-sm">Cleveland, OH</span>
              </Link>

              <Link href="#portfoy" className="absolute top-[48%] right-[32%] flex flex-col items-center group/pin cursor-pointer">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animation-delay-500"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-accent border-2 border-white"></span>
                </span>
                <span className="mt-2 text-sm font-bold text-white drop-shadow-md opacity-0 group-hover/pin:opacity-100 transition-opacity bg-primary/80 px-2 py-1 rounded backdrop-blur-sm">St. Louis, MO</span>
              </Link>

              <Link href="#portfoy" className="absolute top-[38%] right-[28%] flex flex-col items-center group/pin cursor-pointer">
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animation-delay-1000"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-accent border-2 border-white"></span>
                </span>
                <span className="mt-2 text-sm font-bold text-white drop-shadow-md opacity-0 group-hover/pin:opacity-100 transition-opacity bg-primary/80 px-2 py-1 rounded backdrop-blur-sm">Detroit, MI</span>
              </Link>
            </div>

            <div className="relative z-10 text-center space-y-2 pointer-events-none">
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">{t("activeStates")}</h3> {/* text-white for contrast on primary bg */}
              <p className="text-sm md:text-lg text-white/90 font-medium">{t("tagline")}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button asChild variant="secondary" size="lg" className="font-semibold text-primary w-full sm:w-auto shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <Link href="#portfoy">
              {t("ctaPrimary")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 hover:bg-white/10 text-white bg-transparent w-full sm:w-auto hover:border-white/50 backdrop-blur-sm cursor-pointer">
            <Link href="https://wa.me/13056903146?text=Merhaba%2C%20Eyalet%20raporlar%C4%B1n%C4%B1%20incelemek%20istiyorum." target="_blank">
              {t("ctaSecondary")}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
