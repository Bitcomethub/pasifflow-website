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
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } as any }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F2328] mb-6">
              {t("title")}
              <br />
              <span className="text-[#C1A05E]">{t("subtitle")}</span>
            </h2>
            <p className="text-lg text-[#535454] leading-relaxed max-w-lg">
              Pasiflow ile Amerika'da ev sahibi olmak artık hayal değil.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group text-left p-8 bg-[#1F2328] rounded-[2rem] border border-white/5 hover:border-[#C1A05E]/30 hover:shadow-2xl hover:shadow-[#C1A05E]/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#C1A05E]/20 flex items-center justify-center mb-6 group-hover:bg-[#C1A05E] transition-all duration-300">
                <benefit.icon className="h-7 w-7 text-[#C1A05E] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-xl text-white mb-3 tracking-tight group-hover:text-[#C1A05E] transition-colors">{benefit.title}</h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{benefit.description}</p>
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
          <a href="#portfoy" className="inline-flex items-center gap-2 text-[#C1A05E] font-medium hover:underline group">
            Portföyümüzü Keşfedin
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* ROI Calculator */}
        <div className="mt-20 max-w-4xl">
          <RoiCalculator />
        </div>
      </div>
    </section>
  )
}
