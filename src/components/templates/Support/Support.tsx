// import { getMessages } from 'next-intl/server';
import type { TBaseProps } from '@/config';
/**
 * Template for Support
 */
export default async function Support({}: TBaseProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-black dark:text-white">
          Regulamin korzystania z usług – Hello Software
        </h1>
      </div>
    </section>
  );
}
