import { AIAssistant } from "@/components/ai-assistant"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExitIntentPopup } from "@/components/exit-intent-popup"

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-slate-900 focus:text-sm focus:font-medium"
            >
                Skip to content
            </a>
            <Header />
            <main id="main-content" className="min-h-screen pt-24">
                {children}
            </main>
            <Footer />
            <AIAssistant />
            <ExitIntentPopup />
        </>
    )
}
