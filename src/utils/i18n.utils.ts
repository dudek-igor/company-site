import {
  defaultLocale,
  supportedLocales,
  namespaces,
  type AppConfigItem,
  DefaultLocale,
  SupportedNamespace,
  SupportedLocale,
} from '@/config';

type NonDefaultLocale = Exclude<SupportedLocale, DefaultLocale>;

type InputMap = {
  [key: string]: Partial<Record<NonDefaultLocale, string>>;
};
/**
 * Generate Map forInternationalization
 */
export const generateInternationalizationPathnames = (
  navItems: AppConfigItem[],
  parentPaths: Record<SupportedLocale, string> = {
    en: '',
    pl: '',
    de: '',
  }
): InputMap => {
  const result: InputMap = {};

  for (const item of navItems) {
    /** @info Build full path for each language */
    const fullPaths = Object.fromEntries(
      supportedLocales.map((locale) => [locale, parentPaths[locale] + item.links[locale]])
    ) as Record<SupportedLocale, string>;

    /** @info Add defaultLocale as key */
    const defaultPath = fullPaths[defaultLocale];

    const localizedPaths = Object.fromEntries(
      supportedLocales.filter((l) => l !== defaultLocale).map((locale) => [locale, fullPaths[locale]])
    ) as Partial<Record<NonDefaultLocale, string>>;

    result[defaultPath] = localizedPaths;

    /** @info Run recursive */
    if (item.children?.length && item.children) {
      const childMap = generateInternationalizationPathnames(item.children, fullPaths);
      Object.assign(result, childMap);
    }
  }

  return result;
};
/**
 * Type guard for checking if the value is a valid i18n locale
 */
export const isValidLocaleTypeGuard = (key: unknown): key is SupportedLocale => {
  return typeof key === 'string' && supportedLocales.some((locale) => locale === key);
};
/**
 * Type guard for checking if the value is a valid i18n namespace
 */
export const isValidNamespaceTypeGuard = (key: unknown): key is SupportedNamespace => {
  return typeof key === 'string' && namespaces.some((namespaces) => namespaces === key);
};
