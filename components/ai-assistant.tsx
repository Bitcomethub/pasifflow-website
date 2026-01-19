"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2, Minimize2, Maximize2, Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
                        content: "Merhaba, Pasiflow'a hoş geldiniz. Ben yatırım danışmanınız. ABD gayrimenkul yatırımlarıyla ilgili sorularınızı yanıtlamak için buradayım. Size nasıl yardımcı olabilirim?"
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
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const response = await fetch(`${baseUrl}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            })

            const data = await response.json()
            if (data.role) {
                setMessages((prev) => [...prev, data])
            } else {
                throw new Error(data.error || "Yanıt alınamadı")
            }
        } catch (error) {
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
                        {/* Premium Header */}
                        <div className="px-5 py-4 bg-slate-900 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                            <Briefcase size={20} className="text-white" />
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-tight">Yatırım Danışmanı</h3>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                            <span className="text-xs text-slate-400 font-medium">Çevrimiçi</span>
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
                {/* Entrance Badge (If closed) */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-900 px-5 py-3 rounded-xl shadow-xl text-white mb-2 flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors"
                        onClick={() => {
                            setIsOpen(true)
                            setIsMinimized(false)
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-sm font-semibold">Yatırım danışmanınız hazır</span>
                        </div>
                        <ArrowRight size={14} className="text-white/60" />
                    </motion.div>
                )}

                {/* Toggle Button */}
                <Button
                    onClick={() => {
                        setIsOpen(true)
                        setIsMinimized(false)
                    }}
                    className="w-14 h-14 rounded-full shadow-[0_8px_30px_-4px_rgba(15,23,42,0.3)] bg-slate-900 hover:bg-slate-800 text-white transition-all duration-300 hover:scale-105"
                >
                    {isOpen && !isMinimized ? <X size={22} /> : <MessageCircle size={22} />}
                </Button>
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
