'use client';

import type { SupportedNamespace } from '@/config';
import { Link } from '@/i18n/routing';
import { getChildrenNamespace } from '@/utils';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: 'easeOut',
    },
  }),
};

type IntegrationCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  namespace: SupportedNamespace;
  index: number;
};

const IntegrationCard = ({ icon: Icon, link, namespace, index }: IntegrationCardProps) => {
  const t = useTranslations(namespace);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeIn}
      custom={index}
      className="flex justify-center items-center gap-2.5 px-6 py-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-accented-primary transition-colors duration-300 bg-white dark:bg-gray-900"
    >
      <Link href={link} className="flex flex-col items-center gap-3.5 text-center">
        <Icon className="size-16 text-accented-primary" />
        <h4 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">{t('title')}</h4>
        <p className="text-sm leading-snug text-gray-500 dark:text-gray-400">{t('caption')}</p>
      </Link>
    </motion.div>
  );
};

type TIntegrationSection = {
  namespace: SupportedNamespace;
};

const IntegrationSection = ({}: TIntegrationSection) => {
  const SECTION = 'TECHNOLOGIES';
  const technologies = getChildrenNamespace(SECTION);
  const t = useTranslations(SECTION); // i18n hook

  return (
    <section className="relative transition-colors duration-300">
      <div className="mx-auto container py-12 px-4 md:px-5 lg:px-5">
        <div className="w-full flex-col justify-start items-center lg:gap-11 gap-8 inline-flex">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="w-full flex-col justify-start items-center gap-2.5 flex"
          >
            <h2 className="text-center text-gray-900 dark:text-white text-3xl font-bold leading-normal">
              {t('title')}
            </h2>
            <p className="max-w-4xl mx-auto text-center text-gray-500 dark:text-gray-400 text-lg leading-8">
              {t('caption')}
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-start gap-8">
            {technologies.map((data, index) => (
              <IntegrationCard key={index} {...data} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
