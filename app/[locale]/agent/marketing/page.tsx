"use client"

import { motion } from "framer-motion"
import {
    Download,
    Copy,
    Image as ImageIcon,
    FileText,
    Video,
    Megaphone,
    Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Asset = {
    id: string
    title: string
    description: string
    category: "Sosyal Medya" | "Sunum" | "Video" | "E-posta Şablonu"
    size: string
    format: string
}

const ASSETS: Asset[] = [
    {
        id: "ig-detroit-1",
        title: "Detroit Mülk Karusel — Instagram",
        description: "10 slaytlık paylaşım hazır görsel paketi. Section 8, ROI ve mülk fotoğrafları.",
        category: "Sosyal Medya",
        size: "1080×1080",
        format: "PNG ×10",
    },
    {
        id: "linkedin-cover",
        title: "LinkedIn Profil & Kapak Görselleri",
        description: "Pasiflow Certified Agent için hazır kapak görseli ve profil rozetleri.",
        category: "Sosyal Medya",
        size: "1584×396",
        format: "PNG",
    },
    {
        id: "investor-deck",
        title: "Yatırımcı Tanıtım Sunumu",
        description: "20 sayfalık tam kapsamlı sunum — piyasa verileri, örnek portföy, ROI projeksiyonu.",
        category: "Sunum",
        size: "16:9",
        format: "PPTX + PDF",
    },
    {
        id: "ipek-yolu-pitch",
        title: "İpek Yolu Pitch Deck — Türk Yatırımcı",
        description: "Türkiye'den ABD'ye gayrimenkul yatırımı, vergi avantajları ve LLC yapısı odaklı.",
        category: "Sunum",
        size: "16:9",
        format: "PPTX",
    },
    {
        id: "intro-video",
        title: "60 Saniyelik Tanıtım Videosu",
        description: "Pasiflow modeli ve agent fırsatlarını anlatan kısa video. WhatsApp uyumlu MP4.",
        category: "Video",
        size: "1080×1920",
        format: "MP4",
    },
    {
        id: "case-study-video",
        title: "Case Study — 1 Yıllık Portföy Hikayesi",
        description: "Gerçek yatırımcı deneyimi, getiri tablosu ve mülk turu.",
        category: "Video",
        size: "1920×1080",
        format: "MP4",
    },
    {
        id: "email-warm",
        title: "İlk Görüşme Sonrası E-posta",
        description: "Sıcak bir takip e-postası — fırsat özetlemesi ve takvim linki.",
        category: "E-posta Şablonu",
        size: "—",
        format: "HTML + TXT",
    },
    {
        id: "email-monthly",
        title: "Aylık Yatırımcı Bülteni",
        description: "Detroit piyasa güncellemesi, yeni mülkler ve agent yorumları için şablon.",
        category: "E-posta Şablonu",
        size: "—",
        format: "HTML",
    },
]

const SCRIPTS = [
    {
        id: "intro",
        label: "Soğuk Tanışma Mesajı (WhatsApp)",
        content: "Merhaba {Ad}, ABD'de Section 8 garantili kira getiren mülklere yatırım yapmak ister misiniz? Aylık ortalama $1,100 net kira, %16 ROI ve uzaktan tam yönetim sunuyoruz. Kısa bir görüşme için müsait olduğunuz zaman söyler misiniz?",
    },
    {
        id: "followup",
        label: "Görüşme Sonrası Teşekkür",
        content: "{Ad} merhaba, görüşmemiz için teşekkürler. Sizinle paylaştığım Detroit portföyünü ve LLC kurulum sürecini özetleyen sunumu e-posta olarak ilettim. Sorularınız için 7/24 ulaşılabilir durumdayım.",
    },
    {
        id: "objection",
        label: "Uzaktan Yönetim İtirazına Yanıt",
        content: "Pasiflow'un Rentvine + Latchel entegrasyonu sayesinde mülklerinizin günlük yönetimi, kiracı süreçleri ve bakım çağrıları tamamen tarafımızca yürütülüyor. Aylık raporlama ve canlı dashboard erişimi standart.",
    },
]

export default function MarketingPage() {
    const [copied, setCopied] = useState<string | null>(null)

    const handleCopy = async (id: string, content: string) => {
        try {
            await navigator.clipboard.writeText(content)
            setCopied(id)
            setTimeout(() => setCopied(null), 2000)
        } catch { /* ignore */ }
    }

    const categoryIcon = (cat: Asset["category"]) => {
        if (cat === "Sosyal Medya") return ImageIcon
        if (cat === "Sunum") return FileText
        if (cat === "Video") return Video
        return Megaphone
    }

    return (
        <div className="p-6 md:p-10 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />
                <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-[#C1A05E]" />
                        <span className="text-xs font-bold text-[#C1A05E] uppercase tracking-wider">Pazarlama Araçları</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight">Hazır Materyaller</h1>
                    <p className="text-[#A8B0B8] mt-2 font-medium">
                        Sosyal medya görselleri, sunum dosyaları, video şablonları ve onaylı e-posta metinleri.
                    </p>
                </div>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {ASSETS.map((asset, i) => {
                    const Icon = categoryIcon(asset.category)
                    return (
                        <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:border-[#C1A05E]/20 transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#C1A05E]/10 to-[#C1A05E]/20 flex items-center justify-center">
                                    <Icon size={20} className="text-[#C1A05E]" />
                                </div>
                                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600">
                                    {asset.category}
                                </span>
                            </div>
                            <h3 className="font-bold text-[#1F2328] text-base leading-snug mb-2">{asset.title}</h3>
                            <p className="text-xs text-slate-500 mb-4 line-clamp-3">{asset.description}</p>
                            <div className="flex items-center justify-between text-xs mb-4">
                                <span className="text-[#A8B0B8]">{asset.size}</span>
                                <span className="text-[#A8B0B8]">{asset.format}</span>
                            </div>
                            <Button size="sm" className="w-full bg-[#1F2328] text-white hover:bg-[#C1A05E] rounded-xl">
                                <Download size={14} className="mr-2" />
                                İndir
                            </Button>
                        </motion.div>
                    )
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
                <div className="flex items-center gap-2 mb-1">
                    <Megaphone size={18} className="text-[#C1A05E]" />
                    <h3 className="font-bold text-[#1F2328]">Onaylı Mesaj Şablonları</h3>
                </div>
                <p className="text-xs text-[#A8B0B8] mb-5">Tek tıkla kopyalayın, isim ve detayları kendi notlarınızla güncelleyin.</p>

                <div className="space-y-4">
                    {SCRIPTS.map((s) => (
                        <div key={s.id} className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center justify-between mb-2 gap-3">
                                <p className="text-sm font-bold text-[#1F2328]">{s.label}</p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleCopy(s.id, s.content)}
                                    className={cn(
                                        "h-8 text-xs rounded-lg border-slate-200",
                                        copied === s.id && "border-emerald-300 bg-emerald-50 text-emerald-600"
                                    )}
                                >
                                    <Copy size={12} className="mr-1.5" />
                                    {copied === s.id ? "Kopyalandı" : "Kopyala"}
                                </Button>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{s.content}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
