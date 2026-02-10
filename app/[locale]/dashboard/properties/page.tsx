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
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Investment lifecycle steps
const LIFECYCLE_STEPS = [
    { key: "select", label: "Seçim", icon: Home },
    { key: "due_diligence", label: "İnceleme", icon: FileCheck },
    { key: "closing", label: "Kapanış", icon: CheckCircle2 },
    { key: "tenant", label: "Kiracı", icon: Key },
    { key: "renting", label: "Kira Alımı", icon: Wallet },
]

const PROPERTIES = [
    {
        id: '1',
        title: '12152 Stout Street',
        location: 'Detroit, MI 48228',
        status: 'occupied',
        purchasePrice: '$85,900',
        monthlyRent: '$1,160',
        roi: '16.2%',
        annualReturn: '$13,920',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '15 gün kaldı',
        section8: true,
        lifecycleStep: 4, // renting (0-indexed)
        occupancy: 100,
        purchaseDate: 'Mart 2024',
    },
    {
        id: '2',
        title: '12290 Griggs Street',
        location: 'Detroit, MI 48204',
        status: 'occupied',
        purchasePrice: '$89,900',
        monthlyRent: '$1,100',
        roi: '14.7%',
        annualReturn: '$13,200',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '2 gün kaldı',
        section8: true,
        lifecycleStep: 4,
        occupancy: 100,
        purchaseDate: 'Haziran 2024',
    },
    {
        id: '3',
        title: '15717 Freeland Street',
        location: 'Detroit, MI 48227',
        status: 'occupied',
        purchasePrice: '$87,900',
        monthlyRent: '$1,165',
        roi: '15.9%',
        annualReturn: '$13,980',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '8 gün kaldı',
        section8: true,
        lifecycleStep: 4,
        occupancy: 100,
        purchaseDate: 'Eylül 2024',
    },
]

export default function PropertiesPage() {
    const totalValue = PROPERTIES.reduce((sum, p) => sum + parseInt(p.purchasePrice.replace(/[$,]/g, '')), 0)
    const totalRent = PROPERTIES.reduce((sum, p) => sum + parseInt(p.monthlyRent.replace(/[$,]/g, '')), 0)
    const avgRoi = (PROPERTIES.reduce((sum, p) => sum + parseFloat(p.roi), 0) / PROPERTIES.length).toFixed(1)

    return (
        <div className="space-y-8 p-6 md:p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#C1A05E]/5 p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm"
            >
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#C1A05E]/5 rounded-full blur-3xl" />

                <div className="relative flex flex-col lg:flex-row justify-between lg:items-end gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1F2328] tracking-tight">Mülklerim</h1>
                        <p className="text-[#A8B0B8] mt-2 font-medium">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {PROPERTIES.map((property, index) => (
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
