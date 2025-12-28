import type React from "react"
import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css"

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-heading",
    display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
})

export const metadata: Metadata = {
    title: "Pasiflow - Amerika'da Devlet Kira Garantili Anahtar Teslim Evler",
    description:
        "Amerika'da %12'ye kadar net kira getirisi ile her ay düzenli pasif gelir. Section 8 devlet garantili yatırım evleri.",
    icons: {
        icon: [
            { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
            { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
            { url: "/icon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-icon.png",
    },
}

type Props = {
    children: React.ReactNode;
    params: any;
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: Props) {
    const { locale } = await params;

    if (!locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages({ locale });
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir}>
            <body className={`${outfit.variable} ${jakarta.variable} font-sans antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    )
}
