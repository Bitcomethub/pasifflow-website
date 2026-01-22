import { Card } from "@/components/ui/card";
import {
    FileText,
    Download,
    Search,
    Filter,
    FileCheck,
    FileBadge
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DOCUMENTS = [
    {
        id: 1,
        name: "Tapu Senedi - 12152 Stout St",
        type: "Tapu",
        date: "12 Ocak 2025",
        size: "2.4 MB",
        icon: FileBadge,
        color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20"
    },
    {
        id: 2,
        name: "Kira Kontratı - 2025 Dönemi",
        type: "Sözleşme",
        date: "10 Ocak 2025",
        size: "1.8 MB",
        icon: FileText,
        color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
    },
    {
        id: 3,
        name: "Ekspertiz Raporu - Stout St",
        type: "Rapor",
        date: "05 Ocak 2025",
        size: "5.1 MB",
        icon: FileCheck,
        color: "text-green-600 bg-green-100 dark:bg-green-900/20"
    },
    {
        id: 4,
        name: "Vergi Beyannamesi 2024",
        type: "Vergi",
        date: "30 Aralık 2024",
        size: "1.2 MB",
        icon: FileText,
        color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20"
    }
];

export default function DocumentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dosyalarım</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Mülklerinize ait tüm resmi belgeler, kontratlar ve raporlar.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filtrele
                    </button>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Dosya ara..."
                            className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Documents List */}
            <Card className="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm">
                {DOCUMENTS.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.color}`}>
                                <doc.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    {doc.name}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <Badge variant="secondary" className="text-xs font-normal">
                                        {doc.type}
                                    </Badge>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">{doc.date}</span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">{doc.size}</span>
                                </div>
                            </div>
                        </div>

                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </Card>
        </div>
    );
}
