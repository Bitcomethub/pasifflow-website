"use client"

import { TrendingUp, ShieldCheck, Building2, Key, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { RoiCalculator } from "@/components/roi-calculator"

export function ValuePropsSection() {
  const t = useTranslations("valueProps")

  const benefits = [
    { icon: TrendingUp, title: t("prop2Title"), description: t("prop2Desc") },
    { icon: ShieldCheck, title: t("prop1Title"), description: t("prop1Desc") },
    { icon: Key, title: t("prop3Title"), description: t("prop3Desc") },
    { icon: Building2, title: t("prop4Title"), description: t("prop4Desc") },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  } as const

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8A074]/3 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3D4852]/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-10 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-xs font-bold uppercase tracking-wider mb-4 border border-[#B8A074]/20"
            >
              {t("badge") || "Why Pasiflow"}
            </motion.span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3D4852] mb-4">
              {t("title")}
              <br />
              <span className="text-[#B8A074]">{t("subtitle")}</span>
            </h2>
            <p className="text-base md:text-lg text-[#535454] leading-relaxed max-w-lg">
              {t("intro")}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative text-left p-5 md:p-7 bg-[#1F2328] rounded-xl md:rounded-[2rem] border border-white/5 hover:border-[#B8A074]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8A074]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#B8A074]/30 rounded-tr-lg" />
              </div>

              {/* Icon container with enhanced effects */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#B8A074]/10 flex items-center justify-center mb-5 group-hover:bg-[#B8A074] transition-all duration-500">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                >
                  <benefit.icon className="h-6 w-6 md:h-7 md:w-6 text-[#B8A074] group-hover:text-white transition-colors duration-300" />
                </motion.div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-[#B8A074]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <h3 className="font-bold text-lg md:text-xl text-white mb-3 tracking-tight group-hover:text-[#B8A074] transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300 text-sm md:text-base">
                {benefit.description}
              </p>

              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B8A074] to-[#a38d5d]"
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-left"
        >
          <motion.a
            href="#portfoy"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-[#B8A074] font-bold hover:text-[#a38d5d] group"
          >
            {t("discoverPortfolio")}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-16 max-w-4xl"
        >
          <RoiCalculator />
        </motion.div>
      </div>
    </section>
  )
}
