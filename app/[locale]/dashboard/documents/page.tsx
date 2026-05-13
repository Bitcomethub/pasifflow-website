"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type DocItem = { id: string; name: string; date: string; size: string; url: string; type: string }
type DocGroup = { title: string; items: DocItem[] }

const FALLBACK_DEMO: DocGroup[] = [
    {
        title: "Kira Kontratları & Diğer",
        items: [
            { id: "demo-1", name: "Kira Sözleşmesi - 10468 Nottingham St.pdf", date: "2025-12-05", size: "2.4 MB", url: "#", type: "Lease" },
            { id: "demo-2", name: "Tapu Senedi - 12152 Stout St.pdf", date: "2025-11-22", size: "1.8 MB", url: "#", type: "Deed" },
            { id: "demo-3", name: "Sigorta Poliçesi - 12290 Griggs St.pdf", date: "2026-01-15", size: "1.2 MB", url: "#", type: "Insurance" },
        ],
    },
    {
        title: "Vergi Dokümanları",
        items: [
            { id: "demo-tax-1", name: "Vergi Beyannamesi 2025.pdf", date: "2026-03-10", size: "4.1 MB", url: "#", type: "Tax" },
        ],
    },
]

function formatDate(iso: string): string {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
}

export default function DocumentsPage() {
    const [groups, setGroups] = useState<DocGroup[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("pasiflow_token") : null
        if (!token) { setGroups(FALLBACK_DEMO); setLoading(false); return }

        fetch("/api/mobile/documents", { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => (r.ok ? r.json() as Promise<DocGroup[]> : []))
            .then((d) => {
                const list = Array.isArray(d) ? d : []
                setGroups(list.length > 0 ? list : FALLBACK_DEMO)
            })
            .catch(() => setGroups(FALLBACK_DEMO))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-8 h-8 text-[#C1A05E] animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dokümanlar</h1>
                <p className="text-slate-500 mt-2">Tüm yasal belgelerinizi ve sözleşmelerinizi buradan yönetin.</p>
            </div>

            <div className="grid gap-6">
                {groups.map((group) => (
                    <Card key={group.title}>
                        <CardHeader>
                            <CardTitle>{group.title}</CardTitle>
                            <CardDescription>{group.items.length} doküman</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {group.items.map((file) => (
                                    <div key={file.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{file.name}</p>
                                                <p className="text-xs text-slate-500">{file.size} • {formatDate(file.date)}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#C1A05E]" asChild={file.url !== "#"}>
                                            {file.url !== "#" ? <a href={file.url} target="_blank" rel="noreferrer"><Download size={20} /></a> : <span><Download size={20} /></span>}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
