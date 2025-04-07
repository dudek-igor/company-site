'use client';
import { useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { useLocale } from 'next-intl';
import { Link, usePathname, routing } from '@/i18n/routing';
import { AnimatePresence, motion } from 'motion/react';
import clsx from 'clsx';
/**
 * Language Selector Component
 *
 * @info  Server Components are the default, and therefore shared components will typically execute as Server Components.
 *        Moving internationalization to the server side unlocks new levels of performance, leaving the client side for interactive features.
 * @see   https://next-intl.dev/docs/environments/server-client-components
 * @see   https://next-intl.dev/docs/routing/navigation#link
 *
 */
type TLanguageSelector = {
  diraction?: 'up' | 'down';
};

const LanguageSelector = ({ diraction = 'down' }: TLanguageSelector) => {
  const [isOpenDropdown, openDropdown] = useState(false);
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <Menu as="div" className="relative inline-block text-left" aria-label="Language selector">
      <div>
        <MenuButton
          onClick={() => openDropdown(!isOpenDropdown)}
          className="flex w-full justify-center items-center gap-x-1.5 rounded-md cursor-pointer
                     bg-white dark:bg-gray-900 px-3 py-1.5 text-sm font-semibold 
                     text-gray-900 dark:text-white ring-1 shadow-xs ring-gray-300 dark:ring-gray-700 ring-inset 
                     transition-colors duration-300 ease-in-out 
                     hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {currentLocale.toUpperCase()}
          {diraction === 'down' ? (
            <FaAngleDown
              aria-hidden="true"
              className="-mr-1 size-4 dark:text-gray-300 transition-colors duration-300 ease-in-out"
            />
          ) : (
            <FaAngleUp
              aria-hidden="true"
              className="-mr-1 size-4 dark:text-gray-300 transition-colors duration-300 ease-in-out"
            />
          )}
        </MenuButton>
      </div>

      <AnimatePresence>
        {isOpenDropdown && (
          <MenuItems
            static
            as={motion.div}
            initial={{ opacity: 0, y: diraction === 'down' ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: diraction === 'down' ? -10 : 10 }}
            className={clsx(
              'absolute right-0 z-10 rounded-md bg-white dark:bg-gray-900 ring-1 shadow-lg ring-black/5 dark:ring-gray-700',
              diraction === 'down' ? 'mt-2 origin-top-right' : 'mb-2 bottom-full origin-bottom-right'
            )}
          >
            <div>
              {routing.locales
                .filter((locale) => locale !== currentLocale)
                .map((locale) => (
                  <MenuItem key={locale}>
                    <Link
                      href={pathname}
                      locale={locale}
                      className="block px-5.5 py-2 text-sm text-gray-700 dark:text-gray-300 w-full text-left 
                               transition-colors duration-300 ease-in-out 
                               hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    >
                      {locale.toUpperCase()}
                    </Link>
                  </MenuItem>
                ))}
            </div>
          </MenuItems>
        )}
      </AnimatePresence>
    </Menu>
  );
};

export default LanguageSelector;
