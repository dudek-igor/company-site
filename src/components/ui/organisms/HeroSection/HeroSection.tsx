'use client';

import Image from 'next/image';
import * as motion from 'motion/react-client';
import { Link } from '@/i18n/routing';
import { Typewriter } from '@/components/ui';
import type { SupportedNamespace } from '@/config';
import { useTranslations } from 'next-intl';
import imageLaptop from '@/public/assets/img/hero/hello-software-laptop.png';
import { getLinkHrefViaNamespace } from '@/utils';

type THeroSection = {
  namespace: SupportedNamespace;
};

const HeroSection = ({ namespace }: THeroSection) => {
  const t = useTranslations(namespace); // i18n hook

  return (
    <section className="relative overflow-hidden transition-colors duration-300">
      <div className="mx-auto container py-6 lg:py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-4xl text-center font-bold uppercase leading-none text-gray-900 dark:text-white text-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
              Hello
              <Typewriter />
            </h1>
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg lg:text-justify">
              {t('HERO_SECTION.text')}
            </p>
            {/* Call To Acction Section */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                className="px-6 py-3 md:px-8 md:py-4 lg:text-lg text-white bg-gradient-to-r from-accented-primary to-accented-secondary rounded-md shadow-md hover:scale-105 transition-transform"
                href={getLinkHrefViaNamespace('CONTACT')}
              >
                {t('HERO_SECTION.button')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageLaptop}
              alt="Hero Image"
              placeholder="blur"
              quality={100}
              // sizes="400px"
              fill
              className="object-contain opacity-90 xl:p-12"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
