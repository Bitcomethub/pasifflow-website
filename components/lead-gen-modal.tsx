"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/input" // Assuming usage of standard input for now
import { Check, Lock, Sparkles, Shield, TrendingUp, X, Mail } from "lucide-react"

interface LeadGenModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    triggerSource?: "timer" | "gated-content" | "Header Auth"
    initialAuthMode?: "login" | "signup"
}

export function LeadGenModal({ open, onOpenChange, onSuccess, triggerSource, initialAuthMode = "signup" }: LeadGenModalProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<"form" | "success">("form")
    const [authMode, setAuthMode] = useState<"signup" | "login">(initialAuthMode)

    // Reset auth mode when modal opens
    useEffect(() => {
        if (open) {
            setAuthMode(initialAuthMode)
        }
    }, [open, initialAuthMode])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: name,
                    email,
                    phone: phone || undefined,
                    source: triggerSource || "Website Modal",
                }),
            })

            if (!response.ok) throw new Error("Bir hata oluştu")

            localStorage.setItem("pasiflow_user_lead", JSON.stringify({ name, email, date: new Date().toISOString() }))

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
            <DialogContent className="sm:max-w-lg bg-white border-0 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden p-0 relative">
                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50 backdrop-blur-sm"
                    type="button"
                >
                    <X size={18} />
                </button>

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
                        <div className="space-y-6">
                            {/* Auth Mode Toggle */}
                            <div className="flex p-1 bg-slate-100 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setAuthMode("signup")}
                                    className={`flex-1 text-sm font-semibold py-2 rounded-md transition-all ${authMode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                >
                                    Kayıt Ol
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAuthMode("login")}
                                    className={`flex-1 text-sm font-semibold py-2 rounded-md transition-all ${authMode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                >
                                    Giriş Yap
                                </button>
                            </div>

                            {/* Social Login - Auto Login Option */}
                            <Button variant="outline" className="w-full h-12 bg-white border-slate-200 text-slate-700 font-medium hover:bg-slate-50 relative" onClick={() => console.log("Social login clicked")}>
                                <svg className="w-5 h-5 mr-3 absolute left-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Google ile Devam Et
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-500">veya e-posta ile</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-3">
                                    {authMode === "signup" && (
                                        <Input
                                            placeholder="Adınız Soyadınız"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                        />
                                    )}
                                    <Input
                                        type="email"
                                        placeholder="E-posta Adresiniz"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                    />
                                    {authMode === "signup" && (
                                        <Input
                                            type="tel"
                                            placeholder="Telefon Numarası (Opsiyonel)"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                        />
                                    )}
                                </div>

                                {/* Benefits Strip - Only Show on Signup */}
                                {authMode === "signup" && (
                                    <div className="flex items-center justify-center gap-4 py-2 border-y border-slate-100">
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
                                )}

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
                                        authMode === "form" || authMode === "signup" ? "Hemen Erişim Sağla" : "Giriş Yap"
                                    )}
                                </Button>

                                <p className="text-xs text-center text-slate-400 pt-2">
                                    <Lock size={10} className="inline mr-1" />
                                    Bilgileriniz 256-bit SSL ile korunmaktadır.
                                </p>
                            </form>
                        </div>
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
