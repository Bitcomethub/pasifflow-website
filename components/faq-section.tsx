"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations, useMessages } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Plus, Minus } from "lucide-react"

export function FAQSection() {
  const t = useTranslations("faq")
  const messages = useMessages() as any
  const [activeCategory, setActiveCategory] = useState("general")

  // Access the categories safely from messages object
  const faqItems = messages?.faq?.[activeCategory] || []

  const categories = [
    { id: "general", label: t("categories.general") },
    { id: "process", label: t("categories.process") },
    { id: "property", label: t("categories.property") },
    { id: "financial", label: t("categories.financial") },
    { id: "legal", label: t("categories.legal") }
  ]

  return (
    <section id="faq" className="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B8A074]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3 mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-xs font-bold uppercase tracking-wider mb-4 border border-[#B8A074]/20"
          >
            {t("badge") || "FAQ"}
          </motion.span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#3D4852]">{t("title")}</h2>
          <p className="text-[#535454] text-base md:text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Categories Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border relative overflow-hidden",
                activeCategory === category.id
                  ? "bg-[#B8A074] text-white border-[#B8A074] shadow-lg shadow-[#B8A074]/20"
                  : "bg-white text-[#535454] border-gray-200 hover:border-[#B8A074] hover:text-[#B8A074] hover:bg-[#B8A074]/5"
              )}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#B8A074]"
                  style={{ borderRadius: '9999px' }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="bg-white border border-[#E5E5E5] rounded-xl px-2 shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:border-[#B8A074]/40 data-[state=open]:shadow-[0_10px_40px_-15px_rgba(184,160,116,0.15)] overflow-hidden"
                    >
                      <AccordionTrigger className="text-sm md:text-lg font-semibold px-4 hover:no-underline hover:text-[#B8A074] transition-colors py-5 text-left text-[#3D4852] group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#B8A074]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#B8A074]/20 transition-colors">
                            <span className="text-[#B8A074] font-bold text-sm">{index + 1}</span>
                          </div>
                          <span>{item.q}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-5 pl-[3.5rem]">
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[#535454] text-sm md:text-base leading-relaxed"
                        >
                          {item.a}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[#535454] mb-4">{t("contactText") || "Still have questions?"}</p>
          <motion.a
            href="https://wa.me/13056903146"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8A074] hover:bg-[#a38d5d] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#B8A074]/20"
          >
            {t("contactCta") || "Contact Us"}
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
