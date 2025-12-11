import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations } from "next-intl"

export function FAQSection() {
  const t = useTranslations("faq")

  // Generate array [1...12]
  const faqKeys = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t("title")}</h2>
          <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={`item-${key}`} className="bg-background border border-border/50 rounded-lg px-2 shadow-sm transition-all duration-200 data-[state=open]:border-primary/50 data-[state=open]:shadow-md">
              <AccordionTrigger className="text-lg font-medium px-4 hover:no-underline hover:text-primary transition-colors py-6 text-left">
                {t(`q${key}`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 pb-6 text-base leading-relaxed">
                {t(`a${key}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
