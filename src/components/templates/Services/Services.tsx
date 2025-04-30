import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { HeadingSection, DescriptionListSection } from '@/components/ui';
import { TBaseProps } from '@/config';

export default function Services({ locale, namespace }: TBaseProps) {
  setRequestLocale(locale);
  const t = useTranslations(namespace);

  return (
    <main className="pt-6 lg:pt-26">
      <HeadingSection title={t('title')} caption={t('caption')} motto={t('motto')} />
      <DescriptionListSection namespace={namespace} />
    </main>
  );
}
