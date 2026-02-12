import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Vergilendirme - Pasiflow",
    description: "Türk yatırımcılar için ABD gayrimenkul vergilendirme rehberi. Çifte vergilendirme anlaşması ve vergi avantajları.",
}

export default function TaxationLayout({ children }: { children: React.ReactNode }) {
    return children
}
