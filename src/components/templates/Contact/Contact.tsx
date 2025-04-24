import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { TBaseProps } from '@/config';
import { ContactSection, HeadingSection } from '@/components/ui';
/**
 * Template for Contact
 */
export default function ContactTamplate(props: TBaseProps) {
  const { locale, namespace } = props;
  setRequestLocale(locale);
  const t = useTranslations(namespace);
  return (
    <main className="pt-6 lg:pt-26">
      <HeadingSection title={t('title')} caption={t('caption')} />
      <ContactSection {...props} />
    </main>
  );
}
