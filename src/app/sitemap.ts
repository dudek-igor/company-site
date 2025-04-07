import env from '@/config/env.config';
import { routing, getPathname } from '@/i18n/routing';
import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';

// Constant for sitemaps
const host = env.HOST;
const xDefault = 'x-default' as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(routing.pathnames).flatMap((key) => getEntries(key as Href));
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntries(href: Href): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const localesWithXDefault = [...routing.locales, xDefault];
    return {
      url: getUrl(href, locale),
      alternates: {
        languages: Object.fromEntries(localesWithXDefault.map((cur) => [cur, getUrl(href, cur)])),
      },
      lastModified: new Date(),
      priority: getPriority(href),
      //   changeFrequency: 'monthly',
    };
  });
}
/** @info Create url */
function getUrl(href: Href, locale: Locale | typeof xDefault) {
  const defaultLocalePrefix = '/' + routing.defaultLocale;
  // For hreflang="x-default" setup default locale
  locale = locale === xDefault ? routing.defaultLocale : locale;
  // Create paths
  let pathname = getPathname({ locale, href });
  // We are using in middleware option localePrefix: 'as-needed'. Don’t use a locale prefix for the default locale, so we have sanitize pathname
  pathname = pathname.startsWith(defaultLocalePrefix) ? pathname.replace(defaultLocalePrefix, '') : pathname;
  return host + pathname;
}
/** @info Setup priority */
function getPriority(href: Href): number {
  const segments = href.toString().split('/').filter(Boolean).length;

  if (segments === 0) return 1; // Root "/"
  if (segments === 1) return 0.8; // First-level paths
  if (segments === 2) return 0.5; // Second-level paths

  return 0.3; // Deeper nested paths
}
