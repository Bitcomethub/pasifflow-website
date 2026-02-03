"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations, useMessages } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

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
    <section id="faq" className="py-12 md:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#3D4852]">{t("title")}</h2>
          <p className="text-[#535454] text-base md:text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border",
                activeCategory === category.id
                  ? "bg-[#B8A074] text-white border-[#B8A074] shadow-md"
                  : "bg-white text-[#535454] border-gray-200 hover:border-[#B8A074] hover:text-[#B8A074] hover:bg-[#B8A074]/5"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqItems.map((item: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white border border-[#E5E5E5] rounded-xl px-2 shadow-sm transition-all duration-200 data-[state=open]:border-[#B8A074]/30 data-[state=open]:shadow-md overflow-hidden"
                  >
                    <AccordionTrigger className="text-sm md:text-lg font-semibold px-3 hover:no-underline hover:text-[#B8A074] transition-colors py-4 text-left text-[#3D4852]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#535454] px-3 pb-4 text-sm leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
