'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { Typewriter } from '@/components/ui';
import type { SupportedNamespace } from '@/config';
import { useTranslations } from 'next-intl';
import shape1 from '@/public/assets/img/shape/1.png';
import shape2 from '@/public/assets/img/shape/2.png';
import thumb3 from '@/public/assets/img/thumb/3.jpg';

type THeroSection = {
  namespace: SupportedNamespace;
};

const HeroSection = ({ namespace }: THeroSection) => {
  const t = useTranslations(namespace); // i18n hook

  return (
    <section className="relative overflow-hidden">
      {/* Decoration in the left corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.4 }}
        className="absolute left-0 top-0 -z-10"
      >
        <Image src={shape2} alt="Shape" className="max-w-[60%] opacity-50" />
      </motion.div>
      <div className="container mx-auto px-4 md:px-12 lg:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 py-8 md:py-12">
          {/* Text Section */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-4xl text-center font-bold uppercase leading-none text-gray-900 dark:text-white text-shadow-md sm:text-5xl md:text-6xl lg:text-7xl lg:text-left">
              Hello
              <Typewriter />
            </h1>
            <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-300 sm:text-base lg:text-lg lg:text-justify">
              {t('hero_section.text')}
            </p>
            {/* Call To Acction Section */}
            <motion.div
              className="flex justify-center my-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                className="px-6 py-3 md:px-8 md:py-4 lg:text-lg text-white bg-gradient-to-r from-accented-primary to-accented-secondary rounded-md shadow-md hover:scale-105 transition-transform"
                href="/contact"
              >
                {t('hero_section.button')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <div className="relative h-100% flex justify-center md:justify-evenly lg:justify-end">
            {/* Decoration in the right side */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute hidden lg:inline left-30 -top-40 -z-10"
            >
              <Image src={shape1} alt="Shape" className="max-w-[500px] " />
            </motion.div>
            <motion.div
              className="lg:absolute lg:left-15 lg:bottom-0 xl:left-25"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={thumb3}
                alt="Banner Image"
                className="max-w-2xs rounded-md shadow-lg lg:max-w-[40%] xl:max-w-50%"
              />
            </motion.div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Image
                src={thumb3}
                alt="Banner Image"
                className="hidden max-w-2xs md:block rounded-md shadow-lg lg:max-w-fit"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
