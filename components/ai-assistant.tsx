"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Loader2, Minimize2, Maximize2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Message {
    role: "user" | "assistant"
    content: string
}

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasGreeted, setHasGreeted] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-greeting when site opens
    useEffect(() => {
        if (!hasGreeted) {
            const timer = setTimeout(() => {
                setIsOpen(true)
                setMessages([
                    {
                        role: "assistant",
                        content: "Merhaba, Pasiflow’a hoş geldiniz. Ben Pasi, akıllı yatırım danışmanınız. ABD gayrimenkul yatırımlarıyla ilgili sorularınızı yanıtlamak ve sizi adım adım yönlendirmek için buradayım. Size nasıl yardımcı olabilirim?"
                    }
                ])
                setHasGreeted(true)
            }, 4000)
            return () => clearTimeout(timer)
        }
    }, [hasGreeted])

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
                                    <div className="relative">
                                        <motion.div
                                            animate={{ rotate: [0, -5, 5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        >
                                            <Image
                                                src="/pasi-mascot.png"
                                                alt="Pasi"
                                                width={40}
                                                height={40}
                                                className="rounded-full border-2 border-[#EF7202]"
                                            />
                                        </motion.div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#001C32] rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-tight">Pasi | Akıllı Danışman</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
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
                                        "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed",
                                        msg.role === "user"
                                            ? "bg-slate-900 text-white rounded-br-md"
                                            : "bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-md"
                                    )}>
                                        {msg.content}
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
                {/* Pasi Welcome Speech Bubble (If closed) */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="relative max-w-[320px]"
                        >
                            {/* Speech Bubble */}
                            <div
                                className="bg-white rounded-2xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-slate-100 p-5 cursor-pointer hover:shadow-[0_25px_70px_-12px_rgba(0,0,0,0.3)] transition-shadow"
                                onClick={() => {
                                    setIsOpen(true)
                                    setIsMinimized(false)
                                }}
                            >
                                {/* Header with Avatar */}
                                <div className="flex items-start gap-3 mb-4">
                                    <motion.div
                                        className="relative flex-shrink-0"
                                        animate={{ rotate: [0, -8, 8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
                                    >
                                        <Image
                                            src="/pasi-mascot.png"
                                            alt="Pasi"
                                            width={48}
                                            height={48}
                                            className="rounded-full border-2 border-[#EF7202] shadow-lg"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                                    </motion.div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#001C32]">Pasi</span>
                                            <span className="text-xs bg-[#EF7202]/10 text-[#EF7202] px-2 py-0.5 rounded-full font-medium">AI Danışman</span>
                                        </div>
                                        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                                            Merhaba! Ben <strong>Pasi</strong> 🦉 <br />
                                            ABD gayrimenkul yatırımları hakkında size yardımcı olmak için buradayım!
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="space-y-2">
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Hızlı Sorular</p>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            className="text-xs bg-slate-100 hover:bg-[#EF7202] hover:text-white text-slate-600 px-3 py-1.5 rounded-full transition-colors font-medium"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setIsOpen(true)
                                                setInput("Section 8 nedir?")
                                            }}
                                        >
                                            Section 8 nedir?
                                        </button>
                                        <button
                                            className="text-xs bg-slate-100 hover:bg-[#EF7202] hover:text-white text-slate-600 px-3 py-1.5 rounded-full transition-colors font-medium"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setIsOpen(true)
                                                setInput("Getiri oranları nedir?")
                                            }}
                                        >
                                            Getiri oranları
                                        </button>
                                        <button
                                            className="text-xs bg-slate-100 hover:bg-[#EF7202] hover:text-white text-slate-600 px-3 py-1.5 rounded-full transition-colors font-medium"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setIsOpen(true)
                                                setInput("Neden Detroit?")
                                            }}
                                        >
                                            Neden Detroit?
                                        </button>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-4 pt-3 border-t border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-400">Tıklayarak sohbete başla</span>
                                        <ArrowRight size={14} className="text-[#EF7202]" />
                                    </div>
                                </div>
                            </div>

                            {/* Speech Bubble Tail */}
                            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-slate-100 transform rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button with Pasi Mascot */}
                <motion.button
                    onClick={() => {
                        setIsOpen(true)
                        setIsMinimized(false)
                    }}
                    className="relative w-16 h-16 rounded-full shadow-[0_8px_30px_-4px_rgba(239,114,2,0.4)] bg-gradient-to-br from-[#EF7202] to-[#d86502] text-white transition-all duration-300 hover:scale-110 overflow-hidden border-2 border-white/20"
                    animate={{
                        y: [0, -6, 0],
                        boxShadow: [
                            "0 8px 30px -4px rgba(239,114,2,0.4)",
                            "0 12px 40px -4px rgba(239,114,2,0.6)",
                            "0 8px 30px -4px rgba(239,114,2,0.4)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
                            className="object-cover p-0.5"
                        />
                    )}
                    {/* Notification Badge */}
                    {!isOpen && (
                        <motion.div
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
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
