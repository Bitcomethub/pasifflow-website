"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plus,
    Trash2,
    Upload,
    X,
    ArrowLeft,
    ArrowRight,
    AlertCircle,
} from "lucide-react"
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

function money(n: number, decimals = 0) {
    if (!isFinite(n)) return "$0"
    const fmt = Math.abs(n).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
    const sign = n < 0 ? "−" : ""
    return `${sign}$${fmt}`
}

const STEPS = [
    { key: "property", label: "Property", num: "01" },
    { key: "renovation", label: "Renovation", num: "02" },
    { key: "photos", label: "Photos", num: "03" },
    { key: "pricing", label: "Pricing & DSCR", num: "04" },
    { key: "review", label: "Review & Publish", num: "05" },
] as const

type StepKey = typeof STEPS[number]["key"]

// ═════════════════════ MAIN ═════════════════════
export default function ManagerPage() {
    const [view, setView] = useState<"list" | "wizard">("list")
    const [listings, setListings] = useState<Listing[]>([])
    const [loadingList, setLoadingList] = useState(true)
    const [draft, setDraft] = useState<DraftListing>(EMPTY_DRAFT)
    const [editingId, setEditingId] = useState<string | null>(null)

    // Notify layout sidebar of active view
    useEffect(() => {
        window.dispatchEvent(
            new CustomEvent("manager:active", { detail: view === "list" ? "list" : "new" })
        )
    }, [view])

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
        if (res.ok) setListings((prev) => prev.filter((l) => l.id !== id))
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
    const total = listings.length
    const published = listings.filter((l) => l.status === "published").length
    const drafts = total - published

    return (
        <div>
            {/* Header — editorial masthead */}
            <header className="flex items-end justify-between gap-6 pb-10 mb-12 border-b border-[#E2DDD0]">
                <div>
                    <div className="eyebrow">Pipeline · Detroit, MI</div>
                    <h1 className="display text-[clamp(48px,7vw,84px)] mt-3">
                        Listings<span className="italic text-[#C1A05E]">.</span>
                    </h1>
                    <p className="text-[15px] text-[#6C7585] mt-4 max-w-md leading-relaxed">
                        Wholesale pipeline — draft and publish deals for Pasiflow investors.
                    </p>
                </div>
                <button
                    onClick={onAdd}
                    className="hidden md:inline-flex items-center gap-2.5 px-5 py-3 bg-[#1F2328] hover:bg-[#0F1216] text-[#F6F4EE] text-[13px] font-medium tracking-tight transition-colors"
                >
                    <Plus size={14} strokeWidth={2.5} /> New listing
                </button>
            </header>

            {/* Counters strip — three editorial figures */}
            <div className="grid grid-cols-3 gap-px bg-[#E2DDD0] mb-14">
                <FigureCell label="Total" value={total} />
                <FigureCell label="Published" value={published} highlight />
                <FigureCell label="Drafts" value={drafts} />
            </div>

            {loading ? (
                <ul className="space-y-px">
                    {[0, 1, 2].map((i) => (
                        <li key={i} className="h-24 bg-[#EFEBE1] animate-pulse" />
                    ))}
                </ul>
            ) : listings.length === 0 ? (
                <EmptyState onAdd={onAdd} />
            ) : (
                <ListingTable listings={listings} onEdit={onEdit} onDelete={onDelete} />
            )}

            <button
                onClick={onAdd}
                className="md:hidden mt-10 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#1F2328] text-[#F6F4EE] text-[13px] font-medium"
            >
                <Plus size={14} strokeWidth={2.5} /> New listing
            </button>
        </div>
    )
}

