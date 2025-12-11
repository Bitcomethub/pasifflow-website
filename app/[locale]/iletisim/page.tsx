"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactPage() {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormState('submitting')

        // Simulate form submission - replace with actual email API
        setTimeout(() => {
            setFormState('success')
            setFormData({ name: '', email: '', phone: '', message: '' })
        }, 1500)
    }

    const whatsappNumber = "905551234567" // Replace with actual number
    const whatsappMessage = encodeURIComponent("Merhaba, Pasiflow yatırım danışmanlığı hakkında bilgi almak istiyorum.")

    return (
        <div className="min-h-screen bg-background py-24">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                        Bizimle İletişime Geçin
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Yatırım danışmanlığı için ücretsiz görüşme ayarlayın. Sorularınızı 7/24 yanıtlıyoruz.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Mesaj Gönderin</h2>

                            {formState === 'success' ? (
                                <div className="text-center py-12">
                                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">Mesajınız Gönderildi!</h3>
                                    <p className="text-muted-foreground">En kısa sürede size dönüş yapacağız.</p>
                                    <Button
                                        className="mt-6"
                                        variant="outline"
                                        onClick={() => setFormState('idle')}
                                    >
                                        Yeni Mesaj Gönder
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="name">Adınız Soyadınız *</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Ad Soyad"
                                            required
                                            className="mt-1.5"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="email">E-posta Adresiniz *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="ornek@email.com"
                                            required
                                            className="mt-1.5"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="phone">Telefon Numaranız</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+90 5XX XXX XX XX"
                                            className="mt-1.5"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="message">Mesajınız *</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Yatırım hedeflerinizi veya sorularınızı yazın..."
                                            required
                                            className="mt-1.5 min-h-[120px]"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        size="lg"
                                        disabled={formState === 'submitting'}
                                    >
                                        {formState === 'submitting' ? (
                                            <>Gönderiliyor...</>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                Mesaj Gönder
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        {/* WhatsApp Card */}
                        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-green-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground mb-1">WhatsApp ile Yazın</h3>
                                    <p className="text-sm text-muted-foreground mb-3">Hızlı yanıt için WhatsApp'tan ulaşın</p>
                                    <Button
                                        asChild
                                        className="bg-green-500 hover:bg-green-600 text-white"
                                    >
                                        <a
                                            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            WhatsApp'tan Yaz
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Email Card */}
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">E-posta</h3>
                                    <a href="mailto:info@pasiflow.com" className="text-primary hover:underline">
                                        info@pasiflow.com
                                    </a>
                                </div>
                            </div>
                        </Card>

                        {/* Phone Card */}
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Telefon</h3>
                                    <a href="tel:+905551234567" className="text-foreground hover:text-primary">
                                        +90 555 123 45 67
                                    </a>
                                    <p className="text-sm text-muted-foreground mt-1">Pazartesi - Cuma, 09:00 - 18:00</p>
                                </div>
                            </div>
                        </Card>

                        {/* Location Card */}
                        <Card className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">Ofisimiz</h3>
                                    <p className="text-muted-foreground">
                                        İstanbul, Türkiye
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
