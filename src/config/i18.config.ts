import type { Messages } from 'next-intl';
/** @info For i18n */
export const localeKey = 'HELLO_SOFTWARE_LOCALE' as const;

export const defaultLocale = 'en' as const;
export type DefaultLocale = typeof defaultLocale;

export type SupportedLocale = 'en' | 'pl' | 'de';
export const supportedLocales: SupportedLocale[] = ['en', 'pl', 'de'] as const;
/**
 * Create Namespace from messages and type guard for safety
 */
export type SupportedNamespace = keyof Messages; // "HOME_PAGE" | "SERVICES" | "WEBSITES" | "CONTACT"
export const namespaces: SupportedNamespace[] = [
  'HOME_PAGE',
  'SERVICES',
  'WEBSITES',
  'WEB_APPLICATIONS',
  'MOBILE_APPLICATIONS',
  'SERVER_APPLICATIONS',
  'HOME_PAGE',
  'SERVICES',
  'WEBSITES',
  'E_COMMERCE',
  'SEARCH_ENGINE_OPTIMIZATION',
  'CLOUD_COMPUTING_SOLUTIONS',
  'OUTSOURCING',
  'TECHNOLOGIES',
  'TYPESCRIPT',
  'REACT',
  'NODE_JS',
  'REACT_NATIVE',
  'ABOUT_US',
  'CONTACT',
  'SUPPORT',
  'TERMS',
  'POLICY',
  'COOKIES',
] as const;

export type TBaseProps = {
  locale: SupportedLocale;
  namespace: SupportedNamespace;
};
