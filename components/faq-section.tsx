"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"

export function FAQSection() {
  const t = useTranslations("faq")
  const [showAll, setShowAll] = useState(false)

  // First 8 FAQs visible by default, rest hidden behind "show more"
  const initialFaqCount = 8
  const totalFaqCount = 40

  // Generate array [1...40]
  const allFaqKeys = Array.from({ length: totalFaqCount }, (_, i) => i + 1)
  const visibleFaqKeys = showAll ? allFaqKeys : allFaqKeys.slice(0, initialFaqCount)

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t("title")}</h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {visibleFaqKeys.map((key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: key > initialFaqCount ? (key - initialFaqCount) * 0.03 : 0 }}
            >
              <AccordionItem
                value={`item-${key}`}
                className="bg-background border border-border/50 rounded-lg px-2 shadow-sm transition-all duration-200 data-[state=open]:border-primary/50 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-lg font-medium px-4 hover:no-underline hover:text-primary transition-colors py-6 text-left">
                  {t(`q${key}`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground px-4 pb-6 text-base leading-relaxed">
                  {t(`a${key}`)}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* Show More / Show Less Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="gap-2 font-semibold border-2 hover:bg-primary/5 hover:border-primary/30 transition-all"
          >
            {showAll ? (
              <>
                {t("showLess")}
                <ChevronUp className="h-5 w-5" />
              </>
            ) : (
              <>
                {t("showMore")}
                <ChevronDown className="h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
