import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Ayarlar</h1>
                <p className="text-slate-500 mt-2">Hesap bilgilerinizi ve tercihlerinizi yönetin.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profil Bilgileri</CardTitle>
                        <CardDescription>Kişisel bilgilerinizi güncelleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Ad</Label>
                                <Input id="name" defaultValue="Demo" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="surname">Soyad</Label>
                                <Input id="surname" defaultValue="Client" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" defaultValue="demo@pasiflow.com" />
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
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">E-posta Bildirimleri</Label>
                                <p className="text-sm text-muted-foreground">Yeni fırsatlar ve güncellemeler hakkında e-posta alın.</p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
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
