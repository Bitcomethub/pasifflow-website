"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Calendar, Gift, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslations } from "next-intl"

export function ExitIntentPopup() {
    const t = useTranslations("exitPopup")
    const [showPopup, setShowPopup] = useState(false)
    const [hasTriggered, setHasTriggered] = useState(false)

    useEffect(() => {
        // Check if already shown in this session
        const alreadyShown = sessionStorage.getItem("exitPopupShown")
        if (alreadyShown) {
            setHasTriggered(true)
            return
        }

        const handleMouseLeave = (e: MouseEvent) => {
            // Trigger only when mouse moves to top of viewport (exit intent)
            if (e.clientY <= 5 && !hasTriggered) {
                setShowPopup(true)
                setHasTriggered(true)
                sessionStorage.setItem("exitPopupShown", "true")
            }
        }

        // Only add listener after a delay (don't show immediately)
        const timer = setTimeout(() => {
            document.addEventListener("mouseleave", handleMouseLeave)
        }, 5000) // Wait 5 seconds before enabling

        return () => {
            clearTimeout(timer)
            document.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [hasTriggered])

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
                    <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/5 hover:bg-black/10 text-gray-500 hover:text-gray-700 transition-colors z-50"
                        >
                            <X size={18} />
                        </button>

                        {/* Header with gradient */}
                        <div className="bg-gradient-to-br from-[#3D4852] via-[#3D4852] to-[#1A1A1A] p-6 text-white text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.1 }}
                                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
                            >
                                <Gift className="w-8 h-8 text-white" />
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-bold mb-2"
                            >
                                {t("title")}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/80 text-sm"
                            >
                                {t("subtitle")}
                            </motion.p>
                        </div>

                        {/* Content */}
                        <div className="p-6 bg-white">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t("consultationTitle")}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {t("consultationDesc")}
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                                {(t.raw("benefits") as string[]).map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="flex items-center gap-3 text-sm text-gray-700"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        {benefit}
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Button
                                onClick={handleCTA}
                                className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold text-base rounded-xl shadow-lg shadow-accent/20 group"
                            >
                                <Calendar className="w-5 h-5 mr-2" />
                                {t("cta")}
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            {/* Skip Link */}
                            <button
                                onClick={handleClose}
                                className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {t("noThanks")}
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}
