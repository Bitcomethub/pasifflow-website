import { Card } from "@/components/ui/card";
import {
    Building2,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    Clock,
    Briefcase
} from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Tekrar Hoş Geldiniz, <span className="text-blue-600">Demo Kullanıcı</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Portföy durumunuz ve güncel piyasa verileri aşağıda özetlenmiştir.
                </p>
            </div>

            {/* Main Stats Grid - Mimicking Mobile App "Total Portfolio" Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Portfolio Card */}
                <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 relative overflow-hidden border-none shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Toplam Portföy</p>
                                <h2 className="text-4xl md:text-5xl font-bold mt-2">$425,000</h2>
                            </div>
                            <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 font-bold text-sm">+14.8%</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-6 border-t border-slate-700/50">
                            <div>
                                <p className="text-slate-400 text-xs mb-1">Aylık Kira</p>
                                <p className="text-xl font-bold">$3,450</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs mb-1">Net ROI</p>
                                <p className="text-xl font-bold text-cyan-400">11.2%</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs mb-1">Mülkler</p>
                                <p className="text-xl font-bold">3</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions / Status Card */}
                <div className="space-y-6">
                    <Card className="p-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Kira Durumu</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-900/30 text-center">
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">2</p>
                                <p className="text-xs text-green-700 dark:text-green-300 font-medium">Ödendi</p>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl border border-yellow-100 dark:border-yellow-900/30 text-center">
                                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</p>
                                <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium">Bekleniyor</p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 text-center">
                                <p className="text-2xl font-bold text-red-600 dark:text-red-400">0</p>
                                <p className="text-xs text-red-700 dark:text-red-300 font-medium">Gecikmiş</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Yeni Fırsat!</p>
                                <p className="text-xs text-blue-700 dark:text-blue-300">Detroit'te %16 ROI getiren yeni mülk eklendi.</p>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-blue-500 ml-auto" />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Son Aktiviteler</h3>
                <Card className="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                    {[
                        { title: "Kira Ödemesi Alındı", desc: "Miami Apt #4B - John Doe", amount: "+$3,200", date: "Bugün, 09:41", color: "text-green-600" },
                        { title: "Yıllık Bakım Raporu", desc: "Detroit House - Sistem Kontrolü", amount: "-$150", date: "Dün, 14:30", color: "text-slate-600" },
                        { title: "Kira Ödemesi Alındı", desc: "Austin Loft - Sarah Smith", amount: "+$2,100", date: "12 Ocak", color: "text-green-600" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                    {item.amount.startsWith('+') ?
                                        <DollarSign className="w-5 h-5 text-green-600" /> :
                                        <Clock className="w-5 h-5 text-slate-500" />
                                    }
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${item.color}`}>{item.amount}</p>
                                <p className="text-xs text-gray-400">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
}
