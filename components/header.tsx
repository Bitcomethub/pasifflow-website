"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

export function Header() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const navLinks = [
    { name: "Nasıl Çalışır?", href: "#nasil-calisir" },
    { name: "Portföy", href: "#portfoy" },
    { name: "S.S.S.", href: "#sss" },
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
            {/* Using placeholder text acting as logo if image fails or for cleaner look initially */}
            <span className="text-2xl font-bold font-heading text-primary tracking-tighter">
              Pasif<span className="text-accent">flow</span>
            </span>
            {/* Image logo can be uncommented when validated */}
            {/* <Image
                src="/images/pasifflow-logo.png"
                alt="Pasifflow"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              /> */}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
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
            <Button size="lg" className="w-40">
              Danışmanlık Al
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
