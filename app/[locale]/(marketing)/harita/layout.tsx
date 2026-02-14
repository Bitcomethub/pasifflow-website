import type { Metadata } from "next"

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: locale === "en"
            ? "Investment Map - Pasiflow"
            : "Yatırım Haritası - Pasiflow",
        description: locale === "en"
            ? "Explore investment regions in the US. Section 8 approved neighborhoods in and around Detroit."
            : "Amerika'da yatırım bölgelerini keşfedin. Detroit ve çevresinde Section 8 onaylı mahalleler.",
    }
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
    return children
}
