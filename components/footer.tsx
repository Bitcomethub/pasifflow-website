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
    <footer className="bg-white text-[#3D4852] pt-10 pb-6 relative overflow-hidden mt-6 border-t border-slate-200">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B8A074]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#3D4852]/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Top Section - Logo & Social */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo size="xl" theme="light" showMotto={false} />
          </Link>

          <div className="flex gap-2">
            <Link href="https://instagram.com/pasiflow_" target="_blank" className="p-2.5 rounded-lg bg-slate-100 hover:bg-[#B8A074] hover:text-white transition-all duration-300 text-[#3D4852] border border-slate-200 hover:border-[#B8A074]">
              <Instagram size={18} />
            </Link>
            <Link href="https://linkedin.com/company/pasiflow" target="_blank" className="p-2.5 rounded-lg bg-slate-100 hover:bg-[#B8A074] hover:text-white transition-all duration-300 text-[#3D4852] border border-slate-200 hover:border-[#B8A074]">
              <Linkedin size={18} />
            </Link>
            <Link href="https://youtube.com/@pasiflow" target="_blank" className="p-2.5 rounded-lg bg-slate-100 hover:bg-[#B8A074] hover:text-white transition-all duration-300 text-[#3D4852] border border-slate-200 hover:border-[#B8A074]">
              <Youtube size={18} />
            </Link>
          </div>
        </div>

        {/* Links Section - Side by side on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm md:text-base text-[#1F2328] mb-3 pb-2 border-b-2 border-[#B8A074] inline-block">
              {tFooter("quickLinks")}
            </h4>
            <ul className="space-y-2.5 mt-3">
              <li>
                <Link href="#nasil-calisir" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8A074] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="#portfoy" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8A074] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("portfolio")}
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8A074] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/neden-amerika" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8A074] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {tNav("whyUSA")}
                </Link>
              </li>
              <li>
                <Link href="/vergilendirme" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8A074] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {tNav("taxLaw")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal - Side by side with Quick Links on mobile */}
          <div>
            <h4 className="font-bold text-sm md:text-base text-[#1F2328] mb-3 pb-2 border-b-2 border-slate-200 inline-block">
              {tFooter("legal")}
            </h4>
            <ul className="space-y-2.5 mt-3">
              <li>
                <Link href="/gizlilik" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/kullanim-sartlari" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="/kvkk" className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {t("kvkk")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Full width on mobile */}
          <div className="col-span-2">
            <h4 className="font-bold text-sm md:text-base text-[#1F2328] mb-3 pb-2 border-b-2 border-[#B8A074] inline-block">
              {t("contact")}
            </h4>
            <div className="space-y-3 mt-3">
              <a href="mailto:info@pasiflow.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium">
                <span className="p-1.5 rounded bg-[#B8A074]/10 text-[#B8A074]">
                  <Mail size={14} />
                </span>
                info@pasiflow.com
              </a>
              <a href="tel:+13056903146" className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium">
                <span className="p-1.5 rounded bg-[#B8A074]/10 text-[#B8A074]">
                  <Phone size={14} />
                </span>
                +1 (305) 690-3146
              </a>
              <div className="flex items-start gap-3">
                <span className="p-1.5 rounded bg-[#B8A074]/10 text-[#B8A074] mt-0.5">
                  <MapPin size={14} />
                </span>
                <div>
                  <p className="text-[#1F2328] font-medium text-sm">Miami, Florida, USA</p>
                  <p className="text-xs text-slate-500">{tFooter("istanbulOffice")}</p>
                </div>
              </div>
              <a
                href="https://wa.me/13056903146?text=Merhaba%2C%20Pasiflow%20ile%20ilgili%20bilgi%20almak%20istiyorum."
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8A074] hover:bg-[#a38d5d] text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#B8A074]/20"
              >
                {t("whatsapp")}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-4 border-t border-[#E5E6E8]">
          <p className="text-xs text-[#535454] leading-relaxed opacity-80 text-center md:text-left">
            {tFooter("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  )
}
