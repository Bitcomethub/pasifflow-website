"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, Sparkles, Shield, TrendingUp } from "lucide-react"

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

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            localStorage.setItem("pasiflow_user_lead", JSON.stringify({ name, email, date: new Date().toISOString() }))
            console.log("LEAD CAPTURED:", { name, email, source: triggerSource })

            setStep("success")
            setTimeout(() => {
                onSuccess()
                onOpenChange(false)
                setStep("form")
            }, 2000)
        } catch (error) {
            console.error("Error submitting lead:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg bg-white border-0 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden p-0">
                {/* Premium Header Bar */}
                <div className="bg-slate-900 px-8 py-6">
                    <div className="flex items-center justify-center gap-3">
                        <div className="p-2.5 bg-white/10 rounded-xl">
                            {step === "form" ? <Lock className="w-5 h-5 text-white" /> : <Check className="w-5 h-5 text-green-400" />}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg tracking-tight">
                                {step === "form" ? "Ücretsiz Danışmanlık" : "Kayıt Tamamlandı"}
                            </h3>
                            <p className="text-slate-400 text-xs font-medium">ABD Gayrimenkul Yatırımı</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-center text-2xl font-bold tracking-tight text-slate-900">
                            {step === "form"
                                ? (triggerSource === "gated-content" ? "Premium İçeriğe Erişin" : "Özel Fırsatları Keşfedin")
                                : "Teşekkürler!"}
                        </DialogTitle>
                        <DialogDescription className="text-center text-slate-500 pt-2 text-sm leading-relaxed">
                            {step === "form"
                                ? "Detaylı portföy analizleri ve yüksek getirili yatırım fırsatlarına anında erişim sağlayın."
                                : "Kaydınız başarıyla alındı. Portföye yönlendiriliyorsunuz."}
                        </DialogDescription>
                    </DialogHeader>

                    {step === "form" ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-3">
                                <Input
                                    placeholder="Adınız Soyadınız"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                />
                                <Input
                                    type="email"
                                    placeholder="E-posta Adresiniz"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                />
                            </div>

                            {/* Benefits Strip */}
                            <div className="flex items-center justify-center gap-4 py-4 border-y border-slate-100">
                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                    <TrendingUp size={14} className="text-slate-900" />
                                    <span>ROI Analizi</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                    <Shield size={14} className="text-slate-900" />
                                    <span>Section 8</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                    <Sparkles size={14} className="text-slate-900" />
                                    <span>Portföy</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        İşleniyor...
                                    </div>
                                ) : (
                                    "Hemen Erişim Sağla"
                                )}
                            </Button>

                            <p className="text-xs text-center text-slate-400 pt-2">
                                <Lock size={10} className="inline mr-1" />
                                Bilgileriniz 256-bit SSL ile korunmaktadır.
                            </p>
                        </form>
                    ) : (
                        <div className="py-8 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="text-slate-600 font-medium text-sm">Yönlendiriliyorsunuz...</div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
