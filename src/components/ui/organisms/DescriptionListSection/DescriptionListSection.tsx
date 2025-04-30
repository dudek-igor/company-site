'use client';
import { useTranslations } from 'next-intl';
import * as motion from 'motion/react-client';
import { getChildrenNamespace, type ChildrenItem } from '@/utils';
import { Link } from '@/i18n/routing';
import { FaRegPaperPlane } from 'react-icons/fa6';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { SupportedNamespace } from '@/config';
/**
 * Description List Section Component
 */

type TDescriptionListItemProps = {
  index: number;
  animate: boolean;
} & ChildrenItem;

const DescriptionListItem = ({ icon: Icon, link, namespace, index, animate }: TDescriptionListItemProps) => {
  const t = useTranslations(namespace);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
      className="cursor-pointer group relative pl-16 rounded-lg transition-colors"
    >
      <Link href={link} key={link} className="">
        <dt className="font-semibold text-gray-900 dark:text-white">
          <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-accented-primary">
            <Icon aria-hidden="true" className="size-6 text-white" />
          </div>
          {t('title')}
        </dt>
        <dd className="text-base/7 text-gray-600 dark:text-gray-400 group-hover:text-accented-primary transition-colors">
          {t('caption')}
        </dd>
        <button className="cursor-pointer absolute -bottom-7 right-0 flex items-center text-accented-primary lg:invisible">
          {t('button.read_more')} <FaRegPaperPlane className="ml-2" />
        </button>
      </Link>
    </motion.div>
  );
};

type TDescriptionListSectionProps = {
  namespace: SupportedNamespace;
};

const DescriptionListSection = ({ namespace }: TDescriptionListSectionProps) => {
  const items = getChildrenNamespace(namespace);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <section className="relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto container py-6 lg:py-12 px-4 md:px-5">
        <motion.dl
          ref={ref}
          className="mx-auto grid max-w-none grid-cols-1 gap-x-8 gap-y-10 md:max-w-4xl md:grid-cols-2 md:gap-y-16 lg:gap-x-32"
        >
          {items.map((data, index) => (
            <DescriptionListItem key={index} {...data} index={index} animate={isInView} />
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default DescriptionListSection;
