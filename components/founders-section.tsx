"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin } from "lucide-react"

export function FoundersSection() {
  const founders = [
    {
      initials: "EA",
      name: "Erman Adanır",
      title: "Co-Founder & CEO",
      bio: "10 yılı aşkın süredir Florida'da yaşayan Erman, MiamiLi Real Estate'in kurucusu olarak $100M üzerinde satış başarısına imza attı. ABD emlak piyasasında yatırımcı odaklı stratejiler ve ROI analizi konusunda uzmandır.",
      image: "/founders/erman.jpg"
    },
    {
      initials: "TK",
      name: "Tuğçe Kuran",
      title: "Co-Founder & COO",
      bio: "15+ yıllık emlak geçmişi ve 7 yıllık ABD deneyimiyle Tuğçe, doğru ev seçimi, bölge analizi ve Section 8 uyumluluğu konularında operasyonun beynidir. PasifFlow'un saha operasyonlarını yönetir.",
      image: "/founders/tugce.jpg"
    },
    {
      initials: "CK",
      name: "Cem Kuran",
      title: "Co-Founder & Property Expert",
      bio: "20 yıla yakın emlak tecrübesi bulunan Cem, tadilat yönetimi, müteahhit ilişkileri ve Section 8 geçiş süreçlerinde teknik liderdir. Yatırımın fiziksel kalitesini garanti eder.",
      image: "/founders/cem.jpg"
    },
  ]

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-2">
            Uzman Kadro
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Güvenilir Ekip, <br />
            <span className="text-primary">Profesyonel Yönetim</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Pasifflow, Amerika'da uzun yıllardır yaşayan, ABD gayrimenkul piyasasını derinlemesine bilen ve yatırım
            odaklı çalışan profesyoneller tarafından yönetilmektedir.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {founders.map((founder, i) => (
            <Card key={i} className="group relative p-8 bg-card border-border/50 hover:border-primary/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  <Avatar className="h-32 w-32 border-4 border-background relative z-10">
                    <AvatarImage
                      src={founder.image} // Will use placeholder if not found, logic handled by AvatarImage usually or fallback
                      alt={founder.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
                      {founder.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 z-20 bg-[#0077b5] p-1.5 rounded-full text-white cursor-pointer hover:scale-110 transition-transform shadow-md">
                    <Linkedin size={16} />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-bold text-xl text-foreground">{founder.name}</h3>
                  <p className="text-sm font-medium text-accent uppercase tracking-wide">{founder.title}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-center text-sm">
                  {founder.bio}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
