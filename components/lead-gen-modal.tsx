"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, Lock } from "lucide-react"

interface LeadGenModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    triggerSource?: "timer" | "gated-content"
}

export function LeadGenModal({ open, onOpenChange, onSuccess, triggerSource }: LeadGenModalProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<"form" | "success">("form")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Save to localStorage
            localStorage.setItem("pasiflow_user_lead", JSON.stringify({ name, email, date: new Date().toISOString() }))

            // Log for "backend"
            console.log("LEAD CAPTURED:", { name, email, source: triggerSource })

            setStep("success")
            setTimeout(() => {
                onSuccess()
                onOpenChange(false)
                setStep("form") // Reset for next time if ever needed
            }, 2000)
        } catch (error) {
            console.error("Error submitting lead:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border border-primary/20 shadow-2xl">
                <DialogHeader>
                    <div className="mx-auto mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                        {step === "form" ? <Lock className="w-6 h-6 text-primary" /> : <Check className="w-6 h-6 text-green-600" />}
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold">
                        {step === "form"
                            ? (triggerSource === "gated-content" ? "Bu İçeriği Görüntülemek İçin..." : "Özel Fırsatları Kaçırmayın")
                            : "Teşekkürler!"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground pt-2">
                        {step === "form"
                            ? "Detaylı portföy bilgilerine, yüksek getirili fırsatlara ve özel analizlere erişmek için hemen ücretsiz kayıt olun."
                            : "Kaydınız başarıyla alındı. Şimdi tüm portföye erişebilirsiniz."}
                    </DialogDescription>
                </DialogHeader>

                {step === "form" ? (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Input
                                placeholder="Adınız Soyadınız"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-12 border-primary/20 focus-visible:ring-primary/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="E-posta Adresiniz"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 border-primary/20 focus-visible:ring-primary/30"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 justify-center py-2">
                            <Badge variant="secondary" className="bg-primary/5 text-primary">
                                <Check size={12} className="mr-1" /> ROI Analizleri
                            </Badge>
                            <Badge variant="secondary" className="bg-primary/5 text-primary">
                                <Check size={12} className="mr-1" /> Section 8 Fırsatları
                            </Badge>
                            <Badge variant="secondary" className="bg-primary/5 text-primary">
                                <Check size={12} className="mr-1" /> Güncel Portföy
                            </Badge>
                        </div>

                        <Button type="submit" className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20" disabled={loading}>
                            {loading ? "İşleniyor..." : "Portföyü Görüntüle"}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground/60">
                            Kişisel verileriniz gizlilik politikamıza uygun olarak saklanır.
                        </p>
                    </form>
                ) : (
                    <div className="py-8 flex justify-center">
                        <div className="animate-pulse text-primary font-medium">Yönlendiriliyorsunuz...</div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
