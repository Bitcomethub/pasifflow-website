import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Lokasyonlar - Pasiflow",
    description: "Amerika'da yatırım yapılabilecek şehirler. Detroit, Cleveland, Indianapolis, Birmingham ve Memphis.",
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
    return children
}
