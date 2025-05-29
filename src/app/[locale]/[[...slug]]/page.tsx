import { use } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { createSlugs, getPageInfoBySlug, isValidLocaleTypeGuard, type Slug } from '@/utils';
import DynamicTemplate from '@/components/templates';
/**
 * Enable full static site generator only in build time.
 */
export const dynamicParams = false;
/**
 * Generate static params for page generator
 */
export async function generateStaticParams() {
  const slugs = createSlugs();
  return slugs;
}

type TPageGeneratorParams = { params: Promise<Slug> };
/**
 * Generate Metadata for each slug
 */
export async function generateMetadata({ params }: TPageGeneratorParams): Promise<Metadata> {
  const { locale, slug } = await params;

  const pageData = getPageInfoBySlug(locale, slug);

  if (pageData && isValidLocaleTypeGuard(locale)) {
    const { namespace, alternates } = pageData;

    const t = await getTranslations({ locale, namespace });
    return {
      title: namespace === 'HOME_PAGE' ? { absolute: t('metadata.title') } : t('metadata.title'),
      description: t('metadata.description'),
      alternates,
    };
  }
  /** Fallback */
  return {};
}
/**
 * To catch unknown routes, we set dynamic params to false.
 */
export default function PageGenerator({ params }: TPageGeneratorParams) {
  const { locale, slug } = use(params);
  const pageData = getPageInfoBySlug(locale, slug);

  if (pageData && isValidLocaleTypeGuard(locale)) return <DynamicTemplate locale={locale} {...pageData} />;

  return notFound();
}
