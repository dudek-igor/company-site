'use client';

import type { SupportedNamespace } from '@/config';
import { useMessages } from 'next-intl';
import * as motion from 'motion/react-client';

type TStatsSection = {
  namespace: SupportedNamespace;
};

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

const StatsSection = ({ namespace }: TStatsSection) => {
  const messages = useMessages();
  const stats = namespace === 'FOOTER' && messages[namespace].STATS_SECTION;

  if (!stats) return null;

  return (
    <section className="transition-colors duration-300 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map(({ title, caption }, index) => (
            <motion.div
              key={title}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeIn}
              custom={index}
            >
              <dt className="text-base/7 text-gray-600 dark:text-gray-400">{caption}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {title}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default StatsSection;
