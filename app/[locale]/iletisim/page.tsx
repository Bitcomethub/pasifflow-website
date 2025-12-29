"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function ContactPage() {
    const t = useTranslations("contact")
    const tFooter = useTranslations("footer")

    const services = [
        t("service1"),
        t("service2"),
        t("service3"),
        t("service4"),
        t("service5")
    ]

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section with Contact Form */}
            <section className="relative pt-24 pb-32 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/american-house-generic.png')",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/80" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Left: Contact Form (Floating Card) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                                {t("formTitle")}
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                {t("formSubtitle")}
                            </p>

                            <form className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">{t("firstName")} *</Label>
                                        <Input id="firstName" placeholder={t("firstName")} className="h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">{t("lastName")} *</Label>
                                        <Input id="lastName" placeholder={t("lastName")} className="h-12" />
                                    </div>
                                </div>

                                {/* Contact Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t("email")} *</Label>
                                        <Input id="email" type="email" placeholder="example@email.com" className="h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t("phone")} *</Label>
                                        <Input id="phone" type="tel" placeholder="+1 XXX XXX XXXX" className="h-12" />
                                    </div>
                                </div>

                                {/* Investor Type */}
                                <div className="space-y-3">
                                    <Label>{t("investorProfile")}</Label>
                                    <RadioGroup defaultValue="new" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="new" id="new" />
                                            <Label htmlFor="new" className="cursor-pointer font-normal">{t("investorNew")}</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="experienced" id="experienced" />
                                            <Label htmlFor="experienced" className="cursor-pointer font-normal">{t("investorExperienced")}</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="existing" id="existing" />
                                            <Label htmlFor="existing" className="cursor-pointer font-normal">{t("investorExisting")}</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="agent" id="agent" />
                                            <Label htmlFor="agent" className="cursor-pointer font-normal">{t("investorAgent")}</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <Label htmlFor="message">{t("message")}</Label>
                                    <Textarea
                                        id="message"
                                        placeholder={t("messagePlaceholder")}
                                        className="min-h-[100px] resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-14 text-lg bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/20"
                                >
                                    <Send className="mr-2 h-5 w-5" />
                                    {t("submit")}
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    {t("privacyNote")}
                                </p>
                            </form>
                        </motion.div>

                        {/* Right: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-white space-y-10 lg:pl-8"
                        >
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    {t("pageTitle")}
                                </h1>
                                <p className="text-white/80 text-lg leading-relaxed">
                                    {t("pageSubtitle")}
                                </p>
                            </div>

                            {/* Direct Contact */}
                            <div className="space-y-5">
                                <a
                                    href="tel:+13056903146"
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors group"
                                >
                                    <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Phone className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">{t("callNow")}</p>
                                        <p className="text-xl font-bold">+1 (305) 690-3146</p>
                                    </div>
                                </a>

                                <a
                                    href="mailto:hi@pasiflow.com"
                                    className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-colors group"
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">{t("email")}</p>
                                        <p className="text-xl font-bold">hi@pasiflow.com</p>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/13056903146?text=Hello%2C%20I%20would%20like%20to%20learn%20more%20about%20Pasiflow."
                                    target="_blank"
                                    className="flex items-center gap-4 bg-green-600/80 backdrop-blur-sm rounded-xl p-5 hover:bg-green-600 transition-colors group"
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-sm mb-1">WhatsApp</p>
                                        <p className="text-xl font-bold">{t("writeNow")}</p>
                                    </div>
                                </a>

                                {/* Calendly Appointment */}
                                <a
                                    href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
                                    target="_blank"
                                    className="flex items-center gap-4 bg-amber-500/90 backdrop-blur-sm rounded-xl p-5 hover:bg-amber-500 transition-colors group"
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-sm mb-1">{t("onlineAppointment")}</p>
                                        <p className="text-xl font-bold">{t("scheduleCall")}</p>
                                    </div>
                                </a>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <h3 className="font-bold text-lg">{t("officeHours")}</h3>
                                </div>
                                <div className="space-y-2 text-white/80">
                                    <div className="flex justify-between">
                                        <span>{t("mondayFriday")}</span>
                                        <span className="font-medium text-white">09:00 - 18:00 (EST)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("saturday")}</span>
                                        <span className="font-medium text-white">10:00 - 14:00 (EST)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("sunday")}</span>
                                        <span className="text-white/60">{t("closed")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-accent" />
                                    {t("ourServices")}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {services.map((service, i) => (
                                        <span
                                            key={i}
                                            className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-accent mt-1" />
                                <div>
                                    <p className="font-bold">Miami, Florida, USA</p>
                                    <p className="text-white/60 text-sm mt-1">{tFooter("istanbulOffice")}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-primary">20+</div>
                            <p className="text-muted-foreground">{t("yearsExperience")}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-accent">$250M+</div>
                            <p className="text-muted-foreground">{t("transactionVolume")}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-emerald-500">98%+</div>
                            <p className="text-muted-foreground">{t("occupancyRate")}</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
