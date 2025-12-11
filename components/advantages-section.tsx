"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function AdvantagesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-14 max-w-5xl mx-auto space-y-12 border-accent/20 bg-gradient-to-br from-card via-[#1a233b]/50 to-accent/5 shadow-2xl shadow-accent/5 backdrop-blur-sm">
            <div className="space-y-6 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide border border-accent/20 uppercase">
                Yatırım Modelinin Avantajları
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
                Pasifflow ile <span className="text-accent">Yüksek Getiri</span> ve <span className="text-accent">Minimum Risk</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 pt-4">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">1</span>
                  Küçük Sermaye
                </h3>
                <ul className="space-y-5">
                  {[
                    "$85K–$100K Evler → Aylık $1,000+ Net Gelir",
                    "%30–%50 Değer Artışı (5 Yıllık Ortalama)",
                    "Kolay Portföy Büyütme İmkanı",
                    "Sıfır Efor: Tamamen Pasif Gelir Modeli"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 group-hover:scale-150 transition-transform" />
                      <span className="text-lg text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">2</span>
                  Devlet Garantisi
                </h3>
                <div className="prose prose-invert">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    <strong className="text-white">Section 8</strong> programı sayesinde kira ödemelerinizin büyük bir kısmı doğrudan Amerikan hükümeti tarafından garanti altına alınır.
                  </p>
                  <div className="mt-6 p-6 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <ul className="space-y-3 m-0 p-0 list-none">
                      <li className="flex items-center gap-3 text-blue-200/80 text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Düşük Kiracı Sirkülasyonu
                      </li>
                      <li className="flex items-center gap-3 text-blue-200/80 text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Minimum Boşluk Riski
                      </li>
                      <li className="flex items-center gap-3 text-blue-200/80 text-base">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Düzenli ve Güvenli Ödemeler
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
