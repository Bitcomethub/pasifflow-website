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
    <section id="nasil-calisir" className="py-24 bg-[#faf9f6] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* LEFT-ALIGNED Header - Fundrise Style */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <p className="text-[#a3452b] font-medium mb-4 uppercase tracking-wider text-sm">
              {t("subtitle")}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#151513] mb-6">
              {t("title")}
            </h2>
            <p className="text-lg text-[#6b6b67] leading-relaxed">
              {t("intro")}
            </p>
          </motion.div>
        </div>

        {/* Steps Grid - Clean Fundrise Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-left p-8 bg-white rounded-xl border border-[#e5e4df] hover:border-[#a3452b]/30 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Step Number */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#a3452b] flex items-center justify-center text-white font-semibold">
                  {i + 1}
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#a3452b]/10 flex items-center justify-center group-hover:bg-[#a3452b]/20 transition-colors">
                  <step.icon className="h-5 w-5 text-[#a3452b]" />
                </div>
              </div>

              <h3 className="font-semibold text-xl text-[#151513] mb-3">
                {t(step.titleKey)}
              </h3>
              <p className="text-[#6b6b67] leading-relaxed">
                {t(step.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-left"
        >
          <a
            href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#a3452b] font-medium hover:underline group"
          >
            Ücretsiz Danışmanlık Alın
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
