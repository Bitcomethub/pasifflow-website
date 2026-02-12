"use client"

import { Link } from "@/i18n/navigation"
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { motion } from "framer-motion"

import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("common")
  const tNav = useTranslations("nav")
  const tFooter = useTranslations("footer")

  return (
    <footer className="bg-white text-[#3D4852] pt-12 pb-6 relative overflow-hidden mt-6 border-t border-slate-200">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#B8A074]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#3D4852]/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Top Section - Logo & Social */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
            <Logo size="xl" theme="light" showMotto={false} />
          </Link>

          <div className="flex gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com/pasiflow_" },
              { icon: Linkedin, href: "https://linkedin.com/company/pasiflow" },
              { icon: Youtube, href: "https://youtube.com/@pasiflow" }
            ].map((social, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  className="flex items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-[#B8A074] hover:text-white transition-all duration-300 text-[#3D4852] shadow-sm hover:shadow-md"
                >
                  <social.icon size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Links Section - Enhanced Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-sm md:text-base text-[#1F2328] mb-4 pb-2 border-b-2 border-[#B8A074] inline-block">
              {tFooter("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("howItWorks"), href: "#nasil-calisir" },
                { label: t("portfolio"), href: "#portfoy" },
                { label: t("faq"), href: "#faq" },
                { label: tNav("whyUSA"), href: "/neden-amerika" },
                { label: tNav("taxLaw"), href: "/vergilendirme" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-[#B8A074] opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-sm md:text-base text-[#1F2328] mb-4 pb-2 border-b-2 border-slate-200 inline-block">
              {tFooter("legal")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t("privacyPolicy"), href: "/gizlilik" },
                { label: t("termsOfService"), href: "/kullanim-sartlari" },
                { label: t("kvkk"), href: "/kvkk" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-2"
          >
            <h4 className="font-bold text-sm md:text-base text-[#1F2328] mb-4 pb-2 border-b-2 border-[#B8A074] inline-block">
              {t("contact")}
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-3">
                <a href="mailto:info@pasiflow.com" className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium group">
                  <span className="p-2 rounded-lg bg-[#B8A074]/10 text-[#B8A074] group-hover:bg-[#B8A074] group-hover:text-white transition-all duration-300">
                    <Mail size={16} />
                  </span>
                  <span>info@pasiflow.com</span>
                </a>
                <a href="tel:+13056903146" className="flex items-center gap-3 text-sm text-slate-600 hover:text-[#B8A074] transition-colors font-medium group">
                  <span className="p-2 rounded-lg bg-[#B8A074]/10 text-[#B8A074] group-hover:bg-[#B8A074] group-hover:text-white transition-all duration-300">
                    <Phone size={16} />
                  </span>
                  <span>+1 (305) 690-3146</span>
                </a>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="p-2 rounded-lg bg-[#B8A074]/10 text-[#B8A074] mt-0.5">
                    <MapPin size={16} />
                  </span>
                  <div>
                    <p className="text-[#1F2328] font-medium text-sm">Miami, Florida, USA</p>
                    <p className="text-xs text-slate-500">{tFooter("istanbulOffice")}</p>
                  </div>
                </div>
                <motion.a
                  href="https://wa.me/13056903146?text=Merhaba%2C%20Pasiflow%20ile%20ilgili%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B8A074] hover:bg-[#a38d5d] text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#B8A074]/20 w-full sm:w-auto justify-center"
                >
                  {t("whatsapp")}
                  <ArrowRight size={14} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-6 border-t border-[#E5E6E8] flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-[#535454] leading-relaxed opacity-80 text-center sm:text-left">
            {tFooter("disclaimer")}
          </p>
          <p className="text-xs text-[#B8A074] font-medium">
            © 2025 Pasiflow. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
