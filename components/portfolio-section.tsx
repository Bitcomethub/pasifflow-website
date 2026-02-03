"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Check, Home, Calendar, Maximize, MapPin, X, BedDouble, Bath, Square, TreePine, Users, Tag, Award, Lock, TrendingUp, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { useCallback, useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { LeadGenModal } from "@/components/lead-gen-modal"
import Link from "next/link"
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
  const nt = useTranslations("nav")
  const locale = useLocale()
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false })
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGuest, setIsGuest] = useState(true)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [modalSource, setModalSource] = useState<"timer" | "gated-content">("timer")

  useEffect(() => {
    // Check local storage for auth status
    const token = localStorage.getItem("pasiflow_token")
    if (token) {
      setIsGuest(false)
    }
    // NOTE: Auto-timer modal disabled to prevent unexpected page darkening
    // Users will see the lead modal when they click on locked properties instead
  }, [])

  const handleLeadSuccess = () => {
    setIsGuest(false)
    setShowLeadModal(false)
  }

  const handleGatedClick = () => {
    setModalSource("gated-content")
    setShowLeadModal(true)
  }

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
  // All data verified from portal.onehome.com
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
      description: "Section 8 destekli, tam kiracılı, anahtar teslim yatırım fırsatı. Devlet garantili kira ödemesi ile düşük tahsilat riski.",
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

  return (
    <section id="portfoy" className="py-24 bg-transparent relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8A074]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3D4852]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#B8A074]/10 rounded-full text-[#B8A074] text-xs font-bold uppercase tracking-wider border border-[#B8A074]/20"
            >
              <TrendingUp size={14} />
              {t("badge") || "Featured Properties"}
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#3D4852] tracking-tight">{t("title")}</h2>
            <p className="text-[#B8A074] text-xl md:text-2xl font-bold tracking-tight">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full w-12 h-12 border-2 border-[#E5E5E5] hover:border-[#B8A074] hover:bg-[#B8A074]/5 transition-all duration-300">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full w-12 h-12 border-2 border-[#E5E5E5] hover:border-[#B8A074] hover:bg-[#B8A074]/5 transition-all duration-300">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden p-2 -m-2"
          ref={emblaRef as any}
        >
          <div className="flex gap-8">
            {properties.map((property, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card
                    className={`group h-full overflow-hidden border-slate-100 bg-white transition-all duration-500 flex flex-col cursor-pointer relative ${isGuest && i >= 1 ? 'pointer-events-none select-none' : 'hover:shadow-[0_25px_50px_-12px_rgba(184,160,116,0.15)] hover:border-[#B8A074]/30'}`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    onClick={() => {
                      if (isGuest && i >= 1) return;
                      openPropertyModal(property)
                    }}
                  >
                    {/* Gating Overlay for Guests (Items >= 1) */}
                    {isGuest && i >= 1 && (
                      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl p-6 text-center pointer-events-auto"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleGatedClick()
                        }}
                      >
                        <div className="bg-white/80 border border-white/40 p-8 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(30,40,75,0.15)] max-w-xs transform hover:scale-[1.02] transition-all duration-500 cursor-pointer backdrop-blur-xl">
                          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{t("gatedTitle")}</h3>
                          <p className="text-slate-500 mb-8 leading-relaxed">
                            {t("gatedDesc")}
                          </p>
                          <Button
                            className="w-full h-12 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            asChild
                          >
                            <Link href={`/${locale}/signup`}>
                              {t("gatedButton")}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                    {/* Image Area */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.city}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {!isGuest && (
                        <Badge className="absolute top-4 right-4 bg-white text-primary font-bold shadow-lg border-0 px-3 py-1">
                          {property.capRate} {t("capRate")}
                        </Badge>
                      )}

                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge className="bg-accent text-white font-bold shadow-lg border-0 px-3 py-1 flex items-center gap-1">
                          <Check size={12} strokeWidth={4} />
                          {t("section8Badge")}
                        </Badge>
                        <Badge className="bg-primary text-white font-bold shadow-lg border-0 px-3 py-1 flex items-center gap-1">
                          <Check size={12} strokeWidth={4} />
                          {t("buyBack")}
                        </Badge>
                      </div>

                      {property.discount && (
                        <Badge className="absolute bottom-4 left-4 bg-primary text-white font-bold shadow-lg border-0 px-3 py-1.5 flex items-center gap-1.5 animate-pulse">
                          <Tag size={14} />
                          {property.discount}
                        </Badge>
                      )}

                      {property.investorsWatching && (
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2.5 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                          <Users size={12} />
                          <span>{property.investorsWatching} {t("investorsWatching")}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                            {property.address}
                          </h3>
                          {property.status === "New Listing" && (
                            <Badge className="bg-primary text-white text-xs px-2 py-0.5 border-0">{t("new")}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <BedDouble size={14} className="text-[#B8A074]" />
                            <span>{property.rooms}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Bath size={14} className="text-[#B8A074]" />
                            <span>{property.bathrooms}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Square size={14} className="text-[#B8A074]" />
                            <span>{property.sqft}</span>
                          </span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-mono">
                          MLS# {property.mls}
                        </p>
                      </div>

                      {/* Prominent Pricing & Net Yearly */}
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{t("price")}</p>
                          <p className="text-2xl font-bold text-slate-900">{property.price}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider text-right">{t("netYearly")}</p>
                          <p className="text-2xl font-bold text-primary text-right">{property.netYearly}</p>
                        </div>
                      </div>

                      {/* Monthly Details & Cash on Cash */}
                      <div className="flex justify-between items-center py-3 border-y border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{t("rent")}</span>
                          <span className="text-sm font-semibold text-slate-700">{property.monthlyRent}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">CoC</span>
                          <span className="text-sm font-bold text-accent">{property.cashOnCash}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{t("netMonthly")}</span>
                          <span className="text-sm font-bold text-primary">{property.netMonthly}</span>
                        </div>
                      </div>

                      <div className="pt-2 grid gap-3">
                        <Button
                          className="w-full h-12 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-[0_10px_20px_-5px_rgba(254,126,29,0.2)]"
                          asChild
                        >
                          <Link href={`/${locale}/signup`}>
                            {t("detailsCta")}
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors" asChild>
                          <a href={`https://wa.me/13056903146?text=Merhaba%2C%20${encodeURIComponent(property.address)}%20adresindeki%20m%C3%BClk%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`} target="_blank" rel="noopener noreferrer">
                            {t("whatsappCta")}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                ))}
              </div>
        </div>
      </div>

      {/* Property Detail Modal */}
      <Dialog open={!!selectedProperty} onOpenChange={closePropertyModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProperty && (
            <>
              {/* Image Gallery */}
              <div className="relative h-72 md:h-96 bg-black">
                <img
                  src={selectedProperty.images[currentImageIndex]}
                  alt={`${selectedProperty.address} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {selectedProperty.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProperty.images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Badges */}
                <Badge className="absolute top-4 right-4 bg-white text-primary font-bold shadow-lg border-0 px-3 py-1">
                  {selectedProperty.capRate} {t("capRate")}
                </Badge>
                {selectedProperty.status === "New Listing" && (
                  <Badge className="absolute top-4 left-4 bg-primary text-white font-bold shadow-lg border-0 px-3 py-1">
                    {t("new")}
                  </Badge>
                )}
              </div>

              {/* Property Details */}
              <div className="p-8 space-y-8 bg-white">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{selectedProperty.address}</h2>
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        <Check size={12} strokeWidth={3} className="mr-1" />
                        {t("section8Badge")}
                      </Badge>
                    </div>
                    <p className="text-slate-500 flex items-center gap-1.5 text-lg">
                      <MapPin size={20} className="text-primary" />
                      {selectedProperty.city}
                    </p>
                    <p className="text-sm font-mono text-slate-400 mt-2">MLS# {selectedProperty.mls}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-1">{t("price")}</p>
                    <p className="text-4xl font-extrabold text-slate-900">{selectedProperty.price}</p>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("rent")}</p>
                    <p className="text-2xl font-bold text-slate-900">{selectedProperty.monthlyRent}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("netMonthly")}</p>
                    <p className="text-2xl font-bold text-primary">{selectedProperty.netMonthly}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("netYearly")}</p>
                    <p className="text-2xl font-bold text-primary">{selectedProperty.netYearly}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t("capRate")}</p>
                    <p className="text-2xl font-bold text-accent">{selectedProperty.capRate}</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Button
                    className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 bg-primary text-white hover:bg-primary/90 rounded-2xl transition-all hover:scale-[1.02]"
                    asChild
                  >
                    <Link href={`/${locale}/signup`}>
                      {t("cta")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full h-14 text-lg font-bold border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl transition-all" asChild>
                    <a href={`https://wa.me/13056903146?text=Merhaba%2C%20${encodeURIComponent(selectedProperty.address)}%20adresindeki%20m%C3%BClk%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog >

      <LeadGenModal
        open={showLeadModal}
        onOpenChange={setShowLeadModal}
        onSuccess={handleLeadSuccess}
        triggerSource={modalSource}
      />
    </section>
  )
}
