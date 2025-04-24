import Image, { type StaticImageData } from 'next/image';
import * as motion from 'motion/react-client';
import clsx from 'clsx';
import { Link } from '@/i18n/routing';
/**
 * Horizontal Card Section Component
 */
type THorizontalCardSection = {
  title: string;
  caption: string;
  text: string;
  direction?: 'left' | 'right';
  image: StaticImageData;
  link?: {
    title: string;
    href: string;
  };
};

export default function HorizontalCardSection({
  title,
  caption,
  text,
  link,
  image,
  direction = 'right',
}: THorizontalCardSection) {
  return (
    <section className="relative overflow-hidden transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, x: direction === 'right' ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-7xl py-6 lg:py-12 px-4 md:px-5"
      >
        <div className="grid md:grid-cols-12 items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-4xl overflow-hidden shadow-xl transition-color duration-300">
          <div
            className={clsx(
              'p-8 lg:p-16 md:col-span-6',
              direction === 'right' ? 'order-1 md:order-2' : 'order-1 md:order-1'
            )}
          >
            <h4 className="font-bold mb-6 text-accented-primary">{title}</h4>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{caption}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p>
            {link && (
              <Link
                className="inline-block px-6 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-md hover:bg-opacity-90 transition-colors duration-300 font-medium"
                href={link.href}
              >
                {link.title}
              </Link>
            )}
          </div>
          <div
            className={clsx(
              'relative h-full min-h-[400px] md:col-span-6',
              direction === 'right' ? 'order-2 md:order-1' : 'order-2 md:order-2'
            )}
          >
            <Image
              alt={title + ' - Hello Software'}
              src={image}
              placeholder="blur"
              quality={100}
              sizes="400px"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// <!-- Values Section -->
// <section>
//   <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
//     <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-light dark:text-primary-dark">
//       OUR VALUES
//     </h2>
//     <h3 className="text-xl md:text-2xl font-semibold mb-4 text-secondary-light dark:text-secondary-dark">
//       Guiding Principles
//     </h3>
//     {/* <p className="text-gray-700 dark:text-gray-300 mb-6">
//     Our values serve as the guiding principles that underpin everything we do at Financial Freedom Advisors:
//   </p> */}
//     <ul className="space-y-4 mb-8">
//       <li className="flex items-start">
//         <span className="text-secondary-light dark:text-secondary-dark font-bold mr-3">•</span>
//         <span className="text-gray-700 dark:text-gray-300">
//           <strong>Integrity:</strong> We uphold the highest standards of honesty, transparency, and ethical
//           conduct in all our interactions.
//         </span>
//       </li>
//       <li className="flex items-start">
//         <span className="text-secondary-light dark:text-secondary-dark font-bold mr-3">•</span>
//         <span className="text-gray-700 dark:text-gray-300">
//           <strong>Client-Centric Approach:</strong> Our clients' needs and goals are at the forefront of
//           everything we do. We are committed to delivering tailored solutions that prioritize their best
//           interests.
//         </span>
//       </li>
//     </ul>
//     {/* <a
//     href="#"
//     className="inline-block px-6 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-md hover:bg-opacity-90 transition-colors duration-300 font-medium"
//   >
//     READ MORE
//   </a> */}
//   </div>
// </section>
