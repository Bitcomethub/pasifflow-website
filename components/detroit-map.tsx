"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { X, TrendingUp, Home, Shield, DollarSign } from "lucide-react"

// Detroit neighborhood data with investment info
const NEIGHBORHOODS = [
    {
        name: "Rosedale Park",
        coordinates: [-83.2547, 42.4073],
        priceRange: "$120,000 - $180,000",
        roi: "7-9%",
        riskLevel: "low",
        section8: "Sınırlı",
        description: "Tarihi evler, güçlü topluluk, düşük suç oranı",
        color: "#22c55e"
    },
    {
        name: "University District",
        coordinates: [-83.1456, 42.4445],
        priceRange: "$100,000 - $160,000",
        roi: "8-10%",
        riskLevel: "low",
        section8: "Orta düzey",
        description: "Üniversiteye yakın, eğitimli nüfus",
        color: "#22c55e"
    },
    {
        name: "Grandmont",
        coordinates: [-83.2644, 42.4192],
        priceRange: "$90,000 - $130,000",
        roi: "8-11%",
        riskLevel: "low",
        section8: "İyi kabul görür",
        description: "Bakımlı sokaklar, güçlü dernek, stabil değer",
        color: "#22c55e"
    },
    {
        name: "Sherwood Forest",
        coordinates: [-83.1561, 42.4533],
        priceRange: "$150,000 - $250,000",
        roi: "6-8%",
        riskLevel: "low",
        section8: "Nadir",
        description: "Detroit'in en prestijli mahallesi",
        color: "#22c55e"
    },
    {
        name: "Brightmoor",
        coordinates: [-83.2883, 42.3931],
        priceRange: "$50,000 - $80,000",
        roi: "12-15%",
        riskLevel: "high",
        section8: "Ağırlıklı",
        description: "Düşük giriş maliyeti, yüksek ROI",
        color: "#ef4444"
    },
    {
        name: "Warrendale",
        coordinates: [-83.2728, 42.3556],
        priceRange: "$70,000 - $100,000",
        roi: "10-13%",
        riskLevel: "medium",
        section8: "Yaygın",
        description: "Arap ve Müslüman topluluğu, helal marketler",
        color: "#eab308"
    },
    {
        name: "Bagley",
        coordinates: [-83.2417, 42.3589],
        priceRange: "$80,000 - $120,000",
        roi: "9-12%",
        riskLevel: "medium",
        section8: "İyi kabul",
        description: "İyi okullar, sessiz sokaklar",
        color: "#eab308"
    },
    {
        name: "Corktown",
        coordinates: [-83.0678, 42.3356],
        priceRange: "$200,000 - $400,000",
        roi: "5-7%",
        riskLevel: "low",
        section8: "Nadir",
        description: "Ford Michigan Central, restoranlar, gece hayatı",
        color: "#3b82f6"
    },
    {
        name: "West Village",
        coordinates: [-83.0183, 42.3533],
        priceRange: "$180,000 - $350,000",
        roi: "5-7%",
        riskLevel: "low",
        section8: "Nadir",
        description: "Trendy mahalle, kahve dükkanları, sanat galerileri",
        color: "#3b82f6"
    },
    {
        name: "Midtown",
        coordinates: [-83.0656, 42.3572],
        priceRange: "$250,000 - $500,000",
        roi: "4-6%",
        riskLevel: "low",
        section8: "Nadir",
        description: "Wayne State Üniversitesi, hastaneler, kültür merkezi",
        color: "#3b82f6"
    }
]

interface SelectedNeighborhood {
    name: string
    priceRange: string
    roi: string
    riskLevel: string
    section8: string
    description: string
}

export function DetroitNeighborhoodMap() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<SelectedNeighborhood | null>(null)

    useEffect(() => {
        if (!mapContainer.current || map.current) return

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        if (!token) {
            console.error("Mapbox token is missing")
            return
        }

        mapboxgl.accessToken = token

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/dark-v11",
            center: [-83.1022, 42.3834], // Detroit center
            zoom: 10.5,
            pitch: 0,
        })

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

        // Add markers for each neighborhood
        map.current.on("load", () => {
            NEIGHBORHOODS.forEach((neighborhood) => {
                // Create custom marker element
                const el = document.createElement("div")
                el.className = "neighborhood-marker"
                el.style.cssText = `
                    width: 32px;
                    height: 32px;
                    background-color: ${neighborhood.color};
                    border: 3px solid white;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `
                el.innerHTML = `<span style="color: white; font-size: 12px; font-weight: bold;">$</span>`

                el.addEventListener("mouseenter", () => {
                    el.style.transform = "scale(1.3)"
                    el.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)"
                })
                el.addEventListener("mouseleave", () => {
                    el.style.transform = "scale(1)"
                    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"
                })

                el.addEventListener("click", () => {
                    setSelectedNeighborhood({
                        name: neighborhood.name,
                        priceRange: neighborhood.priceRange,
                        roi: neighborhood.roi,
                        riskLevel: neighborhood.riskLevel,
                        section8: neighborhood.section8,
                        description: neighborhood.description
                    })

                    // Fly to the neighborhood
                    map.current?.flyTo({
                        center: neighborhood.coordinates as [number, number],
                        zoom: 13,
                        duration: 1500
                    })
                })

                new mapboxgl.Marker(el)
                    .setLngLat(neighborhood.coordinates as [number, number])
                    .addTo(map.current!)
            })
        })

        return () => {
            map.current?.remove()
            map.current = null
        }
    }, [])

    const getRiskBadge = (level: string) => {
        switch (level) {
            case "low":
                return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Düşük Risk</span>
            case "medium":
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Orta Risk</span>
            case "high":
                return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Yüksek Risk</span>
            default:
                return null
        }
    }

    return (
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full" />

            {/* Legend */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <h4 className="text-sm font-bold text-gray-800 mb-3">Mahalle Tipleri</h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-gray-600">Premium (Düşük Risk)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-gray-600">Orta Segment</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-gray-600">Yüksek Getiri</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-gray-600">Yükselen Bölgeler</span>
                    </div>
                </div>
            </div>

            {/* Selected Neighborhood Info Card */}
            {selectedNeighborhood && (
                <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-gradient-to-r from-[#a3452b] to-[#8a3a24] p-4 text-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold">{selectedNeighborhood.name}</h3>
                            <button
                                onClick={() => setSelectedNeighborhood(null)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-white/80 text-sm mt-1">{selectedNeighborhood.description}</p>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            {getRiskBadge(selectedNeighborhood.riskLevel)}
                            <span className="text-xs text-gray-500">Section 8: {selectedNeighborhood.section8}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                                    <Home size={14} />
                                    <span>Fiyat Aralığı</span>
                                </div>
                                <p className="font-bold text-gray-900">{selectedNeighborhood.priceRange}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                                    <TrendingUp size={14} />
                                    <span>Beklenen ROI</span>
                                </div>
                                <p className="font-bold text-green-600">{selectedNeighborhood.roi}</p>
                            </div>
                        </div>
                        <a
                            href="https://meetings-na2.hubspot.com/erman?uuid=e269fedf-d614-4f0b-91c5-cad583673f89"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-[#a3452b] hover:bg-[#8a3a24] text-white text-center py-3 rounded-xl font-semibold transition-colors"
                        >
                            Bu Bölgede Mülk İncele
                        </a>
                    </div>
                </div>
            )}

            {/* Instruction Tooltip */}
            {!selectedNeighborhood && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                    Detay için bir mahalleye tıklayın
                </div>
            )}
        </div>
    )
}
