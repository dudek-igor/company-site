'use client';
import * as motion from 'motion/react-client';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '@/providers';
import clsx from 'clsx';

export default function LayoutAnimation() {
  const { setThemeState, theme } = useTheme();

  return (
    <button
      onClick={() => setThemeState(theme === 'dark' ? 'light' : 'dark')}
      className={clsx(
        'flex items-center w-14 h-8 rounded-full cursor-pointer bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700',
        theme === 'dark' ? 'justify-start' : 'justify-end'
      )}
      aria-label="Toggle theme"
    >
      <motion.span
        className={clsx(
          'w-8 h-8 rounded-full flex justify-center items-center bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700',
          theme === '' ? 'invisible' : 'visible'
        )}
        layout
        transition={{
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      >
        {theme === 'dark' ? (
          <FaMoon className="size-4 stroke-gray-400 fill-gray-400" />
        ) : (
          <FaSun className="size-4 stroke-amber-200 fill-amber-400" />
        )}
      </motion.span>
    </button>
  );
}
