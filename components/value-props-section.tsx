"use client"

import { TrendingUp, ShieldCheck, Building2, Key, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { RoiCalculator } from "@/components/roi-calculator"

export function ValuePropsSection() {
  const t = useTranslations("valueProps")

  const benefits = [
    {
      icon: TrendingUp,
      title: t("prop2Title"),
      description: t("prop2Desc"),
    },
    {
      icon: ShieldCheck,
      title: t("prop1Title"),
      description: t("prop1Desc"),
    },
    {
      icon: Key,
      title: t("prop3Title"),
      description: t("prop3Desc"),
    },
    {
      icon: Building2,
      title: t("prop4Title"),
      description: t("prop4Desc"),
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }
    }
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* LEFT-ALIGNED Header - Fundrise Style */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#151513] mb-6">
              {t("title")}
              <br />
              <span className="text-[#a3452b]">{t("subtitle")}</span>
            </h2>
            <p className="text-lg text-[#6b6b67] leading-relaxed max-w-lg">
              Pasiflow ile Amerika'da ev sahibi olmak artık hayal değil.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <p className="text-[#4a4a47] leading-relaxed">
              Profesyonel property management, devlet garantili kiracılar ve her ay düzenli pasif gelir.
              Tüm bu avantajlarla yatırımlarınızı güvence altına alıyoruz.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group text-left p-8 bg-[#faf9f6] rounded-xl border border-[#e5e4df] hover:border-[#a3452b]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#a3452b]/10 flex items-center justify-center mb-6 group-hover:bg-[#a3452b]/20 transition-colors">
                <benefit.icon className="h-6 w-6 text-[#a3452b]" />
              </div>

              <h3 className="font-semibold text-xl text-[#151513] mb-3">{benefit.title}</h3>
              <p className="text-[#6b6b67] leading-relaxed text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Link - Fundrise Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-left"
        >
          <a
            href="#portfoy"
            className="inline-flex items-center gap-2 text-[#a3452b] font-medium hover:underline group"
          >
            Portföyümüzü Keşfedin
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* ROI Calculator */}
        <div className="mt-24 max-w-4xl">
          <RoiCalculator />
        </div>
      </div>
    </section>
  )
}
