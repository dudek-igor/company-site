'use client';
import * as motion from 'motion/react-client';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '@/providers';

export default function LayoutAnimation() {
  const { setThemeState, theme } = useTheme();

  return (
    <button
      onClick={() => setThemeState(theme === 'dark' ? 'light' : 'dark')}
      className={`flex items-center justify-${theme === 'dark' ? 'start' : 'end'} w-14 h-8 rounded-full cursor-pointer bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Toggle theme"
    >
      <motion.div
        className={`${theme === '' ? 'invisible' : 'visible'} w-8 h-8 rounded-full flex justify-center items-center bg-white border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700`}
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
      </motion.div>
    </button>
  );
}
