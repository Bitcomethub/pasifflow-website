"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ScrollText,
    Clock,
    LinkIcon,
    CheckCircle2,
    X,
    Loader2,
    Search,
    Send,
    ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LlcRequest {
    id: string
    llcName: string
    alternativeName: string | null
    entityType: string
    managementType: string
    fullName: string
    email: string
    phone: string
    country: string
    passportNumber: string
    mailingAddress: string
    virtualOffice: boolean
    bankAccount: boolean
    itinApplication: boolean
    stripeSessionId: string | null
    stripePaymentId: string | null
    amountPaid: number | null
    paymentStatus: string
    status: string
    formationLink: string | null
    linkSentAt: string | null
    createdAt: string
    updatedAt: string
}

const STATUS_COLORS: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    LINK_SENT: "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
}

const PAYMENT_COLORS: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    PAID: "bg-green-100 text-green-700",
    FAILED: "bg-red-100 text-red-700",
}

export default function AdminLlcRequestsPage() {
    const [requests, setRequests] = useState<LlcRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")
    const [selectedRequest, setSelectedRequest] = useState<LlcRequest | null>(null)
    const [linkInput, setLinkInput] = useState("")
    const [sending, setSending] = useState(false)

    const getToken = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("pasiflow_token") || ""
        }
        return ""
    }

    const fetchRequests = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/llc-requests", {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (res.ok) {
                const data = await res.json()
                setRequests(data.requests)
            }
        } catch (error) {
            console.error("Failed to fetch LLC requests:", error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRequests()
    }, [fetchRequests])

    const handleSendLink = async () => {
        if (!selectedRequest || !linkInput.trim()) return
        setSending(true)

        try {
            const res = await fetch(`/api/admin/llc-requests/${selectedRequest.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ formationLink: linkInput }),
            })
            if (res.ok) {
                setSelectedRequest(null)
                setLinkInput("")
                fetchRequests()
            }
        } catch (error) {
            console.error("Failed to send link:", error)
        } finally {
            setSending(false)
        }
    }

    const handleMarkCompleted = async (id: string) => {
        try {
            await fetch(`/api/admin/llc-requests/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ status: "COMPLETED" }),
            })
            fetchRequests()
        } catch (error) {
            console.error("Failed to update status:", error)
        }
    }

    const filteredRequests = requests.filter((r) => {
        const q = search.toLowerCase()
        const matchesSearch =
            r.fullName.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.llcName.toLowerCase().includes(q)
        const matchesStatus = statusFilter === "ALL" || r.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const stats = {
        total: requests.length,
        pending: requests.filter((r) => r.status === "PENDING").length,
        linkSent: requests.filter((r) => r.status === "LINK_SENT").length,
        completed: requests.filter((r) => r.status === "COMPLETED").length,
    }

    return (
        <div className="p-8 space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">LLC Requests</h2>
                <p className="text-muted-foreground mt-1">
                    Manage LLC formation requests and send formation links.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <ScrollText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Link Sent</CardTitle>
                        <LinkIcon className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.linkSent}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or LLC name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    {["ALL", "PENDING", "LINK_SENT", "COMPLETED"].map((status) => (
                        <Button
                            key={status}
                            variant={statusFilter === status ? "default" : "outline"}
                            size="sm"
                            onClick={() => setStatusFilter(status)}
                            className={cn(
                                statusFilter === status && "bg-[#C1A05E] hover:bg-[#a38d5d] text-white"
                            )}
                        >
                            {status === "ALL" ? "All" : status === "LINK_SENT" ? "Link Sent" : status.charAt(0) + status.slice(1).toLowerCase()}
                        </Button>
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
                    ) : filteredRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <ScrollText className="w-10 h-10 mb-3 opacity-50" />
                            <p className="font-medium">No LLC requests found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applicant</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">LLC Name</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Country</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                        <th className="py-3 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredRequests.map((req) => (
                                        <tr
                                            key={req.id}
                                            className="hover:bg-muted/30 transition-colors cursor-pointer"
                                            onClick={() => { setSelectedRequest(req); setLinkInput(req.formationLink || "") }}
                                        >
                                            <td className="py-4 px-6">
                                                <div>
                                                    <p className="font-medium text-sm">{req.fullName}</p>
                                                    <p className="text-xs text-muted-foreground">{req.email}</p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm">{req.llcName}</td>
                                            <td className="py-4 px-6 text-sm text-muted-foreground">{req.country}</td>
                                            <td className="py-4 px-6 text-sm text-muted-foreground">
                                                {new Date(req.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={cn(
                                                    "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full",
                                                    PAYMENT_COLORS[req.paymentStatus] || "bg-gray-100 text-gray-700"
                                                )}>
                                                    {req.paymentStatus} {req.amountPaid ? `($${req.amountPaid})` : ""}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={cn(
                                                    "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border",
                                                    STATUS_COLORS[req.status] || "bg-gray-100 text-gray-700"
                                                )}>
                                                    {req.status === "LINK_SENT" ? "Link Sent" : req.status.charAt(0) + req.status.slice(1).toLowerCase()}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                    {req.status === "PENDING" && req.paymentStatus === "PAID" && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => { setSelectedRequest(req); setLinkInput("") }}
                                                            className="h-8 text-xs gap-1"
                                                        >
                                                            <Send className="w-3 h-3" />
                                                            Send Link
                                                        </Button>
                                                    )}
                                                    {req.status === "LINK_SENT" && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleMarkCompleted(req.id)}
                                                            className="h-8 text-xs gap-1 text-green-600 border-green-200 hover:bg-green-50"
                                                        >
                                                            <CheckCircle2 className="w-3 h-3" />
                                                            Complete
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Detail / Send Link Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-lg font-bold">LLC Request Details</h3>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Full Name</p>
                                    <p className="font-medium">{selectedRequest.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Email</p>
                                    <p className="font-medium">{selectedRequest.email}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Phone</p>
                                    <p className="font-medium">{selectedRequest.phone}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Country</p>
                                    <p className="font-medium">{selectedRequest.country}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">LLC Name</p>
                                    <p className="font-medium">{selectedRequest.llcName}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Entity Type</p>
                                    <p className="font-medium">{selectedRequest.entityType}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Management</p>
                                    <p className="font-medium">{selectedRequest.managementType}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Passport</p>
                                    <p className="font-medium">{selectedRequest.passportNumber}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="text-muted-foreground">Mailing Address</p>
                                    <p className="font-medium">{selectedRequest.mailingAddress}</p>
                                </div>
                            </div>

                            <div className="flex gap-4 text-sm">
                                {selectedRequest.virtualOffice && (
                                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Virtual Office</span>
                                )}
                                {selectedRequest.bankAccount && (
                                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">Bank Account</span>
                                )}
                                {selectedRequest.itinApplication && (
                                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">ITIN</span>
                                )}
                            </div>

                            <div className="flex gap-4 text-sm border-t pt-4">
                                <div>
                                    <p className="text-muted-foreground">Payment</p>
                                    <span className={cn(
                                        "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
                                        PAYMENT_COLORS[selectedRequest.paymentStatus]
                                    )}>
                                        {selectedRequest.paymentStatus} {selectedRequest.amountPaid ? `($${selectedRequest.amountPaid})` : ""}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Status</p>
                                    <span className={cn(
                                        "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border",
                                        STATUS_COLORS[selectedRequest.status]
                                    )}>
                                        {selectedRequest.status}
                                    </span>
                                </div>
                            </div>

                            {selectedRequest.formationLink && (
                                <div className="border-t pt-4">
                                    <p className="text-sm text-muted-foreground mb-1">Formation Link</p>
                                    <a
                                        href={selectedRequest.formationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                                    >
                                        {selectedRequest.formationLink}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            )}

                            {/* Send Link Form */}
                            {selectedRequest.paymentStatus === "PAID" && selectedRequest.status !== "COMPLETED" && (
                                <div className="border-t pt-4 space-y-3">
                                    <Label className="font-medium">Send Formation Link</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={linkInput}
                                            onChange={(e) => setLinkInput(e.target.value)}
                                            placeholder="https://formation-link.com/..."
                                            className="flex-1"
                                        />
                                        <Button
                                            onClick={handleSendLink}
                                            disabled={!linkInput.trim() || sending}
                                            className="bg-[#C1A05E] hover:bg-[#a38d5d] text-white gap-2"
                                        >
                                            {sending ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Send
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
