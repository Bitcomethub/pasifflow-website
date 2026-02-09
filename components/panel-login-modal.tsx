"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, X, Sparkles, Briefcase } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface PanelLoginModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PanelLoginModal({ open, onOpenChange }: PanelLoginModalProps) {
    const t = useTranslations("leadGenModal")
    const router = useRouter()
    const pathname = usePathname()
    const currentLocale = pathname.split('/')[1] || 'tr'

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<"form" | "success">("form")
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<"client" | "agent">("client")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Giriş başarısız")
            }

            // Save user data and token
            localStorage.setItem("pasiflow_token", data.token)
            localStorage.setItem("pasiflow_user", JSON.stringify(data.user))

            setStep("success")
            setTimeout(() => {
                onOpenChange(false)
                setStep("form")
                setEmail("")
                setPassword("")

                // Redirect based on role
                if (data.user.role === "AGENT") {
                    router.push(`/${currentLocale}/agent/dashboard`)
                } else {
                    router.push(`/${currentLocale}/dashboard`)
                }
            }, 1500)
        } catch (err: unknown) {
            console.error("Login error:", err)
            setError(err instanceof Error ? err.message : "Giriş başarısız")
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        onOpenChange(false)
        // Reset state on close
        setStep("form")
        setEmail("")
        setPassword("")
        setError(null)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className="w-[95%] sm:max-w-md max-h-[90vh] flex flex-col bg-white border-0 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)] rounded-2xl p-0 outline-none overflow-hidden"
                showCloseButton={false}
            >
                {/* Visually hidden title and description for accessibility */}
                <DialogTitle className="sr-only">Panel Girişi</DialogTitle>
                <DialogDescription className="sr-only">
                    Yatırımcı veya Agent olarak giriş yapın
                </DialogDescription>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50 backdrop-blur-sm"
                    type="button"
                    aria-label="Close login"
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
                                Panel Girişi
                            </h3>
                            <p className="text-slate-400 text-xs font-medium">Yatırımcı veya Agent olarak giriş yapın</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 sm:p-8 overflow-y-auto">
                    {step === "form" ? (
                        <div className="space-y-6">
                            {/* Role Tabs - More Prominent */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("client")}
                                    className={cn(
                                        "py-4 px-4 rounded-xl transition-all flex flex-col items-center justify-center gap-2 border-2",
                                        activeTab === "client"
                                            ? "bg-[#1F2328] text-white border-[#1F2328] shadow-lg"
                                            : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                                    )}
                                >
                                    <Sparkles size={24} className={activeTab === "client" ? "text-[#C1A05E]" : "text-slate-400"} />
                                    <span className="font-bold text-sm">Yatırımcı Girişi</span>
                                    <span className={cn(
                                        "text-xs",
                                        activeTab === "client" ? "text-slate-400" : "text-slate-400"
                                    )}>Müşteri Paneli</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("agent")}
                                    className={cn(
                                        "py-4 px-4 rounded-xl transition-all flex flex-col items-center justify-center gap-2 border-2",
                                        activeTab === "agent"
                                            ? "bg-[#C1A05E] text-white border-[#C1A05E] shadow-lg"
                                            : "bg-slate-50 text-slate-500 border-slate-200 hover:border-[#C1A05E]/50 hover:bg-[#C1A05E]/5"
                                    )}
                                >
                                    <Briefcase size={24} className={activeTab === "agent" ? "text-white" : "text-slate-400"} />
                                    <span className="font-bold text-sm">Agent Girişi</span>
                                    <span className={cn(
                                        "text-xs",
                                        activeTab === "agent" ? "text-white/80" : "text-slate-400"
                                    )}>Partner Paneli</span>
                                </button>
                            </div>

                            {/* Info Text */}
                            <div className="text-center py-1">
                                <p className="text-xs text-slate-500">
                                    {activeTab === "client"
                                        ? "Yatırım panelinize erişmek için giriş yapın."
                                        : "Partner panelinize erişmek için giriş yapın."}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-3">
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
                                </div>

                                {error && (
                                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium border border-red-200">
                                        {error}
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
                                            Giriş yapılıyor...
                                        </div>
                                    ) : (
                                        "Giriş Yap"
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
                            <div className="text-slate-600 font-medium text-sm">Yönlendiriliyorsunuz...</div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
