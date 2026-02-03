"use client"

import { Target, Search, FileCheck, FilePen, Home, BarChart3, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function ProcessSection() {
  const t = useTranslations("process")

  const steps = [
    { icon: Target, titleKey: "step1Title", descKey: "step1Desc" },
    { icon: Search, titleKey: "step2Title", descKey: "step2Desc" },
    { icon: FileCheck, titleKey: "step3Title", descKey: "step3Desc" },
    { icon: FilePen, titleKey: "step4Title", descKey: "step4Desc" },
    { icon: Home, titleKey: "step5Title", descKey: "step5Desc" },
    { icon: BarChart3, titleKey: "step6Title", descKey: "step6Desc" },
  ]

  return (
    <section id="nasil-calisir" className="py-12 md:py-20 bg-[#F5F5F5] overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B8A074]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#3D4852]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-10 lg:mb-12">
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
              {t("subtitle")}
            </motion.span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3D4852] mb-4">
              {t("title")}
            </h2>
            <p className="text-base text-[#535454] leading-relaxed">
              {t("intro")}
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
                hover: { duration: 0.3 }
              }}
              className="relative text-left p-5 md:p-6 bg-white rounded-xl md:rounded-2xl border border-[#E5E5E5] hover:border-[#B8A074]/40 hover:shadow-[0_20px_40px_-15px_rgba(184,160,116,0.15)] transition-all duration-300 group overflow-hidden"
            >
              {/* Step number background */}
              <div className="absolute -top-4 -right-4 w-20 h-20 opacity-5">
                <span className="text-6xl font-bold text-[#B8A074]">{i + 1}</span>
              </div>

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8A074]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon container */}
                <div className="relative w-12 h-12 rounded-xl bg-[#B8A074]/10 flex items-center justify-center mb-4 group-hover:bg-[#B8A074] transition-all duration-300">
                  <motion.div
                    animate={{
                      rotate: i % 2 === 0 ? [0, 5, -5, 0] : [0, -5, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                  >
                    <step.icon className="h-6 w-6 text-[#B8A074] group-hover:text-white transition-colors duration-300" />
                  </motion.div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-[#B8A074]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Step number badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] flex items-center justify-center text-sm font-bold text-[#535454] group-hover:bg-[#B8A074] group-hover:text-white group-hover:border-[#B8A074] transition-all duration-300">
                  {i + 1}
                </div>

                <h3 className="font-bold text-base md:text-lg text-[#3D4852] mb-2 pr-10 group-hover:text-[#B8A074] transition-colors">
                  {t(step.titleKey)}
                </h3>
                <p className="text-[#535454] leading-relaxed text-sm group-hover:text-[#3D4852] transition-colors">
                  {t(step.descKey)}
                </p>
              </div>

              {/* Animated connector line for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#B8A074]/30 to-[#B8A074]/10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-left"
        >
          <motion.a
            href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-[#B8A074] font-bold hover:text-[#a38d5d] group"
          >
            {t("cta")}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
