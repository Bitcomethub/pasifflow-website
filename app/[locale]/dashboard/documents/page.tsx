import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dokümanlar</h1>
                <p className="text-slate-500 mt-2">Tüm yasal belgelerinizi ve sözleşmelerinizi buradan yönetin.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Dosyalarım</CardTitle>
                        <CardDescription>İmzalanan ve bekleyen belgeler.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Kira Sözleşmesi - Miami Apt.pdf", size: "2.4 MB", date: "12 Ocak 2024" },
                                { name: "Tapu Senedi - Austin Loft.pdf", size: "1.8 MB", date: "15 Aralık 2023" },
                                { name: "Vergi Beyannamesi 2023.pdf", size: "4.1 MB", date: "01 Ocak 2024" },
                                { name: "Sigorta Poliçesi.pdf", size: "1.2 MB", date: "20 Kasım 2023" },
                            ].map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{file.name}</p>
                                            <p className="text-xs text-slate-500">{file.size} • {file.date}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#C1A05E]">
                                        <Download size={20} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
