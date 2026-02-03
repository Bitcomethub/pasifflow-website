"use client"

import { Card } from "@/components/ui/card"
import { X, Check } from "lucide-react"
import { useTranslations } from "next-intl"

export function ComparisonSection() {
  const t = useTranslations("comparison")

  const traditionalItems = ["trad1", "trad4", "trad2", "trad5", "trad3", "trad6"]
  const pasiflowItems = ["pasif1", "pasif2", "pasif3", "pasif4", "pasif5", "pasif6"]

  return (
    <section className="py-12 md:py-20 bg-[#1F2328] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-3 mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-[#C1A05E]">{t("title")}</h2>
          <p className="text-white/70 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Traditional Way */}
          <Card className="p-5 md:p-8 border-white/10 bg-white/5 shadow-inner rounded-xl md:rounded-[2rem] flex flex-col backdrop-blur-sm">
            <div className="px-4 py-1.5 rounded-full bg-white/10 text-white/60 font-bold text-xs uppercase tracking-widest w-fit mb-6">
              {t("traditional")}
            </div>
            <ul className="space-y-4 flex-grow">
              {traditionalItems.map((key, i) => (
                <li key={i} className="flex items-center gap-3 text-white/50 group">
                  <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-destructive/20">
                    <X className="h-3 w-3 text-destructive" strokeWidth={3} />
                  </div>
                  <span className="font-medium text-sm md:text-base">{t(key)}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Pasiflow Way */}
          <Card className="relative p-5 md:p-8 border-[#1F2328] bg-[#1F2328] shadow-[0_20px_40px_-15px_rgba(30,40,75,0.2)] rounded-xl md:rounded-[2rem] overflow-hidden transform md:-translate-y-4 transition-all duration-300 hover:shadow-[0_30px_60px_-15px_rgba(30,40,75,0.3)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B8A074] to-[#a38d5d]" />
            <div className="px-4 py-1.5 rounded-full bg-[#B8A074]/20 border border-[#B8A074]/30 text-[#B8A074] font-bold text-xs uppercase tracking-widest w-fit mb-6">
              {t("pasifflow")}
            </div>

            <ul className="space-y-4 relative">
              {pasiflowItems.map((key, i) => (
                <li key={i} className="flex items-center gap-3 group">
                  <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-[#B8A074] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#B8A074]/20 transition-transform group-hover:scale-110">
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-white stroke-[4px]" />
                  </div>
                  <span className="font-bold text-white text-sm md:text-base tracking-tight group-hover:text-[#B8A074] transition-colors">{t(key)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
