"use client"

import { useState, useEffect } from "react"
import { Link, useRouter, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown, LayoutDashboard, Shield, LogOut, Briefcase } from "lucide-react"
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
  const [currentUser, setCurrentUser] = useState<{ email: string; fullName?: string; role?: string } | null>(null)

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
    { name: tNav("llcFormation"), href: "/llc-formation" },
    { name: tNav("map"), href: "/harita" },
  ]

  // Lock body scroll while the mobile menu overlay is open
  useEffect(() => {
    if (typeof document === "undefined") return
    if (mobileMenuOpen) {
      const previous = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = previous
      }
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={cn(
            "mx-auto transition-all duration-300 bg-white overflow-hidden",
            isScrolled
              ? "shadow-lg" // add shadow on scroll for depth
              : ""
          )}
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-16 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-2">
            {/* LEFT: Logo - vertically centered */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 h-full min-h-[44px]"
              aria-label="Pasiflow"
            >
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
                    <Link href="/iletisim" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
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
                    <Link href="/harita" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
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
                    <Link href="/neden-amerika" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("whyUSA")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/vergilendirme" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-slate-700">
                      {tNav("taxLaw")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/llc-formation" className="cursor-pointer w-full p-2 hover:bg-slate-50 rounded-md font-medium text-[#C1A05E]">
                      {tNav("llcFormation")}
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
                  <DropdownMenuContent align="end" className="min-w-[180px] bg-white border-[#E5E5E5]">
                    <DropdownMenuItem asChild>
                      <Link
                        href={
                          currentUser.role === "AGENT"
                            ? "/agent/dashboard"
                            : currentUser.role === "MANAGER"
                              ? "/manager"
                              : "/dashboard"
                        }
                        className="cursor-pointer flex items-center gap-2 text-[#3D4852] focus:bg-slate-100"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        {t("dashboard")}
                      </Link>
                    </DropdownMenuItem>
                    {currentUser.role === "MANAGER" && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/manager"
                          className="cursor-pointer flex items-center gap-2 text-[#C1A05E] focus:bg-[#C1A05E]/10"
                        >
                          <Briefcase className="h-4 w-4" />
                          {t("managerPortal")}
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {currentUser.role === "ADMIN" && (
                      <>
                        <DropdownMenuItem asChild>
                          <a
                            href="/admin"
                            className="cursor-pointer flex items-center gap-2 text-[#C1A05E] focus:bg-[#C1A05E]/10"
                          >
                            <Shield className="h-4 w-4" />
                            {t("adminPanel")}
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/manager"
                            className="cursor-pointer flex items-center gap-2 text-[#C1A05E] focus:bg-[#C1A05E]/10"
                          >
                            <Briefcase className="h-4 w-4" />
                            {t("managerPortal")}
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer flex items-center gap-2 text-destructive focus:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      {t("signOut")}
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
              className="md:hidden z-[70] inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-[#3D4852] hover:bg-[#E5E5E5] active:bg-[#E5E5E5] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav — full screen overlay */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
            className="md:hidden fixed inset-0 top-16 bg-white z-[60] flex flex-col px-5 pt-4 pb-8 overflow-y-auto overscroll-contain"
            style={{ height: "calc(100dvh - 4rem)" }}
          >
            <nav className="flex-1 flex flex-col gap-1" aria-label="Ana navigasyon">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-lg font-semibold text-[#1F2328] hover:text-[#B8A074] active:text-[#B8A074] min-h-[52px] px-2 border-b border-[#F1EFEA]"
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-6" />

              <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#A8AEB6]">
                {tNav("resources")}
              </p>
              {extraLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center text-base font-medium text-[#535454] hover:text-[#B8A074] active:text-[#B8A074] min-h-[48px] px-2"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-[#E5E6E8] space-y-4">
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      switchLocale(lang.code)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      "flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-3 rounded-lg border transition-colors",
                      currentLocale === lang.code
                        ? "bg-[#B8A074]/10 border-[#B8A074]/40 text-[#B8A074]"
                        : "border-[#E5E6E8] text-slate-600 hover:bg-[#F5F5F5]"
                    )}
                    aria-pressed={currentLocale === lang.code}
                  >
                    <span className="text-xl" aria-hidden>{lang.flag}</span>
                    <span className="text-sm font-semibold">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              {currentUser ? (
                <div className="space-y-2">
                  <Button
                    asChild
                    className="w-full min-h-[52px] text-base font-semibold bg-[#1F2328] hover:bg-[#2D353F] text-white rounded-xl"
                  >
                    <Link
                      href={
                        currentUser.role === "AGENT"
                          ? "/agent/dashboard"
                          : currentUser.role === "MANAGER"
                            ? "/manager"
                            : "/dashboard"
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-5 w-5 mr-2" />
                      {t("dashboard")}
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full min-h-[52px] text-base font-semibold border-[#E5E5E5] text-[#3D4852] rounded-xl"
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {t("signOut")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full min-h-[52px] text-base font-semibold border-[#C1A05E] text-[#C1A05E] hover:bg-[#C1A05E] hover:text-white rounded-xl"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setShowPanelLoginModal(true)
                    }}
                  >
                    {tNav("panelLogin")}
                  </Button>
                  <Button
                    asChild
                    className="w-full min-h-[52px] text-base font-semibold bg-[#C1A05E] hover:bg-[#a38d5d] text-white rounded-xl shadow-lg shadow-[#C1A05E]/20"
                  >
                    <a
                      href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("getConsultation")}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
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
