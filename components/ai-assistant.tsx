"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Loader2, Minimize2, Maximize2, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Message {
    role: "user" | "assistant"
    content: string
}

// Proactive hook messages to engage visitors
const HOOK_MESSAGES = [
    { text: "Detroit'te %12 getiri sağlayan mülkler var, görmek ister misiniz? 🏠", delay: 8000 },
    { text: "Section 8 ile devlet garantili kira almak ister misiniz? 💰", delay: 15000 },
    { text: "100.000$'a ABD'de mülk sahibi olabileceğinizi biliyor muydunuz?", delay: 25000 },
    { text: "Türkiye'den uzaktan yönetilen mülkler hakkında bilgi almak ister misiniz?", delay: 40000 },
    { text: "Size özel yatırım analizi hazırlayalım mı? 📊", delay: 60000 },
]

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasGreeted, setHasGreeted] = useState(false)
    const [currentHookIndex, setCurrentHookIndex] = useState(0)
    const [showHookBubble, setShowHookBubble] = useState(false)
    const [hookMessage, setHookMessage] = useState("")
    const [isShaking, setIsShaking] = useState(false)
    const [dismissedHook, setDismissedHook] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Initial popup after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen && !dismissedHook) {
                setShowHookBubble(true)
                setHookMessage(HOOK_MESSAGES[0].text)
                setIsShaking(true)
                setTimeout(() => setIsShaking(false), 1000)
            }
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    // Proactive hook system - shows new messages periodically
    useEffect(() => {
        if (isOpen || dismissedHook) return

        const showNextHook = () => {
            const nextIndex = (currentHookIndex + 1) % HOOK_MESSAGES.length
            setCurrentHookIndex(nextIndex)
            setHookMessage(HOOK_MESSAGES[nextIndex].text)
            setShowHookBubble(true)
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 1000)
        }

        // Show a new hook message every 20 seconds if not engaged
        const interval = setInterval(showNextHook, 20000)
        return () => clearInterval(interval)
    }, [isOpen, currentHookIndex, dismissedHook])

    // Full chat greeting when opened
    useEffect(() => {
        if (isOpen && !hasGreeted) {
            setMessages([
                {
                    role: "assistant",
                    content: "Merhaba! Ben Pasi, Pasiflow'un akıllı yatırım danışmanı. [PASI_ICON]\n\nABD gayrimenkul yatırımları, Detroit piyasası, Section 8 programı veya yatırım getirisi hesaplamaları hakkında tüm sorularınızı yanıtlamak için buradayım.\n\nSize nasıl yardımcı olabilirim?"
                }
            ])
            setHasGreeted(true)
            setShowHookBubble(false)
        }
    }, [isOpen, hasGreeted])

    // Scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = { role: "user", content: input }
        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            })

            const data = await response.json()

            if (data.debug) {
                console.log("AI Assistant Debug:", data.debug)
            }

            if (data.role) {
                setMessages((prev) => [...prev, data])
            } else {
                const errorMsg = data.error || "Yanıt alınamadı"
                setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }])
            }
        } catch (error: any) {
            console.error("AI Assistant Error:", error)
            setMessages((prev) => [...prev, { role: "assistant", content: "Bağlantıda bir sorun oluştu. Lütfen tekrar deneyin." }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleHookClick = (question?: string) => {
        setIsOpen(true)
        setIsMinimized(false)
        setShowHookBubble(false)
        if (question) {
            setInput(question)
        }
    }

    const dismissHookBubble = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowHookBubble(false)
        setDismissedHook(true)
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="mb-4 w-[380px] sm:w-[420px] bg-white border border-slate-200 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden flex flex-col"
                    >
                        {/* Premium Header with Pasi Mascot */}
                        <div className="px-5 py-4 bg-gradient-to-r from-[#001C32] to-[#002a4a] text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative group cursor-pointer">
                                        {/* Breathing and floating animation */}
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                rotate: [0, -5, 5, 0],
                                                y: [0, -3, 0]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="relative z-10"
                                        >
                                            <Image
                                                src={isLoading ? "/pasi-typing.png" : "/pasi-idle.png"}
                                                alt="Pasi"
                                                width={40}
                                                height={40}
                                                className="rounded-full border-2 border-[#EF7202] shadow-lg"
                                            />
                                        </motion.div>

                                        {/* Glowing ripple effect behind */}
                                        <motion.div
                                            className="absolute inset-0 bg-[#EF7202] rounded-full -z-0"
                                            animate={{
                                                scale: [1, 1.4, 1],
                                                opacity: [0.3, 0, 0.3]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />

                                        {/* Online status indicator */}
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-primary border-2 border-[#001C32] rounded-full z-20 shadow-sm">
                                            <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-tight">Pasi | Akıllı Danışman</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                            <span className="text-xs text-[#EF7202] font-medium">Çevrimiçi</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                                        onClick={() => setIsMinimized(true)}
                                    >
                                        <Minimize2 size={14} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-grow h-[340px] p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-50 to-white"
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                                    <div className={cn(
                                        "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-line",
                                        msg.role === "user"
                                            ? "bg-slate-900 text-white rounded-br-md"
                                            : "bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-md"
                                    )}>
                                        {msg.content.split('[PASI_ICON]').map((part, idx, arr) => (
                                            <span key={idx}>
                                                {part}
                                                {idx < arr.length - 1 && (
                                                    <Image
                                                        src="/pasi-idle.png"
                                                        alt="Pasi"
                                                        width={20}
                                                        height={20}
                                                        className="inline-block align-middle mx-1 rounded-full"
                                                    />
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md p-4 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                            </div>
                                            <span className="text-xs text-slate-400 font-medium">Yazıyor</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-slate-100">
                            <div className="flex items-center gap-2">
                                <Input
                                    className="flex-1 h-11 bg-slate-50 border-slate-200 rounded-xl focus:border-slate-400 focus:ring-slate-400/20 text-sm font-medium placeholder:text-slate-400"
                                    placeholder="Mesajınızı yazın..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />
                                <Button
                                    size="icon"
                                    className="bg-slate-900 hover:bg-slate-800 text-white h-11 w-11 rounded-xl flex-shrink-0 shadow-lg shadow-slate-900/20"
                                    onClick={handleSend}
                                    disabled={isLoading}
                                >
                                    <Send size={16} />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col items-end gap-3">
                {/* Proactive Hook Bubble - Pops out with engaging questions */}
                <AnimatePresence>
                    {showHookBubble && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, x: 50, y: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                            }}
                            exit={{ opacity: 0, scale: 0.8, x: 30 }}
                            transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            className="relative max-w-[300px]"
                        >
                            {/* Animated Glow Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#EF7202] to-[#ff9a3c] rounded-2xl blur-xl opacity-30"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Speech Bubble */}
                            <div
                                className="relative bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(239,114,2,0.4)] border-2 border-[#EF7202]/20 p-4 cursor-pointer hover:shadow-[0_25px_70px_-12px_rgba(239,114,2,0.5)] transition-all hover:scale-[1.02]"
                                onClick={() => handleHookClick()}
                            >
                                {/* Close button */}
                                <button
                                    onClick={dismissHookBubble}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-slate-200 hover:bg-slate-300 rounded-full flex items-center justify-center text-slate-500 transition-colors z-10"
                                >
                                    <X size={12} />
                                </button>

                                {/* Sparkle badge */}
                                <motion.div
                                    className="absolute -top-3 -left-2 bg-gradient-to-r from-[#EF7202] to-[#ff9a3c] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"
                                    animate={{ rotate: [-3, 3, -3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Sparkles size={10} />
                                    YENİ
                                </motion.div>

                                {/* Content */}
                                <div className="flex items-start gap-3">
                                    <motion.div
                                        animate={{
                                            rotate: [0, -10, 10, -10, 0],
                                            y: [0, -3, 0]
                                        }}
                                        transition={{ duration: 0.5, repeat: 3, repeatDelay: 2 }}
                                    >
                                        <Image
                                            src="/pasi-mascot.png"
                                            alt="Pasi"
                                            width={44}
                                            height={44}
                                            className="rounded-full border-2 border-[#EF7202] shadow-lg flex-shrink-0"
                                        />
                                    </motion.div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-[#001C32] text-sm">Pasi</span>
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                        </div>
                                        <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                            {hookMessage}
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Action */}
                                <motion.div
                                    className="mt-3 pt-3 border-t border-slate-100"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <button
                                        className="w-full bg-gradient-to-r from-[#EF7202] to-[#ff9a3c] text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:shadow-lg hover:shadow-[#EF7202]/30 transition-all flex items-center justify-center gap-2"
                                        onClick={() => handleHookClick()}
                                    >
                                        Daha Fazla Bilgi Al
                                        <ArrowRight size={14} />
                                    </button>
                                </motion.div>
                            </div>

                            {/* Speech Bubble Tail */}
                            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-[#EF7202]/20 transform rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button with Pasi Mascot - Now with shake animation */}
                <motion.button
                    onClick={() => handleHookClick()}
                    className="relative w-16 h-16 rounded-full shadow-[0_8px_30px_-4px_rgba(239,114,2,0.4)] bg-gradient-to-br from-[#EF7202] to-[#d86502] text-white transition-all duration-300 hover:scale-110 border-2 border-white/20"
                    animate={isShaking ? {
                        rotate: [0, -15, 15, -15, 15, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
                    } : {
                        y: [0, -6, 0],
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            "0 8px 30px -4px rgba(239,114,2,0.4)",
                            "0 12px 40px -4px rgba(239,114,2,0.6)",
                            "0 8px 30px -4px rgba(239,114,2,0.4)"
                        ]
                    }}
                    transition={isShaking ? { duration: 0.5 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isOpen && !isMinimized ? (
                        <X size={24} className="absolute inset-0 m-auto" />
                    ) : (
                        <Image
                            src="/pasi-mascot.png"
                            alt="Pasi"
                            fill
                            className="object-cover p-0.5 rounded-full"
                        />
                    )}
                    {/* Animated Notification Badge */}
                    {!isOpen && (
                        <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white"
                            animate={{
                                scale: [1, 1.3, 1],
                                boxShadow: [
                                    "0 0 0 0 rgba(239, 68, 68, 0.4)",
                                    "0 0 0 8px rgba(239, 68, 68, 0)",
                                    "0 0 0 0 rgba(239, 68, 68, 0)"
                                ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            1
                        </motion.div>
                    )}
                </motion.button>
            </div>

            {/* Mini Bar if Minimized */}
            <AnimatePresence>
                {isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => setIsMinimized(false)}
                        className="fixed bottom-24 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-sm font-semibold">Danışman Aktif</span>
                        <Maximize2 size={14} className="ml-1 text-white/60" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
