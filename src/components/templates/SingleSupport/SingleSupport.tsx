import { getMessages } from 'next-intl/server';
import * as motion from 'motion/react-client';
import type { TBaseProps } from '@/config';
import { HeadingSection } from '@/components/ui';
/**
 * Template for Single Support Page
 */
export default async function SingleSupport({ namespace, locale }: TBaseProps) {
  const messages = await getMessages({ locale });
  if ('rules' in messages[namespace] && Array.isArray(messages[namespace].rules)) {
    const { caption, title, rules } = messages[namespace];

    return (
      <main className="pt-6 lg:pt-26">
        <HeadingSection title={title} caption={caption} />
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-3xl py-6 px-4 md:px-5 space-y-10"
        >
          {rules.map((item, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{item.title}</h2>
              <p className="whitespace-pre-line text-justify text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </motion.section>
      </main>
    );
  }

  return null;
}
