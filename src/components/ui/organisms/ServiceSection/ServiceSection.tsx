'use client';
import { Fragment } from 'react';
import * as motion from 'motion/react-client';
import { FaArrowRight } from 'react-icons/fa6';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getChildrenNamespace } from '@/utils';
import type { SupportedNamespace } from '@/config';
import { Link } from '@/i18n/routing';
import shape15 from '@/public/assets/img/shape/15.webp';
import type { IconType } from 'react-icons';

interface DataType {
  namespace: SupportedNamespace;
  icon: IconType;
  link: string;
}

const ServiceSectionCard = ({ namespace, icon: Icon, link }: DataType) => {
  const t = useTranslations(namespace); // i18n hook

  return (
    <div className="relative p-6 h-[100%] flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="absolute bottom-0">
        <Image src={shape15} alt="Background Shape" className="h-[150px] rounded-br-lg" />
      </div>
      <div className="z-1 flex flex-col">
        <Icon className="my-4 text-3xl text-accented-primary" />
        <Link href="#">
          <h5 className="mb-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-accented-primary transition-colors duration-300 ease-in-out">
            {t('title')}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400"> {t('caption')}</p>
      </div>
      <div className="z-1 flex flex-col">
        <Link
          className="group px-4 py-2 self-end justify-self-stretch text-white bg-gradient-to-r from-accented-primary to-accented-secondary rounded-md shadow-md"
          href={link}
        >
          {t('button.read_more')}{' '}
          <FaArrowRight className="inline ml-1 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  const SECTION = 'SERVICES';
  const services = getChildrenNamespace(SECTION);
  const t = useTranslations(SECTION); // i18n hook

  return (
    <div className="container mx-auto p-12 rounded-4xl bg-gradient-to-br from-[#d9f2ff] via-[#eae2fc] to-[#ffffff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {/* Nagłówek */}
        <div className="max-w-2xl mx-auto text-center">
          <h5 className="text-accented-primary font-medium lg:text-2xl">{t('section.h5')}</h5>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-3">{t('section.h2')}</h2>
        </div>

        {/* Siatka z usługami */}
        <div className="mt-12 grid gap-6 items-stretch justify-items-stretch grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ namespace, icon, link }) => (
            <Fragment key={namespace}>
              <ServiceSectionCard namespace={namespace} icon={icon} link={link} />
            </Fragment>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ServiceSection;
