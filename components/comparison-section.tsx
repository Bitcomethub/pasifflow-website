import { Card } from "@/components/ui/card"
import { X, Check } from "lucide-react"

export function ComparisonSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Neden Pasifflow?</h2>
          <p className="text-muted-foreground text-lg">Geleneksel yatırımlarla aramızdaki farkı görün.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Way */}
          <Card className="p-8 border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
            <h3 className="text-2xl font-bold text-muted-foreground mb-8 text-center">Klasik Yöntemler</h3>
            <ul className="space-y-6">
              {[
                "Düşük Kira Çarpanı (20+ Yıl)",
                "Kiracı Bulma & Tahliye Sorunları",
                "Yüksek Bakım & Tadilat Masrafları",
                "Düzenli Olmayan Kira Ödemeleri",
                "Döviz Kuru Riski (TL Gelir)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-muted-foreground">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <X className="h-5 w-5 text-destructive" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Pasifflow Way */}
          <Card className="relative p-8 border-primary/20 bg-card shadow-2xl shadow-primary/10 overflow-hidden transform md:-translate-y-4 md:scale-105 z-10">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">Pasifflow Modeli</h3>
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-accent/10 rounded-full blur-[50px]" />

            <ul className="space-y-6 relative">
              {[
                "Yüksek Kira Çarpanı (8-10 Yıl)",
                "Hazır Kiracı & Devlet Garantisi",
                "Sıfırlanmış Tadilat & Masrafsız",
                "Her Ayın 1-5'i Arası Düzenli Kira",
                "Dolar Bazında Kira Geliri"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="h-5 w-5 text-accent-foreground stroke-[3px]" />
                  </div>
                  <span className="font-semibold text-foreground text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
