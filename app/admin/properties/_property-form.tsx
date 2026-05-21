"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Building2,
    Loader2,
    ArrowLeft,
    Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface PropertyFormValues {
    address: string
    city: string
    state: string
    zipCode: string
    purchasePrice: string
    currentValue: string
    monthlyRent: string
    status: "OCCUPIED" | "VACANT" | "MAINTENANCE"
    tenantName: string
    leaseEnd: string
    paymentDay: string
    imageUrl: string
    purchaseDate: string
    llcId: string
}

const EMPTY: PropertyFormValues = {
    address: "",
    city: "Detroit",
    state: "MI",
    zipCode: "",
    purchasePrice: "",
    currentValue: "",
    monthlyRent: "",
    status: "OCCUPIED",
    tenantName: "",
    leaseEnd: "",
    paymentDay: "",
    imageUrl: "",
    purchaseDate: "",
    llcId: "",
}

const STATUS_OPTIONS: { value: PropertyFormValues["status"]; label: string; color: string }[] = [
    { value: "OCCUPIED", label: "Occupied", color: "bg-[#B8A074]/10 text-[#B8A074] border-[#B8A074]/30" },
    { value: "VACANT", label: "Vacant", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    { value: "MAINTENANCE", label: "Maintenance", color: "bg-orange-50 text-orange-700 border-orange-200" },
]

interface LlcOption {
    id: string
    name: string
    formationState: string | null
    owner: { fullName: string | null; email: string } | null
}

interface Props {
    mode: "create" | "edit"
    propertyId?: string
    initialValues?: Partial<PropertyFormValues>
}

const getToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("pasiflow_token") || ""
    }
    return ""
}

export function PropertyForm({ mode, propertyId, initialValues }: Props) {
    const router = useRouter()
    const isEditing = mode === "edit"

    const [form, setForm] = useState<PropertyFormValues>({ ...EMPTY, ...(initialValues || {}) })
    const [llcs, setLlcs] = useState<LlcOption[]>([])
    const [llcsLoading, setLlcsLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")

    const fetchLlcs = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/llcs", {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (res.ok) {
                const data = await res.json()
                setLlcs(data.llcs)
                // Auto-pick first LLC if none selected
                setForm(f => (f.llcId ? f : { ...f, llcId: data.llcs[0]?.id || "" }))
            }
        } catch (e) {
            console.error("Failed to load LLCs:", e)
        } finally {
            setLlcsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchLlcs()
    }, [fetchLlcs])

    const update = <K extends keyof PropertyFormValues>(key: K, value: PropertyFormValues[K]) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError("")

        try {
            const payload: Record<string, unknown> = {
                address: form.address.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                zipCode: form.zipCode.trim(),
                purchasePrice: form.purchasePrice,
                currentValue: form.currentValue || null,
                monthlyRent: form.monthlyRent,
                status: form.status,
                tenantName: form.tenantName.trim() || null,
                leaseEnd: form.leaseEnd || null,
                paymentDay: form.paymentDay || null,
                imageUrl: form.imageUrl.trim() || null,
                purchaseDate: form.purchaseDate || null,
                llcId: form.llcId,
            }

            const url = isEditing ? `/api/admin/properties/${propertyId}` : "/api/admin/properties"
            const method = isEditing ? "PATCH" : "POST"

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(payload),
            })

            const data = await res.json()
            if (!res.ok) {
                setError(data.error || "Something went wrong")
                return
            }

            router.push("/admin/properties")
            router.refresh()
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!propertyId) return
        if (!confirm("Delete this property? This cannot be undone.")) return

        setDeleting(true)
        try {
            const res = await fetch(`/api/admin/properties/${propertyId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                setError(data.error || "Failed to delete property")
                return
            }
            router.push("/admin/properties")
            router.refresh()
        } catch {
            setError("Network error. Please try again.")
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="p-8 space-y-8 max-w-4xl">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="sm" className="gap-2">
                        <Link href="/admin/properties">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Link>
                    </Button>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {isEditing ? "Edit Property" : "Add Property"}
                        </h2>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {isEditing
                                ? "Update property details, tenant info, and assignment."
                                : "Add a new rental property to an existing LLC."}
                        </p>
                    </div>
                </div>
                {isEditing && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 gap-2"
                    >
                        {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        Delete
                    </Button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Address */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#B8A074]" />
                            Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label>Street Address</Label>
                            <Input
                                required
                                value={form.address}
                                onChange={e => update("address", e.target.value)}
                                placeholder="1234 Maple St"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>City</Label>
                            <Input
                                required
                                value={form.city}
                                onChange={e => update("city", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>State</Label>
                            <Input
                                required
                                value={form.state}
                                onChange={e => update("state", e.target.value)}
                                placeholder="MI"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Zip Code</Label>
                            <Input
                                required
                                value={form.zipCode}
                                onChange={e => update("zipCode", e.target.value)}
                                placeholder="48201"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Image URL (optional)</Label>
                            <Input
                                type="url"
                                value={form.imageUrl}
                                onChange={e => update("imageUrl", e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Financials */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Financials</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label>Purchase Price ($)</Label>
                            <Input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.purchasePrice}
                                onChange={e => update("purchasePrice", e.target.value)}
                                placeholder="85000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Current Value ($)</Label>
                            <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.currentValue}
                                onChange={e => update("currentValue", e.target.value)}
                                placeholder="95000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Monthly Rent ($)</Label>
                            <Input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.monthlyRent}
                                onChange={e => update("monthlyRent", e.target.value)}
                                placeholder="1200"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Purchase Date</Label>
                            <Input
                                type="date"
                                value={form.purchaseDate}
                                onChange={e => update("purchaseDate", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Payment Day of Month</Label>
                            <Input
                                type="number"
                                min="1"
                                max="31"
                                value={form.paymentDay}
                                onChange={e => update("paymentDay", e.target.value)}
                                placeholder="1"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Tenant & Status */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Tenant & Status</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label>Status</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {STATUS_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => update("status", opt.value)}
                                        className={cn(
                                            "py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all",
                                            form.status === opt.value
                                                ? "border-[#C1A05E] bg-[#C1A05E]/10 text-[#C1A05E]"
                                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Tenant Name</Label>
                            <Input
                                value={form.tenantName}
                                onChange={e => update("tenantName", e.target.value)}
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Lease End Date</Label>
                            <Input
                                type="date"
                                value={form.leaseEnd}
                                onChange={e => update("leaseEnd", e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Assignment */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">LLC Assignment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {llcsLoading ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading LLCs…
                            </div>
                        ) : llcs.length === 0 ? (
                            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                                No LLCs in the system. Create an LLC before adding properties.
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label>Owning LLC</Label>
                                <select
                                    required
                                    value={form.llcId}
                                    onChange={e => update("llcId", e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="" disabled>Select an LLC</option>
                                    {llcs.map(llc => (
                                        <option key={llc.id} value={llc.id}>
                                            {llc.name}
                                            {llc.formationState ? ` (${llc.formationState})` : ""}
                                            {llc.owner?.fullName ? ` — ${llc.owner.fullName}` : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3 pt-2">
                    <Button asChild type="button" variant="outline">
                        <Link href="/admin/properties">Cancel</Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={saving || llcsLoading || llcs.length === 0}
                        className="bg-[#C1A05E] hover:bg-[#a38d5d] text-white min-w-[160px] gap-2"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isEditing ? (
                            "Save Changes"
                        ) : (
                            "Create Property"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
