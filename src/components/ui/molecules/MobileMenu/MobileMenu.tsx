'use client';
import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, usePathname } from '@/i18n/routing';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { FaAngleDown } from 'react-icons/fa6';
import { LanguageSelector, HamburgerButton, ThemeSwitcher } from '@/components/ui/atoms';
import { useTranslations } from 'next-intl';
import { getNavigationTree } from '@/utils';
import clsx from 'clsx';
/**
 * Mobile Menu Compoent.
 * You can position only a button
 */
export default function MobileMenu() {
  const navigation = getNavigationTree({ withHomePath: true });
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations(); // i18n hook

  const renderMenu = (items: ReturnType<typeof getNavigationTree>, iteration: number = 1) => {
    return items.map(({ link, namespace, children }) => {
      const isActive = pathname === link;
      const label = t(`${namespace}.link`);

      return (
        <Fragment key={link}>
          {!children || children.length === 0 ? (
            <Link
              href={link}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                'py-6 block border-b border-gray-300 px-6 text-base font-semibold transition-colors duration-300 ease-in-out',
                isActive ? 'text-accented-primary dark:text-accented-primary' : 'text-gray-900  dark:text-white'
              )}
            >
              {label}
            </Link>
          ) : (
            <Disclosure>
              {({ open }) => (
                <div>
                  <DisclosureButton
                    aria-expanded={open}
                    className="flex w-full py-6 justify-between border-b border-gray-300 px-6 text-base font-semibold text-gray-900 dark:text-white transition-colors duration-300 ease-in-out"
                  >
                    {label}
                    <FaAngleDown
                      className={clsx('size-7 transition-transform duration-300', open ? 'rotate-180' : 'rotate-0')}
                    />
                  </DisclosureButton>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className={`ml-${iteration * 4}`}>{renderMenu(children, iteration + 1)}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Disclosure>
          )}
        </Fragment>
      );
    });
  };

  return (
    <>
      <HamburgerButton isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed flex flex-col lg:hidden bottom-0 overflow-y-scroll top-20 py-10 right-0 w-full md:max-w-md bg-white dark:bg-gray-900 p-6 transition-colors duration-300 ease-in-out"
          >
            <div className="grow">{renderMenu(navigation)}</div>

            <div className="flex justify-between mt-10 px-6 py-4">
              <LanguageSelector diraction="up" />
              <ThemeSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
