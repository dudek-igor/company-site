import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import type { ChildrenItem } from '@/utils';
import { Link } from '@/i18n/routing';

type TIntegrationCardProps = {
  index: number;
} & ChildrenItem;

const IntegrationCard = ({ icon: Icon, link, namespace, index }: TIntegrationCardProps) => {
  const t = useTranslations(namespace);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
      className="grow basis-[calc(100%-2rem)] sm:basis-[calc(50%-2rem)] lg:basis-[calc(25%-2rem)] max-w-full flex justify-center items-center gap-2.5 px-6 py-8 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-accented-primary transition-colors duration-300 bg-white dark:bg-gray-900"
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
  items: ChildrenItem[];
};

const IntegrationSection = ({ items }: TIntegrationSection) => {
  return (
    <section className="relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto container py-6 lg:py-12 px-4 md:px-5">
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {items.map((data, index) => (
            <IntegrationCard key={index} {...data} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
