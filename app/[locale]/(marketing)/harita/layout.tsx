import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Yatırım Haritası - Pasiflow",
    description: "Amerika'da yatırım bölgelerini keşfedin. Detroit ve çevresinde Section 8 onaylı mahalleler.",
}

export default function MapLayout({ children }: { children: React.ReactNode }) {
    return children
}
