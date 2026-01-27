"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, Sparkles, Shield, TrendingUp, X, Mail, Briefcase } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface LeadGenModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    triggerSource?: "timer" | "gated-content" | "Header Auth"
    initialAuthMode?: "login" | "signup"
}

export function LeadGenModal({ open, onOpenChange, onSuccess, triggerSource, initialAuthMode = "signup" }: LeadGenModalProps) {
    const t = useTranslations("leadGenModal")
    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = pathname.split('/')[1] || 'tr'

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<"form" | "success">("form")
    const [authMode, setAuthMode] = useState<"signup" | "login">(initialAuthMode)
    const [error, setError] = useState<string | null>(null)

    const [activeTab, setActiveTab] = useState<"client" | "agent">("client")

    // Reset auth mode when modal opens
    useEffect(() => {
        if (open) {
            setAuthMode(initialAuthMode)
            // Reset activeTab to client when modal opens, unless it's specifically for agent login
            setActiveTab("client")
        }
    }, [open, initialAuthMode])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const endpoint = authMode === "signup" ? "/api/auth/signup" : "/api/auth/login"
        const payload = authMode === "signup"
            ? { fullName: name, email, phone: phone || undefined, password }
            : { email, password }

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Bir hata oluştu")
            }

            // Save user data and token
            localStorage.setItem("pasiflow_token", data.token)
            localStorage.setItem("pasiflow_user", JSON.stringify(data.user))

            setStep("success")
            setTimeout(() => {
                onSuccess()
                onOpenChange(false)
                setStep("form")

                // Smart Redirect for Header Auth
                if (triggerSource === "Header Auth") {
                    if (data.user.role === "AGENT") {
                        router.push(`/${currentLocale}/agent/dashboard`)
                    } else {
                        router.push(`/${currentLocale}/dashboard`)
                    }
                }
            }, 2000)
        } catch (err: any) {
            console.error("Auth error:", err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95%] sm:max-w-lg max-h-[90vh] flex flex-col bg-white border-0 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)] rounded-2xl p-0 relative outline-none overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50 backdrop-blur-sm"
                    type="button"
                >
                    <X size={18} />
                </button>

                {/* Premium Header Bar */}
                <div className="bg-[#1F2328] px-6 py-5 sm:px-8 sm:py-6 flex-shrink-0">
                    <div className="flex items-center justify-center gap-3">
                        <div className="p-2.5 bg-[#C1A05E]/10 rounded-xl">
                            {step === "form" ? <Lock className="w-5 h-5 text-white" /> : <Check className="w-5 h-5 text-[#C1A05E]" />}
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg tracking-tight">
                                {step === "form" ? t("titleFree") : t("titleSuccess")}
                            </h3>
                            <p className="text-slate-400 text-xs font-medium">{t("subTitle")}</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 sm:p-8 overflow-y-auto">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-center text-2xl font-bold tracking-tight text-slate-900">
                            {step === "form"
                                ? (triggerSource === "gated-content" ? t("headerGated") : t("headerForm"))
                                : t("headerSuccess")}
                        </DialogTitle>
                        <DialogDescription className="text-center text-slate-500 pt-2 text-sm leading-relaxed">
                            {step === "form"
                                ? t("descForm")
                                : t("descSuccess")}
                        </DialogDescription>
                    </DialogHeader>

                    {step === "form" ? (
                        <div className="space-y-6">
                            {/* Role Tabs - Only show when in Login mode or generally? Let's show always for clear entry */}
                            <div className="flex p-1 bg-slate-100/50 rounded-xl mb-2">
                                <button
                                    onClick={() => { setActiveTab("client"); setAuthMode("login"); }}
                                    className={cn(
                                        "flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                        activeTab === "client" ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <Sparkles size={16} className={activeTab === "client" ? "text-slate-900" : "text-slate-400"} />
                                    Yatırımcı
                                </button>
                                <button
                                    onClick={() => { setActiveTab("agent"); setAuthMode("login"); }}
                                    className={cn(
                                        "flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                        activeTab === "agent" ? "bg-white text-[#C1A05E] shadow-sm ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <Briefcase size={16} className={activeTab === "agent" ? "text-[#C1A05E]" : "text-slate-400"} />
                                    Acente
                                </button>
                            </div>

                            {/* Auth Mode Toggle - Only for Client (Agents are login only usually) */}
                            {activeTab === "client" && (
                                <div className="flex p-1 bg-slate-100 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => setAuthMode("signup")}
                                        className={`flex-1 text-sm font-semibold py-2 rounded-md transition-all ${authMode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                    >
                                        {t("signup")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setAuthMode("login")}
                                        className={`flex-1 text-sm font-semibold py-2 rounded-md transition-all ${authMode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                    >
                                        {t("login")}
                                    </button>
                                </div>
                            )}

                            {/* Agent Title Override */}
                            {activeTab === "agent" && (
                                <div className="text-center py-2">
                                    <h4 className="text-lg font-bold text-slate-900">Acente Girişi</h4>
                                    <p className="text-xs text-slate-500">Partner panelinize erişmek için giriş yapın.</p>
                                </div>
                            )}

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
                                {t("googleLogin")}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-500">{t("orEmail")}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-3">
                                    {authMode === "signup" && (
                                        <Input
                                            placeholder={t("namePlaceholder")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                        />
                                    )}
                                    <Input
                                        type="email"
                                        placeholder={t("emailPlaceholder")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                    />
                                    <Input
                                        type="password"
                                        placeholder={t("passwordPlaceholder")}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                    />
                                    {authMode === "signup" && (
                                        <Input
                                            type="tel"
                                            placeholder={t("phonePlaceholder")}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                        />
                                    )}
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-slate-100 text-secondary text-xs font-medium border border-slate-200">
                                        {error}
                                    </div>
                                )}

                                {/* Benefits Strip - Only Show on Signup */}
                                {authMode === "signup" && (
                                    <div className="flex items-center justify-center gap-4 py-2 border-y border-slate-100">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                            <TrendingUp size={14} className="text-slate-900" />
                                            <span>{t("benefits.roi")}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                            <Shield size={14} className="text-slate-900" />
                                            <span>{t("benefits.section8")}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                            <Sparkles size={14} className="text-slate-900" />
                                            <span>{t("benefits.portfolio")}</span>
                                        </div>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-bold bg-[#1F2328] hover:bg-[#1F2328]/90 text-white rounded-xl transition-all"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t("processing")}
                                        </div>
                                    ) : (
                                        authMode === "signup" ? t("submitAccess") : t("submitLogin")
                                    )}
                                </Button>

                                <p className="text-xs text-center text-slate-400 pt-2">
                                    <Lock size={10} className="inline mr-1" />
                                    {t("securityNote")}
                                </p>
                            </form>
                        </div>
                    ) : (
                        <div className="py-8 flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-[#C1A05E]/10 rounded-full flex items-center justify-center">
                                <Check className="w-8 h-8 text-[#C1A05E]" />
                            </div>
                            <div className="text-slate-600 font-medium text-sm">{t("redirecting")}</div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
