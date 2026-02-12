"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Calendar, Gift, ArrowRight, Check, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

export function ExitIntentPopup() {
    const t = useTranslations("exitPopup")
    const [showPopup, setShowPopup] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem("exitPopupShown")
        if (alreadyShown) {
            setHasTriggered(true)
            return
        }

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 5 && !hasTriggered && !isMobile) {
                setShowPopup(true)
                setHasTriggered(true)
                sessionStorage.setItem("exitPopupShown", "true")
            }
        }

        const handleScroll = () => {
            if (isMobile && !hasTriggered) {
                const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
                if (scrollPercentage > 0.5) {
                    const handleTouchStart = () => {
                        if (window.scrollY < 100) {
                            setShowPopup(true)
                            setHasTriggered(true)
                            sessionStorage.setItem("exitPopupShown", "true")
                        }
                    }
                    window.addEventListener("touchstart", handleTouchStart, { once: true })
                }
            }
        }

        const timer = setTimeout(() => {
            if (!isMobile) {
                document.addEventListener("mouseleave", handleMouseLeave)
            }
        }, 5000)

        window.addEventListener("scroll", handleScroll)

        return () => {
            clearTimeout(timer)
            document.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [hasTriggered, isMobile])

    const handleClose = () => {
        setShowPopup(false)
    }

    const handleCTA = () => {
        window.open("https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89", "_blank")
        setShowPopup(false)
    }

    return (
        <AnimatePresence>
            {showPopup && (
                <Dialog open={showPopup} onOpenChange={setShowPopup}>
                    <DialogContent className="w-[95%] sm:max-w-md p-0 overflow-hidden border-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] rounded-3xl bg-transparent">
                        {/* Dark gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2328] via-[#262D34] to-[#1F2328] rounded-3xl" />

                        {/* Animated mesh gradients */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#C1A05E] to-[#B8A074] rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute -bottom-16 -left-16 w-44 h-44 bg-gradient-to-tr from-[#C1A05E]/40 to-[#3D4852] rounded-full blur-3xl"
                        />

                        {/* Dot grid */}
                        <svg className="absolute inset-0 w-full h-full opacity-[0.04] rounded-3xl overflow-hidden">
                            <defs>
                                <pattern id="exit-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                                    <circle cx="1" cy="1" r="0.8" fill="#C1A05E" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#exit-dots)" />
                        </svg>

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={handleClose}
                            aria-label="Close popup"
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md text-white/50 hover:text-white transition-all z-50 flex items-center justify-center border border-white/[0.08]"
                        >
                            <X size={16} />
                        </motion.button>

                        {/* Header */}
                        <div className="relative px-6 pt-8 pb-2 sm:px-8 sm:pt-10 text-center">
                            <motion.div
                                initial={{ scale: 0, rotate: -15 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                                className="inline-flex items-center justify-center mb-5"
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#C1A05E] to-[#B8A074] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C1A05E]/20">
                                        <Gift className="w-7 h-7 text-white" />
                                    </div>
                                    {/* Decorative ring */}
                                    <div className="absolute -inset-2 rounded-2xl border border-[#C1A05E]/20 animate-pulse" />
                                    {/* Sparkle decorations */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-1 -right-1"
                                    >
                                        <Sparkles size={10} className="text-[#C1A05E]" />
                                    </motion.div>
                                </div>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2"
                            >
                                {t("title")}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/40 text-sm"
                            >
                                {t("subtitle")}
                            </motion.p>
                        </div>

                        {/* Content Card */}
                        <div className="relative px-5 pb-6 sm:px-8 sm:pb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-5 sm:p-6"
                            >
                                {/* Consultation info */}
                                <div className="text-center mb-5">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C1A05E]/[0.1] border border-[#C1A05E]/20 rounded-full mb-3">
                                            <Calendar size={12} className="text-[#C1A05E]" />
                                            <span className="text-[11px] text-[#C1A05E] font-bold uppercase tracking-wider">30 min</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">
                                            {t("consultationTitle")}
                                        </h3>
                                        <p className="text-white/35 text-sm leading-relaxed">
                                            {t("consultationDesc")}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-2.5 mb-6">
                                    {(t.raw("benefits") as string[]).map((benefit, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + i * 0.08 }}
                                            className="flex items-center gap-3 px-3.5 py-2.5 bg-white/[0.04] rounded-xl border border-white/[0.06] hover:border-[#C1A05E]/20 transition-colors"
                                        >
                                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#C1A05E]/20 to-[#C1A05E]/10 flex items-center justify-center flex-shrink-0">
                                                <Check size={12} className="text-[#C1A05E]" strokeWidth={3} />
                                            </div>
                                            <span className="text-sm text-white/60 font-medium">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <Button
                                        onClick={handleCTA}
                                        className="w-full h-12 bg-gradient-to-r from-[#C1A05E] to-[#B8A074] hover:from-[#B8A074] hover:to-[#C1A05E] text-white font-bold text-base rounded-xl shadow-xl shadow-[#C1A05E]/15 group relative overflow-hidden transition-all"
                                    >
                                        {/* Shimmer sweep */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                        <span className="relative flex items-center justify-center gap-2">
                                            <Calendar className="w-4.5 h-4.5" />
                                            {t("cta")}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Button>
                                </motion.div>
                            </motion.div>

                            {/* Skip Link */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                onClick={handleClose}
                                className="w-full mt-4 text-xs text-white/25 hover:text-white/40 transition-colors"
                            >
                                {t("noThanks")}
                            </motion.button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
