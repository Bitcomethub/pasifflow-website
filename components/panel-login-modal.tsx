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
        } catch (err: any) {
            console.error("Login error:", err)
            setError(err.message)
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
                            {/* Role Tabs */}
                            <div className="flex p-1 bg-slate-100/50 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("client")}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                        activeTab === "client" ? "bg-white text-slate-900 shadow-sm ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <Sparkles size={16} className={activeTab === "client" ? "text-slate-900" : "text-slate-400"} />
                                    Yatırımcı Girişi
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("agent")}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2",
                                        activeTab === "agent" ? "bg-white text-[#C1A05E] shadow-sm ring-1 ring-black/5" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    <Briefcase size={16} className={activeTab === "agent" ? "text-[#C1A05E]" : "text-slate-400"} />
                                    Agent Girişi
                                </button>
                            </div>

                            {/* Info Text */}
                            <div className="text-center py-2">
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
                                            {t("processing")}
                                        </div>
                                    ) : (
                                        t("loginButton")
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