function FigureCell({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
    return (
        <div className={cn("bg-[#F6F4EE] px-6 py-5", highlight && "bg-[#FBFAF6]")}>
            <div className="eyebrow text-[9px]">{label}</div>
            <div
                className={cn(
                    "display mt-2 text-[40px] leading-none tabular-nums",
                    highlight ? "text-[#C1A05E]" : "text-[#1F2328]"
                )}
            >
                {String(value).padStart(2, "0")}
            </div>
        </div>
    )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
    return (
        <div className="py-24 text-center border-t border-b border-[#E2DDD0]">
            <div className="eyebrow text-[#A8AEB6]">No listings yet</div>
            <p className="display text-[36px] mt-4 leading-tight max-w-md mx-auto">
                Start the first <span className="italic text-[#C1A05E]">deal</span>
            </p>
            <p className="text-[14px] text-[#6C7585] mt-3 max-w-sm mx-auto">
                Walk a Detroit property, draft the numbers, publish to the pipeline.
            </p>
            <button
                onClick={onAdd}
                className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-[#1F2328] text-[#F6F4EE] text-[13px] font-medium"
            >
                <Plus size={14} strokeWidth={2.5} /> New listing
            </button>
        </div>
    )
}

function ListingTable({
    listings,
    onEdit,
    onDelete,
}: {
    listings: Listing[]
    onEdit: (l: Listing) => void
    onDelete: (id: string) => void
}) {
    return (
        <div>
            {/* Column headings */}
            <div className="hidden md:grid grid-cols-[3rem_minmax(0,1fr)_8rem_8rem_5rem_5rem] gap-6 pb-3 border-b border-[#E2DDD0] eyebrow text-[#A8AEB6]">
                <div className="text-[9px]">№</div>
                <div className="text-[9px]">Address</div>
                <div className="text-[9px] text-right">Price</div>
                <div className="text-[9px] text-right">Rent</div>
                <div className="text-[9px] text-right">CoC</div>
                <div className="text-[9px] text-right">Status</div>
            </div>

            <ul>
                {listings.map((l, idx) => {
                    const math = analyzeDeal({
                        price: l.price,
                        monthlyRent: l.monthlyRent,
                        dscrRate: l.dscrRate,
                        annualTaxes: l.annualTaxes,
                        annualInsurance: l.annualInsurance,
                    })
                    const photos = safeParseArray(l.afterPhotos)
                    const cover = photos[0] || safeParseArray(l.beforePhotos)[0]
                    return (
                        <li
                            key={l.id}
                            className="group border-b border-[#E2DDD0] transition-colors hover:bg-[#FBFAF6]"
                        >
                            <div className="hidden md:grid grid-cols-[3rem_minmax(0,1fr)_8rem_8rem_5rem_5rem] gap-6 items-center py-5">
                                <div className="figure-numeral text-[15px] text-[#A8AEB6]">
                                    {String(idx + 1).padStart(2, "0")}
                                </div>
                                <button
                                    onClick={() => onEdit(l)}
                                    className="flex items-center gap-4 text-left min-w-0"
                                >
                                    <div className="w-14 h-14 flex-shrink-0 bg-[#EFEBE1] overflow-hidden">
                                        {cover ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={cover}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-[#A8AEB6]" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[15px] text-[#1F2328] truncate tracking-tight">
                                            {l.address}
                                        </div>
                                        <div className="text-[12px] text-[#6C7585] mt-0.5">
                                            {l.propertyType} · {l.bedrooms}bd / {l.bathrooms}ba
                                        </div>
                                    </div>
                                </button>
                                <div className="num text-[15px] text-right text-[#1F2328]">
                                    {money(l.price)}
                                </div>
                                <div className="num text-[14px] text-right text-[#6C7585]">
                                    {money(l.monthlyRent)}
                                    <span className="text-[11px] text-[#A8AEB6]">/mo</span>
                                </div>
                                <div className="num text-[16px] text-right text-[#C1A05E]">
                                    {math.cocReturn.toFixed(1)}%
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <StatusBadge status={l.status} />
                                    <button
                                        onClick={() => onDelete(l.id)}
                                        aria-label="Delete"
                                        className="text-[#A8AEB6] opacity-0 group-hover:opacity-100 hover:text-[#B04438] transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile card */}
                            <div className="md:hidden py-5 flex gap-4">
                                <button onClick={() => onEdit(l)} className="flex-1 min-w-0 text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="figure-numeral text-[13px] text-[#A8AEB6]">
                                            {String(idx + 1).padStart(2, "0")}
                                        </div>
                                        <StatusBadge status={l.status} />
                                    </div>
                                    <div className="text-[15px] text-[#1F2328] tracking-tight">{l.address}</div>
                                    <div className="text-[12px] text-[#6C7585] mt-1">
                                        {l.propertyType} · {l.bedrooms}bd / {l.bathrooms}ba
                                    </div>
                                    <div className="flex items-baseline gap-5 mt-3 text-[13px]">
                                        <span className="num text-[#1F2328]">{money(l.price)}</span>
                                        <span className="num text-[#6C7585]">
                                            {money(l.monthlyRent)}/mo
                                        </span>
                                        <span className="num text-[#C1A05E] text-[15px]">
                                            {math.cocReturn.toFixed(1)}%
                                        </span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => onDelete(l.id)}
                                    aria-label="Delete"
                                    className="text-[#A8AEB6] hover:text-[#B04438] self-start"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const published = status === "published"
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase font-semibold",
                published ? "text-[#C1A05E]" : "text-[#A8AEB6]"
            )}
        >
            <span
                className={cn(
                    "w-1 h-1 rounded-full",
                    published ? "bg-[#C1A05E]" : "bg-[#A8AEB6]"
                )}
            />
            {status}
        </span>
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
            {/* Top bar — back + context */}
            <div className="flex items-center justify-between mb-10">
                <button
                    onClick={onExit}
                    className="inline-flex items-center gap-2 text-[12px] tracking-tight text-[#6C7585] hover:text-[#1F2328] transition-colors"
                >
                    <ArrowLeft size={14} /> Back to listings
                </button>
                <span className="eyebrow text-[9px]">
                    {editingId ? "Editing" : "New listing"}
                </span>
            </div>

            {/* Step indicator — editorial stations */}
            <StepStations currentIdx={stepIdx} onJump={setStepIdx} />

            <div className="mt-14">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step.key}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {step.key === "property" && <StepProperty draft={draft} setDraft={setDraft} />}
                        {step.key === "renovation" && <StepRenovation draft={draft} setDraft={setDraft} />}
                        {step.key === "photos" && <StepPhotos draft={draft} setDraft={setDraft} />}
                        {step.key === "pricing" && <StepPricing draft={draft} setDraft={setDraft} />}
                        {step.key === "review" && <StepReview draft={draft} />}
                    </motion.div>
                </AnimatePresence>

                {error && (
                    <div className="mt-8 px-4 py-3 bg-[#FBF1EF] border border-[#E5C8C2] text-[#B04438] text-[13px] flex items-center gap-2">
                        <AlertCircle size={14} /> {error}
                    </div>
                )}

                {/* Foot — prev / next or publish */}
                <div className="mt-16 pt-8 border-t border-[#E2DDD0] flex items-center justify-between gap-6">
                    <button
                        disabled={stepIdx === 0}
                        onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                        className="inline-flex items-center gap-2 text-[13px] text-[#6C7585] hover:text-[#1F2328] transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-tight"
                    >
                        <ArrowLeft size={14} /> Previous
                    </button>

                    {stepIdx < STEPS.length - 1 ? (
                        <button
                            disabled={!canGoNext}
                            onClick={() => setStepIdx((i) => Math.min(STEPS.length - 1, i + 1))}
                            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#1F2328] hover:bg-[#0F1216] disabled:bg-[#A8AEB6] text-[#F6F4EE] text-[13px] font-medium tracking-tight transition-colors"
                        >
                            Continue <ArrowRight size={14} />
                        </button>
                    ) : (
                        <div className="flex items-center gap-5">
                            <button
                                disabled={saving}
                                onClick={() => save("draft")}
                                className="text-[13px] text-[#6C7585] hover:text-[#1F2328] tracking-tight transition-colors disabled:opacity-40"
                            >
                                Save as draft
                            </button>
                            <button
                                disabled={saving}
                                onClick={() => save("published")}
                                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#C1A05E] hover:bg-[#8B7340] disabled:bg-[#A8AEB6] text-white text-[13px] font-medium tracking-tight transition-colors"
                            >
                                Publish listing <ArrowRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function StepStations({ currentIdx, onJump }: { currentIdx: number; onJump: (i: number) => void }) {
    return (
        <>
            {/* Desktop — horizontal stations */}
            <div className="hidden md:grid grid-cols-5">
                {STEPS.map((s, i) => {
                    const active = i === currentIdx
                    const done = i < currentIdx
                    return (
                        <button
                            key={s.key}
                            onClick={() => onJump(i)}
                            className="group text-left pt-5 pr-6"
                        >
                            {/* Rule with the active node */}
                            <div className="relative h-[2px] mb-4">
                                <div className="absolute inset-0 bg-[#E2DDD0]" />
                                {active && (
                                    <motion.div
                                        layoutId="station-bar"
                                        className="absolute inset-0 bg-[#C1A05E]"
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}
                                {done && <div className="absolute inset-0 bg-[#1F2328]" />}
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span
                                    className={cn(
                                        "figure-numeral text-[15px]",
                                        active
                                            ? "text-[#C1A05E]"
                                            : done
                                                ? "text-[#1F2328]"
                                                : "text-[#A8AEB6]"
                                    )}
                                >
                                    {s.num}
                                </span>
                                <span
                                    className={cn(
                                        "text-[13px] tracking-tight transition-colors",
                                        active
                                            ? "text-[#1F2328]"
                                            : done
                                                ? "text-[#6C7585]"
                                                : "text-[#A8AEB6] group-hover:text-[#6C7585]"
                                    )}
                                >
                                    {s.label}
                                </span>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Mobile — compact */}
            <div className="md:hidden">
                <div className="eyebrow text-[9px] text-[#A8AEB6]">
                    Step {String(currentIdx + 1).padStart(2, "0")} / {STEPS.length}
                </div>
                <div className="display text-[28px] mt-2">
                    {STEPS[currentIdx].label}
                </div>
                <div className="mt-4 grid grid-cols-5 gap-1">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-[2px]",
                                i === currentIdx
                                    ? "bg-[#C1A05E]"
                                    : i < currentIdx
                                        ? "bg-[#1F2328]"
                                        : "bg-[#E2DDD0]"
                            )}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

// ═════════════════════ Inputs (custom, paper-styled) ═════════════════════
function TextField({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    step,
}: {
    label: string
    value: string | number
    onChange: (v: string) => void
    placeholder?: string
    type?: string
    step?: string
}) {
    return (
        <label className="block">
            <span className="eyebrow text-[9px] block mb-2">{label}</span>
            <input
                type={type}
                step={step}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "w-full bg-transparent border-0 border-b border-[#E2DDD0] py-2.5 px-0",
                    "text-[16px] text-[#1F2328] placeholder:text-[#A8AEB6]",
                    "focus:border-[#1F2328] focus:outline-none focus:ring-0 transition-colors",
                    type === "number" && "num tabular-nums"
                )}
            />
        </label>
    )
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string
    value: string
    onChange: (v: string) => void
    options: string[]
}) {
    return (
        <label className="block">
            <span className="eyebrow text-[9px] block mb-2">{label}</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-[#E2DDD0] py-2.5 px-0 text-[16px] text-[#1F2328] focus:border-[#1F2328] focus:outline-none cursor-pointer appearance-none"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%236C7585' stroke-width='1.5'%3e%3cpath d='M4 6l4 4 4-4'/%3e%3c/svg%3e\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center",
                    backgroundSize: "14px",
                    paddingRight: "20px",
                }}
            >
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </label>
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
        <div className="grid md:grid-cols-[minmax(0,1fr)_22rem] gap-x-16 gap-y-10">
            {/* Left — heading */}
            <div className="md:col-span-2">
                <div className="eyebrow">Section · 01</div>
                <h2 className="display text-[clamp(36px,4.5vw,52px)] mt-3">
                    Where is it<span className="italic text-[#C1A05E]">,</span> and what are we
                    looking at?
                </h2>
                <p className="text-[14px] text-[#6C7585] mt-4 max-w-md leading-relaxed">
                    The fundamentals of the property. Get these right; the rest is math.
                </p>
            </div>

            {/* Left column — inputs */}
            <div className="space-y-7">
                <TextField
                    label="Property address"
                    value={draft.address}
                    onChange={(v) => setDraft((d) => ({ ...d, address: v }))}
                    placeholder="12152 Stout Street, Detroit, MI 48228"
                />
                <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                    <TextField
                        label="Asking price ($)"
                        type="number"
                        value={draft.price}
                        onChange={(v) =>
                            setDraft((d) => ({ ...d, price: v === "" ? "" : Number(v) }))
                        }
                        placeholder="85,900"
                    />
                    <SelectField
                        label="Property type"
                        value={draft.propertyType}
                        onChange={(v) => setDraft((d) => ({ ...d, propertyType: v }))}
                        options={PROPERTY_TYPES}
                    />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-7">
                    <TextField
                        label="Beds"
                        type="number"
                        value={draft.bedrooms}
                        onChange={(v) =>
                            setDraft((d) => ({ ...d, bedrooms: v === "" ? "" : Number(v) }))
                        }
                    />
                    <TextField
                        label="Baths"
                        type="number"
                        step="0.5"
                        value={draft.bathrooms}
                        onChange={(v) =>
                            setDraft((d) => ({ ...d, bathrooms: v === "" ? "" : Number(v) }))
                        }
                    />
                    <TextField
                        label="Sqft"
                        type="number"
                        value={draft.sqft}
                        onChange={(v) =>
                            setDraft((d) => ({ ...d, sqft: v === "" ? "" : Number(v) }))
                        }
                        placeholder="1,200"
                    />
                    <TextField
                        label="Land"
                        value={draft.landSize}
                        onChange={(v) => setDraft((d) => ({ ...d, landSize: v }))}
                        placeholder="0.10 ac"
                    />
                </div>
                <TextField
                    label="Year built"
                    type="number"
                    value={draft.yearBuilt}
                    onChange={(v) =>
                        setDraft((d) => ({ ...d, yearBuilt: v === "" ? "" : Number(v) }))
                    }
                    placeholder="1950"
                />
            </div>

            {/* Right — pull quote / margin note */}
            <aside className="hidden md:block border-l border-[#E2DDD0] pl-10">
                <div className="eyebrow">Note</div>
                <p className="display text-[20px] mt-3 leading-snug text-[#1F2328]">
                    Get the address exact. The investor's wire instructions key off this string.
                </p>
                <div className="eyebrow mt-10">Detroit</div>
                <p className="text-[13px] text-[#6C7585] mt-2 leading-relaxed">
                    Wayne County, MI. Section 8 voucher market. Cash-on-cash typically settles in
                    the 11–14% band at current DSCR rates.
                </p>
            </aside>
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
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            <div className="md:col-span-2">
                <div className="eyebrow">Section · 02</div>
                <h2 className="display text-[clamp(36px,4.5vw,52px)] mt-3">
                    The <span className="italic text-[#C1A05E]">work</span> we did
                </h2>
                <p className="text-[14px] text-[#6C7585] mt-4 max-w-md leading-relaxed">
                    A detailed scope is what separates wholesale from selling a problem.
                </p>
            </div>

            <div>
                <div className="eyebrow text-[9px] mb-2">Renovation items</div>
                <div className="flex items-end gap-3 border-b border-[#E2DDD0] pb-2">
                    <input
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="e.g. New roof, kitchen remodel…"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                addItem()
                            }
                        }}
                        className="flex-1 bg-transparent border-0 py-1.5 text-[15px] focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={addItem}
                        className="text-[#1F2328] hover:text-[#C1A05E] transition-colors"
                        aria-label="Add item"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                    </button>
                </div>

                {draft.renovationItems.length > 0 && (
                    <ol className="mt-6 space-y-3">
                        {draft.renovationItems.map((it, i) => (
                            <motion.li
                                key={`${it}-${i}`}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group flex items-start gap-4 py-1"
                            >
                                <span className="figure-numeral text-[13px] text-[#A8AEB6] w-6 flex-shrink-0 pt-0.5">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="flex-1 text-[15px] text-[#1F2328] leading-relaxed">
                                    {it}
                                </span>
                                <button
                                    onClick={() => removeItem(i)}
                                    className="text-[#A8AEB6] hover:text-[#B04438] opacity-0 group-hover:opacity-100 transition-all"
                                    aria-label="Remove"
                                >
                                    <X size={14} />
                                </button>
                            </motion.li>
                        ))}
                    </ol>
                )}
            </div>

            <div>
                <div className="eyebrow text-[9px] mb-2">Additional notes</div>
                <textarea
                    rows={10}
                    value={draft.renovationNotes}
                    onChange={(e) => setDraft((d) => ({ ...d, renovationNotes: e.target.value }))}
                    placeholder="Permits, warranties, materials, anything the investor should know…"
                    className="w-full bg-transparent border border-[#E2DDD0] p-4 text-[14px] leading-relaxed focus:border-[#1F2328] focus:outline-none resize-none transition-colors"
                />
            </div>
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
        <div>
            <div className="eyebrow">Section · 03</div>
            <h2 className="display text-[clamp(36px,4.5vw,52px)] mt-3">
                <span className="italic text-[#C1A05E]">Before</span> &amp; after
            </h2>
            <p className="text-[14px] text-[#6C7585] mt-4 max-w-md leading-relaxed">
                Two contact sheets. Investors decide on photos first, numbers second.
            </p>

            <div className="mt-12 grid lg:grid-cols-2 gap-x-12 gap-y-12">
                <PhotoSet
                    label="Before"
                    accent="ink"
                    photos={draft.beforePhotos}
                    onChange={(photos) => setDraft((d) => ({ ...d, beforePhotos: photos }))}
                />
                <PhotoSet
                    label="After"
                    accent="gold"
                    photos={draft.afterPhotos}
                    onChange={(photos) => setDraft((d) => ({ ...d, afterPhotos: photos }))}
                />
            </div>
        </div>
    )
}

function PhotoSet({
    label,
    photos,
    onChange,
    accent,
}: {
    label: string
    photos: string[]
    onChange: (photos: string[]) => void
    accent: "ink" | "gold"
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
        <section>
            <div className="flex items-baseline justify-between mb-5 pb-2 border-b border-[#E2DDD0]">
                <div className="flex items-baseline gap-3">
                    <span
                        className={cn(
                            "figure-numeral text-[14px]",
                            accent === "gold" ? "text-[#C1A05E]" : "text-[#1F2328]"
                        )}
                    >
                        {label === "Before" ? "I." : "II."}
                    </span>
                    <span className="display text-[22px]">{label}</span>
                </div>
                <span className="eyebrow text-[9px]">
                    {photos.length} {photos.length === 1 ? "frame" : "frames"}
                </span>
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
                    "border border-dashed cursor-pointer transition-colors p-8 flex flex-col items-center justify-center gap-2 aspect-[16/7]",
                    dragOver
                        ? "border-[#C1A05E] bg-[#F1E9D6]/40"
                        : "border-[#C9C3B2] hover:border-[#1F2328] hover:bg-[#FBFAF6]"
                )}
            >
                <Upload size={18} className="text-[#6C7585]" />
                <div className="text-[13px] text-[#1F2328]">
                    {uploading ? "Uploading…" : "Drop or click"}
                </div>
                <div className="text-[11px] text-[#A8AEB6]">JPG, PNG, WEBP · 8 MB</div>
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
                <div className="mt-5 grid grid-cols-3 gap-2">
                    {photos.map((url, i) => (
                        <motion.div
                            key={url}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: i * 0.03 }}
                            className="relative aspect-[4/3] group bg-[#EFEBE1] overflow-hidden"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={url} alt="" className="w-full h-full object-cover" />
                            <span className="figure-numeral text-[10px] absolute top-1.5 left-2 text-white/90 mix-blend-difference">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <button
                                type="button"
                                onClick={() => removeAt(i)}
                                className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#1F2328]/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label="Remove"
                            >
                                <X size={11} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
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
            <div className="eyebrow">Section · 04</div>
            <h2 className="display text-[clamp(36px,4.5vw,52px)] mt-3">
                The <span className="italic text-[#C1A05E]">numbers</span>
            </h2>
            <p className="text-[14px] text-[#6C7585] mt-4 max-w-md leading-relaxed">
                Type on the left, the deal sheet recalculates on the right.
            </p>

            <div className="mt-12 grid lg:grid-cols-[20rem_minmax(0,1fr)] gap-x-14 gap-y-12">
                {/* Left — inputs */}
                <div className="space-y-7">
                    <TextField
                        label="Monthly rental income ($)"
                        type="number"
                        value={draft.monthlyRent}
                        onChange={(v) =>
                            setDraft((d) => ({
                                ...d,
                                monthlyRent: v === "" ? "" : Number(v),
                            }))
                        }
                        placeholder="1,160"
                    />
                    <TextField
                        label="DSCR rate (%)"
                        type="number"
                        step="0.01"
                        value={draft.dscrRate}
                        onChange={(v) =>
                            setDraft((d) => ({
                                ...d,
                                dscrRate: v === "" ? "" : Number(v),
                            }))
                        }
                        placeholder="7.5"
                    />
                    <TextField
                        label="Annual taxes ($)"
                        type="number"
                        value={draft.annualTaxes}
                        onChange={(v) =>
                            setDraft((d) => ({
                                ...d,
                                annualTaxes: v === "" ? "" : Number(v),
                            }))
                        }
                        placeholder="2,400"
                    />
                    <TextField
                        label="Annual insurance ($)"
                        type="number"
                        value={draft.annualInsurance}
                        onChange={(v) =>
                            setDraft((d) => ({
                                ...d,
                                annualInsurance: v === "" ? "" : Number(v),
                            }))
                        }
                        placeholder="1,200"
                    />
                </div>

                {/* Right — the deal sheet */}
                <DealSheet draft={draft} math={math} />
            </div>
        </div>
    )
}

function DealSheet({
    draft,
    math,
}: {
    draft: DraftListing
    math: ReturnType<typeof analyzeDeal>
}) {
    return (
        <article className="bg-[#FBFAF6] border border-[#E2DDD0] p-6 sm:p-8 md:p-10">
            {/* Sheet header */}
            <header className="flex items-baseline justify-between pb-5 border-b border-[#E2DDD0]">
                <div>
                    <div className="eyebrow text-[9px]">Deal sheet</div>
                    <div className="display text-[20px] mt-1.5 leading-tight">
                        Live cashflow
                    </div>
                </div>
                <div className="text-right">
                    <div className="eyebrow text-[9px]">Loan term</div>
                    <div className="num text-[13px] text-[#1F2328] mt-1">{LOAN_TERM_YEARS} yr</div>
                </div>
            </header>

            {/* Hero — the one figure that matters */}
            <div className="py-10 text-center border-b border-[#E2DDD0]">
                <div className="eyebrow text-[#A8AEB6]">Cash-on-Cash return</div>
                <div className="display tabular-nums text-[clamp(72px,11vw,128px)] mt-1 leading-none text-[#C1A05E]">
                    {math.cocReturn.toFixed(1)}
                    <span className="text-[0.5em] align-top ml-1 italic">%</span>
                </div>
                <div className="num text-[12px] text-[#6C7585] mt-3">
                    {money(math.netAnnual)} ÷ {money(math.totalCashNeeded)}
                </div>
            </div>

            {/* Two ledger columns */}
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 pt-8">
                <Ledger title="Purchase">
                    <LedgerRow label="Price" value={money(Number(draft.price) || 0)} />
                    <LedgerRow label="Down (20%)" value={money(math.downPayment)} />
                    <LedgerRow label="Loan amount" value={money(math.loanAmount)} muted />
                    <LedgerRow label="Closing (7%)" value={money(math.closingCost)} />
                    <LedgerRow label="Pasiflow fee" value={money(PASIFLOW_FEE)} />
                    <LedgerRow
                        label="Cash to invest"
                        value={money(math.totalCashNeeded)}
                        total
                    />
                </Ledger>

                <Ledger title="Monthly cashflow">
                    <LedgerRow
                        label="Gross rent"
                        value={money(Number(draft.monthlyRent) || 0)}
                    />
                    <LedgerRow
                        label="Mortgage"
                        value={`−${money(math.monthlyMortgage)}`}
                        debit
                    />
                    <LedgerRow label="Taxes" value={`−${money(math.monthlyTaxes)}`} debit />
                    <LedgerRow
                        label="Insurance"
                        value={`−${money(math.monthlyInsurance)}`}
                        debit
                    />
                    <LedgerRow
                        label="Mgmt (10%)"
                        value={`−${money(math.mgmtFee)}`}
                        debit
                    />
                    <LedgerRow label="Net monthly" value={money(math.netMonthly)} total />
                </Ledger>
            </div>

            {/* Foot — annualized */}
            <div className="mt-8 pt-6 border-t border-[#E2DDD0] flex items-baseline justify-between">
                <span className="eyebrow text-[#1F2328]">Net annual</span>
                <span className="num text-[28px] text-[#1F2328]">
                    {money(math.netAnnual)}
                </span>
            </div>
        </article>
    )
}

function Ledger({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <div className="eyebrow text-[9px] pb-3 border-b border-[#E2DDD0]">{title}</div>
            <dl className="mt-3 space-y-1.5">{children}</dl>
        </div>
    )
}

function LedgerRow({
    label,
    value,
    muted,
    debit,
    total,
}: {
    label: string
    value: string
    muted?: boolean
    debit?: boolean
    total?: boolean
}) {
    return (
        <div
            className={cn(
                "flex items-baseline justify-between gap-3 text-[14px]",
                total && "pt-3 mt-2 border-t border-[#E2DDD0]"
            )}
        >
            <dt
                className={cn(
                    total
                        ? "eyebrow text-[#1F2328] text-[10px]"
                        : muted
                            ? "text-[#A8AEB6]"
                            : "text-[#6C7585]"
                )}
            >
                {label}
            </dt>
            <dd
                className={cn(
                    "num tabular-nums",
                    total
                        ? "text-[#1F2328] text-[17px] font-medium"
                        : debit
                            ? "text-[#B04438]"
                            : muted
                                ? "text-[#A8AEB6]"
                                : "text-[#1F2328]"
                )}
            >
                {value}
            </dd>
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
            <div className="eyebrow">Section · 05</div>
            <h2 className="display text-[clamp(36px,4.5vw,52px)] mt-3">
                Final <span className="italic text-[#C1A05E]">proof</span>
            </h2>
            <p className="text-[14px] text-[#6C7585] mt-4 max-w-md leading-relaxed">
                One last read before this hits the investor pipeline.
            </p>

            {/* Top — address as masthead */}
            <div className="mt-12 pb-6 border-b border-[#E2DDD0]">
                <div className="eyebrow">Property</div>
                <div className="display text-[clamp(28px,4vw,44px)] mt-3 leading-tight">
                    {draft.address || "—"}
                </div>
                <div className="text-[14px] text-[#6C7585] mt-3">
                    {draft.propertyType} · {draft.bedrooms || 0}bd / {draft.bathrooms || 0}ba ·{" "}
                    {draft.sqft || "—"} sqft · built {draft.yearBuilt || "—"}
                </div>
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-x-14 gap-y-10">
                {/* Renovation summary */}
                <section>
                    <div className="eyebrow text-[#A8AEB6] pb-3 border-b border-[#E2DDD0]">
                        Renovation
                    </div>
                    {draft.renovationItems.length === 0 ? (
                        <p className="text-[13px] text-[#A8AEB6] italic mt-4">No items recorded</p>
                    ) : (
                        <ol className="mt-4 space-y-2">
                            {draft.renovationItems.map((it, i) => (
                                <li key={i} className="flex gap-3 text-[14px] text-[#1F2328]">
                                    <span className="figure-numeral text-[12px] text-[#A8AEB6] w-5">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span>{it}</span>
                                </li>
                            ))}
                        </ol>
                    )}
                    {draft.renovationNotes && (
                        <p className="mt-5 text-[13px] text-[#6C7585] leading-relaxed italic">
                            “{draft.renovationNotes}”
                        </p>
                    )}
                </section>

                {/* Photos summary */}
                <section>
                    <div className="eyebrow text-[#A8AEB6] pb-3 border-b border-[#E2DDD0]">
                        Photographs
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <ContactSheet photos={draft.beforePhotos} label="Before" />
                        <ContactSheet photos={draft.afterPhotos} label="After" />
                    </div>
                </section>
            </div>

            {/* The big two-column financial proof */}
            <div className="mt-14 border-t border-[#1F2328] pt-10">
                <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
                    {/* Returns */}
                    <section>
                        <div className="eyebrow">Returns</div>
                        <div className="mt-4 space-y-3">
                            <ProofRow label="Cash-on-Cash">
                                <span className="num display text-[44px] text-[#C1A05E] leading-none">
                                    {math.cocReturn.toFixed(1)}%
                                </span>
                            </ProofRow>
                            <ProofRow label="Net monthly">
                                <span className="num text-[20px] text-[#1F2328]">
                                    {money(math.netMonthly)}
                                </span>
                            </ProofRow>
                            <ProofRow label="Net annual">
                                <span className="num text-[20px] text-[#1F2328]">
                                    {money(math.netAnnual)}
                                </span>
                            </ProofRow>
                            <ProofRow label="DSCR rate">
                                <span className="num text-[14px] text-[#6C7585]">
                                    {draft.dscrRate || 0}%
                                </span>
                            </ProofRow>
                        </div>
                    </section>

                    {/* Client wire instructions */}
                    <section className="bg-[#1F2328] text-[#F6F4EE] p-6 sm:p-8 md:p-10">
                        <div className="eyebrow text-[#C1A05E]">Client cash out of pocket</div>
                        <dl className="mt-5 space-y-2.5 text-[14px]">
                            <WireRow
                                label="Down payment (20%)"
                                value={money(math.downPayment)}
                            />
                            <WireRow
                                label="Closing cost (7%)"
                                value={money(math.closingCost)}
                            />
                            <WireRow label="Pasiflow fee" value={money(PASIFLOW_FEE)} />
                        </dl>
                        <div className="mt-8 pt-5 border-t border-white/15 flex items-baseline justify-between">
                            <span className="eyebrow text-[#F6F4EE]">Total to wire</span>
                            <span className="num display text-[44px] text-[#E89A8E] leading-none">
                                {money(math.totalCashNeeded)}
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

function ProofRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-baseline justify-between gap-4 py-2 border-b border-[#E2DDD0]">
            <span className="eyebrow text-[#6C7585]">{label}</span>
            {children}
        </div>
    )
}

function WireRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-baseline justify-between">
            <dt className="text-white/60">{label}</dt>
            <dd className="num text-white">{value}</dd>
        </div>
    )
}

function ContactSheet({ photos, label }: { photos: string[]; label: string }) {
    return (
        <div>
            <div className="eyebrow text-[#A8AEB6] text-[9px] mb-2">{label}</div>
            {photos.length === 0 ? (
                <div className="aspect-[4/3] bg-[#EFEBE1] flex items-center justify-center">
                    <span className="text-[11px] text-[#A8AEB6]">—</span>
                </div>
            ) : (
                <div className="aspect-[4/3] bg-[#EFEBE1] overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photos[0]} alt="" className="w-full h-full object-cover" />
                    {photos.length > 1 && (
                        <span className="absolute bottom-1.5 right-2 figure-numeral text-[11px] text-white/90 mix-blend-difference">
                            +{photos.length - 1}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}
