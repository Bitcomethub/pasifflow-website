import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBadges } from "@/components/trust-badges"
import { ValuePropsSection } from "@/components/value-props-section"
import { FoundersSection } from "@/components/founders-section"
import { ComparisonSection } from "@/components/comparison-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BuybackSection } from "@/components/buyback-section"
import { ProcessSection } from "@/components/process-section"
import { Section8Section } from "@/components/section8-section"
import { PropertyManagementSection } from "@/components/property-management-section"
import { AppFeaturesSection } from "@/components/app-features-section"
import { WhyWorkSection } from "@/components/why-work-section"
import { CityComparisonSection } from "@/components/city-comparison-section"
// TestimonialsSection removed per client request
import { FAQSection } from "@/components/faq-section"
import { MapSection } from "@/components/map-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function Home() {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <TrustBadges />
                <AboutSection />
                <ValuePropsSection />
                <FoundersSection />
                <ComparisonSection />
                <AdvantagesSection />
                <PortfolioSection />
                <BuybackSection />
                <ProcessSection />
                <Section8Section />
                <PropertyManagementSection />
                <AppFeaturesSection />
                <WhyWorkSection />
                <CityComparisonSection />
                {/* TestimonialsSection removed per client request */}
                <FAQSection />
                <MapSection />
                <FinalCTASection />
            </main>
            <Footer />
        </div>
    )
}
