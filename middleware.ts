import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/request';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
    localeDetection: false
});

export const config = {
    // Only match locale routes, explicitly exclude api, _next, _vercel, and static files
    matcher: [
        '/((?!api|admin|_next|_vercel|.*\\..*).*)'
    ]
};
