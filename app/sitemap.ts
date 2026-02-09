import type { MetadataRoute } from "next"

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

    const locales = ["tr", "en"]

    const entries: MetadataRoute.Sitemap = []

    for (const route of routes) {
        for (const locale of locales) {
            const prefix = locale === "tr" ? "" : `/${locale}`
            entries.push({
                url: `${baseUrl}${prefix}${route}`,
                lastModified: new Date(),
                changeFrequency: route === "" ? "weekly" : "monthly",
                priority: route === "" ? 1.0 : 0.8,
            })
        }
    }

    return entries
}
