"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    MapPin,
    Calendar,
    TrendingUp,
} from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const PROPERTIES = [
    {
        id: '1',
        title: '12152 Stout Street',
        location: 'Detroit, MI 48228',
        status: 'occupied',
        purchasePrice: '$85,900',
        monthlyRent: '$1,160',
        roi: '16.2%',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '15 gün kaldı',
        section8: true,
    },
    {
        id: '2',
        title: '12290 Griggs Street',
        location: 'Detroit, MI 48204',
        status: 'occupied',
        purchasePrice: '$89,900',
        monthlyRent: '$1,100',
        roi: '14.7%',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '2 gün kaldı',
        section8: true,
    },
    {
        id: '3',
        title: '15717 Freeland Street',
        location: 'Detroit, MI 48227',
        status: 'occupied',
        purchasePrice: '$87,900',
        monthlyRent: '$1,165',
        roi: '15.9%',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '8 gün kaldı',
        section8: true,
    },
]

export default function PropertiesPage() {
    const totalValue = PROPERTIES.reduce((sum, p) => sum + parseInt(p.purchasePrice.replace(/[$,]/g, '')), 0)
    const totalRent = PROPERTIES.reduce((sum, p) => sum + parseInt(p.monthlyRent.replace(/[$,]/g, '')), 0)

    return (
        <div className="space-y-8">
            {/* Header with summary stats */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between md:items-end gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Mülklerim</h1>
                    <p className="text-slate-500 mt-2">
                        Aktif portföyünüzdeki mülklerin detayları ve güncel durumları.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#C1A05E]/10 px-4 py-2 rounded-xl border border-[#C1A05E]/20">
                        <span className="text-xs text-slate-500 block">Toplam Değer</span>
                        <span className="text-sm font-bold text-slate-900">${totalValue.toLocaleString()}</span>
                    </div>
                    <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                        <span className="text-xs text-slate-500 block">Aylık Gelir</span>
                        <span className="text-sm font-bold text-green-700">${totalRent.toLocaleString()}/ay</span>
                    </div>
                </div>
            </motion.div>

            {/* Property Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROPERTIES.map((property, index) => (
                    <motion.div
                        key={property.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.15 }}
                    >
                        <Card className="overflow-hidden border-slate-200 bg-white hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 rounded-2xl">
                            {/* Image Section */}
                            <div className="relative h-52 w-full overflow-hidden">
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Badge className={property.status === 'occupied'
                                        ? "bg-green-500/90 hover:bg-green-500 text-white backdrop-blur-sm border-none"
                                        : "bg-slate-500/90 text-white backdrop-blur-sm border-none"
                                    }>
                                        {property.status === 'occupied' ? 'Kiracılı' : 'Boş'}
                                    </Badge>
                                    {property.section8 && (
                                        <Badge className="bg-[#C1A05E]/90 hover:bg-[#C1A05E] text-white backdrop-blur-sm border-none">
                                            Section 8
                                        </Badge>
                                    )}
                                </div>
                                {/* ROI Badge - Bottom left of image */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                                    <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                                    <span className="text-xs font-bold text-green-700">ROI {property.roi}</span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 group-hover:text-[#C1A05E] transition-colors">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-center text-slate-500 text-sm">
                                        <MapPin className="w-3.5 h-3.5 mr-1" />
                                        {property.location}
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Mülk Değeri</p>
                                        <p className="font-bold text-slate-900 mt-0.5">{property.purchasePrice}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Kira Geliri</p>
                                        <p className="font-bold text-[#C1A05E] mt-0.5">{property.monthlyRent}</p>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Calendar className="w-4 h-4 text-[#C1A05E]" />
                                        <span>Ödeme: <strong>{property.nextPaymentDate}</strong></span>
                                    </div>
                                    <button className="text-sm font-semibold text-[#C1A05E] hover:text-[#a38d5d] transition-colors">
                                        Detaylar →
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
