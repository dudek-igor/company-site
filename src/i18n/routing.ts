import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { appConfig, defaultLocale, supportedLocales, localeKey } from '@/config';
import { generateInternationalizationPathnames } from '@/utils';

export const routing = defineRouting({
  // Cookie strategy
  localeCookie: { name: localeKey },
  // A list of all locales that are supported
  locales: supportedLocales,
  // Used when no locale matches
  defaultLocale,
  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: generateInternationalizationPathnames(appConfig),
});
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
