// Location data for city-specific landing pages
// Inspired by Mynd's location pages

export interface LocationStats {
    medianHomePrice: string
    avgRentYield: string
    section8Rate: string
    medianRent: string
    avgCapRate: string
    populationGrowth: string
}

export interface LocationData {
    slug: string
    state: string
    stateFullName: string
    city: string

    stats: LocationStats

    // Hero image
    heroImage: string

    // Description key for translations
    descriptionKey: string

    // Highlight keys for translations
    highlightKeys: string[]

    // Property IDs from portfolio that belong to this location
    propertyMlsNumbers: string[]

    // Regional manager info
    regionalManager?: {
        name: string
        title: string
        image?: string
    }
}

export const locations: LocationData[] = [
    {
        slug: "detroit",
        state: "michigan",
        stateFullName: "Michigan",
        city: "Detroit",
        stats: {
            medianHomePrice: "$89,000",
            avgRentYield: "13.2%",
            section8Rate: "87%",
            medianRent: "$1,150",
            avgCapRate: "10.5%",
            populationGrowth: "+2.1%",
        },
        heroImage: "/locations/detroit-hero.jpg",
        descriptionKey: "detroit",
        highlightKeys: ["affordability", "section8", "capRate", "growth"],
        propertyMlsNumbers: ["20251049787", "20251060129", "20251059784", "20251050193", "20251040564"],
        regionalManager: {
            name: "Erman Pasiflow",
            title: "Founder & Managing Partner",
        },
    },
    {
        slug: "cleveland",
        state: "ohio",
        stateFullName: "Ohio",
        city: "Cleveland",
        stats: {
            medianHomePrice: "$95,000",
            avgRentYield: "11.8%",
            section8Rate: "82%",
            medianRent: "$1,050",
            avgCapRate: "9.8%",
            populationGrowth: "+1.5%",
        },
        heroImage: "/locations/cleveland-hero.jpg",
        descriptionKey: "cleveland",
        highlightKeys: ["healthcare", "education", "affordable", "stable"],
        propertyMlsNumbers: [],
    },
    {
        slug: "indianapolis",
        state: "indiana",
        stateFullName: "Indiana",
        city: "Indianapolis",
        stats: {
            medianHomePrice: "$110,000",
            avgRentYield: "10.5%",
            section8Rate: "75%",
            medianRent: "$1,100",
            avgCapRate: "9.2%",
            populationGrowth: "+3.2%",
        },
        heroImage: "/locations/indianapolis-hero.jpg",
        descriptionKey: "indianapolis",
        highlightKeys: ["logistics", "growth", "diverse", "affordable"],
        propertyMlsNumbers: [],
    },
    {
        slug: "birmingham",
        state: "alabama",
        stateFullName: "Alabama",
        city: "Birmingham",
        stats: {
            medianHomePrice: "$85,000",
            avgRentYield: "12.0%",
            section8Rate: "80%",
            medianRent: "$950",
            avgCapRate: "10.8%",
            populationGrowth: "+1.8%",
        },
        heroImage: "/locations/birmingham-hero.jpg",
        descriptionKey: "birmingham",
        highlightKeys: ["medical", "affordable", "growth", "section8"],
        propertyMlsNumbers: [],
    },
    {
        slug: "memphis",
        state: "tennessee",
        stateFullName: "Tennessee",
        city: "Memphis",
        stats: {
            medianHomePrice: "$92,000",
            avgRentYield: "11.5%",
            section8Rate: "78%",
            medianRent: "$1,000",
            avgCapRate: "10.0%",
            populationGrowth: "+2.5%",
        },
        heroImage: "/locations/memphis-hero.jpg",
        descriptionKey: "memphis",
        highlightKeys: ["logistics", "fedex", "affordable", "rental"],
        propertyMlsNumbers: [],
    },
]

export function getLocationBySlug(state: string, city: string): LocationData | undefined {
    return locations.find(
        (loc) => loc.state.toLowerCase() === state.toLowerCase() && loc.slug.toLowerCase() === city.toLowerCase()
    )
}

export function getLocationsByState(state: string): LocationData[] {
    return locations.filter((loc) => loc.state.toLowerCase() === state.toLowerCase())
}

export function getAllStates(): string[] {
    return [...new Set(locations.map((loc) => loc.state))]
}
