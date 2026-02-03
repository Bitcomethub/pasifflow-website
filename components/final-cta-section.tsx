"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, MessageCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function FinalCTASection() {
  const t = useTranslations("cta")

  const benefits = ["benefit1", "benefit2", "benefit3"]

  return (
    <section className="py-16 md:py-28 relative overflow-hidden bg-[#3D4852]">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#B8A074]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1F2328]/50 rounded-full blur-3xl" />

        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
            className="absolute w-2 h-2 bg-[#B8A074] rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B8A074]/20 rounded-full border border-[#B8A074]/30 text-[#B8A074] text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles size={14} className="animate-pulse" />
            {t("badge") || "Limited Time"}
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t("title")} <br />
            <span className="text-[#B8A074]">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg md:text-xl text-[#A8B0B8] leading-relaxed mb-10 max-w-2xl mx-auto">
            {t("description")}
          </p>

          {/* Benefits List - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10"
          >
            {benefits.map((key, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 cursor-default"
              >
                <div className="w-6 h-6 rounded-full bg-[#B8A074]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-[#B8A074]" />
                </div>
                <span className="text-white font-medium text-sm md:text-base">{t(key)}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                className="h-14 md:h-16 px-10 md:px-12 text-base md:text-lg rounded-xl bg-[#B8A074] hover:bg-[#a38d5d] text-white font-bold shadow-[0_20px_40px_-15px_rgba(184,160,116,0.3)] transition-all duration-300"
                asChild
              >
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  <span>{t("ctaPrimary")}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                className="h-14 md:h-16 px-10 md:px-12 text-base md:text-lg rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 transition-all duration-300 gap-3"
                asChild
              >
                <a href="https://wa.me/13056903146" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t("ctaSecondary")}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 flex items-center justify-center gap-6"
          >
            <div className="flex -space-x-3">
              {["https://randomuser.me/api/portraits/men/32.jpg", "https://randomuser.me/api/portraits/women/44.jpg", "https://randomuser.me/api/portraits/men/46.jpg", "https://randomuser.me/api/portraits/women/68.jpg"].map((src, i) => (
                <motion.img
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  src={src}
                  alt="Investor"
                  className="w-10 h-10 rounded-full border-2 border-[#3D4852]"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <svg key={i} className="w-4 h-4 text-[#B8A074]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-[#A8B0B8]/80 mt-1">500+ {t("happyInvestors") || "Happy Investors"}</p>
            </div>
          </motion.div>

          <p className="text-xs text-[#A8B0B8]/50 mt-8">
            {t("disclaimer")}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
