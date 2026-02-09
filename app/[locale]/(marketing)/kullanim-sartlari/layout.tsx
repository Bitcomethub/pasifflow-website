import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Kullanım Şartları - Pasiflow",
    description: "Pasiflow platform kullanım şartları ve koşulları.",
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children
}
