'use client';

import { FiChevronRight } from 'react-icons/fi';
import { Fragment } from 'react';
import * as motion from 'motion/react-client';
import type { SupportedNamespace } from '@/config';
import { useMessages } from 'next-intl';

type THowItWorkSection = {
  namespace: SupportedNamespace;
};

export default function HowItWorkSection({ namespace }: THowItWorkSection) {
  const messages = useMessages();
  const howItWork = namespace === 'HOME_PAGE' && messages['HOME_PAGE'].HOW_IT_WORK_SECTION;
  if (!howItWork) return;
  return (
    <section className="relative transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container py-12 px-4 md:px-5 lg:px-5 mx-auto"
      >
        <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
          <motion.div
            className="w-full flex-col justify-start items-center gap-3 flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="w-full text-center text-gray-900 dark:text-white text-4xl font-bold font-manrope leading-normal">
              {howItWork.title}
            </h2>
            <p className="w-full text-center text-gray-500 dark:text-gray-400 text-base font-normal leading-relaxed">
              {howItWork.caption}
            </p>
          </motion.div>

          {/* Steps */}
          <div className="w-full justify-start items-center gap-4 flex md:flex-row flex-col">
            {howItWork.steps.map(({ title, description }, index) => (
              <Fragment key={title}>
                <motion.div
                  className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="flex-col justify-start items-center gap-0.5 flex">
                    <h3 className="text-accented-primary text-4xl font-extrabold font-manrope leading-normal">
                      {index + 1}
                    </h3>
                    <h4 className="text-gray-900 dark:text-white text-xl font-semibold leading-8">{title}</h4>
                  </div>
                  <p className="text-gray-400 dark:text-gray-400 text-base font-normal leading-relaxed">
                    {description}
                  </p>
                </motion.div>

                {/* Arrow (skip after last item) */}
                {index < howItWork.steps.length - 1 && (
                  <FiChevronRight size={24} className="hidden md:flex text-accented-primary shrink-0" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
