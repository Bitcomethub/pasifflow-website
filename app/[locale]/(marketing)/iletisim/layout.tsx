import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "İletişim - Pasiflow",
    description: "Pasiflow ile iletişime geçin. Amerika'da gayrimenkul yatırımı hakkında sorularınızı yanıtlayalım.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
