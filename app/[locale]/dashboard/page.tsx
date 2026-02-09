"use client"

import { useState, useEffect } from "react"
import { AgentStatsCard } from "@/components/agent-portal/stats-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Briefcase,
    DollarSign,
    TrendingUp,
    Building2,
    Wallet,
    FileText,
    ArrowUpRight,
    Sparkles,
    Zap
} from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardPage() {
    const [userName, setUserName] = useState("Investor")

    useEffect(() => {
        const stored = localStorage.getItem("pasiflow_user")
        if (stored) {
            try {
                const user = JSON.parse(stored)
                if (user.fullName) setUserName(user.fullName)
            } catch { /* ignore parse errors */ }
        }
    }, [])
    const stats = [
        { title: "Toplam Portföy", value: "$425,000", icon: Building2, trend: { value: "14.8%", positive: true } },
        { title: "Aylık Kira Geliri", value: "$3,450", icon: Wallet, subtitle: "Net: $2,100" },
        { title: "Toplam Yatırım", value: "$380,000", icon: DollarSign, subtitle: "ROI: %11.2" },
        { title: "Aktif Dosyalar", value: "3", icon: FileText, subtitle: "Tümü Güncel" }
    ]

    const transactions = [
        { title: "Kira Ödemesi", desc: "Miami Apt #4B", amount: "+$3,200", date: "Bugün", type: "income" },
        { title: "Bakım Onarım", desc: "Detroit House - HVAC", amount: "-$150", date: "Dün", type: "expense" },
        { title: "Kira Ödemesi", desc: "Austin Loft", amount: "+$2,100", date: "12 Ocak", type: "income" },
        { title: "Vergi Ödemesi", desc: "Yıllık Emlak Vergisi", amount: "-$850", date: "10 Ocak", type: "expense" }
    ]

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold text-slate-900 tracking-tight"
                    >
                        Hoş Geldiniz, <span className="text-[#C1A05E]">{userName}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 mt-2 font-medium"
                    >
                        Portföy durumunuz ve güncel piyasa verileri aşağıda özetlenmiştir.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-3"
                >
                    <Button
                        variant="outline"
                        className="border-slate-200 text-slate-600 hover:text-[#C1A05E] hover:bg-slate-50 transition-all"
                    >
                        Rapor İndir
                    </Button>
                    <Button className="bg-[#1F2328] text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
                        Yeni Mülk Ekle
                    </Button>
                </motion.div>
            </motion.div>

            {/* Stats Grid - Premium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                    >
                        <AgentStatsCard {...stat} />
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Property Status & Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Status Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900">Kira Durumu</h3>
                            <motion.div
                                animate={{ rotate: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-[#C1A05E]"
                            >
                                <Sparkles size={16} />
                            </motion.div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Ödendi", count: 2, color: "green", icon: "✓" },
                                { label: "Bekleniyor", count: 1, color: "amber", icon: "⏳" },
                                { label: "Gecikmiş", count: 0, color: "red", icon: "!" }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md",
                                        item.color === "green" && "bg-green-50 border-green-100",
                                        item.color === "amber" && "bg-amber-50 border-amber-100",
                                        item.color === "red" && "bg-red-50 border-red-100"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <motion.span
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                                                item.color === "green" && "bg-green-100 text-green-600",
                                                item.color === "amber" && "bg-amber-100 text-amber-600",
                                                item.color === "red" && "bg-red-100 text-red-600"
                                            )}
                                        >
                                            {item.icon}
                                        </motion.span>
                                        <span className="font-medium text-slate-700">{item.label}</span>
                                    </div>
                                    <motion.span
                                        key={item.count}
                                        initial={{ scale: 1.2 }}
                                        animate={{ scale: 1 }}
                                        className="font-bold text-slate-900"
                                    >
                                        {item.count} Mülk
                                    </motion.span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Opportunity Teaser */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="relative overflow-hidden bg-[#1F2328] p-6 rounded-[2rem] text-white cursor-pointer group"
                    >
                        {/* Animated Background */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#C1A05E]/20 to-transparent"
                            animate={{
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C1A05E]/10 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4"
                            >
                                <TrendingUp className="w-6 h-6 text-[#C1A05E]" />
                            </motion.div>
                            <h3 className="text-lg font-bold mb-2">Yeni Fırsat Yakaladık!</h3>
                            <p className="text-slate-400 text-sm mb-6">Detroit'te %16 net ROI getiren off-market bir portföy satışa çıktı.</p>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button className="w-full bg-[#C1A05E] hover:bg-[#a38d5d] text-white font-bold">
                                    <Zap className="w-4 h-4 mr-2" />
                                    İncele
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Transactions Table */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden"
                >
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Son Aktiviteler</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 font-bold hover:text-[#C1A05E] transition-all flex items-center gap-1"
                        >
                            Tümünü Gör
                            <ArrowUpRight size={14} />
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest px-8">
                                    <th className="py-4 px-8">İşlem</th>
                                    <th className="py-4 px-8">Detay</th>
                                    <th className="py-4 px-8 text-right">Tutar</th>
                                    <th className="py-4 px-8 text-right">Tarih</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {transactions.map((item, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                                    >
                                        <td className="py-5 px-8">
                                            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                                <motion.span
                                                    className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        item.type === "income" ? "bg-[#C1A05E]" : "bg-slate-300"
                                                    )}
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                                />
                                                {item.title}
                                            </div>
                                        </td>
                                        <td className="py-5 px-8 text-slate-500 text-sm group-hover:text-slate-700 transition-colors">
                                            {item.desc}
                                        </td>
                                        <td className={cn(
                                            "py-5 px-8 font-bold text-sm text-right transition-colors",
                                            item.type === "income" ? "text-[#C1A05E]" : "text-slate-900 group-hover:text-red-600"
                                        )}>
                                            <motion.span
                                                initial={{ scale: 1 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {item.amount}
                                            </motion.span>
                                        </td>
                                        <td className="py-5 px-8 text-slate-400 text-xs text-right font-medium group-hover:text-slate-600 transition-colors">
                                            {item.date}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
