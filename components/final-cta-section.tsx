"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function FinalCTASection() {
  const t = useTranslations("cta")

  const benefits = ["benefit1", "benefit2", "benefit3"]

  return (
    <section className="py-24 relative overflow-hidden bg-[#001C32]">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t("title")} <br />
              <span className="text-[#EF7202]">{t("titleAccent")}</span>
            </h2>
            <p className="text-lg text-[#C7CBD3] leading-relaxed mb-8 max-w-lg">
              {t("description")}
            </p>

            {/* Benefits List */}
            <div className="space-y-3 mb-10">
              {benefits.map((key, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#009688] flex-shrink-0" />
                  <span className="text-white font-medium">{t(key)}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-lg bg-[#EF7202] hover:bg-[#d86502] text-white font-semibold shadow-lg transition-all duration-300"
                asChild
              >
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-lg bg-[#009688] hover:bg-[#00796b] text-white font-semibold transition-all duration-300 gap-2"
                asChild
              >
                <a href="https://wa.me/13056903146" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>

            <p className="text-sm text-[#C7CBD3]/70 mt-8">
              {t("disclaimer")}
            </p>
          </motion.div>

          {/* RIGHT - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="bg-white/5 rounded-2xl p-10 border border-white/10">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-left">
                  <p className="text-4xl font-bold text-white mb-2">500+</p>
                  <p className="text-[#C7CBD3]">Mutlu Yatırımcı</p>
                </div>
                <div className="text-left">
                  <p className="text-4xl font-bold text-white mb-2">$250M+</p>
                  <p className="text-[#C7CBD3]">İşlem Hacmi</p>
                </div>
                <div className="text-left">
                  <p className="text-4xl font-bold text-[#009688] mb-2">%8-12</p>
                  <p className="text-[#C7CBD3]">Yıllık Getiri</p>
                </div>
                <div className="text-left">
                  <p className="text-4xl font-bold text-white mb-2">150+</p>
                  <p className="text-[#C7CBD3]">Aktif Mülk</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
