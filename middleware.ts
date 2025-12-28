import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
    localeDetection: true  // Auto-detect browser language
});

export const config = {
    // Exclude: api, _next, _vercel, all files with extensions (images, html, etc.)
    matcher: ['/', '/(tr|en|ar|ru)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)', '/((?!_next|_vercel|.*\\..*).*)']
};
