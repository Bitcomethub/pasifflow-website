"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { X, TrendingUp, Home, Search, Map, Satellite, Navigation, ExternalLink, Play, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

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

// Tour spots for "Explore Detroit" feature
const TOUR_SPOTS = [
    { name: "Downtown Detroit", coordinates: [-83.0458, 42.3314], zoom: 15 },
    { name: "Corktown", coordinates: [-83.0678, 42.3356], zoom: 15 },
    { name: "Midtown", coordinates: [-83.0656, 42.3572], zoom: 14 },
    { name: "Rosedale Park", coordinates: [-83.2547, 42.4073], zoom: 14 },
]

interface SelectedNeighborhood {
    name: string
    priceRange: string
    roi: string
    riskLevel: string
    section8: string
    description: string
    coordinates?: [number, number]
}

export function DetroitNeighborhoodMap() {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [selectedNeighborhood, setSelectedNeighborhood] = useState<SelectedNeighborhood | null>(null)
    const [mapStyle, setMapStyle] = useState<"dark" | "satellite">("dark")
    const [searchAddress, setSearchAddress] = useState("")
    const [isTouring, setIsTouring] = useState(false)
    const [currentTourIndex, setCurrentTourIndex] = useState(0)
    const [currentZoom, setCurrentZoom] = useState(10.5)
    const [currentCenter, setCurrentCenter] = useState<[number, number]>([-83.1022, 42.3834])

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
            style: mapStyle === "dark" ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/satellite-streets-v12",
            center: [-83.1022, 42.3834],
            zoom: 10.5,
            pitch: 0,
        })

        map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

        // Track zoom level
        map.current.on("zoom", () => {
            if (map.current) {
                setCurrentZoom(map.current.getZoom())
            }
        })

        // Track center
        map.current.on("move", () => {
            if (map.current) {
                const center = map.current.getCenter()
                setCurrentCenter([center.lng, center.lat])
            }
        })

        // Add markers for each neighborhood
        map.current.on("load", () => {
            NEIGHBORHOODS.forEach((neighborhood) => {
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
                        description: neighborhood.description,
                        coordinates: neighborhood.coordinates as [number, number]
                    })

                    map.current?.flyTo({
                        center: neighborhood.coordinates as [number, number],
                        zoom: 14,
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

    // Update map style when toggled
    useEffect(() => {
        if (map.current) {
            map.current.setStyle(mapStyle === "dark" ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/satellite-streets-v12")
        }
    }, [mapStyle])

    // Search address using Mapbox Geocoding
    const handleSearch = async () => {
        if (!searchAddress.trim() || !map.current) return

        try {
            const query = encodeURIComponent(`${searchAddress}, Detroit, MI`)
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&limit=1`
            )
            const data = await response.json()

            if (data.features && data.features.length > 0) {
                const [lng, lat] = data.features[0].center
                map.current.flyTo({
                    center: [lng, lat],
                    zoom: 17,
                    duration: 2000
                })
            }
        } catch (error) {
            console.error("Geocoding error:", error)
        }
    }

    // Start Detroit tour
    const startTour = () => {
        setIsTouring(true)
        setCurrentTourIndex(0)
        flyToTourSpot(0)
    }

    const flyToTourSpot = (index: number) => {
        if (!map.current || index >= TOUR_SPOTS.length) {
            setIsTouring(false)
            return
        }

        const spot = TOUR_SPOTS[index]
        map.current.flyTo({
            center: spot.coordinates as [number, number],
            zoom: spot.zoom,
            duration: 3000,
            pitch: 45,
        })

        setTimeout(() => {
            setCurrentTourIndex(index + 1)
            if (index + 1 < TOUR_SPOTS.length) {
                flyToTourSpot(index + 1)
            } else {
                setIsTouring(false)
                // Reset view
                map.current?.flyTo({
                    center: [-83.1022, 42.3834],
                    zoom: 10.5,
                    pitch: 0,
                    duration: 2000
                })
            }
        }, 4000)
    }

    // Open Google Street View
    const openStreetView = (lat?: number, lng?: number) => {
        const targetLat = lat || currentCenter[1]
        const targetLng = lng || currentCenter[0]
        window.open(
            `https://www.google.com/maps/@${targetLat},${targetLng},3a,75y,90t/data=!3m6!1e1!3m4!1sCampaign`,
            "_blank"
        )
    }

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
        <div className="relative w-full h-[650px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full" />

            {/* Top Controls Bar */}
            <div className="absolute top-4 left-4 right-16 flex flex-wrap gap-2">
                {/* Search Input */}
                <div className="flex-1 min-w-[200px] max-w-md flex gap-1">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Adres veya mahalle ara..."
                            value={searchAddress}
                            onChange={(e) => setSearchAddress(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full h-10 pl-9 pr-3 rounded-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg text-sm focus:ring-2 focus:ring-[#a3452b]/50 outline-none"
                        />
                    </div>
                    <Button
                        onClick={handleSearch}
                        size="sm"
                        className="h-10 px-3 bg-[#a3452b] hover:bg-[#8a3a24] text-white shadow-lg"
                    >
                        Ara
                    </Button>
                </div>

                {/* Tour Button */}
                <Button
                    onClick={startTour}
                    disabled={isTouring}
                    size="sm"
                    className="h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg gap-2"
                >
                    <Play className="w-4 h-4" />
                    {isTouring ? `Tur: ${TOUR_SPOTS[currentTourIndex]?.name || "..."}` : "Detroit'i Gezelim"}
                </Button>

                {/* Map Style Toggle */}
                <div className="flex bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                    <button
                        onClick={() => setMapStyle("dark")}
                        className={`h-10 px-3 flex items-center gap-1.5 text-xs font-medium transition-colors ${mapStyle === "dark" ? "bg-[#a3452b] text-white" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <Map className="w-4 h-4" />
                        Harita
                    </button>
                    <button
                        onClick={() => setMapStyle("satellite")}
                        className={`h-10 px-3 flex items-center gap-1.5 text-xs font-medium transition-colors ${mapStyle === "satellite" ? "bg-[#a3452b] text-white" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <Satellite className="w-4 h-4" />
                        Uydu
                    </button>
                </div>
            </div>

            {/* Legend - Now below search on mobile */}
            <div className="absolute top-20 md:top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <h4 className="text-xs font-bold text-gray-800 mb-2">Mahalle Tipleri</h4>
                <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        <span className="text-gray-600">Premium</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <span className="text-gray-600">Orta</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-gray-600">Yüksek ROI</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <span className="text-gray-600">Yükselen</span>
                    </div>
                </div>
            </div>

            {/* Street View Button - Shows when zoomed in */}
            {currentZoom > 14 && (
                <div className="absolute bottom-20 right-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <Button
                        onClick={() => openStreetView()}
                        className="h-12 bg-white hover:bg-gray-50 text-gray-800 shadow-xl gap-2 border border-gray-200"
                    >
                        <Navigation className="w-5 h-5 text-blue-600" />
                        <span>Sokak Görünümü</span>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                    </Button>
                </div>
            )}

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
                            <button
                                onClick={() => selectedNeighborhood.coordinates && openStreetView(selectedNeighborhood.coordinates[1], selectedNeighborhood.coordinates[0])}
                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                                <Navigation className="w-3 h-3" />
                                Sokak Görünümü
                            </button>
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

            {/* Instruction Tooltip - Updated */}
            {!selectedNeighborhood && !isTouring && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Adres ara veya mahalleye tıkla
                </div>
            )}

            {/* Tour Progress */}
            {isTouring && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="font-medium">
                        Detroit Turu: {TOUR_SPOTS[currentTourIndex]?.name || "Tamamlandı"}
                    </span>
                    <span className="text-white/60">
                        {currentTourIndex + 1}/{TOUR_SPOTS.length}
                    </span>
                </div>
            )}
        </div>
    )
}
