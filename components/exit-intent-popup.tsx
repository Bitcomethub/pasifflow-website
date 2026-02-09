"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Calendar, Gift, ArrowRight, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

export function ExitIntentPopup() {
    const t = useTranslations("exitPopup")
    const [showPopup, setShowPopup] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if mobile
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

        // For mobile - show after scrolling 50% of page and before leaving
        const handleScroll = () => {
            if (isMobile && !hasTriggered) {
                const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
                if (scrollPercentage > 0.5) {
                    // Add scroll exit detection
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

        // Only add mouse listener for desktop after delay
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
                    <DialogContent className="w-[95%] sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
                        {/* Animated Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2328] via-[#2D353F] to-[#1F2328]" />
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#B8A074]/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#3D4852]/30 rounded-full blur-3xl" />

                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={handleClose}
                            aria-label="Close popup"
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50"
                        >
                            <X size={18} />
                        </motion.button>

                        {/* Header */}
                        <div className="relative p-6 sm:p-8 text-center">
                            <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 0.1 }}
                                className="w-16 h-16 bg-[#B8A074]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#B8A074]/30"
                            >
                                <Gift className="w-8 h-8 text-[#B8A074]" />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                            >
                                {t("title")}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/70 text-sm"
                            >
                                {t("subtitle")}
                            </motion.p>
                        </div>

                        {/* Content */}
                        <div className="relative p-5 sm:p-6 bg-white/95 backdrop-blur-sm">
                            <div className="text-center mb-5">
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg font-semibold text-gray-900 mb-2"
                                >
                                    {t("consultationTitle")}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-gray-600 text-sm leading-relaxed"
                                >
                                    {t("consultationDesc")}
                                </motion.p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                                {(t.raw("benefits") as string[]).map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                        className="flex items-center gap-3 text-sm text-gray-700"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                                            className="w-6 h-6 rounded-full bg-[#B8A074]/10 flex items-center justify-center flex-shrink-0"
                                        >
                                            <svg className="w-3.5 h-3.5 text-[#B8A074]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                        <span>{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <Button
                                    onClick={handleCTA}
                                    className="w-full h-12 bg-[#B8A074] hover:bg-[#a38d5d] text-white font-semibold text-base rounded-xl shadow-xl shadow-[#B8A074]/20 group"
                                >
                                    <Calendar className="w-5 h-5 mr-2" />
                                    {t("cta")}
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>

                            {/* Skip Link */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                                onClick={handleClose}
                                className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
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
