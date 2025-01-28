import type { NextRequest } from 'next/server';
import { defaultLocale, supportedLocales } from '@/config/common';
import createMiddleware from 'next-intl/middleware';

export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  // const defaultLocale = request.headers.get("x-your-custom-locale") || "en";
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({
    locales: supportedLocales,
    defaultLocale,
    localePrefix: 'as-needed', // Don’t use a locale prefix for the default locale.
  });
  const response = handleI18nRouting(request);
  // Step 3: Alter the response (example)
  // response.headers.set("x-your-custom-locale", defaultLocale);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
