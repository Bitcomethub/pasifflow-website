"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, Sparkles, Shield, TrendingUp, X, ArrowRight, Mail, User, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName: name, email, phone, source: triggerSource || "modal" }),
            })

            if (!response.ok) {
                throw new Error("Failed to submit lead")
            }

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
                className="w-[95%] sm:max-w-lg max-h-[90vh] flex flex-col border-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] rounded-3xl p-0 outline-none overflow-hidden bg-transparent"
                showCloseButton={false}
            >
                {/* Dark gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F2328] via-[#262D34] to-[#1F2328] rounded-3xl" />

                {/* Animated mesh gradients */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#C1A05E] to-[#B8A074] rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-20 -left-20 w-52 h-52 bg-gradient-to-tr from-[#C1A05E]/50 to-[#3D4852] rounded-full blur-3xl"
                />

                {/* Dot grid */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04] rounded-3xl overflow-hidden">
                    <defs>
                        <pattern id="lead-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="0.8" fill="#C1A05E" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#lead-dots)" />
                </svg>

                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md text-white/50 hover:text-white transition-all z-50 flex items-center justify-center border border-white/[0.08]"
                    type="button"
                >
                    <X size={16} />
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative px-6 pt-8 pb-2 sm:px-8 sm:pt-10 flex-shrink-0 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                        className="inline-flex items-center justify-center mb-5"
                    >
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#C1A05E] to-[#B8A074] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C1A05E]/20">
                                <AnimatePresence mode="wait">
                                    {step === "form" ? (
                                        <motion.div key="sparkle" initial={{ rotate: -30, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 30, scale: 0 }}>
                                            <Sparkles className="w-7 h-7 text-white" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="check" initial={{ rotate: -30, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring" }}>
                                            <Check className="w-7 h-7 text-white" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* Decorative ring */}
                            <div className="absolute -inset-2 rounded-2xl border border-[#C1A05E]/20 animate-pulse" />
                        </div>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white font-bold text-2xl sm:text-3xl tracking-tight"
                    >
                        {step === "form" ? t("titleFree") : t("titleSuccess")}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/40 text-sm font-medium mt-2"
                    >
                        {t("subTitle")}
                    </motion.p>
                </motion.div>

                {/* Content */}
                <div className="relative px-5 pb-6 sm:px-8 sm:pb-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {step === "form" ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <DialogHeader className="mb-5 text-center">
                                    <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight text-white">
                                        {triggerSource === "gated-content" ? t("headerGated") : t("headerForm")}
                                    </DialogTitle>
                                    <DialogDescription className="text-white/35 pt-1.5 text-sm leading-relaxed">
                                        {t("descForm")}
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Input fields with icons */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="space-y-3"
                                    >
                                        <div className="relative">
                                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C1A05E]/50" />
                                            <Input
                                                placeholder={t("namePlaceholder")}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="h-12 pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#C1A05E]/50 focus:ring-[#C1A05E]/10 focus:bg-white/[0.08] rounded-xl text-sm font-medium backdrop-blur-sm transition-all"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C1A05E]/50" />
                                            <Input
                                                type="email"
                                                placeholder={t("emailPlaceholder")}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-12 pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#C1A05E]/50 focus:ring-[#C1A05E]/10 focus:bg-white/[0.08] rounded-xl text-sm font-medium backdrop-blur-sm transition-all"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C1A05E]/50" />
                                            <Input
                                                type="tel"
                                                placeholder={t("phonePlaceholder")}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="h-12 pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/25 focus:border-[#C1A05E]/50 focus:ring-[#C1A05E]/10 focus:bg-white/[0.08] rounded-xl text-sm font-medium backdrop-blur-sm transition-all"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Benefits Pills */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-wrap items-center justify-center gap-2 py-4"
                                    >
                                        {[
                                            { icon: TrendingUp, text: t("benefits.roi") },
                                            { icon: Shield, text: t("benefits.section8") },
                                            { icon: Sparkles, text: t("benefits.portfolio") }
                                        ].map((benefit, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 + i * 0.08 }}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C1A05E]/[0.08] border border-[#C1A05E]/15 rounded-full"
                                            >
                                                <benefit.icon size={12} className="text-[#C1A05E]" />
                                                <span className="text-[11px] text-[#C1A05E]/80 font-semibold">{benefit.text}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* Submit Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full h-12 text-base font-bold bg-gradient-to-r from-[#C1A05E] to-[#B8A074] hover:from-[#B8A074] hover:to-[#C1A05E] text-white rounded-xl transition-all shadow-xl shadow-[#C1A05E]/15 group relative overflow-hidden"
                                            disabled={loading}
                                        >
                                            {/* Shimmer sweep */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <span className="relative flex items-center justify-center gap-2">
                                                {loading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        {t("processing")}
                                                    </>
                                                ) : (
                                                    <>
                                                        {t("submitAccess")}
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </span>
                                        </Button>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="text-[11px] text-center text-white/25 pt-1 flex items-center justify-center gap-1"
                                    >
                                        <Lock size={9} />
                                        {t("securityNote")}
                                    </motion.p>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="py-12 flex flex-col items-center justify-center gap-5"
                            >
                                {/* Animated check with ripple */}
                                <div className="relative">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className="w-20 h-20 bg-gradient-to-br from-[#C1A05E] to-[#B8A074] rounded-full flex items-center justify-center shadow-xl shadow-[#C1A05E]/20"
                                    >
                                        <Check className="w-10 h-10 text-white" strokeWidth={3} />
                                    </motion.div>
                                    {/* Ripple rings */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border-2 border-[#C1A05E]/30"
                                    />
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.3 }}
                                        animate={{ scale: 2.5, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                        className="absolute inset-0 rounded-full border border-[#C1A05E]/20"
                                    />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-center"
                                >
                                    <p className="text-lg font-bold text-white">{t("headerSuccess")}</p>
                                    <p className="text-sm text-white/40 mt-1.5">{t("redirecting")}</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex gap-1.5"
                                >
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -6, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                            className="w-1.5 h-1.5 bg-[#C1A05E] rounded-full"
                                        />
                                    ))}
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    )
}
