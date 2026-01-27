

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Minimize2, Maximize2, Sparkles, MessageCircle } from "lucide-react"
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
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasGreeted, setHasGreeted] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

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

    // New Design System Colors
    const COLORS = {
        userBubble: "bg-[#2E3A4D] text-white", // Slate Navy
        aiBubble: "bg-[#E8EAED] text-[#1E2633]", // Soft Gray / Deep Charcoal
        windowBg: "bg-[#F5F6F8]",
        headerBg: "bg-white",
        headerText: "text-[#1E2633]",
        inputBg: "bg-[#E8EAED]",
        primary: "#2E3A4D",
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
            <div className="pointer-events-auto">
                <AnimatePresence>
                    {isOpen && !isMinimized && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={cn(
                                "mb-4 w-[360px] sm:w-[400px] border border-[#E8EAED] shadow-xl rounded-xl overflow-hidden flex flex-col font-sans",
                                COLORS.windowBg
                            )}
                        >
                            {/* Header */}
                            <div className="px-4 py-3 bg-[#C1A05E] border-b border-[#C1A05E]/20 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E8EAED]">
                                            <Image
                                                src="/pasi-avatar-new.png"
                                                alt="AI"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#B8A074] border-2 border-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <h3 className={cn("font-semibold text-sm text-white")}>
                                            {t("title")}
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <Sparkles size={10} className="text-white" />
                                            <span className="text-xs text-white/80 font-medium">
                                                {t("online")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white/80 hover:bg-white/10 rounded-lg"
                                        onClick={() => setIsMinimized(true)}
                                    >
                                        <Minimize2 size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-white/80 hover:bg-white/10 rounded-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <X size={18} />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div
                                ref={scrollRef}
                                className="h-[400px] overflow-y-auto p-4 space-y-4"
                            >
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
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
                                                />
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                "max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed",
                                                msg.role === "user"
                                                    ? cn(COLORS.userBubble, "rounded-tr-none")
                                                    : cn(COLORS.aiBubble, "rounded-tl-none")
                                            )}
                                        >
                                            {msg.content.split('[PASI_ICON]').map((part, idx) => (
                                                <span key={idx}>{part}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start gap-2">
                                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                            <Image
                                                src="/pasi-avatar-new.png"
                                                alt="AI"
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                        <div className={cn(COLORS.aiBubble, "rounded-lg rounded-tl-none px-4 py-3")}>
                                            <div className="flex gap-1.5">
                                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75" />
                                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white border-t border-[#E8EAED]">
                                <div className={cn("flex items-center gap-2 rounded-lg px-2 py-1", COLORS.inputBg)}>
                                    <Input
                                        className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-sm placeholder:text-muted-foreground/70"
                                        placeholder={t("inputPlaceholder")}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    />
                                    <Button
                                        size="icon"
                                        className="h-8 w-8 rounded-md bg-[#2E3A4D] hover:bg-[#1E2633] text-white flex-shrink-0"
                                        onClick={handleSend}
                                        disabled={isLoading}
                                    >
                                        <Send size={14} />
                                    </Button>
                                </div>
                                <div className="text-center mt-2 text-[10px] text-muted-foreground/60">
                                    Powered by Pasiflow AI
                                </div>
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
                                className="bg-[#2E3A4D] text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer hover:bg-[#1E2633] transition-colors"
                            >
                                <Maximize2 size={14} />
                                <span className="text-sm font-medium">{t("advisorActive")}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isOpen && !isMinimized && (
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 rounded-full bg-[#2E3A4D] hover:bg-[#1E2633] shadow-lg flex items-center justify-center text-white relative group border border-white/10"
                        >
                            <div className="absolute inset-0 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors" />
                            <MessageCircle size={28} />

                            {/* Notification Badge */}
                            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#2E3A4D] rounded-full"></span>
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    )
}

