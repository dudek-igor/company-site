import type { TBaseProps } from '@/config';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { HeadingSection, IntegrationSection } from '@/components/ui';
import { getChildrenNamespace } from '@/utils';
/**
 * Template for Technologies
 */
export default function Technologies({ locale, namespace }: TBaseProps) {
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
