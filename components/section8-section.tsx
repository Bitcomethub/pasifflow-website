"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function Section8Section() {
  const t = useTranslations("section8")

  return (
    <section className="py-12 md:py-20 bg-[#3D4852] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#B8A074]/10 border border-[#B8A074]/20 text-xs sm:text-sm font-medium mb-4 backdrop-blur-sm text-[#B8A074]">
              {t("badge")}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-white">
              {t("title")} <br />
              <span className="text-[#B8A074]">{t("titleHighlight")}</span>
            </h2>
            <p className="text-[#A8B0B8] text-base md:text-lg leading-relaxed mb-6">
              {t("description")}
            </p>

            <ul className="space-y-3">
              {[
                t("list1"),
                t("list2"),
                t("list3"),
                t("list4")
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#B8A074] flex items-center justify-center text-white shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium text-lg text-white">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Stats Grid */}
          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 md:p-8 rounded-xl md:rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2 group-hover:text-[#B8A074] transition-colors">{t("stat1Value")}</div>
              <p className="text-[#A8B0B8] font-medium">{t("stat1Label")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-[#B8A074] transition-colors">{t("stat2Value")}</div>
                <p className="text-[#A8B0B8] text-sm">{t("stat2Label")}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
                <div className="text-xl sm:text-2xl font-bold text-[#B8A074] mb-1">{t("securityTitle")}</div>
                <p className="text-white/80 text-sm font-normal">{t("securityDesc")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
