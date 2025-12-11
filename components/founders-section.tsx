"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin } from "lucide-react"
import { useTranslations } from "next-intl"

export function FoundersSection() {
  const t = useTranslations("founders")

  const founders = [
    {
      initials: "EA",
      name: t("founder1Name"),
      title: t("founder1Title"),
      bio: t("founder1Bio"),
      image: "/founders/erman.jpg"
    },
    {
      initials: "TK",
      name: t("founder2Name"),
      title: t("founder2Title"),
      bio: t("founder2Bio"),
      image: "/founders/tugce.jpg"
    },
    {
      initials: "CK",
      name: t("founder3Name"),
      title: t("founder3Title"),
      bio: t("founder3Bio"),
      image: "/founders/cem.jpg"
    },
  ]

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-2">
            Pasiflow Team
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            {t("title")}<br />
            <span className="text-primary">{t("subtitle")}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Pasiflow, Amerika'da uzun yıllardır yaşayan, ABD gayrimenkul piyasasını derinlemesine bilen ve yatırım
            odaklı çalışan profesyoneller tarafından yönetilmektedir.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {founders.map((founder, i) => (
            <Card key={i} className="group relative p-8 bg-card border-border/50 hover:border-primary/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  <Avatar className="h-32 w-32 border-4 border-background relative z-10 shadow-xl"> {/* Added shadow */}
                    <AvatarImage
                      src={founder.image}
                      alt={founder.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-bold bg-muted text-muted-foreground">
                      {founder.initials}
                    </AvatarFallback>
                  </Avatar>
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
