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
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Logo size="lg" theme="dark" linkTo="/" />
            <p className="text-slate-300 text-sm leading-relaxed">
              {tFooter("description")}
            </p>
            <div className="flex gap-4">
              <Link href="https://instagram.com/pasiflow" target="_blank" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                <Instagram size={18} />
              </Link>
              <Link href="https://linkedin.com/company/pasiflow" target="_blank" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                <Linkedin size={18} />
              </Link>
              <Link href="https://youtube.com/@pasiflow" target="_blank" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300 hover:text-white">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">{tFooter("quickLinks")}</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="#nasil-calisir" className="hover:text-amber-400 transition-colors">{t("howItWorks")}</Link></li>
              <li><Link href="#portfoy" className="hover:text-amber-400 transition-colors">{t("portfolio")}</Link></li>
              <li><Link href="#faq" className="hover:text-amber-400 transition-colors">{t("faq")}</Link></li>
              <li><Link href="/neden-amerika" className="hover:text-amber-400 transition-colors">{tNav("whyUSA")}</Link></li>
              <li><Link href="/vergilendirme" className="hover:text-amber-400 transition-colors">{tNav("taxLaw")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">{tFooter("legal")}</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><Link href="/gizlilik" className="hover:text-amber-400 transition-colors">{t("privacyPolicy")}</Link></li>
              <li><Link href="/kullanim-sartlari" className="hover:text-amber-400 transition-colors">{t("termsOfService")}</Link></li>
              <li><Link href="/kvkk" className="hover:text-amber-400 transition-colors">{t("kvkk")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-white">{t("contact")}</h4>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-amber-400" />
                <a href="mailto:hi@pasiflow.com" className="hover:text-amber-400 transition-colors">
                  hi@pasiflow.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-amber-400" />
                <a href="tel:+13056903146" className="hover:text-amber-400 transition-colors">
                  +1 (305) 690-3146
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-400 mt-0.5" />
                <div>
                  <p className="text-slate-200">Miami, Florida, USA</p>
                  <p className="text-xs text-slate-400 mt-1">{tFooter("istanbulOffice")}</p>
                </div>
              </div>
              <a
                href="https://wa.me/13056903146?text=Merhaba%2C%20Pasiflow%20ile%20ilgili%20bilgi%20almak%20istiyorum."
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium text-sm transition-colors mt-2"
              >
                {t("whatsapp")}
              </a>
              <p className="pt-4 text-xs text-slate-500">
                {tFooter("disclaimer")}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Pasiflow LLC. {t("allRightsReserved")}</p>
          <p className="text-xs">
            Designed with <span className="text-amber-400">♥</span> for Global Investors
          </p>
        </div>
      </div>
    </footer>
  )
}
