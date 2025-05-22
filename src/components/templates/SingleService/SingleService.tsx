import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { HeadingSection } from '@/components/ui';
import { TBaseProps } from '@/config';
import * as motion from 'motion/react-client';
/**
 * Template for Single Service
 */
export default function SingleService({ locale, namespace }: TBaseProps) {
  setRequestLocale(locale);
  const t = useTranslations(namespace);

  return (
    <main className="pt-6 lg:pt-26">
      <HeadingSection title={t('title')} caption={t('caption')} motto={t('motto')} />
      <section className="relative overflow-hidden transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl py-6 lg:py-12 px-4 md:px-5 text-justify"
        >
          <p className="px-4 whitespace-pre-line text-justify text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t('text')}
          </p>
        </motion.div>
      </section>
    </main>
  );
}
