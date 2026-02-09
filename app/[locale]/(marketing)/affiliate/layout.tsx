import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Affiliate Program - Pasiflow",
    description: "Pasiflow referans programına katılın. Her başarılı yatırımcı referansından komisyon kazanın.",
}

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
    return children
}
