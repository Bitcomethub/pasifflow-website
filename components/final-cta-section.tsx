"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function FinalCTASection() {
  const t = useTranslations("cta")

  const benefits = ["benefit1", "benefit2", "benefit3"]

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background - High contrast slate */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 z-0" />

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              {t("title")} <br />
              <span className="text-amber-400">{t("titleAccent")}</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 text-slate-200"
          >
            {benefits.map((key, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="text-amber-400" />
                <span className="font-medium">{t(key)}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-xl shadow-amber-500/20 w-full sm:w-auto font-semibold"
              asChild
            >
              <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                {t("ctaPrimary")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-green-600 hover:bg-green-500 text-white w-full sm:w-auto gap-2 font-semibold"
              asChild
            >
              <a href="https://wa.me/13056903146" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {t("ctaSecondary")}
              </a>
            </Button>
          </motion.div>

          <p className="text-sm text-slate-500 pt-8">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </section>
  )
}
