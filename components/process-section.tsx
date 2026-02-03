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
    <section id="nasil-calisir" className="py-12 md:py-20 bg-[#F5F5F5] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <p className="text-[#B8A074] font-semibold mb-3 uppercase tracking-wider text-xs sm:text-sm">
              {t("subtitle")}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3D4852] mb-4">
              {t("title")}
            </h2>
            <p className="text-base text-[#535454] leading-relaxed">
              {t("intro")}
            </p>
          </motion.div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-left p-4 md:p-5 bg-white rounded-lg md:rounded-xl border border-[#E5E5E5] hover:border-[#B8A074]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#B8A074]/10 flex items-center justify-center group-hover:bg-[#B8A074]/20 transition-colors mb-4">
                <step.icon className="h-5 w-5 text-[#B8A074]" />
              </div>
              <h3 className="font-semibold text-sm md:text-base text-[#3D4852] mb-2">{i + 1}- {t(step.titleKey)}</h3>
              <p className="text-[#535454] leading-relaxed text-sm">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-left"
        >
          <a
            href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#B8A074] font-medium hover:underline group"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section >
  )
}
