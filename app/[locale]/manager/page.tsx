"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plus,
    Trash2,
    Pencil,
    Upload,
    X,
    ArrowLeft,
    ArrowRight,
    Save,
    Send,
    CheckCircle2,
    AlertCircle,
    DollarSign,
    Home as HomeIcon,
    Wrench,
    ImageIcon,
    Calculator,
    ClipboardCheck,
    MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ───────────────── Business constants ─────────────────
const DOWN_PAYMENT_PCT = 0.20
const CLOSING_COST_PCT = 0.07 // of loan amount
const PASIFLOW_FEE = 5000
const MGMT_FEE_PCT = 0.10
const LOAN_TERM_YEARS = 30

const PROPERTY_TYPES = ["Single Family", "Multi-Family", "Duplex", "Triplex"]

// ───────────────── Types ─────────────────
type Listing = {
    id: string
    address: string
    price: number
    bedrooms: number
    bathrooms: number
    sqft: number | null
    landSize: string | null
    propertyType: string
    yearBuilt: number | null
    monthlyRent: number
    dscrRate: number
    annualTaxes: number
    annualInsurance: number
    renovationItems: string
    renovationNotes: string | null
    beforePhotos: string
    afterPhotos: string
    status: string
    createdAt: string
}

type DraftListing = {
    id?: string
    address: string
    price: number | ""
    bedrooms: number | ""
    bathrooms: number | ""
    sqft: number | ""
    landSize: string
    propertyType: string
    yearBuilt: number | ""
    monthlyRent: number | ""
    dscrRate: number | ""
    annualTaxes: number | ""
    annualInsurance: number | ""
    renovationItems: string[]
    renovationNotes: string
    beforePhotos: string[]
    afterPhotos: string[]
    status: "draft" | "published"
}

const EMPTY_DRAFT: DraftListing = {
    address: "",
    price: "",
    bedrooms: 3,
    bathrooms: 1,
    sqft: "",
    landSize: "",
    propertyType: "Single Family",
    yearBuilt: "",
    monthlyRent: "",
    dscrRate: 7.5,
    annualTaxes: "",
    annualInsurance: "",
    renovationItems: [],
    renovationNotes: "",
    beforePhotos: [],
    afterPhotos: [],
    status: "draft",
}

// ───────────────── DSCR math ─────────────────
function calcMonthlyMortgage(principal: number, annualRate: number): number {
    if (annualRate <= 0 || principal <= 0) return 0
    const r = annualRate / 100 / 12
    const n = LOAN_TERM_YEARS * 12
    return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
}

function analyzeDeal(input: {
    price: number
    monthlyRent: number
    dscrRate: number
    annualTaxes: number
    annualInsurance: number
}) {
    const { price, monthlyRent, dscrRate, annualTaxes, annualInsurance } = input
    const downPayment = price * DOWN_PAYMENT_PCT
    const loanAmount = price - downPayment
    const closingCost = loanAmount * CLOSING_COST_PCT
    const totalCashNeeded = downPayment + closingCost + PASIFLOW_FEE
    const monthlyMortgage = calcMonthlyMortgage(loanAmount, dscrRate)
    const monthlyTaxes = annualTaxes / 12
    const monthlyInsurance = annualInsurance / 12
    const mgmtFee = monthlyRent * MGMT_FEE_PCT
    const netMonthly = monthlyRent - monthlyMortgage - monthlyTaxes - monthlyInsurance - mgmtFee
    const netAnnual = netMonthly * 12
    const cocReturn = totalCashNeeded > 0 ? (netAnnual / totalCashNeeded) * 100 : 0
    return {
        downPayment,
        loanAmount,
        closingCost,
        totalCashNeeded,
        monthlyMortgage,
        monthlyTaxes,
        monthlyInsurance,
        mgmtFee,
        netMonthly,
        netAnnual,
        cocReturn,
    }
}

function money(n: number, opts: { sign?: boolean; decimals?: number } = {}) {
    const { sign, decimals = 0 } = opts
    if (!isFinite(n)) return "$0"
    const abs = Math.abs(n)
    const fmt = abs.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
    const symbol = sign && n < 0 ? "-$" : "$"
    return `${symbol}${fmt}`
}

const STEPS = [
    { key: "property", label: "Property", icon: HomeIcon },
    { key: "renovation", label: "Renovation", icon: Wrench },
    { key: "photos", label: "Photos", icon: ImageIcon },
    { key: "pricing", label: "Pricing & DSCR", icon: Calculator },
    { key: "review", label: "Review & Publish", icon: ClipboardCheck },
] as const

