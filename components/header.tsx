"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"
import { useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export function Header() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("common")
  const tNav = useTranslations("nav")

  const currentLocale = pathname.split('/')[1] || 'tr'
  const currentLang = languages.find(l => l.code === currentLocale) || languages[0]

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/') || `/${newLocale}`)
  }

  const navLinks = [
    { name: t("howItWorks"), href: "#nasil-calisir" },
    { name: t("portfolio"), href: "#portfoy" },
    { name: t("faq"), href: "#faq" },
    { name: t("contact"), href: "/iletisim" },
  ]

  const extraLinks = [
    { name: tNav("whyUSA"), href: "/neden-amerika" },
    { name: tNav("taxLaw"), href: "/vergilendirme" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "top-4 px-4 md:px-6" : "top-0 px-0"
      )}
    >
      <div
        className={cn(
          "mx-auto transition-all duration-500 flex items-center justify-between",
          isScrolled
            ? "bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg shadow-slate-200/50 rounded-2xl md:rounded-full h-16 max-w-7xl px-6"
            : "bg-transparent h-24 max-w-7xl px-6 md:px-0"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-50 group">
          <div className={cn("transition-all duration-300", isScrolled ? "scale-95" : "scale-100")}>
            <Logo size={isScrolled ? "md" : "lg"} theme="light" showMotto={false} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className={cn(
            "flex items-center gap-5 px-5 py-2.5 rounded-full transition-all duration-300",
            isScrolled ? "bg-slate-100/80 border border-slate-200" : "bg-white/10 border border-white/10 backdrop-blur-sm"
          )}>
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-[13px] font-semibold transition-colors relative hover:glow-text",
                    isScrolled ? "text-slate-700 hover:text-primary" : "text-slate-700 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <div className={cn("w-px h-5", isScrolled ? "bg-slate-300" : "bg-slate-300")} />
            {extraLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-semibold transition-colors relative",
                  isScrolled ? "text-slate-700 hover:text-primary" : "text-slate-700 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className={cn(
                  "gap-2 rounded-full h-10 px-4 border",
                  isScrolled ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200 bg-slate-50" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200 bg-white/80"
                )}>
                  <span className="text-lg">{currentLang.flag}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px] bg-white border-slate-200 shadow-xl">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={cn(
                      "gap-3 cursor-pointer font-semibold text-slate-700 focus:bg-slate-100 focus:text-slate-900 py-2.5",
                      currentLocale === lang.code && "bg-slate-100 text-slate-900"
                    )}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-primary hover:bg-primary/90 text-black font-bold px-5 h-9 rounded-full shadow-[0_0_20px_-5px_rgba(14,165,233,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_25px_-5px_rgba(14,165,233,0.7)]"
              asChild
            >
              <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                <span className="mr-1">{t("getConsultation")}</span>
              </a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden z-[70] p-2 rounded-full transition-colors",
            isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 top-0 left-0 bg-slate-950/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center gap-8"
          >
            {/* Background elements */}
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl font-heading font-medium text-white hover:text-primary transition-colors hover:scale-105 transform duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="w-16 h-px bg-white/10 my-2" />
            {extraLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xl font-heading font-medium text-white/70 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-5 mt-6">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    switchLocale(lang.code)
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    "text-3xl p-4 rounded-2xl hover:bg-white/10 transition-colors bg-white/5 border border-white/10",
                    currentLocale === lang.code && "ring-2 ring-primary border-primary/50 bg-primary/10"
                  )}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            <Button
              className="mt-8 bg-primary hover:bg-primary/90 text-black font-bold px-10 py-7 text-xl rounded-2xl shadow-[0_0_30px_-5px_rgba(14,165,233,0.4)]"
              asChild
            >
              <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                {t("getConsultation")}
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
