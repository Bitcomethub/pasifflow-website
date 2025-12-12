"use client"

import { Target, Search, FileCheck, FilePen, Home, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function ProcessSection() {
  const t = useTranslations("process")

  const steps = [
    {
      icon: Target,
      titleKey: "step1Title",
      descKey: "step1Desc",
      checks: ["step1Check1", "step1Check2", "step1Check3"]
    },
    {
      icon: Search,
      titleKey: "step2Title",
      descKey: "step2Desc",
      checks: ["step2Check1", "step2Check2", "step2Check3"]
    },
    {
      icon: FileCheck,
      titleKey: "step3Title",
      descKey: "step3Desc",
      checks: ["step3Check1", "step3Check2", "step3Check3"]
    },
    {
      icon: FilePen,
      titleKey: "step4Title",
      descKey: "step4Desc",
      checks: ["step4Check1", "step4Check2", "step4Check3"]
    },
    {
      icon: Home,
      titleKey: "step5Title",
      descKey: "step5Desc",
      checks: ["step5Check1", "step5Check2", "step5Check3"]
    },
    {
      icon: BarChart3,
      titleKey: "step6Title",
      descKey: "step6Desc",
      checks: ["step6Check1", "step6Check2", "step6Check3"]
    },
  ]

  return (
    <section id="nasil-calisir" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-2 border border-accent/20">
            {t("subtitle")}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("intro")}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Center Line (Hidden on mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 md:-translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className="flex-1 md:text-right">
                  <div className={`space-y-4 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} p-8 bg-background rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 group`}>
                    <div className={`md:hidden flex items-center gap-3 mb-4`}>
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                        {i + 1}
                      </div>
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{t(step.titleKey)}</h3>
                    </div>

                    <h3 className="font-bold text-xl hidden md:block group-hover:text-primary transition-colors">{t(step.titleKey)}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(step.descKey)}
                    </p>

                    {/* Check list visual enhancement */}
                    <ul className={`space-y-2 pt-2 ${i % 2 === 0 ? 'items-start' : 'items-end md:items-end'} flex flex-col`}>
                      {step.checks.map((checkKey, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                          {i % 2 !== 0 && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-accent" />}
                          {t(checkKey)}
                          {i % 2 === 0 && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-accent" />}
                          <span className="md:hidden w-1.5 h-1.5 rounded-full bg-accent" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Number Bubble */}
                <div className="relative z-10 flex-shrink-0 hidden md:flex">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-xl shadow-primary/20 border-4 border-background transition-transform duration-300 hover:scale-110">
                    <step.icon size={28} />
                  </div>
                  <div className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground border-2 border-background shadow-sm">
                    {i + 1}
                  </div>
                </div>

                {/* Empty Side for Layout Balance */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
