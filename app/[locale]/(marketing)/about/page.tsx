import type { Metadata } from "next"
import { AboutSection } from "@/components/about-section"
import { FoundersSection } from "@/components/founders-section"

export const metadata: Metadata = {
    title: "Hakkımızda - Pasiflow",
    description: "Pasiflow, teknoloji odaklı yeni nesil bir gayrimenkul yatırım şirketidir. Yönetim ekibimizle tanışın.",
}

export default function AboutPage() {
    return (
        <main>
            <AboutSection />
            <FoundersSection />
        </main>
    )
}
