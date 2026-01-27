"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
        <>
            {/* Hero Header - Clean Charcoal */}
            <section className="bg-[#1F2328] pt-32 pb-16">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t("pageTitle")}
                        </h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            {t("pageSubtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Left: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-slate-100"
                        >
                            <h2 className="text-2xl font-bold text-[#1F2328] mb-2">
                                {t("formTitle")}
                            </h2>
                            <p className="text-slate-500 mb-8">
                                {t("formSubtitle")}
                            </p>

                            <form className="space-y-5">
                                {/* Name Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-slate-700">{t("firstName")} *</Label>
                                        <Input id="firstName" placeholder={t("firstName")} className="h-12 bg-slate-50 border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-slate-700">{t("lastName")} *</Label>
                                        <Input id="lastName" placeholder={t("lastName")} className="h-12 bg-slate-50 border-slate-200" />
                                    </div>
                                </div>

                                {/* Contact Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-700">{t("email")} *</Label>
                                        <Input id="email" type="email" placeholder="example@email.com" className="h-12 bg-slate-50 border-slate-200" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-slate-700">{t("phone")} *</Label>
                                        <Input id="phone" type="tel" placeholder="+1 XXX XXX XXXX" className="h-12 bg-slate-50 border-slate-200" />
                                    </div>
                                </div>

                                {/* Investor Type */}
                                <div className="space-y-3">
                                    <Label className="text-slate-700">{t("investorProfile")}</Label>
                                    <RadioGroup defaultValue="new" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center space-x-3 bg-slate-50 rounded-lg px-4 py-3 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">
                                            <RadioGroupItem value="new" id="new" />
                                            <Label htmlFor="new" className="cursor-pointer font-normal text-slate-600">{t("investorNew")}</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-slate-50 rounded-lg px-4 py-3 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">
                                            <RadioGroupItem value="experienced" id="experienced" />
                                            <Label htmlFor="experienced" className="cursor-pointer font-normal text-slate-600">{t("investorExperienced")}</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-slate-50 rounded-lg px-4 py-3 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">
                                            <RadioGroupItem value="existing" id="existing" />
                                            <Label htmlFor="existing" className="cursor-pointer font-normal text-slate-600">{t("investorExisting")}</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-slate-50 rounded-lg px-4 py-3 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200">
                                            <RadioGroupItem value="agent" id="agent" />
                                            <Label htmlFor="agent" className="cursor-pointer font-normal text-slate-600">{t("investorAgent")}</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-slate-700">{t("message")}</Label>
                                    <Textarea
                                        id="message"
                                        placeholder={t("messagePlaceholder")}
                                        className="min-h-[100px] resize-none bg-slate-50 border-slate-200"
                                    />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-14 text-lg bg-[#C1A05E] hover:bg-[#a38d5d] text-white font-semibold shadow-lg"
                                >
                                    <Send className="mr-2 h-5 w-5" />
                                    {t("submit")}
                                </Button>

                                <p className="text-xs text-center text-slate-400">
                                    {t("privacyNote")}
                                </p>
                            </form>
                        </motion.div>

                        {/* Right: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Contact Cards */}
                            <a
                                href="tel:+13056903146"
                                className="flex items-center gap-4 bg-[#1F2328] rounded-xl p-5 hover:bg-[#2a2f35] transition-colors group"
                            >
                                <div className="w-14 h-14 bg-[#C1A05E] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Phone className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm mb-1">{t("callNow")}</p>
                                    <p className="text-xl font-bold text-white">+1 (305) 690-3146</p>
                                </div>
                            </a>

                            <a
                                href="mailto:info@pasiflow.com"
                                className="flex items-center gap-4 bg-[#1F2328] rounded-xl p-5 hover:bg-[#2a2f35] transition-colors group"
                            >
                                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm mb-1">{t("email")}</p>
                                    <p className="text-xl font-bold text-white">info@pasiflow.com</p>
                                </div>
                            </a>

                            <a
                                href="https://wa.me/13056903146?text=Hello%2C%20I%20would%20like%20to%20learn%20more%20about%20Pasiflow."
                                target="_blank"
                                className="flex items-center gap-4 bg-[#25D366] rounded-xl p-5 hover:bg-[#22c55e] transition-colors group"
                            >
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MessageCircle className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white/80 text-sm mb-1">WhatsApp</p>
                                    <p className="text-xl font-bold text-white">{t("writeNow")}</p>
                                </div>
                            </a>

                            <a
                                href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
                                target="_blank"
                                className="flex items-center gap-4 bg-[#C1A05E] rounded-xl p-5 hover:bg-[#a38d5d] transition-colors group"
                            >
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-white/80 text-sm mb-1">{t("onlineAppointment")}</p>
                                    <p className="text-xl font-bold text-white">{t("scheduleCall")}</p>
                                </div>
                            </a>

                            {/* Office Hours */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="h-5 w-5 text-[#C1A05E]" />
                                    <h3 className="font-bold text-lg text-[#1F2328]">{t("officeHours")}</h3>
                                </div>
                                <div className="space-y-2 text-slate-600">
                                    <div className="flex justify-between">
                                        <span>{t("mondayFriday")}</span>
                                        <span className="font-medium text-[#1F2328]">09:00 - 18:00 (EST)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("saturday")}</span>
                                        <span className="font-medium text-[#1F2328]">10:00 - 14:00 (EST)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t("sunday")}</span>
                                        <span className="text-slate-400">{t("closed")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#1F2328]">
                                    <Building2 className="h-5 w-5 text-[#C1A05E]" />
                                    {t("ourServices")}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {services.map((service, i) => (
                                        <span
                                            key={i}
                                            className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4 p-4">
                                <MapPin className="h-5 w-5 text-[#C1A05E] mt-1" />
                                <div>
                                    <p className="font-bold text-[#1F2328]">Miami, Florida, USA</p>
                                    <p className="text-slate-500 text-sm mt-1">{tFooter("istanbulOffice")}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-[#1F2328]">20+</div>
                            <p className="text-slate-500">{t("yearsExperience")}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-[#C1A05E]">$250M+</div>
                            <p className="text-slate-500">{t("transactionVolume")}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-[#1F2328]">98%+</div>
                            <p className="text-slate-500">{t("occupancyRate")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
