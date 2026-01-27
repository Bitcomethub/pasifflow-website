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
    ArrowUpRight
} from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Hoş Geldiniz, <span className="text-[#C1A05E]">Demo Client</span> 👋
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">
                        Portföy durumunuz ve güncel piyasa verileri aşağıda özetlenmiştir.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-slate-200 text-slate-600 hover:text-[#C1A05E] hover:bg-slate-50">
                        Rapor İndir
                    </Button>
                    <Button className="bg-[#1F2328] text-white hover:bg-slate-800">
                        Yeni Mülk Ekle
                    </Button>
                </div>
            </div>

            {/* Stats Grid - Premium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AgentStatsCard
                    title="Toplam Portföy"
                    value="$425,000"
                    icon={Building2}
                    trend={{ value: "14.8%", positive: true }}
                />
                <AgentStatsCard
                    title="Aylık Kira Geliri"
                    value="$3,450"
                    icon={Wallet}
                    subtitle="Net: $2,100"
                />
                <AgentStatsCard
                    title="Toplam Yatırım"
                    value="$380,000"
                    icon={DollarSign}
                    subtitle="ROI: %11.2"
                />
                <AgentStatsCard
                    title="Aktif Dosyalar"
                    value="3"
                    icon={FileText}
                    subtitle="Tümü Güncel"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Property Status & Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Status Card */}
                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-6">Kira Durumu</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="font-medium text-slate-700">Ödendi</span>
                                </div>
                                <span className="font-bold text-slate-900">2 Mülk</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                                    <span className="font-medium text-slate-700">Bekleniyor</span>
                                </div>
                                <span className="font-bold text-slate-900">1 Mülk</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <span className="font-medium text-slate-700">Gecikmiş</span>
                                </div>
                                <span className="font-bold text-slate-900">0 Mülk</span>
                            </div>
                        </div>
                    </div>

                    {/* Opportunity Teaser */}
                    <div className="relative overflow-hidden bg-[#1F2328] p-6 rounded-[2rem] text-white">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-[#C1A05E]" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Yeni Fırsat Yakaladık!</h3>
                            <p className="text-slate-400 text-sm mb-6">Detroit'te %16 net ROI getiren off-market bir portföy satışa çıktı.</p>
                            <Button className="w-full bg-[#C1A05E] hover:bg-[#a38d5d] text-white font-bold">
                                İncele
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Son Aktiviteler</h3>
                        <Button variant="ghost" size="sm" className="text-slate-500 font-bold hover:text-[#C1A05E]">
                            Tümünü Gör
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
                                {[
                                    { title: "Kira Ödemesi", desc: "Miami Apt #4B", amount: "+$3,200", date: "Bugün", type: "income" },
                                    { title: "Bakım Onarım", desc: "Detroit House - HVAC", amount: "-$150", date: "Dün", type: "expense" },
                                    { title: "Kira Ödemesi", desc: "Austin Loft", amount: "+$2,100", date: "12 Ocak", type: "income" },
                                    { title: "Vergi Ödemesi", desc: "Yıllık Emlak Vergisi", amount: "-$850", date: "10 Ocak", type: "expense" },
                                ].map((item, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-5 px-8">
                                            <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                                        </td>
                                        <td className="py-5 px-8 text-slate-500 text-sm">{item.desc}</td>
                                        <td className={cn("py-5 px-8 font-bold text-sm text-right", item.type === "income" ? "text-[#C1A05E]" : "text-slate-900")}>
                                            {item.amount}
                                        </td>
                                        <td className="py-5 px-8 text-slate-400 text-xs text-right font-medium">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
