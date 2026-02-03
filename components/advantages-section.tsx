"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Shield, TrendingUp, Home, CheckCircle } from "lucide-react"

export function AdvantagesSection() {
  const t = useTranslations("advantages")

  return (
    <section className="py-12 md:py-20 bg-[#F5F5F5] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8A074]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3D4852]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 border-[#E5E5E5] bg-white shadow-[0_20px_60px_-15px_rgba(30,40,75,0.1)] relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8A074] via-[#a38d5d] to-[#B8A074]" />

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#B8A074] rounded-tr-2xl" />
            </div>

            <div className="space-y-6 text-center relative z-10">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8A074]/10 text-[#B8A074] text-sm font-bold tracking-wide border border-[#B8A074]/20 uppercase"
              >
                <Shield size={14} />
                {t("badge")}
              </motion.span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#3D4852] tracking-tight">
                {t("title")} <span className="text-[#B8A074]">{t("titleAccent1")}</span> ve <span className="text-[#B8A074]">{t("titleAccent2")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-4 relative z-10">
              {/* Left Column - Küçük Sermaye */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-5"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#3D4852] flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#B8A074]/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-[#B8A074]" />
                  </div>
                  {t("col1Title")}
                </h3>
                <ul className="space-y-4">
                  {[t("col1Item1"), t("col1Item2"), t("col1Item3"), t("col1Item4")].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 group cursor-default"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#B8A074]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#B8A074] group-hover:scale-110 transition-all duration-300">
                        <CheckCircle className="h-3.5 w-3.5 text-[#B8A074] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm md:text-base text-[#535454] group-hover:text-[#3D4852] transition-colors leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right Column - Devlet Garantisi */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-5"
              >
                <h3 className="text-lg md:text-xl font-bold text-[#3D4852] flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#B8A074]/10 flex items-center justify-center">
                    <Home className="h-5 w-5 md:h-6 md:w-6 text-[#B8A074]" />
                  </div>
                  {t("col2Title")}
                </h3>
                <div>
                  <p className="text-sm md:text-base text-[#535454] leading-relaxed mb-5">
                    <strong className="text-[#3D4852]">Section 8</strong> {t("col2Desc")}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#1F2328] to-[#3D4852] border border-[#B8A074]/20"
                  >
                    <ul className="space-y-4 m-0 p-0 list-none">
                      {[t("col2Item1"), t("col2Item2"), t("col2Item3")].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white text-sm md:text-base">
                          <div className="w-2 h-2 rounded-full bg-[#B8A074]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {/* Decorative glow */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#B8A074]/10 rounded-full blur-2xl" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
