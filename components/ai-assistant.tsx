"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Minimize2, Maximize2, Sparkles, MessageCircle, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Message {
    role: "user" | "assistant"
    content: string
}

export function AIAssistant() {
    const t = useTranslations("aiAssistant")
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasGreeted, setHasGreeted] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Initial greeting
    useEffect(() => {
        if (isOpen && !hasGreeted) {
            setMessages([
                {
                    role: "assistant",
                    content: t("greeting")
                }
            ])
            setHasGreeted(true)
        }
    }, [isOpen, hasGreeted, t])

    // Auto-scroll
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

            if (data.role) {
                setMessages((prev) => [...prev, data])
            } else {
                setMessages((prev) => [...prev, { role: "assistant", content: data.error || "Error" }])
            }
        } catch (error) {
            setMessages((prev) => [...prev, { role: "assistant", content: "Connection error." }])
        } finally {
            setIsLoading(false)
        }
    }

    // Colors
    const COLORS = {
        userBubble: "bg-[#3D4852] text-white",
        aiBubble: "bg-white text-[#3D4852] shadow-sm",
        windowBg: "bg-[#F8F9FA]",
        headerBg: "bg-gradient-to-r from-[#1F2328] to-[#3D4852]",
        headerText: "text-white",
        inputBg: "bg-white border border-slate-200",
        primary: "#3D4852",
    }

    return (
        <div className={cn(
            "fixed z-[100] flex flex-col pointer-events-none",
            isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
        )}>
            <div className="pointer-events-auto">
                <AnimatePresence>
                    {isOpen && !isMinimized && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={cn(
                                "mb-4 border border-slate-200 shadow-2xl overflow-hidden flex flex-col font-sans",
                                isMobile ? "w-[90vw] max-w-[360px]" : "w-[360px] sm:w-[400px]",
                                COLORS.windowBg
                            )}
                        >
                            {/* Header */}
                            <div className={cn("px-4 py-3 border-b border-white/10 flex items-center justify-between", COLORS.headerBg)}>
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring" }}
                                        className="relative"
                                    >
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#B8A074]">
                                            <Image
                                                src="/pasi-avatar-new.png"
                                                alt="AI"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#B8A074] border-2 border-white rounded-full"
                                        />
                                    </motion.div>
                                    <div>
                                        <motion.h3
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn("font-semibold text-sm", COLORS.headerText)}
                                        >
                                            {t("title")}
                                        </motion.h3>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex items-center gap-1.5"
                                        >
                                            <Zap size={10} className="text-[#B8A074]" />
                                            <span className="text-xs text-white/70 font-medium">
                                                {t("online")}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white/70 hover:bg-white/10 rounded-lg"
                                        onClick={() => setIsMinimized(true)}
                                    >
                                        <Minimize2 size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white/70 hover:bg-white/10 rounded-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X size={18} />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div
                                ref={scrollRef}
                                className={cn(
                                    "overflow-y-auto p-4 space-y-4",
                                    isMobile ? "h-[50vh]" : "h-[400px]"
                                )}
                            >
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "flex w-full items-end gap-2",
                                            msg.role === "user" ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        {msg.role === "assistant" && (
                                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-1">
                                                <Image
                                                    src="/pasi-avatar-new.png"
                                                    alt="AI"
                                                    width={24}
                                                    height={24}
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                                                msg.role === "user"
                                                    ? cn(COLORS.userBubble, "rounded-tr-none")
                                                    : cn(COLORS.aiBubble, "rounded-tl-none")
                                            )}
                                        >
                                            {msg.content.split('[PASI_ICON]').map((part, idx) => (
                                                <span key={idx}>{part}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex justify-start gap-2"
                                    >
                                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src="/pasi-avatar-new.png"
                                                alt="AI"
                                                width={24}
                                                height={24}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className={cn(COLORS.aiBubble, "rounded-2xl rounded-tl-none px-4 py-3")}>
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75" />
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className={cn("p-3 border-t border-slate-200", COLORS.inputBg)}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={cn("flex items-center gap-2 rounded-xl px-3 py-2", COLORS.inputBg)}
                                >
                                    <Input
                                        className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-sm placeholder:text-slate-400"
                                        placeholder={t("inputPlaceholder")}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    />
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            size="icon"
                                            className="h-9 w-9 rounded-lg bg-[#3D4852] hover:bg-[#2D353F] text-white flex-shrink-0"
                                            onClick={handleSend}
                                            disabled={isLoading}
                                        >
                                            <Send size={16} />
                                        </Button>
                                    </motion.div>
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-[10px] text-slate-400 font-medium text-center mt-2"
                                >
                                    {t("poweredBy")}
                                </motion.p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Trigger Button */}
                <div className="flex flex-col items-end gap-2">
                    <AnimatePresence>
                        {isMinimized && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => setIsMinimized(false)}
                                className="bg-gradient-to-r from-[#3D4852] to-[#1F2328] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer hover:shadow-xl transition-shadow"
                            >
                                <Maximize2 size={14} />
                                <span className="text-sm font-medium">{t("advisorActive")}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isOpen && !isMinimized && (
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            aria-label="Open AI assistant"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "rounded-full bg-gradient-to-r from-[#3D4852] to-[#1F2328] shadow-xl flex items-center justify-center text-white relative group border border-white/10",
                                isMobile ? "w-12 h-12" : "w-14 h-14"
                            )}
                        >
                            <div className="absolute inset-0 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors" />
                            <MessageCircle size={isMobile ? 24 : 28} />

                            {/* Notification Badge */}
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#3D4852] rounded-full flex items-center justify-center"
                            >
                                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                            </motion.span>

                            {/* Pulse Effect */}
                            <motion.span
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 rounded-full bg-[#B8A074] opacity-0"
                            />
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    )
}
