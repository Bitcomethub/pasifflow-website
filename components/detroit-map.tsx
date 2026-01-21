"use client"

import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { useTranslations } from "next-intl"

export function DetroitNeighborhoodMap() {
    const t = useTranslations("map")
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)

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
            style: "mapbox://styles/oliver2024/cm1y01932002h01pbdxo7f7y1",
            center: [-83.045753, 42.331429],
            zoom: 11,
            pitch: 45,
            bearing: -17.6,
            antialias: true
        })

        map.current.on('style.load', () => {
            if (!map.current) return;

            // Add 3D buildings layer
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
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                12,
                                0,
                                12.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                12,
                                0,
                                12.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                );
            }
        });

        // Add navigation controls
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right")

        return () => {
            map.current?.remove()
            map.current = null
        }
    }, [])

    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            {/* Map Container */}
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none">
                {/* Header */}
                <div className="pointer-events-auto">
                    <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-sm border border-white/50">
                        <h2 className="text-2xl font-bold text-[#001C32] mb-2 flex items-center gap-2">
                            <span className="w-2 h-8 bg-[#EF7202] rounded-full" />
                            {t("title")}
                        </h2>
                        <p className="text-[#535454] text-sm leading-relaxed mb-4">
                            {t("description")}
                        </p>
                        <div className="inline-flex items-center justify-center px-4 py-2 bg-[#EF7202] text-white text-sm font-bold rounded-lg shadow-md">
                            Detroit, MI
                        </div>
                    </div>
                </div>

                {/* Bottom Stats or Info could go here */}
            </div>
        </section>
    )
}
