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
export type Slug = { locale: SupportedLocale; slug?: string[] };

export const createSlugs = () => {
  const result: { locale: string; slug: string[] }[] = [];

  function processItem(item: AppConfig[0], parentSlugs: string[] = []) {
    for (const locale of supportedLocales) {
      const slug = [...parentSlugs];
      if (item.links && item.links[locale]) {
        const linkPath = item.links[locale].replace(/^\//, '');
        if (linkPath) {
          slug.push(linkPath);
        }
        result.push({ locale, slug });
      }
    }

    if (item.children) {
      for (const child of item.children) {
        const parentSlugsForChild = [];
        for (const locale of supportedLocales) {
          if (item.links && item.links[locale]) {
            const linkPath = item.links[locale].replace(/^\//, '');
            if (linkPath) {
              parentSlugsForChild.push(linkPath);
              break;
            }
          }
        }
        processItem(child, parentSlugsForChild);
      }
    }
  }

  for (const item of appConfig) {
    processItem(item);
  }

  return result;
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
    items: AppConfig,
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
