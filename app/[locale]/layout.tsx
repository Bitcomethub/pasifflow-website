import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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

export const metadata: Metadata = {
    title: "Pasiflow - Amerika'da Devlet Kira Garantili Anahtar Teslim Evler",
    description:
        "Amerika'da %12'ye kadar net kira getirisi ile her ay düzenli pasif gelir. Section 8 devlet garantili yatırım evleri.",
    icons: {
        icon: "/icon.png",
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
            <body className={`${inter.variable} font-sans antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    )
}
