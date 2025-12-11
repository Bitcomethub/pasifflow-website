"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useCallback } from "react"
import Image from "next/image"

// Using a subset of properties for better performance in demo, or all of them.
const properties = [
  {
    city: "Cleveland, OH",
    rooms: "3+1",
    sqft: "1,150",
    price: "$90,000",
    monthlyRent: "$1,300",
    netMonthly: "$874",
    netYearly: "$10,488",
    capRate: "%11.65",
    image: "/american-suburban-house-investment-property-.jpg"
  },
  {
    city: "Memphis, TN",
    rooms: "3+1",
    sqft: "1,150",
    price: "$95,000",
    monthlyRent: "$1,350",
    netMonthly: "$905",
    netYearly: "$10,860",
    capRate: "%11.43",
    image: "/american-suburban-house-investment-property-.jpg"
  },
  {
    city: "Detroit, MI",
    rooms: "3+1",
    sqft: "1,150",
    price: "$85,000",
    monthlyRent: "$1,250",
    netMonthly: "$840",
    netYearly: "$10,080",
    capRate: "%11.86",
    image: "/american-suburban-house-investment-property-.jpg"
  },
  {
    city: "St. Louis, MO",
    rooms: "4+1",
    sqft: "1,350",
    price: "$100,000",
    monthlyRent: "$1,400",
    netMonthly: "$940",
    netYearly: "$11,280",
    capRate: "%11.28",
    image: "/american-suburban-house-investment-property-.jpg"
  },
  {
    city: "Birmingham, AL",
    rooms: "3+1",
    sqft: "1,200",
    price: "$88,000",
    monthlyRent: "$1,280",
    netMonthly: "$860",
    netYearly: "$10,320",
    capRate: "%11.73",
    image: "/american-suburban-house-investment-property-.jpg"
  },
]

export function PortfolioSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, [Autoplay({ delay: 4000 }) as any])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section id="portfoy" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Güncel Yatırım Portföyü</h2>
            <p className="text-muted-foreground text-lg">
              Haftalık güncellenen, tadilatı bitmiş ve kiracısı hazır Section 8 evleri.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full w-12 h-12 border-2">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full w-12 h-12 border-2">
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
                    <div className="absolute inset-0 bg-muted animate-pulse" /> {/* Placeholder while loading */}
                    <img
                      src={`/american-suburban-house-investment-property-.jpg?height=400&width=600&query=american+house+${property.city.split(',')[0]}`} // Simulating dynamic images
                      alt={property.city}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Badge className="absolute top-4 right-4 bg-white text-primary font-bold shadow-lg border-0 px-3 py-1">
                      {property.capRate} CAP
                    </Badge>
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-bold shadow-lg border-0 px-3 py-1 flex items-center gap-1">
                      <Check size={12} strokeWidth={4} />
                      Section 8
                    </Badge>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {property.city}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {property.rooms} • {property.sqft} sqft • Müstakil Ev
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold">Satış Fiyatı</p>
                        <p className="text-xl font-bold text-primary">{property.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold text-right">Net Yıllık</p>
                        <p className="text-xl font-bold text-accent text-right">{property.netYearly}</p>
                      </div>
                    </div>

                    <div className="space-y-2 flex-grow">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Aylık Kira:</span>
                        <span className="font-medium">{property.monthlyRent}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Yönetim & Giderler:</span>
                        <span className="font-medium text-destructive">-${parseInt(property.monthlyRent.replace('$', '').replace(',', '')) - parseInt(property.netMonthly.replace('$', '').replace(',', ''))}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-border/50">
                        <span className="font-bold text-foreground">Net Aylık Cep Harçlığı:</span>
                        <span className="font-bold text-accent">{property.netMonthly}</span>
                      </div>
                    </div>

                    <div className="pt-4 grid gap-3">
                      <Button className="w-full font-semibold shadow-lg shadow-primary/20">
                        Detaylı İncele
                      </Button>
                      <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/5">
                        WhatsApp'tan Yaz
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
