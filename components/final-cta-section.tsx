"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function FinalCTASection() {
  const t = useTranslations("cta")

  const benefits = ["benefit1", "benefit2", "benefit3"]

  return (
    <section className="py-24 relative overflow-hidden bg-[#151513]">
      {/* Fundrise-style dark section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT-ALIGNED Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-white mb-6 leading-tight">
              {t("title")} <br />
              <span className="text-[#a3452b]">{t("titleAccent")}</span>
            </h2>
            <p className="text-lg text-[#9b9b97] leading-relaxed mb-8 max-w-lg">
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
                  <CheckCircle2 className="h-5 w-5 text-[#a3452b] flex-shrink-0" />
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
                className="h-14 px-8 text-base rounded-lg bg-[#a3452b] hover:bg-[#8a3a24] text-white font-medium shadow-lg transition-all duration-300"
                asChild
              >
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                className="h-14 px-8 text-base rounded-lg bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium transition-all duration-300 gap-2"
                asChild
              >
                <a href="https://wa.me/13056903146" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>

            <p className="text-sm text-[#6b6b67] mt-8">
              {t("disclaimer")}
            </p>
          </motion.div>

          {/* RIGHT - Visual/Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="bg-[#1f1f1d] rounded-2xl p-10 border border-[#2a2a28]">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-left">
                  <p className="text-4xl font-serif text-white mb-2">500+</p>
                  <p className="text-[#9b9b97]">Mutlu Yatırımcı</p>
                </div>
                <div className="text-left">
                  <p className="text-4xl font-serif text-white mb-2">$250M+</p>
                  <p className="text-[#9b9b97]">İşlem Hacmi</p>
                </div>
                <div className="text-left">
                  <p className="text-4xl font-serif text-white mb-2">%8-12</p>
                  <p className="text-[#9b9b97]">Yıllık Getiri</p>
                </div>
                <div className="text-left">
                  <p className="text-4xl font-serif text-white mb-2">150+</p>
                  <p className="text-[#9b9b97]">Aktif Mülk</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
