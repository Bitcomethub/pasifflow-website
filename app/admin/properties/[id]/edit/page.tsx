"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { PropertyForm, type PropertyFormValues } from "../../_property-form"

interface PropertyFromApi {
    id: string
    address: string
    city: string
    state: string
    zipCode: string
    purchasePrice: number
    currentValue: number | null
    monthlyRent: number
    status: string
    tenantName: string | null
    leaseEnd: string | null
    paymentDay: number | null
    imageUrl: string | null
    purchaseDate: string | null
    llcId: string
}

const toDateInput = (value: string | null): string => {
    if (!value) return ""
    const d = new Date(value)
    if (Number.isNaN(d.getTime())) return ""
    return d.toISOString().slice(0, 10)
}

const toFormValues = (p: PropertyFromApi): Partial<PropertyFormValues> => ({
    address: p.address,
    city: p.city,
    state: p.state,
    zipCode: p.zipCode,
    purchasePrice: String(p.purchasePrice),
    currentValue: p.currentValue != null ? String(p.currentValue) : "",
    monthlyRent: String(p.monthlyRent),
    status: (p.status === "VACANT" || p.status === "MAINTENANCE" ? p.status : "OCCUPIED") as PropertyFormValues["status"],
    tenantName: p.tenantName ?? "",
    leaseEnd: toDateInput(p.leaseEnd),
    paymentDay: p.paymentDay != null ? String(p.paymentDay) : "",
    imageUrl: p.imageUrl ?? "",
    purchaseDate: toDateInput(p.purchaseDate),
    llcId: p.llcId,
})

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router = useRouter()
    const [initial, setInitial] = useState<Partial<PropertyFormValues> | null>(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("pasiflow_token") || "" : ""
        ;(async () => {
            try {
                const res = await fetch(`/api/admin/properties/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (res.status === 404) {
                    setError("Property not found.")
                    return
                }
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}))
                    setError(data.error || "Failed to load property")
                    return
                }
                const data = await res.json()
                setInitial(toFormValues(data.property))
            } catch {
                setError("Network error loading property.")
            }
        })()
    }, [id])

    if (error) {
        return (
            <div className="p-8 max-w-2xl">
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
                <button
                    onClick={() => router.push("/admin/properties")}
                    className="mt-4 text-sm text-[#C1A05E] hover:underline"
                >
                    ← Back to Properties
                </button>
            </div>
        )
    }

    if (!initial) {
        return (
            <div className="p-8 flex items-center gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading property…</span>
            </div>
        )
    }

    return <PropertyForm mode="edit" propertyId={id} initialValues={initial} />
}
