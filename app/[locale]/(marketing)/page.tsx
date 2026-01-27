import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBadges } from "@/components/trust-badges"
import { ValuePropsSection } from "@/components/value-props-section"

import { ComparisonSection } from "@/components/comparison-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BuybackSection } from "@/components/buyback-section"
import { ProcessSection } from "@/components/process-section"
import { Section8Section } from "@/components/section8-section"
import { PropertyManagementSection } from "@/components/property-management-section"
import { AppFeaturesSection } from "@/components/app-features-section"
import { WhyWorkSection } from "@/components/why-work-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
    return (
        <div className="min-h-screen">
            <main>
                <HeroSection />
                <TrustBadges />
                <ValuePropsSection />
                <ComparisonSection />
                <AdvantagesSection />
                <PortfolioSection />
                <BuybackSection />
                <ProcessSection />
                <Section8Section />
                <PropertyManagementSection />
                <AppFeaturesSection />
                <WhyWorkSection />
                <FinalCTASection />
                <TestimonialsSection />
                <FAQSection />
            </main>
        </div>
    )
}
