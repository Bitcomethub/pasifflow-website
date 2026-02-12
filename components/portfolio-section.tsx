"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import useEmblaCarousel from "embla-carousel-react"
import {
  ChevronLeft,
  ChevronRight,
  Check,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Users,
  Tag,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  Shield,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCallback, useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useLocale } from "next-intl"

interface Property {
  address: string
  city: string
  rooms: string
  bathrooms: string
  sqft: string
  price: string
  monthlyRent: string
  netMonthly: string
  netYearly: string
  capRate: string
  cashOnCash: string
  image: string
  images: string[]
  status: string
  mls: string
  yearBuilt: string
  lotSize: string
  propertyType: string
  description: string
  features: string[]
  discount?: string
  investorsWatching?: number
  neighborhoodScore?: string
}

export function PortfolioSection() {
  const t = useTranslations("portfolio")
  const locale = useLocale()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, dragFree: true }
  )
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property)
    setCurrentImageIndex(0)
  }

  const closePropertyModal = () => {
    setSelectedProperty(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProperty.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProperty.images.length) % selectedProperty.images.length)
    }
  }

  // Real listings from OneHome MLS - Updated January 2025
  const properties: Property[] = [
    {
      address: "10468 Nottingham St",
      city: "Detroit, MI 48224",
      rooms: "3",
      bathrooms: "1",
      sqft: "1,200",
      price: "$130,000",
      monthlyRent: "$1,500",
      netMonthly: "$423",
      netYearly: "$5,076",
      capRate: "13.3%",
      cashOnCash: "12.6%",
      image: "/properties/nottingham-hd.jpg",
      images: ["/properties/nottingham-hd.jpg"],
      status: "Featured",
      mls: "20251070001",
      yearBuilt: "1950",
      lotSize: "0.10 acres",
      propertyType: t("singleFamily"),
      description: t("property0Desc"),
      features: [t("feature_section8"), t("feature_tenant"), t("feature_turnKey"), t("feature_kitchen"), t("feature_renovated"), t("feature_basement")],
      discount: "FEATURED",
      investorsWatching: 18,
      neighborhoodScore: "B+",
    },
    {
      address: "12152 Stout Street",
      city: "Detroit, MI 48228",
      rooms: "3",
      bathrooms: "1",
      sqft: "1,041",
      price: "$85,900",
      monthlyRent: "$1,160",
      netMonthly: "$765",
      netYearly: "$9,181",
      capRate: "9.8%",
      cashOnCash: "11.2%",
      image: "/properties/stout-hd.jpg",
      images: ["/properties/stout-hd.jpg", "/properties/stout.png"],
      status: "Back on Market",
      mls: "20251049787",
      yearBuilt: "1948",
      lotSize: "0.12 acres",
      propertyType: t("singleFamily"),
      description: t("property1Desc"),
      features: [t("feature_section8"), t("feature_tenant"), t("feature_kitchen"), t("feature_basement"), t("feature_roof"), t("feature_hardwood")],
      discount: "$4,000 OFF",
      investorsWatching: 12,
      neighborhoodScore: "B+",
    },
    {
      address: "12290 Griggs Street",
      city: "Detroit, MI 48204",
      rooms: "3",
      bathrooms: "1",
      sqft: "1,383",
      price: "$89,900",
      monthlyRent: "$1,100",
      netMonthly: "$703",
      netYearly: "$8,433",
      capRate: "8.6%",
      cashOnCash: "10.8%",
      image: "/properties/griggs-hd.jpg",
      images: ["/properties/griggs-hd.jpg", "/properties/griggs.png"],
      status: "New Listing",
      mls: "20251060129",
      yearBuilt: "1923",
      lotSize: "0.09 acres",
      propertyType: t("singleFamily"),
      description: t("property2Desc"),
      features: [t("feature_section8"), t("feature_hardwood"), t("feature_renovated"), t("feature_largeLot"), t("feature_porch"), t("feature_electrical")],
    },
    {
      address: "15717 Freeland Street",
      city: "Detroit, MI 48227",
      rooms: "3",
      bathrooms: "1",
      sqft: "1,227",
      price: "$87,900",
      monthlyRent: "$1,165",
      netMonthly: "$765",
      netYearly: "$9,185",
      capRate: "9.6%",
      cashOnCash: "11.5%",
      image: "/properties/freeland-hd.jpg",
      images: ["/properties/freeland-hd.jpg"],
      status: "For Sale",
      mls: "20251059784",
      yearBuilt: "1931",
      lotSize: "0.08 acres",
      propertyType: t("singleFamily"),
      description: t("property3Desc"),
      features: [t("feature_section8"), t("feature_moveIn"), t("feature_plumbing"), t("feature_waterHeater"), t("feature_paint"), t("feature_fenced")],
    },
    {
      address: "9977 Evergreen Avenue",
      city: "Detroit, MI 48228",
      rooms: "3",
      bathrooms: "1",
      sqft: "1,150",
      price: "$88,900",
      monthlyRent: "$1,354",
      netMonthly: "$933",
      netYearly: "$11,201",
      capRate: "11.6%",
      cashOnCash: "13.1%",
      image: "/properties/evergreen-hd.jpg",
      images: ["/properties/evergreen-hd.jpg"],
      status: "For Sale",
      mls: "20251050193",
      yearBuilt: "1942",
      lotSize: "0.10 acres",
      propertyType: t("singleFamily"),
      description: t("property4Desc"),
      features: [t("feature_section8"), t("feature_highCap"), t("feature_garage"), t("feature_backyard"), t("feature_quiet"), t("feature_schools")],
    },
    {
      address: "12345 Kentucky Street",
      city: "Detroit, MI 48204",
      rooms: "3",
      bathrooms: "1",
      sqft: "1,357",
      price: "$89,000",
      monthlyRent: "$1,224",
      netMonthly: "$813",
      netYearly: "$9,754",
      capRate: "10.1%",
      cashOnCash: "11.8%",
      image: "/properties/kentucky-hd.jpg",
      images: ["/properties/kentucky-hd.jpg"],
      status: "For Sale",
      mls: "20251040564",
      yearBuilt: "1921",
      lotSize: "0.09 acres",
      propertyType: t("singleFamily"),
      description: t("property5Desc"),
      features: [t("feature_section8"), t("feature_bungalow"), t("feature_woodwork"), t("feature_systems"), t("feature_maintained"), t("feature_demand")],
    },
  ]

  // Calculate portfolio stats
  const totalValue = properties.reduce((sum, p) => sum + parseInt(p.price.replace(/[$,]/g, "")), 0)
  const avgCap = (properties.reduce((sum, p) => sum + parseFloat(p.capRate), 0) / properties.length).toFixed(1)
  const totalYearly = properties.reduce((sum, p) => sum + parseInt(p.netYearly.replace(/[$,]/g, "")), 0)

  return (
    <section id="portfoy" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-white to-[#FAFAF8]" />

      {/* Animated decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-gradient-to-br from-[#C1A05E] to-[#B8A074] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#1F2328] to-[#3D4852] rounded-full blur-3xl"
        />
        {/* Dot grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="portfolio-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#C1A05E" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portfolio-dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-5 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-5 py-2 bg-gradient-to-r from-[#C1A05E]/10 to-[#C1A05E]/5 rounded-full border border-[#C1A05E]/20"
              >
                <Sparkles size={14} className="text-[#C1A05E]" />
                <span className="text-[#C1A05E] text-xs font-bold uppercase tracking-[0.15em]">
                  {t("badge") || "Featured Properties"}
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2328] tracking-tight leading-[1.1]">
                {t("title")}
              </h2>

              <p className="text-lg md:text-xl text-[#A8B0B8] font-medium">
                {t("subtitle")}
              </p>
            </div>

            {/* Navigation + Stats */}
            <div className="flex flex-col items-start lg:items-end gap-5">
              {/* Quick Stats Row */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-[#A8B0B8] uppercase tracking-wider font-semibold">Portfolio</p>
                  <p className="text-lg font-bold text-[#1F2328]">${(totalValue / 1000).toFixed(0)}K+</p>
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#C1A05E]/30 to-transparent" />
                <div className="text-right">
                  <p className="text-xs text-[#A8B0B8] uppercase tracking-wider font-semibold">Avg CAP</p>
                  <p className="text-lg font-bold text-[#C1A05E]">{avgCap}%</p>
                </div>
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#C1A05E]/30 to-transparent" />
                <div className="text-right">
                  <p className="text-xs text-[#A8B0B8] uppercase tracking-wider font-semibold">{t("netYearly")}</p>
                  <p className="text-lg font-bold text-emerald-600">${totalYearly.toLocaleString()}</p>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center gap-3">
                {/* Dots */}
                <div className="flex items-center gap-1.5 mr-3">
                  {scrollSnaps.map((_, idx) => (
                    <button
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === selectedIndex
                          ? "w-6 bg-[#C1A05E]"
                          : "w-1.5 bg-[#C1A05E]/20 hover:bg-[#C1A05E]/40"
                        }`}
                      onClick={() => emblaApi?.scrollTo(idx)}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollPrev}
                  className="w-11 h-11 rounded-full border-2 border-[#E5E5E5] hover:border-[#C1A05E] hover:bg-[#C1A05E]/5 flex items-center justify-center transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5 text-[#1F2328]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={scrollNext}
                  className="w-11 h-11 rounded-full bg-[#1F2328] hover:bg-[#C1A05E] flex items-center justify-center transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Property Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="overflow-hidden -mx-2"
          ref={emblaRef as React.RefCallback<HTMLDivElement>}
        >
          <div className="flex">
            {properties.map((property, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-3"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card
                    className="group h-full overflow-hidden border-0 bg-white rounded-2xl transition-all duration-500 flex flex-col cursor-pointer shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(193,160,94,0.18)]"
                    onClick={() => openPropertyModal(property)}
                  >
                    {/* Image Area */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.address}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                      {/* Top-left badges */}
                      <div className="absolute top-3.5 left-3.5 flex flex-col gap-2">
                        <Badge className="bg-emerald-500 text-white font-semibold shadow-lg border-0 px-2.5 py-1 text-xs flex items-center gap-1 backdrop-blur-sm">
                          <Shield size={11} strokeWidth={3} />
                          {t("section8Badge")}
                        </Badge>
                        <Badge className="bg-[#C1A05E] text-white font-semibold shadow-lg border-0 px-2.5 py-1 text-xs flex items-center gap-1">
                          <Check size={11} strokeWidth={3} />
                          {t("buyBack")}
                        </Badge>
                      </div>

                      {/* Top-right CAP Rate */}
                      <div className="absolute top-3.5 right-3.5">
                        <div className="bg-white/95 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-lg">
                          <p className="text-[9px] text-[#A8B0B8] uppercase font-bold tracking-wider leading-none mb-0.5">{t("capRate")}</p>
                          <p className="text-base font-extrabold text-[#C1A05E] leading-none">{property.capRate}</p>
                        </div>
                      </div>

                      {/* Bottom overlay info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                        {property.discount && (
                          <Badge className="bg-[#C1A05E] text-white font-bold shadow-lg border-0 px-3 py-1.5 text-xs flex items-center gap-1.5">
                            <Tag size={12} />
                            {property.discount}
                          </Badge>
                        )}
                        {property.investorsWatching && (
                          <div className="bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md ml-auto">
                            <Users size={11} />
                            <span>{property.investorsWatching} {t("investorsWatching")}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Address & Specs */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-lg font-bold text-[#1F2328] group-hover:text-[#C1A05E] transition-colors duration-300 leading-tight">
                            {property.address}
                          </h3>
                          {property.status === "New Listing" && (
                            <Badge className="bg-[#C1A05E]/10 text-[#C1A05E] text-[10px] px-2 py-0.5 border border-[#C1A05E]/20 font-bold">{t("new")}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#A8B0B8]">
                          <span className="flex items-center gap-1">
                            <BedDouble size={13} className="text-[#C1A05E]/60" />
                            {property.rooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath size={13} className="text-[#C1A05E]/60" />
                            {property.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Square size={13} className="text-[#C1A05E]/60" />
                            {property.sqft}
                          </span>
                          <span className="text-[10px] font-mono text-[#A8B0B8]/60 ml-auto">
                            MLS# {property.mls}
                          </span>
                        </div>
                      </div>

                      {/* Price & Yearly Income - Highlight */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-[#FAFAF8] rounded-xl p-3 border border-slate-100/80">
                          <p className="text-[9px] text-[#A8B0B8] uppercase font-bold tracking-wider mb-0.5">{t("price")}</p>
                          <p className="text-xl font-extrabold text-[#1F2328] tracking-tight">{property.price}</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#C1A05E]/5 to-[#C1A05E]/10 rounded-xl p-3 border border-[#C1A05E]/15">
                          <p className="text-[9px] text-[#C1A05E] uppercase font-bold tracking-wider mb-0.5">{t("netYearly")}</p>
                          <p className="text-xl font-extrabold text-[#C1A05E] tracking-tight">{property.netYearly}</p>
                        </div>
                      </div>

                      {/* Monthly Details Strip */}
                      <div className="flex items-center justify-between py-3 px-1 border-y border-slate-100/80 mb-4">
                        <div>
                          <p className="text-[9px] text-[#A8B0B8] uppercase font-bold tracking-wider">{t("rent")}</p>
                          <p className="text-sm font-bold text-[#1F2328]">{property.monthlyRent}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] text-[#A8B0B8] uppercase font-bold tracking-wider">CoC</p>
                          <p className="text-sm font-bold text-emerald-600">{property.cashOnCash}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] text-[#A8B0B8] uppercase font-bold tracking-wider">{t("netMonthly")}</p>
                          <p className="text-sm font-bold text-[#C1A05E]">{property.netMonthly}</p>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="grid gap-2 mt-auto">
                        <Button
                          className="w-full h-11 rounded-xl font-bold bg-[#1F2328] text-white hover:bg-[#C1A05E] transition-all duration-300 group/btn"
                          asChild
                        >
                          <Link href="/iletisim" className="flex items-center justify-center gap-2">
                            {t("detailsCta")}
                            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full h-11 rounded-xl border-slate-200 text-[#1F2328] hover:bg-[#FAFAF8] hover:border-[#C1A05E]/30 transition-all duration-300"
                          asChild
                        >
                          <a href={`https://wa.me/13056903146?text=${encodeURIComponent(t("whatsappMessage", { address: property.address }))}`} target="_blank" rel="noopener noreferrer">
                            {t("whatsappCta")}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {[
            { icon: Shield, label: t("section8Badge"), sublabel: locale === "tr" ? "Devlet Garantili" : "Government Backed" },
            { icon: BarChart3, label: `${avgCap}% CAP`, sublabel: locale === "tr" ? "Ortalama Getiri" : "Average Return" },
            { icon: DollarSign, label: `$${(totalYearly / 1000).toFixed(0)}K+`, sublabel: locale === "tr" ? "Yıllık Gelir" : "Yearly Income" },
            { icon: TrendingUp, label: `${properties.length}`, sublabel: locale === "tr" ? "Aktif Mülk" : "Active Properties" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:border-[#C1A05E]/20 hover:shadow-[0_8px_24px_-8px_rgba(193,160,94,0.12)] transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C1A05E]/10 to-[#C1A05E]/5 flex items-center justify-center">
                <stat.icon size={16} className="text-[#C1A05E]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1F2328] leading-tight">{stat.label}</p>
                <p className="text-[10px] text-[#A8B0B8] font-medium">{stat.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Property Detail Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <Dialog open={!!selectedProperty} onOpenChange={closePropertyModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
              <>
                {/* Image Gallery */}
                <div className="relative h-72 md:h-96 bg-[#1F2328] overflow-hidden">
                  <img
                    src={selectedProperty.images[currentImageIndex]}
                    alt={`${selectedProperty.address} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Image Navigation */}
                  {selectedProperty.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg w-10 h-10"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg w-10 h-10"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProperty.images.map((_, idx) => (
                          <button
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-5' : 'bg-white/50 w-1.5'}`}
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Badges on modal */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-emerald-500 text-white font-semibold shadow-lg border-0 px-3 py-1 backdrop-blur-sm">
                      <Shield size={12} strokeWidth={3} className="mr-1" />
                      {t("section8Badge")}
                    </Badge>
                    {selectedProperty.status === "New Listing" && (
                      <Badge className="bg-[#C1A05E] text-white font-semibold shadow-lg border-0 px-3 py-1">
                        {t("new")}
                      </Badge>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg">
                    <p className="text-[9px] text-[#A8B0B8] uppercase font-bold tracking-wider leading-none mb-0.5">{t("capRate")}</p>
                    <p className="text-xl font-extrabold text-[#C1A05E] leading-none">{selectedProperty.capRate}</p>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6 md:p-8 space-y-6 bg-white">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#1F2328] tracking-tight mb-1">{selectedProperty.address}</h2>
                      <p className="text-[#A8B0B8] flex items-center gap-1.5 text-base">
                        <MapPin size={16} className="text-[#C1A05E]" />
                        {selectedProperty.city}
                      </p>
                      <p className="text-xs font-mono text-[#A8B0B8]/60 mt-1">MLS# {selectedProperty.mls}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#A8B0B8] uppercase font-bold tracking-wider mb-1">{t("price")}</p>
                      <p className="text-3xl md:text-4xl font-extrabold text-[#1F2328]">{selectedProperty.price}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#FAFAF8] rounded-2xl border border-slate-100">
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#A8B0B8] uppercase font-bold tracking-wider">{t("rent")}</p>
                      <p className="text-xl font-bold text-[#1F2328]">{selectedProperty.monthlyRent}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#A8B0B8] uppercase font-bold tracking-wider">{t("netMonthly")}</p>
                      <p className="text-xl font-bold text-[#C1A05E]">{selectedProperty.netMonthly}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#A8B0B8] uppercase font-bold tracking-wider">{t("netYearly")}</p>
                      <p className="text-xl font-bold text-[#C1A05E]">{selectedProperty.netYearly}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] text-[#A8B0B8] uppercase font-bold tracking-wider">CoC</p>
                      <p className="text-xl font-bold text-emerald-600">{selectedProperty.cashOnCash}</p>
                    </div>
                  </div>

                  {/* Property Specs */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FAFAF8] rounded-xl border border-slate-100">
                      <BedDouble size={15} className="text-[#C1A05E]" />
                      <span className="text-sm font-semibold text-[#1F2328]">{selectedProperty.rooms} {t("rooms")}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FAFAF8] rounded-xl border border-slate-100">
                      <Bath size={15} className="text-[#C1A05E]" />
                      <span className="text-sm font-semibold text-[#1F2328]">{selectedProperty.bathrooms} {t("bathrooms")}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#FAFAF8] rounded-xl border border-slate-100">
                      <Square size={15} className="text-[#C1A05E]" />
                      <span className="text-sm font-semibold text-[#1F2328]">{selectedProperty.sqft} sqft</span>
                    </div>
                  </div>

                  {/* Features */}
                  {selectedProperty.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C1A05E]/5 text-[#C1A05E] rounded-full text-xs font-semibold border border-[#C1A05E]/10"
                        >
                          <Check size={11} strokeWidth={3} />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <Button
                      className="w-full h-13 text-base font-bold bg-[#1F2328] text-white hover:bg-[#C1A05E] rounded-xl transition-all duration-300 shadow-lg"
                      asChild
                    >
                      <Link href="/iletisim" className="flex items-center justify-center gap-2">
                        {t("cta")}
                        <ArrowUpRight size={16} />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full h-13 text-base font-bold border-slate-200 text-[#1F2328] hover:bg-[#FAFAF8] hover:border-[#C1A05E]/30 rounded-xl transition-all duration-300"
                      asChild
                    >
                      <a href={`https://wa.me/13056903146?text=${encodeURIComponent(t("whatsappMessage", { address: selectedProperty.address }))}`} target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
