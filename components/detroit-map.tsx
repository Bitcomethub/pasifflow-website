"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useTranslations } from "next-intl"
import { DETROIT_LANDMARKS, Landmark } from "./detroit-data"
import { MapPin, Navigation, Info, X, ChevronRight, Building2, Layers, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export function DetroitNeighborhoodMap() {
    const t = useTranslations("map")
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [mapStyle, setMapStyle] = useState<'light' | 'satellite'>('light')

    useEffect(() => {
        if (!mapContainer.current) return

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        if (!token) {
            console.error("Mapbox token is missing")
            return
        }

        mapboxgl.accessToken = token

        if (map.current) return

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v10",
            center: [-83.045753, 42.331429],
            zoom: 11.5,
            pitch: 55,
            bearing: -17.6,
            antialias: true
        })

        map.current.on('style.load', () => {
            if (!map.current) return;

            // Re-add 3D buildings layer (it gets removed on style change)
            const layers = map.current.getStyle()?.layers || [];
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
            )?.id;

            if (!map.current.getLayer('3d-buildings')) {
                map.current.addLayer(
                    {
                        id: '3d-buildings',
                        source: 'composite',
                        'source-layer': 'building',
                        filter: ['==', 'extrude', 'true'],
                        type: 'fill-extrusion',
                        minzoom: 12,
                        paint: {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 12, 0, 12.05, ['get', 'height']],
                            'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 12, 0, 12.05, ['get', 'min_height']],
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                );
            }
        });

        // Add Markers
        DETROIT_LANDMARKS.forEach((landmark) => {
            // Customize marker element
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = 'url(/pin.svg)'; // Fallback-ish, but let's use CSS or built-in
            el.innerHTML = `<div style="background-color: #B8A074; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); cursor: pointer;"></div>`;

            const marker = new mapboxgl.Marker({ element: el })
                .setLngLat(landmark.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25, closeButton: false }) // add popups
                        .setHTML(`
                            <h3 style="font-weight:bold; color:#3D4852;">${landmark.title}</h3>
                            <p style="font-size:12px; margin-top:4px;">${landmark.category}</p>
                        `)
                )
                .addTo(map.current!);

            // Add click listener to fly to
            el.addEventListener('click', () => {
                handleLandmarkClick(landmark);
            });
        });

        // Add Search (Geocoder)
        const geocoder = new MapboxGeocoder({
            accessToken: token,
            mapboxgl: mapboxgl as any,
            marker: true,
            placeholder: t("searchPlaceholder")
        });
        map.current.addControl(geocoder as any, 'top-right');

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right")

        return () => {
            map.current?.remove()
            map.current = null
        }
    }, [])

    const handleLandmarkClick = (landmark: Landmark) => {
        setActiveLandmark(landmark);
        map.current?.flyTo({
            center: landmark.coordinates,
            zoom: 15,
            pitch: 60,
            bearing: 20,
            duration: 2000,
            essential: true
        });

        // Show popup manually if needed, or rely on active state UI
    }

    const zoomInToLandmark = () => {
        if (!activeLandmark || !map.current) return;
        map.current.flyTo({
            center: activeLandmark.coordinates,
            zoom: 17.5,
            pitch: 65,
            bearing: -10,
            duration: 2000
        });
    }

    const openGoogleMaps = () => {
        if (!activeLandmark) return;
        const query = encodeURIComponent(`${activeLandmark.title} Detroit`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }

    const toggleMapStyle = () => {
        if (!map.current) return;
        const newStyle = mapStyle === 'light' ? 'satellite' : 'light';
        map.current.setStyle(
            newStyle === 'light'
                ? "mapbox://styles/mapbox/light-v10"
                : "mapbox://styles/mapbox/satellite-streets-v12"
        );
        setMapStyle(newStyle);
    }

    return (
        <section className="relative h-[700px] w-full overflow-hidden bg-slate-100 rounded-xl border border-slate-200 shadow-2xl">
            {/* Map Container */}
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Sidebar Control - Desktop left */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className="absolute top-4 left-4 bottom-4 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 border border-white/50"
                    >
                        {/* Sidebar Header */}
                        <div className="p-5 bg-[#3D4852] text-white">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <MapPin className="text-[#B8A074]" size={20} />
                                    {t("sidebarTitle")}
                                </h3>
                                <button onClick={() => setIsSidebarOpen(false)} className="text-white/60 hover:text-white">
                                    <X size={18} />
                                </button>
                            </div>
                            <p className="text-xs text-white/70 leading-relaxed">
                                {t("sidebarDesc")}
                            </p>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            {DETROIT_LANDMARKS.map((landmark) => (
                                <button
                                    key={landmark.id}
                                    onClick={() => handleLandmarkClick(landmark)}
                                    className={`w-full text-left p-3 rounded-xl transition-all border ${activeLandmark?.id === landmark.id ? 'bg-[#B8A074]/10 border-[#B8A074] shadow-sm' : 'hover:bg-slate-50 border-transparent hover:border-slate-200'}`}
                                >
                                    <h4 className={`font-bold text-sm mb-1 ${activeLandmark?.id === landmark.id ? 'text-[#B8A074]' : 'text-slate-800'}`}>
                                        {landmark.title}
                                    </h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {landmark.category}
                                        </span>
                                        {activeLandmark?.id === landmark.id && <ChevronRight size={14} className="text-[#B8A074]" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active Landmark Info Card (Bottom Overlay) */}
            <AnimatePresence>
                {activeLandmark && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white rounded-2xl shadow-2xl p-5 z-20 border-l-4 border-[#B8A074]"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl text-[#3D4852] pr-4">{activeLandmark.title}</h3>
                            <button onClick={() => setActiveLandmark(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            {activeLandmark.description}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={zoomInToLandmark}
                                className="flex-1 bg-[#3D4852] text-white text-xs font-bold py-2.5 rounded-lg hover:bg-[#3D4852] transition-colors flex items-center justify-center gap-2"
                            >
                                <Navigation size={14} />
                                {t("goTo")}
                            </button>
                            <button
                                onClick={openGoogleMaps}
                                className="flex-1 bg-[#B8A074]/10 text-[#B8A074] text-xs font-bold py-2.5 rounded-lg hover:bg-[#B8A074]/20 transition-colors flex items-center justify-center gap-2"
                            >
                                <Info size={14} />
                                {t("details")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Re-open Sidebar Button */}
            {!isSidebarOpen && (
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="absolute top-4 left-4 bg-white p-3 rounded-xl shadow-lg z-10 text-[#3D4852] hover:text-[#B8A074] hover:shadow-xl transition-all"
                >
                    <Building2 size={24} />
                </button>
            )}

            {/* Map Style Toggle */}
            <button
                onClick={toggleMapStyle}
                className="absolute bottom-32 right-2.5 md:right-12 md:bottom-8 bg-white p-3 rounded-lg shadow-lg z-10 text-[#3D4852] hover:text-[#B8A074] transition-all border border-slate-200"
                title={mapStyle === 'light' ? t("satelliteView") : t("mapView")}
            >
                <Layers size={20} />
            </button>
        </section>
    )
}
