"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
    MapPin,
    TrendingUp,
    Home,
    DollarSign,
    ShieldCheck,
    Building2,
    Users,
    CheckCircle,
    ArrowRight,
    Phone,
    Calendar,
    Star,
    Zap,
    Target,
    Award
} from "lucide-react"
import { useTranslations } from "next-intl"
import { getLocationBySlug, type LocationData } from "@/lib/location-data"
import Link from "next/link"
import { use } from "react"

interface LocationPageProps {
    params: Promise<{
        locale: string
        state: string
        city: string
    }>
}

export default function LocationPage({ params: paramsPromise }: LocationPageProps) {
    const params = use(paramsPromise)
    const location = getLocationBySlug(params.state, params.city)
    const t = useTranslations("locations")
    const tCommon = useTranslations("common")

    if (!location) {
        notFound()
    }

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

    const stats = [
        { label: t("stats.medianPrice"), value: location.stats.medianHomePrice, icon: Home, color: "from-blue-500 to-blue-600" },
        { label: t("stats.rentYield"), value: location.stats.avgRentYield, icon: TrendingUp, color: "from-green-500 to-green-600" },
        { label: t("stats.section8Rate"), value: location.stats.section8Rate, icon: ShieldCheck, color: "from-purple-500 to-purple-600" },
        { label: t("stats.capRate"), value: location.stats.avgCapRate, icon: DollarSign, color: "from-amber-500 to-amber-600" },
    ]

    const benefits = [
        {
            icon: DollarSign,
            title: t("benefits.affordability.title"),
            description: t("benefits.affordability.description", { city: location.city }),
            gradient: "from-emerald-500/20 to-teal-500/20",
            iconBg: "bg-emerald-500",
        },
        {
            icon: ShieldCheck,
            title: t("benefits.section8.title"),
            description: t("benefits.section8.description"),
            gradient: "from-blue-500/20 to-indigo-500/20",
            iconBg: "bg-blue-500",
        },
        {
            icon: TrendingUp,
            title: t("benefits.returns.title"),
            description: t("benefits.returns.description", { capRate: location.stats.avgCapRate }),
            gradient: "from-amber-500/20 to-orange-500/20",
            iconBg: "bg-amber-500",
        },
        {
            icon: Building2,
            title: t("benefits.management.title"),
            description: t("benefits.management.description"),
            gradient: "from-purple-500/20 to-pink-500/20",
            iconBg: "bg-purple-500",
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section - Premium Full-Screen Design */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${location.heroImage || '/hero-family.png'})`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 animate-pulse" style={{ animationDuration: '4s' }} />
                </div>

                {/* Floating decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-[10%] w-32 h-32 rounded-full bg-primary/30 blur-3xl"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/4 right-[10%] w-40 h-40 rounded-full bg-accent/30 blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 z-10 pt-24 pb-12">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="max-w-5xl mx-auto text-center space-y-8"
                    >
                        {/* Breadcrumb */}
                        <motion.div variants={item} className="flex items-center justify-center gap-2 text-sm text-white/70">
                            <Link href={`/${params.locale}`} className="hover:text-white transition-colors">
                                {tCommon("home")}
                            </Link>
                            <span>/</span>
                            <Link href={`/${params.locale}/locations`} className="hover:text-white transition-colors">
                                {t("breadcrumb.locations")}
                            </Link>
                            <span>/</span>
                            <span className="text-white">{location.city}</span>
                        </motion.div>

                        {/* Location Badge */}
                        <motion.div variants={item}>
                            <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 px-6 py-2 text-base font-medium hover:bg-white/20 transition-colors">
                                <MapPin size={16} className="mr-2" />
                                {location.stateFullName}, USA
                            </Badge>
                        </motion.div>

                        {/* Main Title */}
                        <motion.div variants={item} className="space-y-6">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                                {t("heroTitle", { city: location.city })}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                                {t("heroSubtitle", { state: location.stateFullName, city: location.city })}
                            </p>
                        </motion.div>

                        {/* Quick Stats Row */}
                        <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto py-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                                    <stat.icon className="h-6 w-6 text-white/80 mx-auto mb-2" />
                                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                                    <p className="text-xs md:text-sm text-white/60 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                size="lg"
                                className="h-16 px-10 text-lg rounded-full bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/20 font-semibold transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                                    <Calendar className="mr-2" size={22} />
                                    {t("ctaSchedule")}
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-10 text-lg rounded-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-md font-semibold transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <a href="https://wa.me/13056903146" target="_blank" rel="noopener noreferrer">
                                    <Phone className="mr-2" size={22} />
                                    WhatsApp
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Benefits Section - Modern Card Design */}
            <section className="py-24 bg-gradient-to-b from-background via-background to-primary/5">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 mb-6">
                            <Star className="mr-2" size={14} />
                            {t("benefitsTitle", { city: location.city })}
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                            {t("benefitsTitle", { city: location.city })}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t("benefitsSubtitle", { city: location.city })}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className={`group p-8 h-full bg-gradient-to-br ${benefit.gradient} border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden`}>
                                    {/* Decorative circle */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5" />

                                    <div className={`h-14 w-14 rounded-2xl ${benefit.iconBg} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <benefit.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* City Description Section - Split Layout */}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md">
                                <Building2 size={14} className="mr-2" />
                                {t("aboutCity")}
                            </Badge>

                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                {t(`cities.${location.descriptionKey}.title`, { city: location.city })}
                            </h2>

                            <p className="text-lg text-white/70 leading-relaxed">
                                {t(`cities.${location.descriptionKey}.description`)}
                            </p>

                            <ul className="space-y-4">
                                {location.highlightKeys.map((key, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <CheckCircle className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-white/90 text-lg">{t(`highlights.${key}`)}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-full bg-accent hover:bg-accent/90 text-white shadow-xl shadow-accent/30 font-semibold mt-4"
                                asChild
                            >
                                <a href="#" onClick={(e) => { e.preventDefault(); document.getElementById('portfoy')?.scrollIntoView({ behavior: 'smooth' }) }}>
                                    {t("viewProperties")}
                                    <ArrowRight className="ml-2" size={20} />
                                </a>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Main image card */}
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={location.heroImage || "/hero-family.png"}
                                    alt={`${location.city} Real Estate Investment`}
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </div>

                            {/* Floating stats card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                        <TrendingUp className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">{t("stats.capRate")}</p>
                                        <p className="text-3xl font-bold text-gray-900">{location.stats.avgCapRate}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Second floating card */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                        <ShieldCheck className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Section 8</p>
                                        <p className="text-lg font-bold text-gray-900">{location.stats.section8Rate}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Gradient Premium Design */}
            <section className="py-32 relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

                {/* Floating shapes */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/10"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full border border-white/10"
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-4xl mx-auto space-y-10"
                    >
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-md px-6 py-2">
                            <Zap className="mr-2" size={16} />
                            {location.city}, {location.stateFullName}
                        </Badge>

                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            {t("ctaTitle", { city: location.city })}
                        </h2>

                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                            {t("ctaDescription")}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <Button
                                size="lg"
                                className="h-16 px-12 text-lg rounded-full bg-white text-primary hover:bg-white/90 shadow-2xl font-semibold transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <a href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89" target="_blank" rel="noopener noreferrer">
                                    <Calendar className="mr-2" size={22} />
                                    {t("ctaSchedule")}
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-16 px-12 text-lg rounded-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-md font-semibold transition-all duration-300 hover:scale-105"
                                asChild
                            >
                                <Link href={`/${params.locale}#portfoy`}>
                                    {t("viewAllProperties")}
                                    <ArrowRight className="ml-2" size={20} />
                                </Link>
                            </Button>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-8 pt-10 text-white/60">
                            <div className="flex items-center gap-2">
                                <Award size={20} />
                                <span className="text-sm">20+ Yıllık Deneyim</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target size={20} />
                                <span className="text-sm">$250M+ İşlem Hacmi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={20} />
                                <span className="text-sm">100+ Mutlu Yatırımcı</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
