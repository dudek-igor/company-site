import * as motion from 'motion/react-client';
/**
 * Heading Section Component
 */
type THeadingSectionSecondary = {
  title: string;
  caption: string;
};

const HeadingSectionSecondary = ({ title, caption }: THeadingSectionSecondary) => {
  return (
    <section className="relative overflow-hidden transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto container py-6 lg:py-12 px-4 md:px-5 text-center"
      >
        <h2 className="inline-flex items-center rounded-4xl bg-gray-50 dark:bg-gray-800 px-4 py-2 mb-6 opacity-75 text-md font-medium text-gray-600 dark:text-gray-300 ring-1 ring-gray-500/10 dark:ring-white/10 ring-inset">
          {title}
        </h2>
        {caption && (
          <h3 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto">{caption}</h3>
        )}
      </motion.div>
    </section>
  );
};

export default HeadingSectionSecondary;
