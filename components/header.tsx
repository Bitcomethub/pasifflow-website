"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
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
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={cn(
          "mx-auto transition-all duration-300",
          isScrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
          {/* LEFT: Logo + Nav Links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center relative z-50">
              <Logo size="md" theme="light" showMotto={false} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#1F2328] hover:text-[#EF7202] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <span className="w-px h-4 bg-[#E5E6E8]" />
              {extraLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#535454] hover:text-[#EF7202] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT: Language + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 h-9 px-3 text-[#1F2328] hover:bg-[#E5E6E8] rounded-lg">
                  <span className="text-base">{currentLang.flag}</span>
                  <ChevronDown className="h-3 w-3 text-[#535454]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px] bg-white border-[#E5E6E8]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={cn(
                      "gap-3 cursor-pointer text-[#1F2328] focus:bg-[#F6F7F9] py-2",
                      currentLocale === lang.code && "bg-[#F6F7F9]"
                    )}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-[#EF7202] hover:bg-[#d86502] text-white font-semibold px-5 h-9 rounded-lg transition-all"
              asChild
            >
              <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                {t("getConsultation")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-[70] p-2 rounded-lg text-[#1F2328] hover:bg-[#E5E6E8] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 top-16 bg-[#F6F7F9] z-[60] flex flex-col p-6"
        >
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-xl font-medium text-[#1F2328] hover:text-[#EF7202] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-[#E5E6E8] my-4" />
            {extraLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-lg text-[#535454] hover:text-[#EF7202] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  switchLocale(lang.code)
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  "text-2xl p-3 rounded-lg hover:bg-[#E5E6E8] transition-colors border border-[#E5E6E8]",
                  currentLocale === lang.code && "bg-[#EF7202]/10 border-[#EF7202]/30"
                )}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          <Button
            className="mt-8 bg-[#EF7202] hover:bg-[#d86502] text-white font-semibold py-6 text-lg rounded-lg"
            asChild
          >
            <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
              {t("getConsultation")}
            </a>
          </Button>
        </motion.div>
      )}
    </motion.header>
  )
}
