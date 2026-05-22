"use client"

import { motion } from "framer-motion"
import {
    PlayCircle,
    BookOpen,
    Award,
    FileText,
    ChevronRight,
    Clock,
    GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Module = {
    id: string
    title: string
    description: string
    duration: string
    level: "Başlangıç" | "Orta" | "İleri"
    locked: boolean
}

const MODULES: Module[] = [
    {
        id: "us-market-101",
        title: "ABD Gayrimenkul Piyasasına Giriş",
        description: "Detroit, Cleveland ve Section 8 piyasalarında temel kavramlar, terminoloji ve yatırımcı profili.",
        duration: "45 dk",
        level: "Başlangıç",
        locked: false,
    },
    {
        id: "llc-formation",
        title: "LLC Kurulumu ve Vergi Avantajları",
        description: "Wyoming ve Delaware LLC kurulum süreci, EIN, ITIN ve uluslararası yatırımcı için vergi optimizasyonu.",
        duration: "60 dk",
        level: "Başlangıç",
        locked: false,
    },
    {
        id: "section-8",
        title: "Section 8 Sistemi ve Garantili Kira",
        description: "HUD kira garantisi, kiracı yerleştirme ve devlet ödeme süreçleri.",
        duration: "30 dk",
        level: "Orta",
        locked: false,
    },
    {
        id: "due-diligence",
        title: "Due Diligence ve Mülk Değerlemesi",
        description: "ARV, BPO, ROI hesaplamaları, kapanış öncesi kontrol listesi.",
        duration: "50 dk",
        level: "Orta",
        locked: false,
    },
    {
        id: "closing-flow",
        title: "Title, Escrow ve Kapanış Süreci",
        description: "Wire transfer, title sigortası, deed kayıt süreci adım adım.",
        duration: "40 dk",
        level: "İleri",
        locked: true,
    },
    {
        id: "sales-mastery",
        title: "Türk Yatırımcıya Satış Sanatı",
        description: "İtiraz yönetimi, kapanış teknikleri ve referans ağı oluşturma.",
        duration: "75 dk",
        level: "İleri",
        locked: true,
    },
]

const RESOURCES = [
    { title: "Detroit Yatırımcı Sunum PDF", type: "PDF", size: "3.2 MB" },
    { title: "ROI Hesaplama Şablonu (Excel)", type: "XLSX", size: "180 KB" },
    { title: "LLC Kurulum Kontrol Listesi", type: "PDF", size: "640 KB" },
    { title: "Section 8 SSS Dokümanı", type: "PDF", size: "1.1 MB" },
]

export default function AcademyPage() {
    const completed = 2
    const total = MODULES.length
    const progressPct = Math.round((completed / total) * 100)

    return (
        <div className="p-4 sm:p-6 md:p-10 space-y-6 md:space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <GraduationCap size={16} className="text-[#C1A05E]" />
                            <span className="text-xs font-bold text-[#C1A05E] uppercase tracking-wider">Agent Akademi</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight">ABD Gayrimenkul Eğitimleri</h1>
                        <p className="text-[#A8B0B8] mt-2 font-medium text-sm md:text-base">
                            Türk yatırımcılara ABD gayrimenkul satışı için profesyonel eğitim modülleri ve sertifika programı.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 sm:min-w-[200px] shadow-sm">
                        <p className="text-xs text-[#A8B0B8] font-semibold uppercase tracking-wider mb-1">İlerlemeniz</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-extrabold text-[#1F2328]">{completed}</p>
                            <p className="text-sm text-[#A8B0B8]">/ {total} modül</p>
                        </div>
                        <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#C1A05E] rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                        </div>
                        <p className="text-[10px] text-[#A8B0B8] mt-1.5">%{progressPct} tamamlandı</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {MODULES.map((mod, i) => (
                    <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        whileHover={{ y: mod.locked ? 0 : -4 }}
                        className={cn(
                            "bg-white rounded-2xl border border-slate-100 p-5 shadow-sm transition-all",
                            mod.locked ? "opacity-60" : "hover:shadow-lg hover:border-[#C1A05E]/20 cursor-pointer"
                        )}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C1A05E]/10 to-[#C1A05E]/20 flex items-center justify-center">
                                {mod.locked ? <BookOpen size={20} className="text-[#C1A05E]" /> : <PlayCircle size={20} className="text-[#C1A05E]" />}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold px-2 py-1 rounded-md",
                                mod.level === "Başlangıç" && "bg-emerald-50 text-emerald-600",
                                mod.level === "Orta" && "bg-amber-50 text-amber-600",
                                mod.level === "İleri" && "bg-red-50 text-red-600",
                            )}>
                                {mod.level}
                            </span>
                        </div>
                        <h3 className="font-bold text-[#1F2328] text-base leading-snug mb-2">{mod.title}</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-3">{mod.description}</p>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 text-[#A8B0B8]">
                                <Clock size={12} />
                                <span>{mod.duration}</span>
                            </div>
                            <span className={cn(
                                "font-bold flex items-center gap-1",
                                mod.locked ? "text-slate-300" : "text-[#C1A05E]"
                            )}>
                                {mod.locked ? "Yakında" : "Başla"}
                                {!mod.locked && <ChevronRight size={12} />}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6"
            >
                <div className="flex items-center gap-2 mb-1">
                    <FileText size={18} className="text-[#C1A05E]" />
                    <h3 className="font-bold text-[#1F2328]">Kaynaklar</h3>
                </div>
                <p className="text-xs text-[#A8B0B8] mb-4">Sunum, hesaplama şablonu ve referans dokümanları</p>
                <ul className="divide-y divide-slate-50">
                    {RESOURCES.map((res) => (
                        <li key={res.title} className="py-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <FileText size={16} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-[#1F2328] truncate">{res.title}</p>
                                    <p className="text-[11px] text-[#A8B0B8]">{res.type} · {res.size}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-[#A8B0B8] hover:text-[#C1A05E]">
                                İndir
                            </Button>
                        </li>
                    ))}
                </ul>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative overflow-hidden bg-[#1F2328] p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl text-white"
            >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C1A05E]/10 rounded-full blur-3xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#C1A05E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Award size={24} className="text-[#C1A05E]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Sertifika Programı</h3>
                            <p className="text-slate-400 text-sm">Tüm modülleri tamamladığınızda Pasiflow Certified Agent unvanını kazanın.</p>
                        </div>
                    </div>
                    <Button className="bg-[#C1A05E] hover:bg-[#a38d5d] text-white rounded-xl w-full md:w-auto">
                        Programa Göz At
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
