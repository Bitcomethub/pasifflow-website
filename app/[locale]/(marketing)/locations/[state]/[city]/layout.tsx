import type { Metadata } from "next"
import { getLocationBySlug, locations } from "@/lib/location-data"

interface Props {
    params: Promise<{ locale: string; state: string; city: string }>
    children: React.ReactNode
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; state: string; city: string }> }): Promise<Metadata> {
    const { locale, state, city } = await params
    const location = getLocationBySlug(state, city)

    if (!location) return {}

    const title = locale === "en"
        ? `${location.city}, ${location.stateFullName} - Real Estate Investment | Pasiflow`
        : `${location.city}, ${location.stateFullName} - Gayrimenkul Yatırımı | Pasiflow`

    const description = locale === "en"
        ? `Invest in ${location.city}, ${location.stateFullName}. Median home price ${location.stats.medianHomePrice}, avg rent yield ${location.stats.avgRentYield}, Section 8 rate ${location.stats.section8Rate}. Turnkey rental properties with guaranteed income.`
        : `${location.city}, ${location.stateFullName}'da yatırım fırsatları. Ortalama ev fiyatı ${location.stats.medianHomePrice}, kira getirisi ${location.stats.avgRentYield}, Section 8 oranı ${location.stats.section8Rate}. Anahtar teslim kiralık mülkler.`

    const prefix = locale === "tr" ? "" : `/${locale}`
    const url = `https://pasiflow.com${prefix}/locations/${state}/${city}`

    return {
        title,
        description,
        alternates: {
            canonical: url,
            languages: {
                "tr": `https://pasiflow.com/locations/${state}/${city}`,
                "en": `https://pasiflow.com/en/locations/${state}/${city}`,
            },
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "Pasiflow",
            images: [{ url: "/brand/logo-user-main.png", width: 1200, height: 630 }],
            locale: locale === "en" ? "en_US" : "tr_TR",
            type: "website",
        },
    }
}

export function generateStaticParams() {
    return locations.map((loc) => ({
        state: loc.state,
        city: loc.slug,
    }))
}

export default function CityLayout({ children }: Props) {
    return children
}
