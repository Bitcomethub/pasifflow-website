"use client"

import { useState, useEffect } from "react"
import { AgentStatsCard } from "@/components/agent-portal/stats-card"
import { AgentTierProgress } from "@/components/agent-portal/tier-progress"
import {
    Users,
    DollarSign,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    Search,
    Bell,
    Sparkles,
    Zap,
    Target
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export default function AgentDashboard() {
    const [agentName, setAgentName] = useState("Agent")
    const [agentInitials, setAgentInitials] = useState("PA")

    useEffect(() => {
        const stored = localStorage.getItem("pasiflow_user")
        if (stored) {
            try {
                const user = JSON.parse(stored)
                if (user.fullName) {
                    setAgentName(user.fullName.split(" ")[0])
                    setAgentInitials(
                        user.fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
                    )
                }
            } catch { /* ignore */ }
        }
    }, [])
    const stats = [
        { title: "Toplam Referans", value: "54", icon: Users, trend: { value: "12%", positive: true } },
        { title: "Toplam Kazanç", value: "$108,000", icon: DollarSign },
        { title: "Aylık Pasif Gelir", value: "$1,458", subtitle: "Canlı (Mgmt %)", icon: TrendingUp, trend: { value: "$210", positive: true } },
        { title: "Yıllık Pasif Gelir", value: "$17,496", subtitle: "Projeksiyon", icon: Calendar }
    ]

    const referrals = [
        { name: "Mustafa K.", properties: 3, status: "Aktif", income: "$40.50/ay" },
        { name: "Selin Y.", properties: 1, status: "Kapanışta", income: "$13.50/ay" },
        { name: "Ahmet B.", properties: 5, status: "Aktif", income: "$67.50/ay" },
        { name: "Deniz T.", properties: 2, status: "Görüşmede", income: "-" }
    ]

    return (
        <>
            {/* Top Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30"
            >
                <div className="flex items-center gap-4 flex-grow max-w-xl">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Referans ara..."
                            className="pl-10 h-10 bg-slate-50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#C1A05E]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <Bell className="w-5 h-5" />
                        <motion.span
                            className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.button>
                    <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">{agentName}</p>
                            <p className="text-xs text-[#C1A05E] font-bold">Elite Agent</p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-10 h-10 rounded-full bg-[#1F2328] flex items-center justify-center text-white font-bold relative"
                        >
                            {agentInitials}
                            <motion.span
                                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#C1A05E] border-2 border-white rounded-full"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            <div className="p-10">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex items-end justify-between"
                >
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-extrabold text-slate-900 tracking-tight"
                        >
                            Hoş Geldiniz, {agentName}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 mt-1 font-medium flex items-center gap-2"
                        >
                            <Sparkles className="w-4 h-4 text-[#C1A05E]" />
                            Bu ayki performansınız harika gidiyor. İşte özet verileriniz.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button className="bg-[#C1A05E] hover:bg-[#a38d5d] text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-[#C1A05E]/20 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Yeni Referans Ekle
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
                    {/* Tier Progress */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <AgentTierProgress currentSales={54} />
                        </motion.div>

                        {/* Commission Tip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ y: -3 }}
                            className="mt-8 p-6 bg-white border border-[#C1A05E]/20 rounded-[2rem] relative overflow-hidden group hover:border-[#C1A05E]/40 transition-all cursor-pointer"
                        >
                            <motion.div
                                className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"
                            >
                                <TrendingUp className="w-32 h-32 text-[#C1A05E]" />
                            </motion.div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-5 h-5 text-[#C1A05E]" />
                                    <h5 className="font-bold text-slate-900">Satışlarınızı Artırın</h5>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                    100 satışa ulaştığınızda %3 pasif gelir oranına hak kazanacaksınız. Bu da aylık bazda yaklaşık $8,100 düzenli gelir demek!
                                </p>
                                <Button variant="link" className="p-0 text-[#C1A05E] font-bold h-auto hover:no-underline flex items-center gap-1">
                                    Akademiye Göz At
                                    <ArrowUpRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Recent Activity / Referrals Table */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-[#C1A05E]" />
                                Son Referanslar
                            </h3>
                            <Button variant="ghost" size="sm" className="text-slate-500 font-bold hover:text-[#C1A05E] flex items-center gap-1">
                                Tümünü Gör
                                <ArrowUpRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest px-8">
                                        <th className="py-4 px-8">Yatırımcı</th>
                                        <th className="py-4 px-8">Mülk Sayısı</th>
                                        <th className="py-4 px-8">Durum</th>
                                        <th className="py-4 px-8">Pasif Gelir</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {referrals.map((ref, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            className="hover:bg-slate-50/50 transition-all cursor-pointer group"
                                        >
                                            <td className="py-5 px-8">
                                                <motion.div
                                                    className="font-bold text-slate-900 text-sm flex items-center gap-2"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#C1A05E]/10 flex items-center justify-center text-[#C1A05E] font-bold text-xs">
                                                        {ref.name.charAt(0)}
                                                    </div>
                                                    {ref.name}
                                                </motion.div>
                                            </td>
                                            <td className="py-5 px-8 text-slate-500 text-sm group-hover:text-slate-700 transition-colors">
                                                {ref.properties} Mülk
                                            </td>
                                            <td className="py-5 px-8">
                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={cn(
                                                        "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1",
                                                        ref.status === "Aktif" && "bg-[#C1A05E]/10 text-[#C1A05E]",
                                                        ref.status === "Kapanışta" && "bg-blue-100 text-blue-700",
                                                        ref.status === "Görüşmede" && "bg-slate-100 text-slate-500"
                                                    )}
                                                >
                                                    {ref.status === "Aktif" && <span className="w-1.5 h-1.5 rounded-full bg-[#C1A05E]" />}
                                                    {ref.status}
                                                </motion.span>
                                            </td>
                                            <td className="py-5 px-8 font-bold text-slate-900 text-sm tracking-tight group-hover:text-[#C1A05E] transition-colors">
                                                {ref.income}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}
