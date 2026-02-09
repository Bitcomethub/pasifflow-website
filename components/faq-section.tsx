"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations, useMessages } from "next-intl"
import { cn } from "@/lib/utils"

export function FAQSection() {
  const t = useTranslations("faq")
  const messages = useMessages() as Record<string, Record<string, Array<{ q: string; a: string }>>>
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
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block px-4 py-1.5 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-xs font-bold uppercase tracking-wider mb-4 border border-[#B8A074]/20">
            {t("badge") || "FAQ"}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#3D4852]">{t("title")}</h2>
          <p className="text-[#535454] text-base md:text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Categories Tabs - Pure CSS, no animation lag */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-150 border",
                activeCategory === category.id
                  ? "bg-[#B8A074] text-white border-[#B8A074] shadow-lg shadow-[#B8A074]/20"
                  : "bg-white text-[#535454] border-gray-200 hover:border-[#B8A074] hover:text-[#B8A074] hover:bg-[#B8A074]/5"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items - No framer-motion, instant rendering */}
        <div className="min-h-[300px]">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item: { q: string; a: string }, index: number) => (
              <AccordionItem
                key={`${activeCategory}-${index}`}
                value={`item-${index}`}
                className="bg-white border border-[#E5E5E5] rounded-xl px-2 shadow-sm hover:shadow-md transition-shadow duration-150 data-[state=open]:border-[#B8A074]/40 overflow-hidden"
              >
                <AccordionTrigger className="text-sm md:text-lg font-semibold px-4 hover:no-underline hover:text-[#B8A074] transition-colors duration-100 py-5 text-left text-[#3D4852] group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B8A074]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#B8A074]/20 transition-colors duration-100">
                      <span className="text-[#B8A074] font-bold text-sm">{index + 1}</span>
                    </div>
                    <span>{item.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 pl-[3.5rem]">
                  <div className="text-[#535454] text-sm md:text-base leading-relaxed">
                    {item.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-[#535454] mb-4">{t("contactText") || "Still have questions?"}</p>
          <a
            href="https://wa.me/13056903146"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B8A074] hover:bg-[#a38d5d] text-white rounded-xl font-bold transition-colors duration-150 shadow-lg shadow-[#B8A074]/20 active:scale-95"
          >
            {t("contactCta") || "Contact Us"}
          </a>
        </div>
      </div>
    </section>
  )
}
