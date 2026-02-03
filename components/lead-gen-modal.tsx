"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, Sparkles, Shield, TrendingUp, X, ArrowRight } from "lucide-react"
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
                body: JSON.stringify({ name, email, phone, source: triggerSource || "modal" }),
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
                className="w-[95%] sm:max-w-lg max-h-[90vh] flex flex-col bg-white border-0 shadow-2xl rounded-2xl p-0 outline-none overflow-hidden"
                showCloseButton={false}
            >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F2328] via-[#2D353F] to-[#1F2328]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B8A074]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3D4852]/20 rounded-full blur-3xl" />

                {/* Close Button */}
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50 backdrop-blur-sm border border-white/10"
                    type="button"
                >
                    <X size={18} />
                </motion.button>

                {/* Premium Header Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-transparent px-6 py-8 sm:px-8 sm:py-10 flex-shrink-0 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="inline-flex items-center justify-center gap-3 mb-4"
                    >
                        <div className="p-3 bg-[#B8A074]/20 rounded-2xl">
                            {step === "form" ? (
                                <Sparkles className="w-6 h-6 text-[#B8A074]" />
                            ) : (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring" }}
                                >
                                    <Check className="w-6 h-6 text-[#B8A074]" />
                                </motion.div>
                            )}
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
                        className="text-white/60 text-sm font-medium mt-2"
                    >
                        {t("subTitle")}
                    </motion.p>
                </motion.div>

                <div className="relative p-5 sm:p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {step === "form" ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <DialogHeader className="mb-6 text-center">
                                    <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                                        {triggerSource === "gated-content" ? t("headerGated") : t("headerForm")}
                                    </DialogTitle>
                                    <DialogDescription className="text-white/50 pt-2 text-sm leading-relaxed">
                                        {t("descForm")}
                                    </DialogDescription>
                                </DialogHeader>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="space-y-3"
                                    >
                                        <Input
                                            placeholder={t("namePlaceholder")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="h-12 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-[#B8A074] focus:ring-[#B8A074]/20 rounded-xl text-sm font-medium backdrop-blur-sm"
                                        />
                                        <Input
                                            type="email"
                                            placeholder={t("emailPlaceholder")}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-12 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-[#B8A074] focus:ring-[#B8A074]/20 rounded-xl text-sm font-medium backdrop-blur-sm"
                                        />
                                        <Input
                                            type="tel"
                                            placeholder={t("phonePlaceholder")}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-12 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus:border-[#B8A074] focus:ring-[#B8A074]/20 rounded-xl text-sm font-medium backdrop-blur-sm"
                                        />
                                    </motion.div>

                                    {/* Benefits Strip */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-4 border-y border-white/10"
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
                                                transition={{ delay: 0.7 + i * 0.1 }}
                                                className="flex items-center gap-2 text-xs text-white/70 font-medium"
                                            >
                                                <benefit.icon size={14} className="text-[#B8A074]" />
                                                <span>{benefit.text}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full h-12 text-base font-bold bg-[#B8A074] hover:bg-[#a38d5d] text-white rounded-xl transition-all shadow-xl shadow-[#B8A074]/20 group"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    {t("processing")}
                                                </div>
                                            ) : (
                                                <>
                                                    {t("submitAccess")}
                                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="text-xs text-center text-white/40 pt-2 flex items-center justify-center gap-1"
                                    >
                                        <Lock size={10} />
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
                                className="py-12 flex flex-col items-center justify-center gap-6"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                    className="w-20 h-20 bg-[#B8A074]/20 rounded-full flex items-center justify-center"
                                >
                                    <Check className="w-10 h-10 text-[#B8A074]" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-white/80 font-medium text-center"
                                >
                                    <p className="text-lg">{t("headerSuccess")}</p>
                                    <p className="text-sm text-white/50 mt-2">{t("redirecting")}</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex gap-2"
                                >
                                    <div className="w-2 h-2 bg-[#B8A074] rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-[#B8A074] rounded-full animate-bounce delay-75" />
                                    <div className="w-2 h-2 bg-[#B8A074] rounded-full animate-bounce delay-150" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    )
}
