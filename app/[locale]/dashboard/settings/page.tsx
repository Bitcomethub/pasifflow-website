"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("pasiflow_user") : null
        if (!stored) return
        try {
            const user = JSON.parse(stored) as { fullName?: string; email?: string }
            if (user.fullName) {
                const parts = user.fullName.trim().split(/\s+/)
                setFirstName(parts[0] ?? "")
                setLastName(parts.slice(1).join(" "))
            }
            if (user.email) setEmail(user.email)
        } catch { /* ignore */ }
    }, [])

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Ayarlar</h1>
                <p className="text-sm md:text-base text-slate-500 mt-2">Hesap bilgilerinizi ve tercihlerinizi yönetin.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profil Bilgileri</CardTitle>
                        <CardDescription>Kişisel bilgilerinizi güncelleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Ad</Label>
                                <Input id="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="surname">Soyad</Label>
                                <Input id="surname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <Button className="bg-[#1F2328]">Değişiklikleri Kaydet</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Bildirimler</CardTitle>
                        <CardDescription>Hangi konularda bildirim almak istediğinizi seçin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-0.5 min-w-0">
                                <Label className="text-base">E-posta Bildirimleri</Label>
                                <p className="text-sm text-muted-foreground">Yeni fırsatlar ve güncellemeler hakkında e-posta alın.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-0.5 min-w-0">
                                <Label className="text-base">Yatırım Raporları</Label>
                                <p className="text-sm text-muted-foreground">Aylık portföy raporlarını otomatik alın.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
