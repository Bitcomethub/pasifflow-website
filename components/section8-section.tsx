"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function Section8Section() {
  const t = useTranslations("section8")

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 backdrop-blur-sm">
              {t("badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t("title")} <br />
              <span className="text-accent">{t("titleHighlight")}</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              {t("description")}
            </p>

            <ul className="space-y-4">
              {[
                t("benefit1"),
                t("benefit2"),
                t("benefit3")
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="font-medium text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="text-5xl font-bold text-accent mb-2">{t("stat1Value")}</div>
              <p className="text-primary-foreground/70 font-medium">{t("stat1Label")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2 whitespace-normal break-words">{t("stat2Value")}</div>
                <p className="text-primary-foreground/70 text-xs sm:text-sm">{t("stat2Label")}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">{t("stat3Value")}</div>
                <p className="text-primary-foreground/70 text-xs sm:text-sm">{t("stat3Label")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
