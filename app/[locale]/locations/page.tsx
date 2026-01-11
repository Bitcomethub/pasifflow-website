"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { MapPin, TrendingUp, Home, ArrowRight, Building2, Star, Sparkles, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { locations } from "@/lib/location-data"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function LocationsPage() {
    const t = useTranslations("locations")
    const tCommon = useTranslations("common")
    const pathname = usePathname()
    const locale = pathname.split('/')[1] || 'tr'

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    // Group locations by state
    const locationsByState = locations.reduce((acc, loc) => {
        if (!acc[loc.stateFullName]) {
            acc[loc.stateFullName] = []
        }
        acc[loc.stateFullName].push(loc)
        return acc
    }, {} as Record<string, typeof locations>)

    // State colors for variety
    const stateColors = [
        { bg: "from-blue-500/10 to-indigo-500/10", accent: "bg-blue-500", text: "text-blue-600" },
        { bg: "from-emerald-500/10 to-teal-500/10", accent: "bg-emerald-500", text: "text-emerald-600" },
        { bg: "from-purple-500/10 to-pink-500/10", accent: "bg-purple-500", text: "text-purple-600" },
        { bg: "from-amber-500/10 to-orange-500/10", accent: "bg-amber-500", text: "text-amber-600" },
        { bg: "from-rose-500/10 to-red-500/10", accent: "bg-rose-500", text: "text-rose-600" },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section - Premium Design */}
            <section className="relative py-32 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[100px]"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-0 -left-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[80px]"
                    />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="max-w-5xl mx-auto text-center space-y-8"
                    >
                        <motion.div variants={item}>
                            <Badge className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/20 px-6 py-2 text-base font-medium backdrop-blur-md">
                                <Sparkles size={16} className="mr-2" />
                                {t("indexBadge")}
                            </Badge>
                        </motion.div>

                        <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
                            {t("indexTitle")}
                        </motion.h1>

                        <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            {t("indexSubtitle")}
                        </motion.p>

                        {/* Quick stats */}
                        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-8 pt-8">
                            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md rounded-full px-6 py-3 border border-border/50 shadow-lg">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span className="font-semibold text-foreground">{locations.length} {t("citiesLabel")}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md rounded-full px-6 py-3 border border-border/50 shadow-lg">
                                <Building2 className="h-5 w-5 text-primary" />
                                <span className="font-semibold text-foreground">{Object.keys(locationsByState).length} Eyalet</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md rounded-full px-6 py-3 border border-border/50 shadow-lg">
                                <TrendingUp className="h-5 w-5 text-accent" />
                                <span className="font-semibold text-foreground">10%+ CAP</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Locations Grid - Premium Cards */}
            <section className="py-24 bg-gradient-to-b from-background to-primary/5">
                <div className="container mx-auto px-4 md:px-6">
                    {Object.entries(locationsByState).map(([state, stateLocations], stateIndex) => (
                        <div key={state} className="mb-20 last:mb-0">
                            {/* State Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <div className={`h-14 w-14 rounded-2xl ${stateColors[stateIndex % stateColors.length].accent} flex items-center justify-center shadow-lg`}>
                                    <Building2 className="h-7 w-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground">{state}</h2>
                                    <p className="text-muted-foreground">
                                        {stateLocations.length} {stateLocations.length === 1 ? t("city") : t("citiesLabel")}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Location Cards */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {stateLocations.map((location, i) => (
                                    <motion.div
                                        key={location.slug}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link href={`/${locale}/locations/${location.state}/${location.slug}`}>
                                            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white hover:-translate-y-2">
                                                {/* Image */}
                                                <div className="relative h-56 overflow-hidden">
                                                    <img
                                                        src={location.heroImage || "/hero-family.png"}
                                                        alt={location.city}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                                    {/* City name overlay */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                                        <h3 className="text-2xl font-bold text-white mb-1">{location.city}</h3>
                                                        <p className="text-white/70">{location.stateFullName}</p>
                                                    </div>

                                                    {/* CAP Rate badge */}
                                                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-accent to-accent/80 text-white border-0 px-4 py-2 text-sm font-bold shadow-lg">
                                                        {location.stats.avgCapRate} CAP
                                                    </Badge>

                                                    {/* Hover overlay */}
                                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </div>

                                                {/* Stats */}
                                                <div className="p-6">
                                                    <div className="grid grid-cols-2 gap-6 mb-6">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <Home className="h-4 w-4" />
                                                                <span className="text-xs font-medium">{t("stats.medianPrice")}</span>
                                                            </div>
                                                            <p className="text-xl font-bold text-foreground">{location.stats.medianHomePrice}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                                <TrendingUp className="h-4 w-4" />
                                                                <span className="text-xs font-medium">{t("stats.rentYield")}</span>
                                                            </div>
                                                            <p className="text-xl font-bold text-accent">{location.stats.avgRentYield}</p>
                                                        </div>
                                                    </div>

                                                    {/* CTA */}
                                                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                        <span className="text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                                                            {t("exploreCity", { city: location.city })}
                                                        </span>
                                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                            <ChevronRight className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section - Premium Gradient */}
            <section className="py-32 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

                {/* Decorative circles */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5"
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl mx-auto space-y-10"
                    >
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md px-6 py-2 text-base">
                            <Star className="mr-2" size={16} />
                            Premium Yatırım Danışmanlığı
                        </Badge>

                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            {t("indexCtaTitle")}
                        </h2>

                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                            {t("indexCtaDescription")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Button
                                size="lg"
                                className="h-16 px-12 text-lg rounded-full bg-white text-primary hover:bg-white/90 shadow-2xl font-semibold transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                                    {tCommon("getConsultation")}
                                    <ArrowRight className="ml-2" size={20} />
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
