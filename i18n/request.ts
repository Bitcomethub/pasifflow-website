import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['tr', 'en'] as const;
export const defaultLocale = 'tr' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale;
    const currentLocale = locale ?? defaultLocale;

    if (!locales.includes(currentLocale as Locale)) notFound();

    return {
        locale: currentLocale,
        messages: (await import(`../messages/${currentLocale}.json`)).default,
        onError(error) {
            // Suppress MISSING_MESSAGE errors in production
            if (error.code !== 'MISSING_MESSAGE') {
                console.error(error);
            }
        },
        getMessageFallback({ namespace, key }) {
            return `${namespace}.${key}`;
        }
    };
});
