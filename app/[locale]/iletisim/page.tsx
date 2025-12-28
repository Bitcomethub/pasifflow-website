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

    const services = [
        "Mülk Satın Alma",
        "Section 8 Yönetimi",
        "Kiracı Yerleştirme",
        "Bakım & Onarım",
        "Vergi Danışmanlığı"
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
                                Ücretsiz Danışmanlık Talebi
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Formu doldurun, size 24 saat içinde dönüş yapalım.
                            </p>

                            <form className="space-y-6">
                                {/* Name Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Adınız *</Label>
                                        <Input id="firstName" placeholder="Adınız" className="h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Soyadınız *</Label>
                                        <Input id="lastName" placeholder="Soyadınız" className="h-12" />
                                    </div>
                                </div>

                                {/* Contact Fields */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-posta *</Label>
                                        <Input id="email" type="email" placeholder="ornek@email.com" className="h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefon *</Label>
                                        <Input id="phone" type="tel" placeholder="+90 5XX XXX XXXX" className="h-12" />
                                    </div>
                                </div>

                                {/* Investor Type */}
                                <div className="space-y-3">
                                    <Label>Yatırımcı Profiliniz</Label>
                                    <RadioGroup defaultValue="new" className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="new" id="new" />
                                            <Label htmlFor="new" className="cursor-pointer font-normal">İlk kez yatırım yapacağım</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="experienced" id="experienced" />
                                            <Label htmlFor="experienced" className="cursor-pointer font-normal">Deneyimli yatırımcıyım</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="existing" id="existing" />
                                            <Label htmlFor="existing" className="cursor-pointer font-normal">Mevcut mülküm var</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 bg-muted/50 rounded-lg px-4 py-3 hover:bg-muted transition-colors cursor-pointer">
                                            <RadioGroupItem value="agent" id="agent" />
                                            <Label htmlFor="agent" className="cursor-pointer font-normal">Emlakçı/Danışmanım</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mesajınız (Opsiyonel)</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Yatırım hedefleriniz, bütçeniz veya sorularınız..."
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
                                    Danışmanlık Talebi Gönder
                                </Button>

                                <p className="text-xs text-center text-muted-foreground">
                                    Bilgileriniz gizli tutulur ve üçüncü taraflarla paylaşılmaz.
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
                                    İletişime Geçin
                                </h1>
                                <p className="text-white/80 text-lg leading-relaxed">
                                    Amerika'da gayrimenkul yatırımı hakkında tüm sorularınızı yanıtlamak için buradayız.
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
                                        <p className="text-white/60 text-sm mb-1">Hemen Arayın</p>
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
                                        <p className="text-white/60 text-sm mb-1">E-posta</p>
                                        <p className="text-xl font-bold">hi@pasiflow.com</p>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/13056903146?text=Merhaba%2C%20Pasiflow%20ile%20ilgili%20bilgi%20almak%20istiyorum."
                                    target="_blank"
                                    className="flex items-center gap-4 bg-green-600/80 backdrop-blur-sm rounded-xl p-5 hover:bg-green-600 transition-colors group"
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageCircle className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-sm mb-1">WhatsApp</p>
                                        <p className="text-xl font-bold">Hemen Yazın</p>
                                    </div>
                                </a>

                                {/* Calendly Appointment */}
                                <a
                                    href="https://calendly.com/pasiflow/danismanlik"
                                    target="_blank"
                                    className="flex items-center gap-4 bg-amber-500/90 backdrop-blur-sm rounded-xl p-5 hover:bg-amber-500 transition-colors group"
                                >
                                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-sm mb-1">Online Randevu</p>
                                        <p className="text-xl font-bold">Görüşme Planla</p>
                                    </div>
                                </a>
                            </div>

                            {/* Office Hours */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="h-5 w-5 text-accent" />
                                    <h3 className="font-bold text-lg">Çalışma Saatleri</h3>
                                </div>
                                <div className="space-y-2 text-white/80">
                                    <div className="flex justify-between">
                                        <span>Pazartesi - Cuma</span>
                                        <span className="font-medium text-white">09:00 - 18:00 (EST)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Cumartesi</span>
                                        <span className="font-medium text-white">10:00 - 14:00 (EST)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Pazar</span>
                                        <span className="text-white/60">Kapalı</span>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div>
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-accent" />
                                    Hizmetlerimiz
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
                                    <p className="text-white/60 text-sm mt-1">İstanbul ofisi Mayıs 2026'da açılıyor</p>
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
                            <p className="text-muted-foreground">Yıl ABD Tecrübesi</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-accent">$250M+</div>
                            <p className="text-muted-foreground">Toplam İşlem Hacmi</p>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-emerald-500">%98+</div>
                            <p className="text-muted-foreground">Doluluk Oranı</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
