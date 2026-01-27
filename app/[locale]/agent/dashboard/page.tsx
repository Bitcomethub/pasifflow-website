"use client"

import { AgentSidebar } from "@/components/agent-portal/sidebar"
import { AgentStatsCard } from "@/components/agent-portal/stats-card"
import { AgentTierProgress } from "@/components/agent-portal/tier-progress"
import {
    Users,
    DollarSign,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    Search,
    Bell
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AgentDashboard() {
    return (
        <div className="flex min-h-screen bg-slate-50/50">
            <AgentSidebar />

            <main className="flex-grow pl-72">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
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
                        <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">Erman Adanır</p>
                                <p className="text-xs text-[#C1A05E] font-bold">Elite Agent</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#1F2328] flex items-center justify-center text-white font-bold">
                                EA
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-10">
                    {/* Welcome Section */}
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hoş Geldiniz, Erman 👋</h1>
                            <p className="text-slate-500 mt-1 font-medium">Bu ayki performansınız harika gidiyor. İşte özet verileriniz.</p>
                        </div>
                        <Button className="bg-[#C1A05E] hover:bg-[#a38d5d] text-white font-bold h-12 px-6 rounded-xl shadow-lg shadow-[#C1A05E]/20">
                            Yeni Referans Ekle
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <AgentStatsCard
                            title="Toplam Referans"
                            value="54"
                            icon={Users}
                            trend={{ value: "12%", positive: true }}
                        />
                        <AgentStatsCard
                            title="Toplam Kazanç"
                            value="$108,000"
                            icon={DollarSign}
                        />
                        <AgentStatsCard
                            title="Aylık Pasif Gelir"
                            value="$1,458"
                            subtitle="Canlı (Mgmt %)"
                            icon={TrendingUp}
                            trend={{ value: "$210", positive: true }}
                        />
                        <AgentStatsCard
                            title="Yıllık Pasif Gelir"
                            value="$17,496"
                            subtitle="Projeksiyon"
                            icon={Calendar}
                        />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Tier Progress */}
                        <div className="lg:col-span-1">
                            <AgentTierProgress currentSales={54} />

                            {/* Commission Tip */}
                            <div className="mt-8 p-6 bg-white border border-[#C1A05E]/20 rounded-[2rem] relative overflow-hidden group hover:border-[#C1A05E]/40 transition-colors">
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <TrendingUp className="w-32 h-32 text-[#C1A05E]" />
                                </div>
                                <h5 className="font-bold text-slate-900 mb-2">Satışlarınızı Artırın</h5>
                                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                                    100 satışa ulaştığınızda %3 pasif gelir oranına hak kazanacaksınız. Bu da aylık bazda yaklaşık $8,100 düzenli gelir demek!
                                </p>
                                <Button variant="link" className="p-0 text-[#C1A05E] font-bold h-auto hover:no-underline">
                                    Akademiye Göz At <ArrowUpRight className="w-4 h-4 ml-1" />
                                </Button>
                            </div>
                        </div>

                        {/* Recent Activity / Referrals Table */}
                        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900">Son Referanslar</h3>
                                <Button variant="ghost" size="sm" className="text-slate-500 font-bold hover:text-[#C1A05E]">
                                    Tümünü Gör
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
                                        {[
                                            { name: "Mustafa K.", properties: 3, status: "Aktif", income: "$40.50/ay" },
                                            { name: "Selin Y.", properties: 1, status: "Kapanışta", income: "$13.50/ay" },
                                            { name: "Ahmet B.", properties: 5, status: "Aktif", income: "$67.50/ay" },
                                            { name: "Deniz T.", properties: 2, status: "Görüşmede", income: "-" },
                                        ].map((ref, i) => (
                                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="py-5 px-8 font-bold text-slate-900 text-sm">{ref.name}</td>
                                                <td className="py-5 px-8 text-slate-500 text-sm">{ref.properties} Mülk</td>
                                                <td className="py-5 px-8">
                                                    <span className={cn(
                                                        "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                                                        ref.status === "Aktif" ? "bg-[#C1A05E]/10 text-[#C1A05E]" :
                                                            ref.status === "Kapanışta" ? "bg-blue-100 text-blue-700" :
                                                                "bg-slate-100 text-slate-500"
                                                    )}>
                                                        {ref.status}
                                                    </span>
                                                </td>
                                                <td className="py-5 px-8 font-bold text-slate-900 text-sm tracking-tight">{ref.income}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
