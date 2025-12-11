"use client"

import { MessageSquare, Home, FileCheck, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export function ProcessSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Danışmanlık",
      description: "Yatırım hedeflerinizi belirleyip size en uygun stratejiyi oluşturuyoruz.",
      checkList: ["Ücretsiz Ön Görüşme", "Bütçe Planlaması", "ROI Analizi"]
    },
    {
      icon: Home,
      title: "Portföy Seçimi",
      description: "Verified (Onaylı) portföyümüzden kriterlerinize uyan evi seçiyorsunuz.",
      checkList: ["Ekspertiz Raporu", "Detaylı Video Tur", "Tapu Sorgulama"]
    },
    {
      icon: FileCheck,
      title: "Satın Alma & Kapanış",
      description: "Tüm yasal süreçler, tapu devri ve kontratlar dijital ortamda tamamlanıyor.",
      checkList: ["Online İmza", "Title Company Güvencesi", "3-5 Gün İçinde Devir"]
    },
    {
      icon: ShieldCheck,
      title: "Kira Garantisi & Yönetim",
      description: "Eviniz zaten kiracılı olduğu için kapanış günü kira geliriniz işlemeye başlar.",
      checkList: ["Garantili Kira (Section 8)", "Profesyonel Yönetim", "Düzenli Dolar Geliri"]
    },
  ]

  return (
    <section id="nasil-calisir" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-2">
            Kolay Yatırım Süreci
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary">
            Sadece 4 Adımda <br />
            <span className="text-foreground">Ev Sahibi Olun</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Türkiye'den Amerika'da ev sahibi olmak hiç bu kadar kolay olmamıştı. Karmaşık süreçleri sizin için basitleştirdik.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Center Line (Hidden on mobile) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border/50 md:-translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-20">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content Side */}
                <div className="flex-1 md:text-right">
                  <div className={`space-y-4 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'} p-8 bg-background rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-shadow`}>
                    <div className={`md:hidden flex items-center gap-3 mb-4`}>
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                        {i + 1}
                      </div>
                      <h3 className="font-bold text-xl">{step.title}</h3>
                    </div>

                    <h3 className="font-bold text-xl hidden md:block">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    <ul className={`space-y-2 pt-2 ${i % 2 === 0 ? 'items-start' : 'items-end md:items-end'} flex flex-col`}>
                      {step.checkList.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                          {i % 2 !== 0 && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-accent" />}
                          {item}
                          {i % 2 === 0 && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-accent" />}
                          <span className="md:hidden w-1.5 h-1.5 rounded-full bg-accent" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Number Bubble */}
                <div className="relative z-10 flex-shrink-0 hidden md:flex">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-xl shadow-primary/20 border-4 border-background">
                    <step.icon size={28} />
                  </div>
                  <div className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground border-2 border-background">
                    {i + 1}
                  </div>
                </div>

                {/* Empty Side for Layout Balance */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
