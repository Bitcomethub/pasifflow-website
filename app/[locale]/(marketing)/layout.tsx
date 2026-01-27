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
            <Header />
            <main className="min-h-screen pt-24">
                {children}
            </main>
            <Footer />
            <AIAssistant />
            <ExitIntentPopup />
        </>
    )
}
