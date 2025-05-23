import * as motion from 'motion/react-client';
/**
 * Heading Section Component
 */
type THeadingSection = {
  title: string;
  caption?: string;
  motto?: string;
};

const HeadingSection = ({ title, caption, motto }: THeadingSection) => {
  return (
    <header className="relative overflow-hidden transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto container py-6 lg:py-12 px-4 md:px-5 text-center"
      >
        {title && <h1 className="text-accented-primary text-4xl md:text-5xl mb-6">{title}</h1>}
        {caption && (
          <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-6">{caption}</h2>
        )}
        {motto && <h3 className="text-gray-500 dark:text-gray-400">{motto}</h3>}
      </motion.div>
    </header>
  );
};

export default HeadingSection;
