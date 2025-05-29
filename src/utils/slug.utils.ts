import {
  appConfig,
  defaultLocale,
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
export type SlugInfo = {
  template: SupportedTemplate;
  namespace: SupportedNamespace;
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
};

export const getPageInfoBySlug = (locale: string, slug?: string[]): SlugInfo | undefined => {
  if (!isValidLocaleTypeGuard(locale)) return undefined;

  const canonical = `${locale === defaultLocale ? '' : `/${locale}`}${slug ? `/${slug.join('/')}` : ''}` || '/';

  const findInTree = (
    items: typeof appConfig,
    segments: string[],
    parentPaths: Record<string, string> = Object.fromEntries(supportedLocales.map((l) => [l, '']))
  ): SlugInfo | undefined => {
    for (const item of items) {
      const itemSlug = item.links[locale]?.replace(/^\/|\/$/g, '');
      const currentSegment = segments[0] || '';

      if (itemSlug === currentSegment) {
        const remainingSegments = segments.slice(1);

        // Calculate current paths for all locales
        const currentPaths = Object.fromEntries(
          supportedLocales.map((lang) => {
            const itemPath = item.links[lang] || '';
            return [lang, `${parentPaths[lang]}${itemPath}`.replace(/\/+/g, '/')];
          })
        );

        if (remainingSegments.length === 0) {
          if (!isValidNamespaceTypeGuard(item.namespace) || !isValidTemplateTypeGuard(item.template)) {
            return undefined;
          }

          // Build languages object excluding current locale
          const languages = Object.fromEntries(
            supportedLocales
              .filter((lang) => lang !== locale)
              .map((lang) => {
                const path = currentPaths[lang];
                return [lang, lang === defaultLocale ? path : `/${lang}${path === '/' ? '' : path}`];
              })
          );

          // Add x-default with default locale path
          languages['x-default'] = currentPaths[defaultLocale] || '/';

          return {
            template: item.template,
            namespace: item.namespace,
            alternates: {
              canonical,
              languages,
            },
          };
        }

        if (item.children) {
          return findInTree(item.children, remainingSegments, currentPaths);
        }
      }
    }

    return undefined;
  };

  return findInTree(appConfig, slug || ['']);
};
// /**
//  *  Test
//  */
// const buildFullPath = (item: any, locale: string, parentPath = ''): string => {
//   const itemPath = item.links[locale] || '';
//   return `${parentPath}${itemPath}`.replace(/\/+/g, '/');
// };
