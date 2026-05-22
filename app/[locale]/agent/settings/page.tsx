"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"
import { User, Shield, Bell, Wallet } from "lucide-react"

export default function AgentSettingsPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [iban, setIban] = useState("")

    useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("pasiflow_user") : null
        if (!stored) return
        try {
            const user = JSON.parse(stored) as { fullName?: string; email?: string; phone?: string }
            if (user.fullName) {
                const parts = user.fullName.trim().split(/\s+/)
                setFirstName(parts[0] ?? "")
                setLastName(parts.slice(1).join(" "))
            }
            if (user.email) setEmail(user.email)
            if (user.phone) setPhone(user.phone)
        } catch { /* ignore */ }
    }, [])

    return (
        <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight relative">Ayarlar</h1>
                <p className="text-[#A8B0B8] mt-2 font-medium relative text-sm md:text-base">Profil bilgilerinizi, ödeme bilgilerinizi ve bildirim tercihlerinizi yönetin.</p>
            </motion.div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <User size={16} className="text-[#C1A05E]" />
                        <CardTitle>Profil Bilgileri</CardTitle>
                    </div>
                    <CardDescription>Görüntülenen ad, e-posta ve iletişim bilgileri.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Ad</Label>
                            <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Soyad</Label>
                            <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 555 000 00 00" />
                        </div>
                    </div>
                    <Button className="bg-[#1F2328] text-white hover:bg-[#C1A05E] rounded-xl">Değişiklikleri Kaydet</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Wallet size={16} className="text-[#C1A05E]" />
                        <CardTitle>Komisyon Ödeme Bilgileri</CardTitle>
                    </div>
                    <CardDescription>Komisyon ve pasif gelir ödemelerinin yatırılacağı hesap.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="iban">IBAN / Hesap Numarası</Label>
                        <Input id="iban" value={iban} onChange={(e) => setIban(e.target.value)} placeholder="TR00 0000 0000 0000 0000 0000 00" />
                    </div>
                    <Button className="bg-[#1F2328] text-white hover:bg-[#C1A05E] rounded-xl">Bilgileri Güncelle</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Bell size={16} className="text-[#C1A05E]" />
                        <CardTitle>Bildirimler</CardTitle>
                    </div>
                    <CardDescription>Hangi konularda bildirim almak istediğinizi seçin.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { label: "Yeni Referans Bildirimi", desc: "Yeni bir yatırımcı sisteme eklendiğinde e-posta alın." },
                        { label: "Komisyon Ödeme Bildirimi", desc: "Komisyon ödemeleri tamamlandığında bilgilendirilin." },
                        { label: "Aylık Performans Raporu", desc: "Her ay başı satış ve kazanç özetinizi alın." },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between gap-4">
                            <div className="space-y-0.5 min-w-0">
                                <Label className="text-base">{item.label}</Label>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Shield size={16} className="text-[#C1A05E]" />
                        <CardTitle>Güvenlik</CardTitle>
                    </div>
                    <CardDescription>Şifre ve oturum güvenliği.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" className="rounded-xl">Şifre Değiştir</Button>
                        <Button variant="outline" className="rounded-xl">İki Faktörlü Doğrulamayı Etkinleştir</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
