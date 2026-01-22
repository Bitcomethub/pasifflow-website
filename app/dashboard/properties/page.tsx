import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    DollarSign,
    TrendingUp,
    Calendar,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Image from "next/image";

// Using the same mock data as the mobile app for consistency
const PROPERTIES = [
    {
        id: '1',
        title: '12152 Stout Street',
        location: 'Detroit, MI 48228',
        status: 'occupied',
        purchasePrice: '$85,900',
        monthlyRent: '$1,160',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '15 gün kaldı',
        section8: true,
        occupancyRate: 100,
        mls: '20251049787',
    },
    {
        id: '2',
        title: '12290 Griggs Street',
        location: 'Detroit, MI 48204',
        status: 'occupied',
        purchasePrice: '$89,900',
        monthlyRent: '$1,100',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '2 gün kaldı',
        section8: true,
        occupancyRate: 100,
        mls: '20251060129',
    },
    {
        id: '3',
        title: '15717 Freeland Street',
        location: 'Detroit, MI 48227',
        status: 'occupied',
        purchasePrice: '$87,900',
        monthlyRent: '$1,165',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80',
        nextPaymentDate: '8 gün kaldı',
        section8: true,
        occupancyRate: 100,
        mls: '20251059784',
    },
];

export default function PropertiesPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mülklerim</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Aktif portföyünüzdeki mülklerin detayları ve güncel durumları.
                    </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Toplam 3 Mülk
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROPERTIES.map((property) => (
                    <Card key={property.id} className="overflow-hidden border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
                        {/* Image Section */}
                        <div className="relative h-48 w-full">
                            <Image
                                src={property.image}
                                alt={property.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Badge className={property.status === 'occupied' ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500"}>
                                    {property.status === 'occupied' ? 'Kiracılı' : 'Boş'}
                                </Badge>
                                {property.section8 && (
                                    <Badge variant="secondary" className="bg-blue-600 text-white border-none">
                                        Section 8
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
                                    {property.title}
                                </h3>
                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {property.location}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Mülk Değeri</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{property.purchasePrice}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Kira Geliri</p>
                                    <p className="font-semibold text-green-600 dark:text-green-400">{property.monthlyRent}</p>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <Calendar className="w-4 h-4 text-blue-500" />
                                    <span>Ödeme: <strong>{property.nextPaymentDate}</strong></span>
                                </div>
                                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                    Detaylar →
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
