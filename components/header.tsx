"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X, Globe, ChevronDown } from "lucide-react"
import { Logo } from "@/components/logo"
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
    { name: "Nasıl Çalışır?", href: "#nasil-calisir" },
    { name: "Portföy", href: "#portfoy" },
    { name: "S.S.S.", href: "#faq" },
    { name: "İletişim", href: "#iletisim" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 h-16 shadow-sm"
          : "bg-transparent h-20"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-50">
          <div className={cn("transition-all duration-300", isScrolled ? "scale-90" : "scale-100")}>
            <Logo size={isScrolled ? "sm" : "md"} theme="light" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base font-bold text-foreground/90 hover:text-primary transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          {/* New Nav Items */}
          <Link
            href="/neden-amerika"
            className="text-base font-bold text-foreground/90 hover:text-primary transition-colors relative group py-2"
          >
            Neden Amerika?
            <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/vergilendirme"
            className="text-base font-bold text-foreground/90 hover:text-primary transition-colors relative group py-2"
          >
            Vergi & Hukuk
            <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-foreground/90 hover:text-primary font-semibold">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{currentLang.flag}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={cn(
                    "gap-2 cursor-pointer font-medium",
                    currentLocale === lang.code && "bg-accent/10 text-primary"
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105"
            size={isScrolled ? "sm" : "default"}
          >
            Danışmanlık Al
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center space-y-8 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-2xl font-heading font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Added Links Mobile */}
            <Link
              href="/neden-amerika"
              className="text-2xl font-heading font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Neden Amerika?
            </Link>
            <Link
              href="/vergilendirme"
              className="text-2xl font-heading font-medium text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vergi & Hukuk
            </Link>

            {/* Mobile Language Switcher */}
            <div className="flex gap-3 pt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { switchLocale(lang.code); setMobileMenuOpen(false); }}
                  className={cn(
                    "text-2xl p-2 rounded-lg transition-colors",
                    currentLocale === lang.code ? "bg-accent/20" : "hover:bg-muted"
                  )}
                >
                  {lang.flag}
                </button>
              ))}
            </div>

            <Button size="lg" className="w-40 mt-4">
              Danışmanlık Al
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
