"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function FinalCTASection() {
  const t = useTranslations("cta")

  const benefits = ["benefit1", "benefit2", "benefit3"]

  return (
    <section className="py-24 relative overflow-hidden bg-[#3D4852]">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t("title")} <br />
            <span className="text-[#B8A074]">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg md:text-xl text-[#C7CBD3] leading-relaxed mb-10 max-w-2xl mx-auto">
            {t("description")}
          </p>

          {/* Benefits List - Centered */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
            {benefits.map((key, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5 text-[#009688] flex-shrink-0" />
                <span className="text-white font-medium text-lg">{t(key)}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="h-16 px-10 text-lg rounded-xl bg-[#B8A074] hover:bg-[#d86502] text-white font-bold shadow-xl shadow-orange-900/20 transition-all duration-300 hover:scale-105"
              asChild
            >
              <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                {t("ctaPrimary")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              className="h-16 px-10 text-lg rounded-xl bg-[#009688] hover:bg-[#00796b] text-white font-bold transition-all duration-300 gap-2 hover:scale-105"
              asChild
            >
              <a href="https://wa.me/13056903146" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {t("ctaSecondary")}
              </a>
            </Button>
          </motion.div>

          <p className="text-sm text-[#C7CBD3]/60 mt-10">
            {t("disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
