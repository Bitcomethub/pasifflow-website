"use client"

import { TrendingUp, ShieldCheck, Building2, Key } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function ValuePropsSection() {
  const t = useTranslations("valueProps")

  const benefits = [
    {
      icon: TrendingUp,
      title: t("prop2Title"), // Yüksek Getiri
      description: t("prop2Desc"),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      icon: ShieldCheck,
      title: t("prop1Title"), // Devlet Garantili
      description: t("prop1Desc"),
      gradient: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-500"
    },
    {
      icon: Key,
      title: t("prop3Title"), // Anahtar Teslim
      description: t("prop3Desc"),
      gradient: "from-purple-500/20 to-indigo-500/20",
      iconColor: "text-purple-500"
    },
    {
      icon: Building2,
      title: t("prop4Title"), // Prof Yönetim
      description: t("prop4Desc"),
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500"
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary text-balance mb-4">
              {t("title")}<br />
              <span className="text-accent underline decoration-4 underline-offset-4 decoration-primary/20">{t("subtitle")}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pasiflow ile Amerika'da ev sahibi olmak artık hayal değil.
            </p>
          </motion.div>
        </div>

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
              className="group relative bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative space-y-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-background shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`h-7 w-7 ${benefit.iconColor}`} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
