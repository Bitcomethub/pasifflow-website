"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, Sparkles, Shield, TrendingUp, X } from "lucide-react"
import { useTranslations } from "next-intl"

interface LeadGenModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    triggerSource?: "timer" | "gated-content"
}

export function LeadGenModal({ open, onOpenChange, onSuccess, triggerSource }: LeadGenModalProps) {
    const t = useTranslations("leadGenModal")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState<"form" | "success">("form")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Submit lead to API
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, source: triggerSource || "modal" }),
            })

            if (!response.ok) {
                throw new Error("Failed to submit lead")
            }

            // Mark lead as captured in localStorage
            localStorage.setItem("pasiflow_lead_captured", "true")

            setStep("success")
            setTimeout(() => {
                onSuccess()
                onOpenChange(false)
                setStep("form")
                setName("")
                setEmail("")
                setPhone("")
            }, 2000)
        } catch (err) {
            console.error("Lead submission error:", err)
            // Still mark as captured to prevent spam
            localStorage.setItem("pasiflow_lead_captured", "true")
            setStep("success")
            setTimeout(() => {
                onSuccess()
                onOpenChange(false)
                setStep("form")
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        onOpenChange(false)
        setStep("form")
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className="w-[95%] sm:max-w-lg max-h-[90vh] flex flex-col bg-white border-0 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)] rounded-2xl p-0 outline-none overflow-hidden"
                showCloseButton={false}
            >
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
                            {step === "form" ? <Sparkles className="w-5 h-5 text-[#C1A05E]" /> : <Check className="w-5 h-5 text-[#C1A05E]" />}
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-3">
                                    <Input
                                        placeholder={t("namePlaceholder")}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                    />
                                    <Input
                                        type="email"
                                        placeholder={t("emailPlaceholder")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                    />
                                    <Input
                                        type="tel"
                                        placeholder={t("phonePlaceholder")}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="h-12 bg-slate-50 border-slate-200 focus:border-slate-900 focus:ring-slate-900/10 rounded-xl text-sm font-medium placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Benefits Strip */}
                                <div className="flex items-center justify-center gap-4 py-3 border-y border-slate-100">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                        <TrendingUp size={14} className="text-[#C1A05E]" />
                                        <span>{t("benefits.roi")}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                        <Shield size={14} className="text-[#C1A05E]" />
                                        <span>{t("benefits.section8")}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                        <Sparkles size={14} className="text-[#C1A05E]" />
                                        <span>{t("benefits.portfolio")}</span>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-bold bg-[#C1A05E] hover:bg-[#a38d4d] text-white rounded-xl transition-all shadow-lg shadow-[#C1A05E]/20"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t("processing")}
                                        </div>
                                    ) : (
                                        t("submitAccess")
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
