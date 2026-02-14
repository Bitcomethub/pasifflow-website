import type { Metadata } from "next"

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: locale === "en"
            ? "Locations - Pasiflow"
            : "Lokasyonlar - Pasiflow",
        description: locale === "en"
            ? "Explore investment cities in the US. Detroit, Cleveland, Indianapolis, Birmingham and Memphis."
            : "Amerika'da yatırım yapılabilecek şehirler. Detroit, Cleveland, Indianapolis, Birmingham ve Memphis.",
    }
}

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
    return children
}
