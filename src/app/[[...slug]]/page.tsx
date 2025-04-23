import { use } from 'react';
import { createSlugs, getInfoBySlug, type Slug } from '@/utils';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import DynamicTemplate from '@/components/templates';
import type { Metadata } from 'next';

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
  const { slug } = await params;
  const pageData = getInfoBySlug(slug);
  if (pageData) {
    const { locale, namespace } = pageData;
    const t = await getTranslations({ locale, namespace });
    return {
      title: t('metadata.title'),
      description: t('metadata.description'),
    };
  }
  return {};
}
/**
 * To catch unknown routes, we set dynamic params to false.
 */
export default function PageGenerator({ params }: TPageGeneratorParams) {
  const { slug } = use(params);
  const pageData = getInfoBySlug(slug);

  if (!pageData) return notFound();

  return <DynamicTemplate {...pageData} />;
}
