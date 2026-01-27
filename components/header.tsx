"use client"

import { useState, useEffect } from "react"
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
import { LeadGenModal } from "@/components/lead-gen-modal"

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

  // Auth Modal State
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")
  const [currentUser, setCurrentUser] = useState<{ email: string; fullName?: string } | null>(null)

  // Check for logged-in user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("pasiflow_user")
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse stored user", e)
      }
    }
  }, [])

  // Timer-based lead generation popup for guests (30 seconds)
  useEffect(() => {
    const storedUser = localStorage.getItem("pasiflow_user")
    const hasSeenPopup = sessionStorage.getItem("pasiflow_popup_shown")

    if (!storedUser && !hasSeenPopup) {
      const timer = setTimeout(() => {
        setAuthMode("signup")
        setShowLeadModal(true)
        sessionStorage.setItem("pasiflow_popup_shown", "true")
      }, 30000) // 30 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowLeadModal(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("pasiflow_token")
    localStorage.removeItem("pasiflow_user")
    setCurrentUser(null)
  }

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
    { name: tNav("howItWorks"), href: "#nasil-calisir" },
    { name: tNav("about"), href: "/about" },
    { name: tNav("portfolio"), href: "#portfoy" },
    { name: tNav("faq"), href: "#faq" },
  ]

  const extraLinks = [
    { name: tNav("whyUSA"), href: "/neden-amerika" },
    { name: tNav("taxLaw"), href: "/vergilendirme" },
    { name: tNav("map"), href: "/harita" },
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

            {/* Desktop Nav with Dropdowns */}
            <nav className="hidden md:flex items-center gap-6">
              {/* Platform Group */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-[#3D4852] hover:text-[#B8A074] transition-colors outline-none cursor-pointer">
                  {tNav("platform")} <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white border-[#E5E5E5] p-2 shadow-lg rounded-xl">
                  <DropdownMenuItem asChild>
                    <Link href="#nasil-calisir" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("howItWorks")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/about" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("about")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#faq" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("faq")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/iletisim" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("contact")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Investment Group */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-[#3D4852] hover:text-[#B8A074] transition-colors outline-none cursor-pointer">
                  {tNav("investment")} <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white border-[#E5E5E5] p-2 shadow-lg rounded-xl">
                  <DropdownMenuItem asChild>
                    <Link href="#portfoy" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-[#B8A074]">
                      {tNav("portfolio")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/harita" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("mapAndLocations")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Group */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-[#3D4852] hover:text-[#B8A074] transition-colors outline-none cursor-pointer">
                  {tNav("resources")} <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white border-[#E5E5E5] p-2 shadow-lg rounded-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/neden-amerika" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("whyUSA")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/vergilendirme" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("taxLaw")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* RIGHT: Language + CTA */}
          <div className="hidden md:flex items-center gap-4">

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 h-9 px-3 text-[#3D4852] hover:bg-[#E5E5E5] rounded-lg">
                  <span className="text-base">{currentLang.flag}</span>
                  <ChevronDown className="h-3 w-3 text-[#535454]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px] bg-white border-[#E5E5E5]">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={cn(
                      "gap-3 cursor-pointer text-[#3D4852] focus:bg-[#F5F5F5] py-2",
                      currentLocale === lang.code && "bg-[#F5F5F5]"
                    )}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex gap-2 border-[#3D4852] text-[#3D4852] hover:bg-[#3D4852] hover:text-white"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#B8A074] text-white flex items-center justify-center text-xs font-bold">
                      {currentUser.fullName?.charAt(0).toUpperCase() || currentUser.email.charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-[100px] truncate">
                      {currentUser.fullName === "Demo Client" ? "Erman Adanır" : (currentUser.fullName || currentUser.email)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px] bg-white border-[#E5E5E5]">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:bg-destructive/10"
                  >
                    {tNav("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold gap-2"
                  asChild
                >
                  <Link href={`/${currentLocale}/login`}>
                    {tNav("panelLogin")}
                  </Link>
                </Button>

                <Button
                  className="bg-[#B8A074] hover:bg-[#a38d5d] text-white font-semibold px-5 h-9 rounded-lg transition-all"
                  onClick={() => openAuthModal("signup")}
                >
                  {t("getConsultation")}
                </Button>
              </>
            )}
          </div>

          <LeadGenModal
            open={showLeadModal}
            onOpenChange={setShowLeadModal}
            onSuccess={() => setShowLeadModal(false)}
            triggerSource="Header Auth"
            initialAuthMode={authMode}
          />


          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-[70] p-2 rounded-lg text-[#3D4852] hover:bg-[#E5E5E5] transition-colors"
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
          className="fixed inset-0 top-16 bg-[#F5F5F5] z-[60] flex flex-col p-6"
        >
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-xl font-medium text-[#3D4852] hover:text-[#B8A074] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-[#E5E5E5] my-4" />
            {extraLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-lg text-[#535454] hover:text-[#B8A074] py-2"
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
                  "text-2xl p-3 rounded-lg hover:bg-[#E5E5E5] transition-colors border border-[#E5E5E5]",
                  currentLocale === lang.code && "bg-[#B8A074]/10 border-[#B8A074]/30"
                )}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          <Button
            className="mt-8 bg-[#B8A074] hover:bg-[#a38d5d] text-white font-semibold py-6 text-lg rounded-lg"
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
