'use client';

import { Link } from '@/i18n/routing';
import { getChildrenNamespace, type ChildrenItem } from '@/utils';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { FaRegPaperPlane } from 'react-icons/fa6';

function ServicesItem({ icon: Icon, link, namespace }: ChildrenItem) {
  const t = useTranslations(namespace);

  return (
    <Link href={link} key={link} className="group relative pl-16 rounded-lg transition-colors">
      <dt className="font-semibold text-gray-900 dark:text-white">
        <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-accented-primary">
          <Icon aria-hidden="true" className="size-6 text-white" />
        </div>
        {t('title')}
      </dt>
      <dd className="text-base/7 text-gray-600 dark:text-gray-400 group-hover:text-accented-primary transition-colors">
        {t('caption')}
      </dd>
      <button className="absolute -bottom-7 right-0 flex items-center text-accented-primary lg:invisible">
        {t('button.read_more')} <FaRegPaperPlane className="ml-2" />
      </button>
    </Link>
  );
}

export default function Services() {
  const namespace = 'SERVICES';
  const children = getChildrenNamespace(namespace);
  const t = useTranslations(namespace);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto container py-16 lg:pt-0 lg:min-h-screen lg:flex lg:justify-center lg:items-center "
    >
      <div className="mx-auto px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h5 className="mb-6 text-base/7 font-semibold text-accented-primary">{t('section.title')}</h5>
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl lg:text-balance">
            {t('caption')}
          </h2>
          <p className="mb-6 text-lg/8 text-gray-600 dark:text-gray-400 transition-colors">{t('section.motto')}</p>
        </div>
        <dl className="mx-auto grid mt-12 max-w-none grid-cols-1 gap-x-8 gap-y-10 md:max-w-4xl md:grid-cols-2 md:gap-y-16 lg:gap-x-32">
          {children.map((data) => (
            <ServicesItem key={data.link} {...data} />
          ))}
        </dl>
      </div>
    </motion.div>
  );
}
