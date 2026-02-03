"use client"

import { Card } from "@/components/ui/card"
import { X, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function ComparisonSection() {
  const t = useTranslations("comparison")

  const traditionalItems = ["trad1", "trad4", "trad2", "trad5", "trad3", "trad6"]
  const pasiflowItems = ["pasif1", "pasif2", "pasif3", "pasif4", "pasif5", "pasif6"]

  return (
    <section className="py-12 md:py-20 bg-[#1F2328] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#B8A074]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3D4852]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-10 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-xs font-bold uppercase tracking-wider mb-4 border border-[#B8A074]/20"
          >
            {t("badge") || "Compare"}
          </motion.span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{t("title")}</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Traditional Way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-5 md:p-8 border-white/10 bg-white/5 shadow-inner rounded-xl md:rounded-[2rem] flex flex-col backdrop-blur-sm h-full relative overflow-hidden group">
              {/* Dimmed overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="px-4 py-1.5 rounded-full bg-white/10 text-white/60 font-bold text-xs uppercase tracking-widest w-fit mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  {t("traditional")}
                </div>
                <ul className="space-y-4 flex-grow">
                  {traditionalItems.map((key, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3 text-white/50 group"
                    >
                      <div className="h-8 w-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-red-500/20 group-hover:border-red-500/40 group-hover:scale-110">
                        <X className="h-4 w-4 text-red-400" strokeWidth={3} />
                      </div>
                      <span className="font-medium text-sm md:text-base leading-tight group-hover:text-white/70 transition-colors">{t(key)}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Decorative X marks */}
              <div className="absolute top-4 right-4 opacity-10">
                <X size={80} strokeWidth={1} className="text-red-400" />
              </div>
            </Card>
          </motion.div>

          {/* Pasiflow Way - Highlighted */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <Card className="relative p-5 md:p-8 border-[#B8A074]/30 bg-[#1F2328] shadow-[0_20px_40px_-15px_rgba(184,160,116,0.15)] rounded-xl md:rounded-[2rem] overflow-hidden transform transition-all duration-500 h-full">
              {/* Animated gradient border glow */}
              <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent bg-gradient-to-br from-[#B8A074]/50 via-[#1F2328] to-[#3D4852]/50" style={{ padding: '2px' }}>
                <div className="w-full h-full rounded-[1.8rem] bg-[#1F2328]" />
              </div>

              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#B8A074] via-[#a38d5d] to-[#B8A074]" />

              {/* Sparkle effects */}
              <div className="absolute top-4 right-4 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="absolute w-1.5 h-1.5 bg-[#B8A074] rounded-full"
                    style={{
                      right: i * 8,
                      top: i * 4
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="px-4 py-1.5 rounded-full bg-[#B8A074]/20 border border-[#B8A074]/30 text-[#B8A074] font-bold text-xs uppercase tracking-widest w-fit mb-6 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#B8A074]"
                  />
                  {t("pasifflow")}
                </div>

                <ul className="space-y-4 relative">
                  {pasiflowItems.map((key, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 group cursor-default"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-gradient-to-br from-[#B8A074] to-[#a38d5d] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#B8A074]/30"
                      >
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-white" strokeWidth={3} />
                      </motion.div>
                      <span className="font-bold text-white text-sm md:text-base leading-tight group-hover:text-[#B8A074] transition-colors">{t(key)}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
                  <div className="w-full h-full border border-[#B8A074] rounded-full" />
                  <div className="absolute inset-4 border border-[#B8A074] rounded-full" />
                  <div className="absolute inset-8 border border-[#B8A074] rounded-full" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
