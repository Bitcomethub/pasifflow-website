import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['tr', 'en', 'ar', 'ru'] as const;
export const defaultLocale = 'tr' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    const currentLocale = locale ?? defaultLocale;

    if (!locales.includes(currentLocale as Locale)) notFound();

    return {
        locale: currentLocale,
        messages: (await import(`../messages/${currentLocale}.json`)).default
    };
});
