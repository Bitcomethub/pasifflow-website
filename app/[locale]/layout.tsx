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
    icons: {
        icon: "/brand/icon.png",
        shortcut: "/brand/icon.png",
        apple: "/brand/icon.png",
    },
    metadataBase: new URL("https://pasiflow.com"),
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
            <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    )
}
