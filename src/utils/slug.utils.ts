import {
  appConfig,
  supportedLocales,
  type AppConfig,
  SupportedLocale,
  SupportedNamespace,
  SupportedTemplate,
} from '@/config';
import { isValidLocaleTypeGuard, isValidNamespaceTypeGuard } from './i18n.utils';
import { isValidTemplateTypeGuard } from './template.utils';
/**
 * Create slugs from app config for generate static params
 */
export type Slug = { slug: string[] };

export const createSlugs = (): Slug[] => {
  const results: Slug[] = [];

  const cleanSlug = (slug: string) => slug.replace(/^\/|\/$/g, '');

  const traverse = (
    items: AppConfig,
    currentPath: Record<SupportedLocale, string[]> = {
      en: [],
      pl: [],
      de: [],
    }
  ) => {
    for (const item of items) {
      const newPath = {} as Record<SupportedLocale, string[]>;

      supportedLocales.forEach((locale) => {
        const slug = cleanSlug(item.links[locale]);
        newPath[locale] = [...currentPath[locale], slug].filter(Boolean);
        results.push({ slug: [locale, ...newPath[locale]] });
      });

      if (item.children?.length) {
        traverse(item.children, newPath);
      }
    }
  };

  traverse(appConfig);
  return results;
};
/*
 * Decode slug and get data from app config
 */
export type RouteInfo =
  | { locale: SupportedLocale; template: SupportedTemplate; namespace: SupportedNamespace }
  | undefined;

export const getInfoBySlug = (slug: string[]): RouteInfo => {
  const [locale, ...path] = slug;

  if (!isValidLocaleTypeGuard(locale)) return undefined;

  const findInTree = (items: typeof appConfig, segments: string[]): RouteInfo => {
    for (const item of items) {
      const itemSlug = item.links[locale]?.replace(/^\/|\/$/g, '');

      if (itemSlug === segments[0]) {
        if (segments.length === 1) {
          // Use the type guard to ensure that i18nKey is a valid MessageKey
          if (isValidNamespaceTypeGuard(item.namespace) && isValidTemplateTypeGuard(item.template)) {
            return {
              template: item.template,
              namespace: item.namespace,
              locale,
            };
          } else {
            return undefined; // If the key is not valid, return undefined
          }
        }

        return findInTree(item.children || [], segments.slice(1));
      }
    }

    return undefined;
  };

  return path.length === 0 ? findInTree(appConfig, ['']) : findInTree(appConfig, path);
};
