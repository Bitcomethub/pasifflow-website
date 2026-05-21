"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
    Building2,
    Loader2,
    RefreshCcw,
    Search,
    DollarSign,
    TrendingUp,
    Award,
    AlertTriangle,
    BedDouble,
    Bath,
    Ruler,
    Calendar,
    X,
    ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Listing {
    zpid: number
    address: string
    price: number
    beds: number
    baths: number
    yearBuilt: number | null
    livingArea: number
    imageUrl: string | null
    lat: number
    lng: number
    detailUrl: string
    rent: number
    capRate: number
    grossYield: number
    cashFlow: number
    score: "A" | "B" | "C"
    leadPaintRisk: boolean
}

interface Stats {
    total: number
    avgPrice: number
    avgCapRate: number
    aScoreCount: number
}

const PRICE_OPTIONS = [50000, 75000, 100000, 125000]
const SORT_OPTIONS = [
    { value: "capRate-desc", label: "Cap rate (high → low)" },
    { value: "capRate-asc", label: "Cap rate (low → high)" },
    { value: "price-asc", label: "Price (low → high)" },
    { value: "price-desc", label: "Price (high → low)" },
    { value: "cashFlow-desc", label: "Cash flow (high → low)" },
]

const SCORE_STYLES: Record<Listing["score"], string> = {
    A: "bg-emerald-500 text-white border-emerald-600",
    B: "bg-amber-400 text-amber-950 border-amber-500",
    C: "bg-red-500 text-white border-red-600",
}

const SCORE_BG: Record<Listing["score"], string> = {
    A: "from-emerald-500/10 to-emerald-500/0 border-emerald-500/30",
    B: "from-amber-400/10 to-amber-400/0 border-amber-400/30",
    C: "from-red-500/10 to-red-500/0 border-red-500/30",
}

function currency(n: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(n)
}

