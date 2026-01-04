"use client"

import Link from "next/link"
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Logo } from "@/components/logo"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("common")
  const tNav = useTranslations("nav")
  const tFooter = useTranslations("footer")

  return (
    <footer className="bg-background text-foreground py-16 border-t border-border relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Logo size="lg" linkTo="/" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {tFooter("description")}
            </p>
            <div className="flex gap-4">
              <Link href="https://instagram.com/pasiflow_" target="_blank" className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors text-primary hover:text-accent border border-primary/10">
                <Instagram size={18} />
              </Link>
              <Link href="https://linkedin.com/company/pasiflow" target="_blank" className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors text-primary hover:text-accent border border-primary/10">
                <Linkedin size={18} />
              </Link>
              <Link href="https://youtube.com/@pasiflow" target="_blank" className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors text-primary hover:text-accent border border-primary/10">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">{tFooter("quickLinks")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#nasil-calisir" className="hover:text-accent transition-colors font-medium">{t("howItWorks")}</Link></li>
              <li><Link href="#portfoy" className="hover:text-accent transition-colors font-medium">{t("portfolio")}</Link></li>
              <li><Link href="#faq" className="hover:text-accent transition-colors font-medium">{t("faq")}</Link></li>
              <li><Link href="/neden-amerika" className="hover:text-accent transition-colors font-medium">{tNav("whyUSA")}</Link></li>
              <li><Link href="/vergilendirme" className="hover:text-accent transition-colors font-medium">{tNav("taxLaw")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">{tFooter("legal")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/gizlilik" className="hover:text-accent transition-colors font-medium">{t("privacyPolicy")}</Link></li>
              <li><Link href="/kullanim-sartlari" className="hover:text-accent transition-colors font-medium">{t("termsOfService")}</Link></li>
              <li><Link href="/kvkk" className="hover:text-accent transition-colors font-medium">{t("kvkk")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">{t("contact")}</h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <a href="mailto:hi@pasiflow.com" className="hover:text-accent transition-colors font-medium">
                  hi@pasiflow.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <a href="tel:+13056903146" className="hover:text-accent transition-colors font-medium">
                  +1 (305) 690-3146
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-0.5" />
                <div>
                  <p className="text-foreground font-medium">Miami, Florida, USA</p>
                  <p className="text-xs text-muted-foreground mt-1">{tFooter("istanbulOffice")}</p>
                </div>
              </div>
              <a
                href="https://wa.me/13056903146?text=Merhaba%2C%20Pasiflow%20ile%20ilgili%20bilgi%20almak%20istiyorum."
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-700 border border-green-200 rounded-lg font-bold text-sm transition-all mt-2"
              >
                {t("whatsapp")}
              </a>
              <p className="pt-4 text-xs text-muted-foreground leading-relaxed opacity-80">
                {tFooter("disclaimer")}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-medium">&copy; {new Date().getFullYear()} Pasiflow LLC. {t("allRightsReserved")}</p>
          <p className="text-xs flex items-center gap-1">
            Designed with <span className="text-accent">♥</span> for Global Investors
          </p>
        </div>
      </div>
    </footer>
  )
}
