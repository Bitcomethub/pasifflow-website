import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { TrustBadges } from "@/components/trust-badges"
import { ValuePropsSection } from "@/components/value-props-section"

import { ComparisonSection } from "@/components/comparison-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { InvestmentCalculator } from "@/components/investment-calculator"
import { BuybackSection } from "@/components/buyback-section"
import { ProcessSection } from "@/components/process-section"
import { Section8Section } from "@/components/section8-section"
import { PropertyManagementSection } from "@/components/property-management-section"
import { AppFeaturesSection } from "@/components/app-features-section"
import { WhyWorkSection } from "@/components/why-work-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { FinalCTASection } from "@/components/final-cta-section"

type Props = {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: locale === "en"
            ? "Pasiflow - Government-Guaranteed Turnkey Rental Homes in the USA"
            : "Pasiflow - Amerika'da Devlet Kira Garantili Anahtar Teslim Evler",
        description: locale === "en"
            ? "Earn regular monthly dollar income with Section 8 government-backed rental payments. Up to 12% net rental yield."
            : "Section 8 programı ile ABD hükümeti tarafından desteklenen kira ödemeleri sayesinde her ay düzenli dolar geliri elde edin. %12'ye kadar net kira getirisi.",
    }
}

export default async function Home({ params }: Props) {
    const { locale } = await params;

    return (
        <div className="min-h-screen">
            <main>
                <HeroSection />
                <TrustBadges />
                <ValuePropsSection />
                <ComparisonSection />
                <AdvantagesSection />
                <PortfolioSection />
                <InvestmentCalculator locale={locale} />
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
