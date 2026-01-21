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
    <section id="faq" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#001C32]">{t("title")}</h2>
          <p className="text-[#535454] text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 border",
                activeCategory === category.id
                  ? "bg-[#EF7202] text-white border-[#EF7202] shadow-lg scale-105"
                  : "bg-white text-[#535454] border-gray-200 hover:border-[#EF7202] hover:text-[#EF7202] hover:bg-orange-50"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="min-h-[400px]">
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
                    className="bg-white border border-[#E5E6E8] rounded-2xl px-2 shadow-sm transition-all duration-200 data-[state=open]:border-[#EF7202]/30 data-[state=open]:shadow-md overflow-hidden"
                  >
                    <AccordionTrigger className="text-base md:text-lg font-semibold px-4 hover:no-underline hover:text-[#EF7202] transition-colors py-5 text-left text-[#001C32]">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#535454] px-4 pb-6 text-base leading-relaxed">
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
