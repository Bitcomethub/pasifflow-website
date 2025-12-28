"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useCallback } from "react"
import { useTranslations } from "next-intl"

export function PortfolioSection() {
  const t = useTranslations("portfolio")
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, [Autoplay({ delay: 4000 }) as any])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Real listings from OneHome MLS - Updated December 2024
  // Calculations based on app's Detroit 9.2% rental yield
  const properties = [
    {
      address: "12152 Stout Street",
      city: "Detroit, MI 48228",
      rooms: "3+1",
      sqft: "1,041",
      price: "$85,900",
      monthlyRent: "$1,100",
      netMonthly: "$658",  // ($85,900 × 9.2%) ÷ 12
      netYearly: "$7,903",
      capRate: "%9.2",
      image: "/properties/detroit.png",
      status: "Back on Market",
      mls: "20251049787",
    },
    {
      address: "12290 Griggs Street",
      city: "Detroit, MI 48204",
      rooms: "3+1",
      sqft: "1,383",
      price: "$89,900",
      monthlyRent: "$1,150",
      netMonthly: "$689",  // ($89,900 × 9.2%) ÷ 12
      netYearly: "$8,271",
      capRate: "%9.2",
      image: "/properties/detroit.png",
      status: "New Listing",
      mls: "20251060129",
    },
    {
      address: "15717 Freeland Street",
      city: "Detroit, MI 48227",
      rooms: "3+1",
      sqft: "1,227",
      price: "$87,900",
      monthlyRent: "$1,130",
      netMonthly: "$674",  // ($87,900 × 9.2%) ÷ 12
      netYearly: "$8,087",
      capRate: "%9.2",
      image: "/properties/detroit.png",
      status: "For Sale",
      mls: "20251059784",
    },
    {
      address: "9977 Evergreen Avenue",
      city: "Detroit, MI 48228",
      rooms: "3+1",
      sqft: "1,150",
      price: "$88,900",
      monthlyRent: "$1,140",
      netMonthly: "$682",  // ($88,900 × 9.2%) ÷ 12
      netYearly: "$8,179",
      capRate: "%9.2",
      image: "/properties/detroit.png",
      status: "For Sale",
      mls: "20251050193",
    },
    {
      address: "12345 Kentucky Street",
      city: "Detroit, MI 48204",
      rooms: "3+1",
      sqft: "1,357",
      price: "$89,000",
      monthlyRent: "$1,145",
      netMonthly: "$682",  // ($89,000 × 9.2%) ÷ 12
      netYearly: "$8,188",
      capRate: "%9.2",
      image: "/properties/detroit.png",
      status: "For Sale",
      mls: "20251040564",
    },
  ]

  return (
    <section id="portfoy" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">{t("title")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full w-12 h-12 border-2 hover:bg-primary/5">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full w-12 h-12 border-2 hover:bg-primary/5">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden p-2 -m-2" ref={emblaRef}>
          <div className="flex gap-8">
            {properties.map((property, i) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <Card className="group h-full overflow-hidden border-border/50 bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                  {/* Image Area */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.city}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Removed black gradient overlay for a cleaner, brighter look */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Badge className="absolute top-4 right-4 bg-white text-primary font-bold shadow-lg border-0 px-3 py-1">
                      {property.capRate} {t("capRate")}
                    </Badge>
                    <Badge className="absolute top-4 left-4 bg-accent text-white font-bold shadow-lg border-0 px-3 py-1 flex items-center gap-1">
                      <Check size={12} strokeWidth={4} />
                      {t("section8Badge")}
                    </Badge>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-foreground">
                          {property.address}
                        </h3>
                        {property.status === "New Listing" && (
                          <Badge className="bg-green-500 text-white text-xs px-2 py-0.5">NEW</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {property.city}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {property.rooms} {t("rooms")} • {property.sqft} {t("sqft")} • MLS# {property.mls}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold">{t("price")}</p>
                        <p className="text-xl font-bold text-primary">{property.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold text-right">{t("netYearly")}</p>
                        <p className="text-xl font-bold text-accent text-right">{property.netYearly}</p>
                      </div>
                    </div>

                    <div className="space-y-2 flex-grow">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("rent")}:</span>
                        <span className="font-medium">{property.monthlyRent}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-border/50">
                        <span className="font-bold text-foreground">{t("netMonthly")}:</span>
                        <span className="font-bold text-accent">{property.netMonthly}</span>
                      </div>
                    </div>

                    <div className="pt-4 grid gap-3">
                      <Button className="w-full font-semibold shadow-lg shadow-primary/20 bg-primary text-white hover:bg-primary/90" asChild>
                        <a href="https://calendly.com/pasiflow/danismanlik" target="_blank" rel="noopener noreferrer">
                          {t("cta")}
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5" asChild>
                        <a href={`https://wa.me/13056903146?text=Merhaba%2C%20${encodeURIComponent(property.address)}%20adresindeki%20m%C3%BClk%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.`} target="_blank" rel="noopener noreferrer">
                          WhatsApp
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
    </section>
  )
}
