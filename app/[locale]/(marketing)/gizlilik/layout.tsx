import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Gizlilik Politikası - Pasiflow",
    description: "Pasiflow gizlilik politikası. Kişisel verilerinizin nasıl korunduğunu öğrenin.",
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children
}
