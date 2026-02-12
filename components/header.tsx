"use client"

import { useState, useEffect } from "react"
import { Link, useRouter, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"
import { useTranslations, useLocale } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LeadGenModal } from "@/components/lead-gen-modal"
import { PanelLoginModal } from "@/components/panel-login-modal"

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Auth Modal State
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [showPanelLoginModal, setShowPanelLoginModal] = useState(false)
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
  const currentLocale = useLocale()
  const currentLang = languages.find(l => l.code === currentLocale) || languages[0]

  // Simple scroll detection using event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLocale = (newLocale: string) => {
    router.push(pathname, { locale: newLocale })
  }

  const navLinks = [
    { name: tNav("howItWorks"), href: "/#nasil-calisir" },
    { name: tNav("about"), href: "/about" },
    { name: tNav("portfolio"), href: "/#portfoy" },
    { name: tNav("faq"), href: "/#faq" },
  ]

  const extraLinks = [
    { name: tNav("whyUSA"), href: "/neden-amerika" },
    { name: tNav("taxLaw"), href: "/vergilendirme" },
    { name: tNav("map"), href: "/harita" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={cn(
            "mx-auto transition-all duration-300 bg-white/95 backdrop-blur-md",
            isScrolled
              ? "shadow-lg bg-white" // solid white on scroll for better readability
              : ""
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-16 sm:h-20 md:h-24 flex items-center justify-between">
            {/* LEFT: Logo - vertically centered */}
            <Link href="/" className="flex items-center flex-shrink-0 h-full">
              <Logo size="sm" theme="light" showMotto={false} className="w-28 sm:w-32 md:w-40" />
            </Link>

            {/* CENTER: Nav Links - spread to the right */}
            <nav className="hidden md:flex items-center gap-8 ml-auto mr-8">
              {/* Platform Group */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors outline-none cursor-pointer text-[#3D4852] hover:text-[#C1A05E]"
                )}>
                  {tNav("platform")} <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white border-[#E5E5E5] p-2 shadow-lg rounded-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/#nasil-calisir" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("howItWorks")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/about" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("about")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/#faq" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("faq")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${currentLocale}/iletisim`} className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("contact")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Investment Group */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors outline-none cursor-pointer text-[#3D4852] hover:text-[#C1A05E]"
                )}>
                  {tNav("investment")} <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white border-[#E5E5E5] p-2 shadow-lg rounded-xl">
                  <DropdownMenuItem asChild>
                    <Link href="/#portfoy" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-[#B8A074]">
                      {tNav("portfolio")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${currentLocale}/harita`} className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("mapAndLocations")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Group */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors outline-none cursor-pointer text-[#3D4852] hover:text-[#C1A05E]"
                )}>
                  {tNav("resources")} <ChevronDown size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white border-[#E5E5E5] p-2 shadow-lg rounded-xl">
                  <DropdownMenuItem asChild>
                    <Link href={`/${currentLocale}/neden-amerika`} className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("whyUSA")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${currentLocale}/vergilendirme`} className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("taxLaw")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* RIGHT: Language + CTA Buttons */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={cn(
                    "gap-2 h-9 px-3 rounded-lg text-[#3D4852] hover:bg-slate-100",
                  )}>
                    <span className="text-base">{currentLang.flag}</span>
                    <ChevronDown className={cn("h-3 w-3 text-slate-500")} />
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
                      className="hidden lg:flex gap-2 font-semibold border-slate-300 text-[#3D4852] hover:bg-slate-100"
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
                    className="flex font-semibold gap-2 border-[#C1A05E] text-[#C1A05E] hover:bg-[#C1A05E] hover:text-white transition-all rounded-lg h-9 px-4"
                    onClick={() => setShowPanelLoginModal(true)}
                  >
                    {tNav("panelLogin")}
                  </Button>

                  <Button
                    className="font-semibold px-5 h-9 rounded-lg transition-all bg-[#C1A05E] hover:bg-[#a38d5d] text-white"
                    asChild
                  >
                    <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                      {t("getConsultation")}
                    </a>
                  </Button>
                </>
              )}
            </div>


            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden z-[70] p-2 rounded-lg text-[#3D4852] hover:bg-[#E5E5E5] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {
          mobileMenuOpen && (
            <div
              className="fixed inset-0 top-16 bg-[#F6F7F9] z-[60] flex flex-col p-6"
            >
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-xl font-medium text-[#1F2328] hover:text-[#B8A074] py-2"
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
                    className="block text-lg text-[#535454] hover:text-[#B8A074] py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex gap-2 mt-6">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      switchLocale(lang.code)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#E5E6E8] transition-colors border border-[#E5E6E8]",
                      currentLocale === lang.code && "bg-[#B8A074]/10 border-[#B8A074]/30"
                    )}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className={cn(
                      "text-xs font-medium",
                      currentLocale === lang.code ? "text-[#B8A074]" : "text-slate-500"
                    )}>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <Button
                className="mt-6 w-full bg-[#B8A074] hover:bg-[#a38d5d] text-white font-semibold py-4 text-base rounded-lg"
                asChild
              >
                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                  {t("getConsultation")}
                </a>
              </Button>
            </div>
          )
        }
      </header>

      {/* Modals - rendered outside motion.header to avoid transform breaking position:fixed */}
      <LeadGenModal
        open={showLeadModal}
        onOpenChange={setShowLeadModal}
        onSuccess={() => setShowLeadModal(false)}
      />

      <PanelLoginModal
        open={showPanelLoginModal}
        onOpenChange={setShowPanelLoginModal}
      />
    </>
  )
}
