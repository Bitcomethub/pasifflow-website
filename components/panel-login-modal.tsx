"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Lock, X, Sparkles, Briefcase, ArrowRight, Shield, Eye, EyeOff } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

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
    const [showPassword, setShowPassword] = useState(false)
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

            localStorage.setItem("pasiflow_token", data.token)
            localStorage.setItem("pasiflow_user", JSON.stringify(data.user))

            setStep("success")
            setTimeout(() => {
                onOpenChange(false)
                setStep("form")
                setEmail("")
                setPassword("")

                if (data.user.role === "ADMIN") {
                    router.push("/admin")
                } else if (data.user.role === "AGENT") {
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
        setStep("form")
        setEmail("")
        setPassword("")
        setError(null)
        setShowPassword(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent
                className="w-[95%] sm:max-w-[460px] max-h-[90vh] flex flex-col bg-transparent border-0 shadow-none p-0 outline-none overflow-hidden gap-0"
                showCloseButton={false}
            >
                <DialogTitle className="sr-only">Panel Girişi</DialogTitle>
                <DialogDescription className="sr-only">
                    Yatırımcı veya Agent olarak giriş yapın
                </DialogDescription>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-3xl overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50 backdrop-blur-md"
                        type="button"
                        aria-label="Close login"
                    >
                        <X size={16} />
                    </button>

                    {/* Premium Header with animated gradient */}
                    <div className="relative bg-[#1F2328] px-8 py-8 overflow-hidden">
                        {/* Animated bg */}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E] rounded-full blur-[80px]"
                            />
                            <motion.div
                                animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C1A05E] rounded-full blur-[60px]"
                            />
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: "radial-gradient(circle at 1px 1px, #C1A05E 1px, transparent 0)",
                                    backgroundSize: "24px 24px",
                                }}
                            />
                        </div>

                        <div className="relative z-10 text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#C1A05E] to-[#8B7340] flex items-center justify-center shadow-lg shadow-[#C1A05E]/20"
                            >
                                <AnimatePresence mode="wait">
                                    {step === "form" ? (
                                        <motion.div key="lock" initial={{ rotate: -10 }} animate={{ rotate: 0 }}>
                                            <Lock className="w-6 h-6 text-white" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <Check className="w-6 h-6 text-white" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            <h3 className="text-white font-bold text-xl tracking-tight">
                                Panel Girişi
                            </h3>
                            <p className="text-white/50 text-sm mt-1">Güvenli erişim portalı</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        <AnimatePresence mode="wait">
                            {step === "form" ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {/* Role Tabs */}
                                    <div className="relative bg-slate-100 p-1.5 rounded-2xl">
                                        <div className="grid grid-cols-2 gap-1.5 relative">
                                            {/* Animated indicator */}
                                            <motion.div
                                                layout
                                                className="absolute inset-y-0 rounded-xl shadow-md"
                                                style={{
                                                    width: "calc(50% - 3px)",
                                                    left: activeTab === "client" ? "3px" : "calc(50% + 0px)",
                                                    background: activeTab === "client" ? "#1F2328" : "#C1A05E",
                                                }}
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab("client")}
                                                className={cn(
                                                    "relative z-10 py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2",
                                                    activeTab === "client" ? "text-white" : "text-slate-500 hover:text-slate-700"
                                                )}
                                            >
                                                <Sparkles size={16} className={activeTab === "client" ? "text-[#C1A05E]" : ""} />
                                                <div className="text-left">
                                                    <span className="font-bold text-sm block leading-tight">Yatırımcı</span>
                                                    <span className="text-[10px] opacity-70 block">Müşteri Paneli</span>
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab("agent")}
                                                className={cn(
                                                    "relative z-10 py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2",
                                                    activeTab === "agent" ? "text-white" : "text-slate-500 hover:text-slate-700"
                                                )}
                                            >
                                                <Briefcase size={16} />
                                                <div className="text-left">
                                                    <span className="font-bold text-sm block leading-tight">Agent</span>
                                                    <span className="text-[10px] opacity-70 block">Partner Paneli</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-3">
                                            <div className="relative group">
                                                <Input
                                                    type="email"
                                                    placeholder={t("emailPlaceholder")}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="h-13 bg-slate-50 border-slate-200 focus:border-[#C1A05E] focus:ring-[#C1A05E]/10 rounded-xl text-sm font-medium placeholder:text-slate-400 transition-all pl-4 pr-4"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder={t("passwordPlaceholder")}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                    className="h-13 bg-slate-50 border-slate-200 focus:border-[#C1A05E] focus:ring-[#C1A05E]/10 rounded-xl text-sm font-medium placeholder:text-slate-400 transition-all pl-4 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100"
                                                >
                                                    {error}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <Button
                                            type="submit"
                                            className={cn(
                                                "w-full h-13 text-base font-bold rounded-xl transition-all gap-2",
                                                activeTab === "client"
                                                    ? "bg-[#1F2328] hover:bg-[#2D353F] text-white shadow-lg shadow-[#1F2328]/30 hover:shadow-xl"
                                                    : "bg-[#C1A05E] hover:bg-[#a38d5d] text-white shadow-lg shadow-[#C1A05E]/30 hover:shadow-xl"
                                            )}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span>Giriş yapılıyor...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    Giriş Yap
                                                    <ArrowRight size={18} />
                                                </>
                                            )}
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 pt-1">
                                            <Shield size={12} className="text-slate-400" />
                                            <p className="text-[11px] text-slate-400">
                                                {t("securityNote")}
                                            </p>
                                        </div>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-10 flex flex-col items-center justify-center gap-5"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        className="relative"
                                    >
                                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                                            <Check className="w-10 h-10 text-white" strokeWidth={3} />
                                        </div>
                                        <motion.div
                                            initial={{ scale: 1 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="absolute inset-0 bg-green-400/20 rounded-full"
                                        />
                                    </motion.div>
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-slate-900">Giriş Başarılı</p>
                                        <p className="text-sm text-slate-500 mt-1">Yönlendiriliyorsunuz...</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
