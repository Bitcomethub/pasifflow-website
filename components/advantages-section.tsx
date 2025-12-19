"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function AdvantagesSection() {
  const t = useTranslations("advantages")

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-14 max-w-5xl mx-auto space-y-12 border-primary/20 bg-gradient-to-br from-card to-muted/30 shadow-2xl shadow-primary/5">
            <div className="space-y-6 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide border border-accent/20 uppercase">
                {t("badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                {t("title")} <span className="text-accent">{t("titleAccent1")}</span> ve <span className="text-accent">{t("titleAccent2")}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 pt-4">
              {/* Left Column - Küçük Sermaye */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">1</span>
                  {t("col1Title")}
                </h3>
                <ul className="space-y-5">
                  {[t("col1Item1"), t("col1Item2"), t("col1Item3"), t("col1Item4")].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 group-hover:scale-150 transition-transform" />
                      <span className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column - Devlet Garantisi */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">2</span>
                  {t("col2Title")}
                </h3>
                <div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Section 8</strong> {t("col2Desc")}
                  </p>
                  <div className="mt-6 p-6 rounded-xl bg-primary/10 border border-primary/20">
                    <ul className="space-y-3 m-0 p-0 list-none">
                      <li className="flex items-center gap-3 text-foreground text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t("col2Item1")}
                      </li>
                      <li className="flex items-center gap-3 text-foreground text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t("col2Item2")}
                      </li>
                      <li className="flex items-center gap-3 text-foreground text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t("col2Item3")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
