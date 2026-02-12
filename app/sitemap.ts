import type { MetadataRoute } from "next"
import { locations } from "@/lib/location-data"

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://pasiflow.com"

    const routes = [
        "",
        "/about",
        "/iletisim",
        "/neden-amerika",
        "/vergilendirme",
        "/harita",
        "/login",
        "/affiliate",
        "/locations",
        "/kullanim-sartlari",
        "/gizlilik",
        "/kvkk",
    ]

    const siteLocales = ["tr", "en"]

    const entries: MetadataRoute.Sitemap = []

    // Static routes
    for (const route of routes) {
        for (const locale of siteLocales) {
            const prefix = locale === "tr" ? "" : `/${locale}`
            entries.push({
                url: `${baseUrl}${prefix}${route}`,
                lastModified: new Date(),
                changeFrequency: route === "" ? "weekly" : "monthly",
                priority: route === "" ? 1.0 : 0.8,
            })
        }
    }

    // Dynamic location pages
    for (const loc of locations) {
        for (const locale of siteLocales) {
            const prefix = locale === "tr" ? "" : `/${locale}`
            entries.push({
                url: `${baseUrl}${prefix}/locations/${loc.state}/${loc.slug}`,
                lastModified: new Date(),
                changeFrequency: "monthly",
                priority: 0.7,
            })
        }
    }

    return entries
}