type StepKey = typeof STEPS[number]["key"]

// ═════════════════════ MAIN ═════════════════════
export default function ManagerPage() {
    const [view, setView] = useState<"list" | "wizard">("list")
    const [listings, setListings] = useState<Listing[]>([])
    const [loadingList, setLoadingList] = useState(true)
    const [draft, setDraft] = useState<DraftListing>(EMPTY_DRAFT)
    const [editingId, setEditingId] = useState<string | null>(null)

    const fetchListings = useCallback(async () => {
        setLoadingList(true)
        try {
            const token = localStorage.getItem("pasiflow_token")
            const res = await fetch("/api/listings", {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            if (res.ok) setListings(data.listings ?? [])
        } catch (e) {
            console.error("Fetch listings error", e)
        } finally {
            setLoadingList(false)
        }
    }, [])

    useEffect(() => {
        fetchListings()
    }, [fetchListings])

    useEffect(() => {
        const onSidebarNav = (e: Event) => {
            const detail = (e as CustomEvent).detail as "list" | "new"
            if (detail === "list") {
                setView("list")
            } else if (detail === "new") {
                setDraft(EMPTY_DRAFT)
                setEditingId(null)
                setView("wizard")
            }
        }
        window.addEventListener("manager:view", onSidebarNav)
        return () => window.removeEventListener("manager:view", onSidebarNav)
    }, [])

    const startNew = () => {
        setDraft(EMPTY_DRAFT)
        setEditingId(null)
        setView("wizard")
    }

    const startEdit = (l: Listing) => {
        setDraft({
            address: l.address,
            price: l.price,
            bedrooms: l.bedrooms,
            bathrooms: l.bathrooms,
            sqft: l.sqft ?? "",
            landSize: l.landSize ?? "",
            propertyType: l.propertyType,
            yearBuilt: l.yearBuilt ?? "",
            monthlyRent: l.monthlyRent,
            dscrRate: l.dscrRate,
            annualTaxes: l.annualTaxes,
            annualInsurance: l.annualInsurance,
            renovationItems: safeParseArray(l.renovationItems),
            renovationNotes: l.renovationNotes ?? "",
            beforePhotos: safeParseArray(l.beforePhotos),
            afterPhotos: safeParseArray(l.afterPhotos),
            status: (l.status as "draft" | "published") ?? "draft",
        })
        setEditingId(l.id)
        setView("wizard")
    }

    const deleteListing = async (id: string) => {
        if (!confirm("Delete this listing?")) return
        const token = localStorage.getItem("pasiflow_token")
        const res = await fetch(`/api/listings/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
            setListings((prev) => prev.filter((l) => l.id !== id))
        }
    }

    if (view === "list") {
        return (
            <ListingsList
                listings={listings}
                loading={loadingList}
                onAdd={startNew}
                onEdit={startEdit}
                onDelete={deleteListing}
            />
        )
    }

    return (
        <Wizard
            draft={draft}
            setDraft={setDraft}
            editingId={editingId}
            onExit={() => {
                setView("list")
                fetchListings()
            }}
        />
    )
}

function safeParseArray(s: string | null | undefined): string[] {
    if (!s) return []
    try {
        const parsed = JSON.parse(s)
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

// ═════════════════════ LISTINGS LIST ═════════════════════
function ListingsList({
    listings,
    loading,
    onAdd,
    onEdit,
    onDelete,
}: {
    listings: Listing[]
    loading: boolean
    onAdd: () => void
    onEdit: (l: Listing) => void
    onDelete: (id: string) => void
}) {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1F2328] tracking-tight">Listings</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage Detroit wholesale pipeline — drafts and published deals.
                    </p>
                </div>
                <Button
                    onClick={onAdd}
                    className="bg-[#1F2328] hover:bg-[#2D353F] text-white rounded-xl h-11 px-5 gap-2 shadow-lg shadow-[#1F2328]/10"
                >
                    <Plus size={16} /> Add new listing
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="rounded-2xl bg-white border border-slate-200 p-6 h-48 animate-pulse" />
                    ))}
                </div>
            ) : listings.length === 0 ? (
                <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-16 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#C1A05E]/10 flex items-center justify-center mb-4">
                        <HomeIcon className="w-7 h-7 text-[#C1A05E]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1F2328]">No listings yet</h3>
                    <p className="text-sm text-slate-500 mt-1 mb-6">
                        Add your first Detroit property to start the pipeline.
                    </p>
                    <Button onClick={onAdd} className="bg-[#C1A05E] hover:bg-[#a38d5d] text-white rounded-xl gap-2">
                        <Plus size={16} /> Add new listing
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {listings.map((l) => {
                        const dealMath = analyzeDeal({
                            price: l.price,
                            monthlyRent: l.monthlyRent,
                            dscrRate: l.dscrRate,
                            annualTaxes: l.annualTaxes,
                            annualInsurance: l.annualInsurance,
                        })
                        const photos = safeParseArray(l.afterPhotos)
                        const cover = photos[0] || safeParseArray(l.beforePhotos)[0]
                        return (
                            <motion.div
                                key={l.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="rounded-2xl bg-white border border-slate-200 hover:border-[#C1A05E]/40 hover:shadow-xl transition-all overflow-hidden group"
                            >
                                <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200">
                                    {cover ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={cover} alt={l.address} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <ImageIcon size={36} />
                                        </div>
                                    )}
                                    <span
                                        className={cn(
                                            "absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                                            l.status === "published"
                                                ? "bg-green-500/90 text-white"
                                                : "bg-slate-700/80 text-white"
                                        )}
                                    >
                                        {l.status}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start gap-2 mb-3">
                                        <MapPin size={14} className="text-[#C1A05E] mt-0.5 flex-shrink-0" />
                                        <h3 className="text-sm font-semibold text-[#1F2328] line-clamp-2 leading-tight">
                                            {l.address}
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <Stat label="Price" value={money(l.price)} />
                                        <Stat label="Rent" value={money(l.monthlyRent) + "/mo"} />
                                        <Stat
                                            label="CoC"
                                            value={`${dealMath.cocReturn.toFixed(1)}%`}
                                            highlight
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-3 border-t border-slate-100">
                                        <button
                                            onClick={() => onEdit(l)}
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-[#1F2328] hover:bg-slate-100 transition-colors"
                                        >
                                            <Pencil size={13} /> Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(l.id)}
                                            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <Trash2 size={13} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{label}</div>
            <div
                className={cn(
                    "text-sm font-bold mt-0.5",
                    highlight ? "text-[#C1A05E]" : "text-[#1F2328]"
                )}
            >
                {value}
            </div>
        </div>
    )
}

// ═════════════════════ WIZARD ═════════════════════
function Wizard({
    draft,
    setDraft,
    editingId,
    onExit,
}: {
    draft: DraftListing
    setDraft: React.Dispatch<React.SetStateAction<DraftListing>>
    editingId: string | null
    onExit: () => void
}) {
    const [stepIdx, setStepIdx] = useState(0)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const step = STEPS[stepIdx]

    const canGoNext = useMemo(() => {
        if (step.key === "property") {
            return Boolean(draft.address && Number(draft.price) > 0)
        }
        if (step.key === "pricing") {
            return Number(draft.monthlyRent) > 0 && Number(draft.dscrRate) > 0
        }
        return true
    }, [step.key, draft.address, draft.price, draft.monthlyRent, draft.dscrRate])

    const save = async (status: "draft" | "published") => {
        setSaving(true)
        setError(null)
        try {
            const token = localStorage.getItem("pasiflow_token")
            const payload = {
                ...draft,
                price: Number(draft.price) || 0,
                bedrooms: Number(draft.bedrooms) || 0,
                bathrooms: Number(draft.bathrooms) || 0,
                sqft: draft.sqft === "" ? null : Number(draft.sqft),
                yearBuilt: draft.yearBuilt === "" ? null : Number(draft.yearBuilt),
                monthlyRent: Number(draft.monthlyRent) || 0,
                dscrRate: Number(draft.dscrRate) || 0,
                annualTaxes: Number(draft.annualTaxes) || 0,
                annualInsurance: Number(draft.annualInsurance) || 0,
                landSize: draft.landSize || null,
                renovationNotes: draft.renovationNotes || null,
                status,
            }

            const url = editingId ? `/api/listings/${editingId}` : "/api/listings"
            const method = editingId ? "PUT" : "POST"

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Failed to save")
            onExit()
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Save failed")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onExit}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#1F2328] transition-colors font-medium"
                >
                    <ArrowLeft size={16} /> Back to listings
                </button>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    {editingId ? "Editing listing" : "New listing"}
                </span>
            </div>

            <StepIndicator currentIdx={stepIdx} onJump={setStepIdx} />

            <div className="mt-8 rounded-3xl bg-white border border-slate-200 shadow-sm p-6 md:p-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.key}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {step.key === "property" && <StepProperty draft={draft} setDraft={setDraft} />}
                        {step.key === "renovation" && <StepRenovation draft={draft} setDraft={setDraft} />}
                        {step.key === "photos" && <StepPhotos draft={draft} setDraft={setDraft} />}
                        {step.key === "pricing" && <StepPricing draft={draft} setDraft={setDraft} />}
                        {step.key === "review" && <StepReview draft={draft} />}
                    </motion.div>
                </AnimatePresence>

                {error && (
                    <div className="mt-6 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                {/* Footer */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <Button
                        variant="outline"
                        disabled={stepIdx === 0}
                        onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                        className="rounded-xl h-11 px-5 gap-2 border-slate-300 text-[#1F2328]"
                    >
                        <ArrowLeft size={16} /> Previous
                    </Button>

                    {stepIdx < STEPS.length - 1 ? (
                        <Button
                            disabled={!canGoNext}
                            onClick={() => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))}
                            className="rounded-xl h-11 px-5 gap-2 bg-[#1F2328] hover:bg-[#2D353F] text-white"
                        >
                            Next <ArrowRight size={16} />
                        </Button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                disabled={saving}
                                onClick={() => save("draft")}
                                className="rounded-xl h-11 px-5 gap-2 border-slate-300 text-[#1F2328]"
                            >
                                <Save size={16} /> Save as Draft
                            </Button>
                            <Button
                                disabled={saving}
                                onClick={() => save("published")}
                                className="rounded-xl h-11 px-5 gap-2 bg-[#C1A05E] hover:bg-[#a38d5d] text-white shadow-lg shadow-[#C1A05E]/20"
                            >
                                <Send size={16} /> Publish listing
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function StepIndicator({ currentIdx, onJump }: { currentIdx: number; onJump: (i: number) => void }) {
    return (
        <div className="hidden md:flex items-center gap-2">
            {STEPS.map((s, i) => {
                const Icon = s.icon
                const active = i === currentIdx
                const done = i < currentIdx
                return (
                    <button
                        key={s.key}
                        onClick={() => onJump(i)}
                        className={cn(
                            "flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all text-left",
                            active && "border-[#C1A05E] bg-[#C1A05E]/5 shadow-sm",
                            done && "border-emerald-200 bg-emerald-50/50",
                            !active && !done && "border-slate-200 bg-white hover:border-slate-300"
                        )}
                    >
                        <div
                            className={cn(
                                "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0",
                                active && "bg-[#C1A05E] text-white",
                                done && "bg-emerald-500 text-white",
                                !active && !done && "bg-slate-100 text-slate-500"
                            )}
                        >
                            {done ? <CheckCircle2 size={16} /> : <Icon size={14} />}
                        </div>
                        <div className="min-w-0">
                            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                                Step {i + 1}
                            </div>
                            <div
                                className={cn(
                                    "text-sm font-semibold truncate",
                                    active ? "text-[#1F2328]" : done ? "text-emerald-700" : "text-slate-600"
                                )}
                            >
                                {s.label}
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

// ───────────────── Step 1: Property ─────────────────
function StepProperty({
    draft,
    setDraft,
}: {
    draft: DraftListing
    setDraft: React.Dispatch<React.SetStateAction<DraftListing>>
}) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#1F2328]">Property details</h2>
                <p className="text-sm text-slate-500 mt-1">Where is it, and what are the basics?</p>
            </div>

            <FieldRow>
                <Field label="Property Address" full>
                    <Input
                        value={draft.address}
                        onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
                        placeholder="12152 Stout Street, Detroit, MI 48228"
                    />
                </Field>
            </FieldRow>

            <FieldRow>
                <Field label="Asking Price ($)">
                    <Input
                        type="number"
                        value={draft.price}
                        onChange={(e) =>
                            setDraft((d) => ({ ...d, price: e.target.value === "" ? "" : Number(e.target.value) }))
                        }
                        placeholder="85900"
                    />
                </Field>
                <Field label="Property Type">
                    <Select
                        value={draft.propertyType}
                        onValueChange={(v) => setDraft((d) => ({ ...d, propertyType: v }))}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {PROPERTY_TYPES.map((t) => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            </FieldRow>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Field label="Bedrooms">
                    <Input
                        type="number"
                        value={draft.bedrooms}
                        onChange={(e) =>
                            setDraft((d) => ({ ...d, bedrooms: e.target.value === "" ? "" : Number(e.target.value) }))
                        }
                    />
                </Field>
                <Field label="Bathrooms">
                    <Input
                        type="number"
                        step="0.5"
                        value={draft.bathrooms}
                        onChange={(e) =>
                            setDraft((d) => ({ ...d, bathrooms: e.target.value === "" ? "" : Number(e.target.value) }))
                        }
                    />
                </Field>
                <Field label="Sqft">
                    <Input
                        type="number"
                        value={draft.sqft}
                        onChange={(e) =>
                            setDraft((d) => ({ ...d, sqft: e.target.value === "" ? "" : Number(e.target.value) }))
                        }
                        placeholder="1200"
                    />
                </Field>
                <Field label="Land Size">
                    <Input
                        value={draft.landSize}
                        onChange={(e) => setDraft((d) => ({ ...d, landSize: e.target.value }))}
                        placeholder="0.10 acres"
                    />
                </Field>
            </div>

            <FieldRow>
                <Field label="Year Built">
                    <Input
                        type="number"
                        value={draft.yearBuilt}
                        onChange={(e) =>
                            setDraft((d) => ({
                                ...d,
                                yearBuilt: e.target.value === "" ? "" : Number(e.target.value),
                            }))
                        }
                        placeholder="1950"
                    />
                </Field>
            </FieldRow>
        </div>
    )
}

// ───────────────── Step 2: Renovation ─────────────────
function StepRenovation({
    draft,
    setDraft,
}: {
    draft: DraftListing
    setDraft: React.Dispatch<React.SetStateAction<DraftListing>>
}) {
    const [item, setItem] = useState("")

    const addItem = () => {
        const trimmed = item.trim()
        if (!trimmed) return
        setDraft((d) => ({ ...d, renovationItems: [...d.renovationItems, trimmed] }))
        setItem("")
    }

    const removeItem = (idx: number) =>
        setDraft((d) => ({ ...d, renovationItems: d.renovationItems.filter((_, i) => i !== idx) }))

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-[#1F2328]">Renovation scope</h2>
                <p className="text-sm text-slate-500 mt-1">
                    What work was done? Investors love a detailed scope.
                </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-5">
                <Label className="text-sm font-semibold mb-3 block">Renovation Items</Label>
                <div className="flex gap-2">
                    <Input
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="e.g. New roof, kitchen remodel..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                addItem()
                            }
                        }}
                    />
                    <Button
                        type="button"
                        onClick={addItem}
                        className="bg-[#1F2328] hover:bg-[#2D353F] text-white rounded-xl gap-2 flex-shrink-0"
                    >
                        <Plus size={16} /> Add
                    </Button>
                </div>

                {draft.renovationItems.length > 0 && (
                    <ul className="mt-4 space-y-2">
                        {draft.renovationItems.map((it, i) => (
                            <motion.li
                                key={`${it}-${i}`}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C1A05E]" />
                                    <span className="text-sm text-[#1F2328]">{it}</span>
                                </div>
                                <button
                                    onClick={() => removeItem(i)}
                                    className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X size={14} />
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </div>

            <Field label="Additional Notes">
                <Textarea
                    rows={5}
                    value={draft.renovationNotes}
                    onChange={(e) => setDraft((d) => ({ ...d, renovationNotes: e.target.value }))}
                    placeholder="Any context the investor should know — permits, warranties, materials..."
                />
            </Field>
        </div>
    )
}

// ───────────────── Step 3: Photos ─────────────────
function StepPhotos({
    draft,
    setDraft,
}: {
    draft: DraftListing
    setDraft: React.Dispatch<React.SetStateAction<DraftListing>>
}) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-[#1F2328]">Before & after photos</h2>
                <p className="text-sm text-slate-500 mt-1">Drag &amp; drop or click to upload. JPG, PNG, WEBP up to 8 MB.</p>
            </div>

            <PhotoSet
                label="Before Photos"
                accentBefore
                photos={draft.beforePhotos}
                onChange={(photos) => setDraft((d) => ({ ...d, beforePhotos: photos }))}
            />

            <PhotoSet
                label="After Photos"
                photos={draft.afterPhotos}
                onChange={(photos) => setDraft((d) => ({ ...d, afterPhotos: photos }))}
            />
        </div>
    )
}

function PhotoSet({
    label,
    photos,
    onChange,
    accentBefore,
}: {
    label: string
    photos: string[]
    onChange: (photos: string[]) => void
    accentBefore?: boolean
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [dragOver, setDragOver] = useState(false)
    const [uploading, setUploading] = useState(false)

    const uploadFiles = async (files: FileList | File[]) => {
        const list = Array.from(files)
        if (list.length === 0) return
        setUploading(true)
        const token = localStorage.getItem("pasiflow_token")
        const uploaded: string[] = []
        for (const file of list) {
            try {
                const fd = new FormData()
                fd.append("file", file)
                const res = await fetch("/api/upload", {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: fd,
                })
                const data = await res.json()
                if (res.ok && data.url) uploaded.push(data.url)
            } catch (e) {
                console.error("Upload error", e)
            }
        }
        if (uploaded.length) onChange([...photos, ...uploaded])
        setUploading(false)
    }

    const removeAt = (idx: number) => onChange(photos.filter((_, i) => i !== idx))

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-semibold">{label}</Label>
                <span className="text-xs text-slate-400">{photos.length} uploaded</span>
            </div>

            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault()
                    setDragOver(false)
                    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files)
                }}
                className={cn(
                    "relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-10 cursor-pointer transition-all",
                    dragOver
                        ? "border-[#C1A05E] bg-[#C1A05E]/5"
                        : accentBefore
                            ? "border-slate-200 hover:border-slate-400 bg-slate-50/30"
                            : "border-[#C1A05E]/30 hover:border-[#C1A05E] bg-[#C1A05E]/5"
                )}
            >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                    <Upload size={20} />
                </div>
                <div className="text-sm font-semibold text-[#1F2328]">
                    {uploading ? "Uploading..." : "Drop files or click to browse"}
                </div>
                <div className="text-xs text-slate-400">JPG, PNG, WEBP — up to 8 MB each</div>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files?.length) uploadFiles(e.target.files)
                        e.target.value = ""
                    }}
                />
            </div>

            {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {photos.map((url, i) => (
                        <motion.div
                            key={url}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square rounded-xl overflow-hidden group bg-slate-100"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeAt(i)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}

// ───────────────── Step 4: Pricing & DSCR ─────────────────
function StepPricing({
    draft,
    setDraft,
}: {
    draft: DraftListing
    setDraft: React.Dispatch<React.SetStateAction<DraftListing>>
}) {
    const math = analyzeDeal({
        price: Number(draft.price) || 0,
        monthlyRent: Number(draft.monthlyRent) || 0,
        dscrRate: Number(draft.dscrRate) || 0,
        annualTaxes: Number(draft.annualTaxes) || 0,
        annualInsurance: Number(draft.annualInsurance) || 0,
    })

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-[#1F2328]">Pricing & DSCR analysis</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Live cashflow calculator — recalculates as you type.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left — inputs */}
                <div className="space-y-4">
                    <Field label="Monthly Rental Income ($)">
                        <Input
                            type="number"
                            value={draft.monthlyRent}
                            onChange={(e) =>
                                setDraft((d) => ({
                                    ...d,
                                    monthlyRent: e.target.value === "" ? "" : Number(e.target.value),
                                }))
                            }
                            placeholder="1160"
                        />
                    </Field>
                    <Field label="DSCR Rate (%)">
                        <Input
                            type="number"
                            step="0.01"
                            value={draft.dscrRate}
                            onChange={(e) =>
                                setDraft((d) => ({
                                    ...d,
                                    dscrRate: e.target.value === "" ? "" : Number(e.target.value),
                                }))
                            }
                            placeholder="7.5"
                        />
                    </Field>
                    <Field label="Annual Taxes ($)">
                        <Input
                            type="number"
                            value={draft.annualTaxes}
                            onChange={(e) =>
                                setDraft((d) => ({
                                    ...d,
                                    annualTaxes: e.target.value === "" ? "" : Number(e.target.value),
                                }))
                            }
                            placeholder="2400"
                        />
                    </Field>
                    <Field label="Annual Insurance ($)">
                        <Input
                            type="number"
                            value={draft.annualInsurance}
                            onChange={(e) =>
                                setDraft((d) => ({
                                    ...d,
                                    annualInsurance: e.target.value === "" ? "" : Number(e.target.value),
                                }))
                            }
                            placeholder="1200"
                        />
                    </Field>
                </div>

                {/* Right — live calculator */}
                <div className="rounded-3xl bg-[#1F2328] text-white p-6 md:p-7 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#C1A05E]/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#C1A05E] font-bold mb-4">
                            Live Cashflow Analysis
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <MetricCard label="Net Monthly" value={money(math.netMonthly)} accent />
                            <MetricCard label="Net Annual" value={money(math.netAnnual)} accent />
                            <MetricCard label="Cash-on-Cash" value={`${math.cocReturn.toFixed(1)}%`} accent gold />
                        </div>

                        {/* Purchase breakdown */}
                        <div className="rounded-2xl bg-white/5 p-4 mb-4">
                            <div className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">
                                Purchase Breakdown
                            </div>
                            <BreakdownRow label="Price" value={money(Number(draft.price) || 0)} />
                            <BreakdownRow label="Down Payment (20%)" value={money(math.downPayment)} />
                            <BreakdownRow label="Loan Amount" value={money(math.loanAmount)} />
                            <BreakdownRow label="Closing Cost (7%)" value={money(math.closingCost)} />
                            <BreakdownRow label="Pasiflow Fee" value={money(PASIFLOW_FEE)} />
                            <BreakdownRow
                                label="TOTAL CASH TO INVEST"
                                value={money(math.totalCashNeeded)}
                                bold
                                emphasize
                            />
                        </div>

                        {/* Monthly cashflow */}
                        <div className="rounded-2xl bg-white/5 p-4">
                            <div className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">
                                Monthly Cashflow
                            </div>
                            <BreakdownRow label="Gross Rental Income" value={money(Number(draft.monthlyRent) || 0)} />
                            <BreakdownRow label="DSCR Mortgage" value={`- ${money(math.monthlyMortgage)}`} negative />
                            <BreakdownRow label="Taxes" value={`- ${money(math.monthlyTaxes)}`} negative />
                            <BreakdownRow label="Insurance" value={`- ${money(math.monthlyInsurance)}`} negative />
                            <BreakdownRow label="Mgmt Fee (10%)" value={`- ${money(math.mgmtFee)}`} negative />
                            <BreakdownRow label="NET MONTHLY" value={money(math.netMonthly)} bold emphasize />
                            <BreakdownRow label="NET ANNUAL" value={money(math.netAnnual)} bold emphasize />
                        </div>

                        <div className="mt-4 px-4 py-3 rounded-xl bg-[#C1A05E]/10 border border-[#C1A05E]/30 text-xs">
                            <span className="text-white/60">CoC formula:</span>{" "}
                            <span className="text-white font-mono">
                                {money(math.netAnnual)} ÷ {money(math.totalCashNeeded)} ={" "}
                                <span className="text-[#C1A05E] font-bold">{math.cocReturn.toFixed(1)}%</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MetricCard({
    label,
    value,
    accent,
    gold,
}: {
    label: string
    value: string
    accent?: boolean
    gold?: boolean
}) {
    return (
        <div
            className={cn(
                "rounded-2xl p-3.5 text-center",
                accent ? "bg-white/8 border border-white/10" : "bg-slate-50"
            )}
        >
            <div className="text-[9px] uppercase tracking-wider text-white/40 font-semibold mb-1">{label}</div>
            <div className={cn("text-lg font-bold tracking-tight", gold ? "text-[#C1A05E]" : "text-white")}>
                {value}
            </div>
        </div>
    )
}

function BreakdownRow({
    label,
    value,
    bold,
    emphasize,
    negative,
}: {
    label: string
    value: string
    bold?: boolean
    emphasize?: boolean
    negative?: boolean
}) {
    return (
        <div
            className={cn(
                "flex items-center justify-between py-1.5 text-sm",
                emphasize && "border-t border-white/10 mt-2 pt-3"
            )}
        >
            <span className={cn("text-white/60", bold && "text-white/90 font-semibold uppercase text-xs tracking-wider")}>
                {label}
            </span>
            <span
                className={cn(
                    "font-mono tabular-nums",
                    bold ? "text-[#C1A05E] font-bold text-base" : negative ? "text-red-300/90" : "text-white"
                )}
            >
                {value}
            </span>
        </div>
    )
}

// ───────────────── Step 5: Review & Publish ─────────────────
function StepReview({ draft }: { draft: DraftListing }) {
    const math = analyzeDeal({
        price: Number(draft.price) || 0,
        monthlyRent: Number(draft.monthlyRent) || 0,
        dscrRate: Number(draft.dscrRate) || 0,
        annualTaxes: Number(draft.annualTaxes) || 0,
        annualInsurance: Number(draft.annualInsurance) || 0,
    })

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-xl font-bold text-[#1F2328]">Review & publish</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Make sure everything looks right before publishing.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left — summary */}
                <div className="space-y-5">
                    <SummaryCard title="Property" icon={HomeIcon}>
                        <SummaryRow label="Address" value={draft.address || "—"} />
                        <SummaryRow label="Price" value={money(Number(draft.price) || 0)} />
                        <SummaryRow
                            label="Type"
                            value={`${draft.propertyType} · ${draft.bedrooms || 0}bd / ${draft.bathrooms || 0}ba`}
                        />
                        <SummaryRow
                            label="Size"
                            value={`${draft.sqft || "—"} sqft · ${draft.landSize || "—"}`}
                        />
                        <SummaryRow label="Year Built" value={String(draft.yearBuilt || "—")} />
                    </SummaryCard>

                    <SummaryCard title="Renovation Items" icon={Wrench}>
                        {draft.renovationItems.length === 0 ? (
                            <p className="text-sm text-slate-400 italic">No items added</p>
                        ) : (
                            <ul className="space-y-1.5">
                                {draft.renovationItems.map((it, i) => (
                                    <li key={i} className="text-sm text-[#1F2328] flex gap-2">
                                        <span className="text-[#C1A05E]">•</span>
                                        {it}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SummaryCard>

                    <SummaryCard title="Photos" icon={ImageIcon}>
                        <SummaryRow label="Before" value={`${draft.beforePhotos.length} photos`} />
                        <SummaryRow label="After" value={`${draft.afterPhotos.length} photos`} />
                    </SummaryCard>
                </div>

                {/* Right — financial summary */}
                <div className="space-y-5">
                    <SummaryCard title="Financial Analysis" icon={Calculator} dark>
                        <SummaryRow label="Monthly Rent" value={money(Number(draft.monthlyRent) || 0)} dark />
                        <SummaryRow label="DSCR Rate" value={`${draft.dscrRate || 0}%`} dark />
                        <SummaryRow label="Net Monthly" value={money(math.netMonthly)} dark bold />
                        <SummaryRow label="Net Annual" value={money(math.netAnnual)} dark bold />
                        <SummaryRow
                            label="Cash-on-Cash Return"
                            value={`${math.cocReturn.toFixed(1)}%`}
                            dark
                            highlight
                        />
                    </SummaryCard>

                    <SummaryCard title="Client Cash Out of Pocket" icon={DollarSign}>
                        <SummaryRow label="Down Payment (20%)" value={money(math.downPayment)} />
                        <SummaryRow label="Closing Cost (7%)" value={money(math.closingCost)} />
                        <SummaryRow label="Pasiflow Fee" value={money(PASIFLOW_FEE)} />
                        <div className="border-t border-slate-200 mt-3 pt-3 flex items-center justify-between">
                            <span className="text-sm font-bold text-[#1F2328] uppercase tracking-wider">
                                Total to Wire
                            </span>
                            <span className="text-2xl font-bold text-red-600 tabular-nums">
                                {money(math.totalCashNeeded)}
                            </span>
                        </div>
                    </SummaryCard>
                </div>
            </div>
        </div>
    )
}

function SummaryCard({
    title,
    icon: Icon,
    dark,
    children,
}: {
    title: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    dark?: boolean
    children: React.ReactNode
}) {
    return (
        <div
            className={cn(
                "rounded-2xl p-5 border",
                dark ? "bg-[#1F2328] border-white/10 text-white" : "bg-white border-slate-200"
            )}
        >
            <div className="flex items-center gap-2 mb-4">
                <Icon size={14} className={cn(dark ? "text-[#C1A05E]" : "text-[#C1A05E]")} />
                <span
                    className={cn(
                        "text-[11px] uppercase tracking-[0.18em] font-bold",
                        dark ? "text-[#C1A05E]" : "text-slate-500"
                    )}
                >
                    {title}
                </span>
            </div>
            <div className="space-y-2">{children}</div>
        </div>
    )
}

function SummaryRow({
    label,
    value,
    dark,
    bold,
    highlight,
}: {
    label: string
    value: string
    dark?: boolean
    bold?: boolean
    highlight?: boolean
}) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className={cn(dark ? "text-white/50" : "text-slate-500")}>{label}</span>
            <span
                className={cn(
                    "font-semibold tabular-nums",
                    highlight && "text-[#C1A05E] text-base",
                    bold && !highlight && (dark ? "text-white" : "text-[#1F2328]"),
                    !bold && !highlight && (dark ? "text-white/90" : "text-[#1F2328]")
                )}
            >
                {value}
            </span>
        </div>
    )
}

// ───────────────── Form helpers ─────────────────
function FieldRow({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
}

function Field({
    label,
    children,
    full,
}: {
    label: string
    children: React.ReactNode
    full?: boolean
}) {
    return (
        <div className={cn("space-y-1.5", full && "md:col-span-2")}>
            <Label className="text-xs uppercase tracking-wider font-semibold text-slate-500">{label}</Label>
            {children}
        </div>
    )
}
