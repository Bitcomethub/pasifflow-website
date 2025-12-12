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
      {/* Background Gradient - Teal/Emerald theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-emerald-800 z-0" />

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              {t("title")} <br />
              <span className="text-accent">{t("titleAccent")}</span>
            </h2>
            <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 text-white/90"
          >
            {benefits.map((key, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="text-accent" />
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
            <Button size="lg" className="h-14 px-8 text-lg bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20 w-full sm:w-auto font-semibold">
              {t("ctaPrimary")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              className="h-14 px-8 text-lg bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto gap-2 font-semibold"
              asChild
            >
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {t("ctaSecondary")}
              </a>
            </Button>
          </motion.div>

          <p className="text-sm text-white/40 pt-8">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </section>
  )
}
