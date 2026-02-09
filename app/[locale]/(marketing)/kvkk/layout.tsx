import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni - Pasiflow",
    description: "Pasiflow KVKK kapsamında kişisel verilerin korunması hakkında aydınlatma metni.",
}

export default function KvkkLayout({ children }: { children: React.ReactNode }) {
    return children
}
