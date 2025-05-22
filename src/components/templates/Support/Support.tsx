import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { HeadingSection, IntegrationSection } from '@/components/ui';
import type { TBaseProps } from '@/config';
import { getChildrenNamespace } from '@/utils';

/**
 * Template for Support
 */
export default function Support({ namespace, locale }: TBaseProps) {
  setRequestLocale(locale);
  const t = useTranslations(namespace);
  const namespaceChildren = getChildrenNamespace(namespace);

  return (
    <main className="pt-6 lg:pt-26">
      <HeadingSection title={t('title')} caption={t('caption')} />
      <IntegrationSection items={namespaceChildren} />
    </main>
  );
}
