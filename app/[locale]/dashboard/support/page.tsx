import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageSquare } from "lucide-react"

export default function SupportPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Destek Merkezi</h1>
                <p className="text-sm md:text-base text-slate-500 mt-2">Size nasıl yardımcı olabiliriz?</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Bize Ulaşın</CardTitle>
                        <CardDescription>Formu doldurun, en kısa sürede dönüş yapalım.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input placeholder="Adınız" />
                                <Input placeholder="Soyadınız" />
                            </div>
                            <Input placeholder="E-posta Adresiniz" type="email" />
                            <Input placeholder="Konu" />
                            <Textarea placeholder="Mesajınız..." className="min-h-[120px]" />
                            <Button className="w-full bg-[#1F2328] hover:bg-[#1F2328]/90">Gönder</Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>İletişim Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="font-medium">Telefon</p>
                                    <p className="text-sm text-slate-500">+1 (302) 555-0123</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="font-medium">E-posta</p>
                                    <p className="text-sm text-slate-500">support@pasiflow.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <p className="font-medium">Canlı Destek</p>
                                    <p className="text-sm text-slate-500">7/24 Aktif</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