export default function DetroitScoutPage() {
    const [listings, setListings] = useState<Listing[]>([])
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Filters
    const [minBeds, setMinBeds] = useState<number>(0)
    const [maxBeds, setMaxBeds] = useState<number>(6)
    const [maxPrice, setMaxPrice] = useState<number>(125000)
    const [scoreFilter, setScoreFilter] = useState<"ALL" | "A" | "B" | "C">("ALL")
    const [sort, setSort] = useState<string>("capRate-desc")
    const [search, setSearch] = useState("")

    const [selected, setSelected] = useState<Listing | null>(null)
    const [totalAvailable, setTotalAvailable] = useState<number>(0)

    const fetchListings = useCallback(
        async (priceCeiling: number) => {
            const token = typeof window !== "undefined" ? localStorage.getItem("pasiflow_token") || "" : ""
            try {
                const res = await fetch(`/api/admin/detroit-listings?price_max=${priceCeiling}&_t=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    cache: "no-store",
                })
                if (!res.ok) {
                    const data = await res.json().catch(() => ({}))
                    throw new Error(data.error || `Request failed (${res.status})`)
                }
                const data = await res.json()
                setListings(data.listings as Listing[])
                setStats(data.stats as Stats)
                setTotalAvailable(typeof data.totalAvailable === "number" ? data.totalAvailable : 0)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load listings")
                setListings([])
                setStats(null)
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        },
        []
    )

    useEffect(() => {
        setLoading(true)
        fetchListings(maxPrice)
    }, [fetchListings, maxPrice])

    const handleRefresh = () => {
        setRefreshing(true)
        fetchListings(maxPrice)
    }

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase()
        const arr = listings.filter((l) => {
            if (l.beds < minBeds || l.beds > maxBeds) return false
            if (scoreFilter !== "ALL" && l.score !== scoreFilter) return false
            if (term) {
                const haystack = l.address.toLowerCase()
                if (!haystack.includes(term)) return false
            }
            return true
        })

        const [field, dir] = sort.split("-") as [string, "asc" | "desc"]
        arr.sort((a, b) => {
            const av =
                field === "capRate" ? a.capRate :
                    field === "price" ? a.price :
                        field === "cashFlow" ? a.cashFlow : 0
            const bv =
                field === "capRate" ? b.capRate :
                    field === "price" ? b.price :
                        field === "cashFlow" ? b.cashFlow : 0
            return dir === "asc" ? av - bv : bv - av
        })
        return arr
    }, [listings, minBeds, maxBeds, scoreFilter, sort, search])

    return (
        <div className="p-6 md:p-8 space-y-6">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#B8A074]/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-[#B8A074]" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Detroit Scout</h1>
                            <p className="text-sm text-muted-foreground">
                                {stats
                                    ? `${listings.length} uygun mülk / ${totalAvailable} toplam Detroit ilanı`
                                    : "Live Zillow listings, scored for Section 8 rental yield."}
                            </p>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    variant="outline"
                    className="gap-2 w-full md:w-auto"
                >
                    <RefreshCcw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                    {refreshing ? "Refreshing…" : "Refresh"}
                </Button>
            </header>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="Total properties"
                    value={stats ? stats.total.toString() : "—"}
                    subtext={totalAvailable > 0 ? `/ ${totalAvailable} toplam ilan` : undefined}
                    icon={Building2}
                    tint="text-blue-600 bg-blue-50"
                />
                <StatCard
                    label="Avg. price"
                    value={stats ? currency(stats.avgPrice) : "—"}
                    icon={DollarSign}
                    tint="text-emerald-600 bg-emerald-50"
                />
                <StatCard
                    label="Avg. cap rate"
                    value={stats ? `${stats.avgCapRate.toFixed(2)}%` : "—"}
                    icon={TrendingUp}
                    tint="text-amber-600 bg-amber-50"
                />
                <StatCard
                    label='"A" score deals'
                    value={stats ? stats.aScoreCount.toString() : "—"}
                    icon={Award}
                    tint="text-violet-600 bg-violet-50"
                />
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search address or ZIP…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <select
                            value={minBeds}
                            onChange={(e) => setMinBeds(Number(e.target.value))}
                            className="border rounded-md px-3 py-2 text-sm bg-background"
                        >
                            <option value={0}>Min beds: Any</option>
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>Min beds: {n}+</option>
                            ))}
                        </select>
                        <select
                            value={maxBeds}
                            onChange={(e) => setMaxBeds(Number(e.target.value))}
                            className="border rounded-md px-3 py-2 text-sm bg-background"
                        >
                            <option value={6}>Max beds: Any</option>
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>Max beds: {n}</option>
                            ))}
                        </select>
                        <select
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="border rounded-md px-3 py-2 text-sm bg-background"
                        >
                            {PRICE_OPTIONS.map((p) => (
                                <option key={p} value={p}>Max price: {currency(p)}</option>
                            ))}
                        </select>
                        <select
                            value={scoreFilter}
                            onChange={(e) => setScoreFilter(e.target.value as "ALL" | "A" | "B" | "C")}
                            className="border rounded-md px-3 py-2 text-sm bg-background"
                        >
                            <option value="ALL">Score: All</option>
                            <option value="A">Score: A only</option>
                            <option value="B">Score: B only</option>
                            <option value="C">Score: C only</option>
                        </select>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="lg:col-span-2 border rounded-md px-3 py-2 text-sm bg-background"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Body states */}
            {loading ? (
                <div className="flex items-center justify-center py-32 text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    5 sayfa Zillow verisi yükleniyor...
                </div>
            ) : error ? (
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="pt-6 text-red-700 flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5" />
                        <div>
                            <div className="font-semibold">Couldn&apos;t load Detroit listings.</div>
                            <div className="text-sm">{error}</div>
                        </div>
                    </CardContent>
                </Card>
            ) : filtered.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground py-16">
                        No listings match the current filters.
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((l) => (
                        <ListingCard key={l.zpid || l.address} listing={l} onSelect={() => setSelected(l)} />
                    ))}
                </div>
            )}

            {selected && <ListingModal listing={selected} onClose={() => setSelected(null)} />}
        </div>
    )
}

function StatCard({
    label,
    value,
    icon: Icon,
    tint,
    subtext,
}: {
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
    tint: string
    subtext?: string
}) {
    return (
        <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <div className={`p-2 rounded-md ${tint}`}>
                    <Icon className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                {subtext && <div className="text-xs text-muted-foreground mt-1">{subtext}</div>}
            </CardContent>
        </Card>
    )
}

function ListingCard({ listing, onSelect }: { listing: Listing; onSelect: () => void }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`group text-left rounded-xl border bg-gradient-to-b ${SCORE_BG[listing.score]} hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden`}
        >
            <div className="relative aspect-[4/3] bg-zinc-100">
                {listing.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={listing.imageUrl}
                        alt={listing.address}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                        <Building2 className="h-10 w-10" />
                    </div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    <Badge className={`${SCORE_STYLES[listing.score]} text-sm font-bold`}>
                        Score {listing.score}
                    </Badge>
                    {listing.leadPaintRisk && (
                        <Badge variant="outline" className="bg-white/95 text-amber-700 border-amber-300 gap-1">
                            <AlertTriangle className="h-3 w-3" /> Lead paint
                        </Badge>
                    )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="text-white text-xl font-bold tracking-tight">{currency(listing.price)}</div>
                </div>
            </div>
            <div className="p-4 space-y-3 bg-white">
                <div className="font-semibold text-sm line-clamp-1">{listing.address}</div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{listing.beds || "—"}</span>
                    <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{listing.baths || "—"}</span>
                    {listing.livingArea > 0 && (
                        <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{listing.livingArea.toLocaleString()} sqft</span>
                    )}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <Metric label="Cap" value={`${listing.capRate.toFixed(1)}%`} accent />
                    <Metric label="FMR" value={`${currency(listing.rent)}`} />
                    <Metric label="CF/mo" value={currency(listing.cashFlow)} />
                </div>
            </div>
        </button>
    )
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
    return (
        <div className="text-center">
            <div className={`text-sm font-bold ${accent ? "text-emerald-600" : "text-foreground"}`}>{value}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        </div>
    )
}

function ListingModal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative">
                    {listing.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={listing.imageUrl}
                            alt={listing.address}
                            className="w-full h-64 object-cover rounded-t-xl"
                        />
                    ) : (
                        <div className="w-full h-64 bg-zinc-100 rounded-t-2xl flex items-center justify-center text-zinc-400">
                            <Building2 className="h-16 w-16" />
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-2 bg-white/95 hover:bg-white rounded-full shadow"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    <Badge
                        className={`absolute top-3 left-3 ${SCORE_STYLES[listing.score]} text-sm font-bold`}
                    >
                        Section 8 Score: {listing.score}
                    </Badge>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">{listing.address}</h2>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-[#B8A074]">{currency(listing.price)}</div>
                            <div className="text-xs text-muted-foreground">List price</div>
                        </div>
                    </div>

                    {listing.leadPaintRisk && (
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                            <div>
                                <div className="font-semibold">Lead paint risk</div>
                                <div>
                                    Built {listing.yearBuilt} — pre-1978 properties require lead-safe renovation
                                    and tenant disclosures for Section 8.
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Stat label="Bedrooms" value={`${listing.beds || "—"}`} icon={BedDouble} />
                        <Stat label="Bathrooms" value={`${listing.baths || "—"}`} icon={Bath} />
                        <Stat label="Sqft" value={listing.livingArea > 0 ? listing.livingArea.toLocaleString() : "—"} icon={Ruler} />
                        <Stat label="Year built" value={listing.yearBuilt ? String(listing.yearBuilt) : "—"} icon={Calendar} />
                    </div>

                    <div className="rounded-xl border bg-zinc-50 p-5">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                            Investment metrics
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <BigMetric label="Cap rate" value={`${listing.capRate.toFixed(2)}%`} tone="emerald" />
                            <BigMetric label="Gross yield" value={`${listing.grossYield.toFixed(2)}%`} tone="blue" />
                            <BigMetric label="FMR rent" value={`${currency(listing.rent)}/mo`} tone="violet" />
                            <BigMetric label="Net cash flow" value={`${currency(listing.cashFlow)}/mo`} tone="amber" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            Cap rate assumes 45% expense load (taxes, insurance, vacancy, management, repairs).
                            FMR rent derived from HUD 2025 Detroit-Warren-Dearborn area medians.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href={listing.detailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 flex-1 h-10 px-4 py-2 rounded-md text-sm font-medium bg-[#006AFF] hover:bg-[#0055d4] text-white transition-colors"
                        >
                            <ExternalLink className="h-4 w-4" /> View on Zillow
                        </a>
                        <Button variant="outline" onClick={onClose} className="sm:w-32">Close</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Stat({
    label,
    value,
    icon: Icon,
}: {
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
}) {
    return (
        <div className="rounded-lg border bg-white p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5" /> {label}
            </div>
            <div className="text-lg font-semibold mt-1">{value}</div>
        </div>
    )
}

function BigMetric({
    label,
    value,
    tone,
}: {
    label: string
    value: string
    tone: "emerald" | "blue" | "violet" | "amber"
}) {
    const toneClass = {
        emerald: "text-emerald-600",
        blue: "text-blue-600",
        violet: "text-violet-600",
        amber: "text-amber-600",
    }[tone]
    return (
        <div>
            <div className={`text-2xl font-bold ${toneClass}`}>{value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
        </div>
    )
}
