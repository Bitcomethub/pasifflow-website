"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    FileText,
    Loader2,
    Search,
    Trash2,
    ExternalLink,
    Building2,
    User,
    Briefcase,
    Wrench,
    ScrollText,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminDocument {
    id: string
    title: string
    type: string
    url: string
    size: string | null
    createdAt: string
    user: { id: string; fullName: string | null; email: string } | null
    llc: { id: string; name: string } | null
    property: { id: string; address: string } | null
    lease: { id: string; tenantName: string } | null
    maintenanceRequest: { id: string; title: string } | null
}

const TYPE_COLORS: Record<string, string> = {
    Tax: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Deed: "bg-blue-50 text-blue-700 border-blue-200",
    Contract: "bg-purple-50 text-purple-700 border-purple-200",
    Invoice: "bg-amber-50 text-amber-700 border-amber-200",
    Lease: "bg-rose-50 text-rose-700 border-rose-200",
}

const SCOPES = [
    { key: "all", label: "All" },
    { key: "property", label: "Properties" },
    { key: "llc", label: "LLCs" },
    { key: "user", label: "Users" },
    { key: "lease", label: "Leases" },
    { key: "maintenance", label: "Maintenance" },
] as const

type Scope = (typeof SCOPES)[number]["key"]

const getToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("pasiflow_token") || ""
    }
    return ""
}

const matchesScope = (d: AdminDocument, scope: Scope) => {
    switch (scope) {
        case "all":
            return true
        case "property":
            return !!d.property
        case "llc":
            return !!d.llc
        case "user":
            return !!d.user
        case "lease":
            return !!d.lease
        case "maintenance":
            return !!d.maintenanceRequest
    }
}

const relatedTo = (d: AdminDocument) => {
    if (d.property) return { icon: Building2, label: d.property.address, kind: "Property" }
    if (d.llc) return { icon: Briefcase, label: d.llc.name, kind: "LLC" }
    if (d.lease) return { icon: ScrollText, label: `Lease — ${d.lease.tenantName}`, kind: "Lease" }
    if (d.maintenanceRequest) return { icon: Wrench, label: d.maintenanceRequest.title, kind: "Maintenance" }
    if (d.user) return { icon: User, label: d.user.fullName || d.user.email, kind: "User" }
    return null
}

export default function AdminDocumentsPage() {
    const [documents, setDocuments] = useState<AdminDocument[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [scope, setScope] = useState<Scope>("all")
    const [error, setError] = useState("")

    const fetchDocuments = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/documents", {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (res.ok) {
                const data = await res.json()
                setDocuments(data.documents)
            } else {
                const data = await res.json().catch(() => ({}))
                setError(data.error || "Failed to load documents")
            }
        } catch {
            setError("Network error while loading documents")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchDocuments()
    }, [fetchDocuments])

    const handleDelete = async (doc: AdminDocument) => {
        if (!confirm(`Delete "${doc.title}"? This cannot be undone.`)) return
        try {
            const res = await fetch(`/api/admin/documents?id=${encodeURIComponent(doc.id)}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (res.ok) {
                setDocuments(prev => prev.filter(d => d.id !== doc.id))
            }
        } catch (e) {
            console.error("Failed to delete document:", e)
        }
    }

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim()
        return documents.filter(d => {
            if (!matchesScope(d, scope)) return false
            if (!q) return true
            const haystack = [
                d.title,
                d.type,
                d.property?.address,
                d.llc?.name,
                d.user?.fullName,
                d.user?.email,
                d.lease?.tenantName,
                d.maintenanceRequest?.title,
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
            return haystack.includes(q)
        })
    }, [documents, search, scope])

    const stats = useMemo(() => ({
        total: documents.length,
        properties: documents.filter(d => d.property).length,
        llcs: documents.filter(d => d.llc).length,
        users: documents.filter(d => d.user).length,
    }), [documents])

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Documents</h2>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                        Browse all uploaded documents across properties, LLCs, users, and leases.
                    </p>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Stats */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Property Docs</CardTitle>
                        <Building2 className="h-4 w-4 text-[#B8A074]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.properties}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">LLC Docs</CardTitle>
                        <Briefcase className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.llcs}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">User Docs</CardTitle>
                        <User className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.users}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
                <div className="relative w-full sm:flex-1 sm:min-w-[240px] sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title, type, or related entity..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {SCOPES.map(s => (
                        <button
                            key={s.key}
                            type="button"
                            onClick={() => setScope(s.key)}
                            className={cn(
                                "px-3 py-1.5 text-xs font-semibold rounded-full border transition-all",
                                scope === s.key
                                    ? "border-[#C1A05E] bg-[#C1A05E]/10 text-[#C1A05E]"
                                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                            )}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <FileText className="w-10 h-10 mb-3 opacity-50" />
                            <p className="font-medium">No documents found</p>
                            <p className="text-sm">
                                {documents.length === 0
                                    ? "No documents have been uploaded yet."
                                    : "Try adjusting your search or filter."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Document</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Related To</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Size</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Uploaded</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filtered.map(doc => {
                                        const related = relatedTo(doc)
                                        const RelatedIcon = related?.icon || FileText
                                        const colorClass = TYPE_COLORS[doc.type] || "bg-gray-100 text-gray-700 border-gray-200"
                                        return (
                                            <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-lg bg-[#C1A05E]/10 flex items-center justify-center text-[#C1A05E]">
                                                            <FileText className="w-4 h-4" />
                                                        </div>
                                                        <p className="font-medium text-sm">{doc.title}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={cn(
                                                        "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border",
                                                        colorClass
                                                    )}>
                                                        {doc.type}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm">
                                                    {related ? (
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <RelatedIcon className="w-3.5 h-3.5" />
                                                            <span className="truncate max-w-[240px]">{related.label}</span>
                                                            <span className="text-xs text-slate-400">· {related.kind}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-slate-400">—</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-sm text-muted-foreground">{doc.size || "—"}</td>
                                                <td className="py-4 px-6 text-sm text-muted-foreground">
                                                    {new Date(doc.createdAt).toLocaleDateString("en-US", {
                                                        month: "short", day: "numeric", year: "numeric",
                                                    })}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" title="Open">
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(doc)}
                                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
