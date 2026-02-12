import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css"

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
})

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
})

export const metadata: Metadata = {
    title: "Pasiflow - Amerika'da Devlet Kira Garantili Anahtar Teslim Evler",
    description:
        "Amerika'da %12'ye kadar net kira getirisi ile her ay düzenli pasif gelir. Section 8 devlet garantili yatırım evleri.",
    keywords: [
        "Amerika gayrimenkul yatırımı",
        "Section 8 kira garantisi",
        "ABD ev yatırımı",
        "pasif dolar geliri",
        "anahtar teslim yatırım",
        "devlet garantili kira",
        "Detroit yatırım",
        "Cleveland gayrimenkul",
        "ABD kiralık ev",
        "dolar bazlı pasif gelir",
        "US real estate investment",
        "Section 8 rental income",
        "turnkey investment properties",
    ],
    icons: {
        icon: "/brand/icon.png",
        shortcut: "/brand/icon.png",
        apple: "/brand/icon.png",
    },
    metadataBase: new URL("https://pasiflow.com"),
    alternates: {
        canonical: "https://pasiflow.com",
        languages: {
            "tr": "https://pasiflow.com",
            "en": "https://pasiflow.com/en",
        },
    },
    openGraph: {
        title: "Pasiflow - Amerika'da Devlet Kira Garantili Anahtar Teslim Evler",
        description: "Amerika'da %12'ye kadar net kira getirisi ile her ay düzenli pasif gelir. Section 8 devlet garantili yatırım evleri.",
        url: "https://pasiflow.com",
        siteName: "Pasiflow",
        images: [{ url: "/brand/logo-user-main.png", width: 1200, height: 630 }],
        locale: "tr_TR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pasiflow - Amerika'da Gayrimenkul Yatırımı",
        description: "Section 8 devlet garantili kira geliri ile pasif dolar geliri.",
        images: ["/brand/logo-user-main.png"],
    },
}

/* JSON-LD Structured Data */
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://pasiflow.com/#organization",
            "name": "Pasiflow",
            "url": "https://pasiflow.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://pasiflow.com/brand/logo-user-main.png",
                "width": 512,
                "height": 512,
            },
            "description": "Amerika'da devlet kira garantili anahtar teslim gayrimenkul yatırımı.",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Miami",
                "addressRegion": "FL",
                "addressCountry": "US",
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-305-690-3146",
                "contactType": "sales",
                "email": "info@pasiflow.com",
                "availableLanguage": ["Turkish", "English"],
            },
            "sameAs": [
                "https://www.instagram.com/pasiflow",
                "https://www.linkedin.com/company/pasiflow",
            ],
        },
        {
            "@type": "RealEstateAgent",
            "@id": "https://pasiflow.com/#agent",
            "name": "Pasiflow",
            "url": "https://pasiflow.com",
            "areaServed": [
                { "@type": "City", "name": "Detroit", "containedInPlace": { "@type": "State", "name": "Michigan" } },
                { "@type": "City", "name": "Cleveland", "containedInPlace": { "@type": "State", "name": "Ohio" } },
                { "@type": "City", "name": "Indianapolis", "containedInPlace": { "@type": "State", "name": "Indiana" } },
                { "@type": "City", "name": "Birmingham", "containedInPlace": { "@type": "State", "name": "Alabama" } },
                { "@type": "City", "name": "Memphis", "containedInPlace": { "@type": "State", "name": "Tennessee" } },
            ],
            "priceRange": "$50,000 - $150,000",
        },
        {
            "@type": "WebSite",
            "@id": "https://pasiflow.com/#website",
            "url": "https://pasiflow.com",
            "name": "Pasiflow",
            "publisher": { "@id": "https://pasiflow.com/#organization" },
            "inLanguage": ["tr-TR", "en-US"],
        },
    ],
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: Props) {
    const { locale } = await params;

    if (!(locales as readonly string[]).includes(locale)) {
        notFound();
    }

    const messages = await getMessages({ locale });
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <link rel="dns-prefetch" href="https://api.mapbox.com" />
                <link rel="dns-prefetch" href="https://meetings-na2.hubspot.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    )
}
