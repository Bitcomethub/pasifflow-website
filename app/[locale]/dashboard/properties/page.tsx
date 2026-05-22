"use client"

import { Badge } from "@/components/ui/badge"
import {
    MapPin,
    Calendar,
    TrendingUp,
    Building2,
    Wallet,
    CheckCircle2,
    Clock,
    Home,
    FileCheck,
    Key,
    Loader2,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Investment lifecycle steps
const LIFECYCLE_STEPS = [
    { key: "select", label: "Seçim", icon: Home },
    { key: "due_diligence", label: "İnceleme", icon: FileCheck },
    { key: "closing", label: "Kapanış", icon: CheckCircle2 },
    { key: "tenant", label: "Kiracı", icon: Key },
    { key: "renting", label: "Kira Alımı", icon: Wallet },
]

// Shape returned by /api/properties (Prisma row + server-computed fields)
type DbProperty = {
    id: string
    address: string
    city: string
    state: string
    zipCode: string
    purchasePrice: number
    monthlyRent: number
    status: string
    paymentDay: number | null
    imageUrl: string | null
    purchaseDate: string | null
    roi: string
    annualReturn: number
}

// Shape consumed by the existing card UI
type DisplayProperty = {
    id: string
    title: string
    location: string
    status: string
    purchasePrice: string
    monthlyRent: string
    roi: string
    annualReturn: string
    image: string
    nextPaymentDate: string
    section8: boolean
    lifecycleStep: number
    occupancy: number
    purchaseDate: string
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80'

function mapProperty(p: DbProperty): DisplayProperty {
    let nextPaymentLabel = '—'
    if (p.paymentDay) {
        const today = new Date()
        const next = new Date(today.getFullYear(), today.getMonth(), p.paymentDay)
        if (next.getTime() < today.getTime()) next.setMonth(next.getMonth() + 1)
        const days = Math.max(0, Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
        nextPaymentLabel = days === 0 ? 'Bugün' : `${days} gün kaldı`
    }

    let purchaseDateLabel = ''
    if (p.purchaseDate) {
        purchaseDateLabel = new Date(p.purchaseDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })
    }

    return {
        id: p.id,
        title: p.address,
        location: `${p.city}, ${p.state} ${p.zipCode}`,
        status: p.status.toLowerCase(),
        purchasePrice: `$${p.purchasePrice.toLocaleString('en-US')}`,
        monthlyRent: `$${p.monthlyRent.toLocaleString('en-US')}`,
        roi: `${p.roi}%`,
        annualReturn: `$${Math.round(p.annualReturn).toLocaleString('en-US')}`,
        image: p.imageUrl || FALLBACK_IMAGE,
        nextPaymentDate: nextPaymentLabel,
        // section8 / lifecycleStep / occupancy şu an Prisma şemasında yok.
        // Tüm seed verileri OCCUPIED + Section 8 olduğu için sabit veriliyor.
        section8: true,
        lifecycleStep: 4,
        occupancy: p.status === 'OCCUPIED' ? 100 : 0,
        purchaseDate: purchaseDateLabel,
    }
}

export default function PropertiesPage() {
    const [properties, setProperties] = useState<DisplayProperty[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('pasiflow_token') : null
        if (!token) {
            setError('Mülkleri görmek için giriş yapmanız gerekiyor.')
            setLoading(false)
            return
        }

        fetch('/api/properties', { headers: { Authorization: `Bearer ${token}` } })
            .then(async (r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
                return r.json() as Promise<{ properties: DbProperty[] }>
            })
            .then((data) => setProperties(data.properties.map(mapProperty)))
            .catch(() => setError('Mülkler yüklenemedi. Lütfen sayfayı yenileyin.'))
            .finally(() => setLoading(false))
    }, [])

    const totalValue = properties.reduce((sum, p) => sum + parseInt(p.purchasePrice.replace(/[$,]/g, '')), 0)
    const totalRent = properties.reduce((sum, p) => sum + parseInt(p.monthlyRent.replace(/[$,]/g, '')), 0)
    const avgRoi = properties.length
        ? (properties.reduce((sum, p) => sum + parseFloat(p.roi), 0) / properties.length).toFixed(1)
        : '0.0'

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-[#C1A05E] animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-[#1F2328] font-semibold">{error}</p>
                </div>
            </div>
        )
    }

    if (properties.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                    <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-[#1F2328] font-semibold">Henüz mülk yok</p>
                    <p className="text-[#A8B0B8] text-sm mt-1">Portföyünüze mülk eklendiğinde burada görünecek.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 md:space-y-8 p-4 sm:p-6 md:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />

                <div className="relative flex flex-col lg:flex-row justify-between lg:items-end gap-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight">Mülklerim</h1>
                        <p className="text-sm md:text-base text-[#A8B0B8] mt-2 font-medium">
                            Aktif portföyünüzdeki mülklerin detayları ve güncel durumları.
                        </p>
                    </div>

                    {/* Summary Stats */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { label: "Toplam Değer", value: `$${totalValue.toLocaleString()}`, icon: Building2, color: "bg-[#C1A05E]/10 border-[#C1A05E]/20 text-[#C1A05E]" },
                            { label: "Aylık Gelir", value: `$${totalRent.toLocaleString()}/ay`, icon: Wallet, color: "bg-emerald-50 border-emerald-200 text-emerald-600" },
                            { label: "Ort. ROI", value: `${avgRoi}%`, icon: TrendingUp, color: "bg-blue-50 border-blue-200 text-blue-600" },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}
                                className={cn("flex items-center gap-2.5 px-4 py-2.5 rounded-xl border", stat.color)}
                            >
                                <stat.icon size={15} />
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{stat.label}</p>
                                    <p className="text-sm font-bold">{stat.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Property Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {properties.map((property, index) => (
                    <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + index * 0.12 }}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                        {/* Image Section */}
                        <div className="relative h-52 w-full overflow-hidden">
                            <Image
                                src={property.image}
                                alt={property.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                            {/* Top badges */}
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Badge className={property.status === 'occupied'
                                    ? "bg-emerald-500/90 hover:bg-emerald-500 text-white backdrop-blur-sm border-none text-[10px]"
                                    : "bg-slate-500/90 text-white backdrop-blur-sm border-none text-[10px]"
                                }>
                                    {property.status === 'occupied' ? 'Kiracılı' : 'Boş'}
                                </Badge>
                                {property.section8 && (
                                    <Badge className="bg-[#C1A05E]/90 hover:bg-[#C1A05E] text-white backdrop-blur-sm border-none text-[10px]">
                                        Section 8
                                    </Badge>
                                )}
                            </div>

                            {/* Bottom overlay stats */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                    <span className="text-xs font-bold text-emerald-700">ROI {property.roi}</span>
                                </div>
                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                                    <span className="text-xs font-bold text-[#1F2328]">{property.purchaseDate}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-[#1F2328] leading-tight mb-1 group-hover:text-[#C1A05E] transition-colors">
                                    {property.title}
                                </h3>
                                <div className="flex items-center text-[#A8B0B8] text-sm">
                                    <MapPin className="w-3.5 h-3.5 mr-1" />
                                    {property.location}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl">
                                <div className="text-center">
                                    <p className="text-[9px] text-[#A8B0B8] uppercase tracking-wider font-semibold">Değer</p>
                                    <p className="font-bold text-[#1F2328] text-sm mt-0.5">{property.purchasePrice}</p>
                                </div>
                                <div className="text-center border-x border-slate-200">
                                    <p className="text-[9px] text-[#A8B0B8] uppercase tracking-wider font-semibold">Kira</p>
                                    <p className="font-bold text-[#C1A05E] text-sm mt-0.5">{property.monthlyRent}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] text-[#A8B0B8] uppercase tracking-wider font-semibold">Yıllık</p>
                                    <p className="font-bold text-emerald-600 text-sm mt-0.5">{property.annualReturn}</p>
                                </div>
                            </div>

                            {/* Lifecycle Progress Dots */}
                            <div>
                                <p className="text-[10px] text-[#A8B0B8] font-semibold uppercase tracking-wider mb-2">Yatırım Süreci</p>
                                <div className="flex items-center gap-1">
                                    {LIFECYCLE_STEPS.map((step, si) => (
                                        <div key={step.key} className="flex items-center flex-1">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.4 + si * 0.08 }}
                                                className={cn(
                                                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                                                    si <= property.lifecycleStep
                                                        ? "bg-[#C1A05E] text-white"
                                                        : "bg-slate-100 text-slate-300"
                                                )}
                                            >
                                                <step.icon size={12} />
                                            </motion.div>
                                            {si < LIFECYCLE_STEPS.length - 1 && (
                                                <div className={cn(
                                                    "h-0.5 flex-1 mx-0.5 rounded-full",
                                                    si < property.lifecycleStep ? "bg-[#C1A05E]" : "bg-slate-100"
                                                )} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-1">
                                    {LIFECYCLE_STEPS.map((step, si) => (
                                        <span
                                            key={step.key}
                                            className={cn(
                                                "text-[8px] font-semibold tracking-wide text-center flex-1",
                                                si <= property.lifecycleStep ? "text-[#C1A05E]" : "text-slate-300"
                                            )}
                                        >
                                            {step.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Calendar className="w-4 h-4 text-[#C1A05E]" />
                                    <span className="text-xs">Ödeme: <strong>{property.nextPaymentDate}</strong></span>
                                </div>
                                <motion.button
                                    whileHover={{ x: 3 }}
                                    className="text-xs font-bold text-[#C1A05E] hover:text-[#a38d5d] transition-colors flex items-center gap-1"
                                >
                                    Detaylar
                                    <Clock size={12} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
