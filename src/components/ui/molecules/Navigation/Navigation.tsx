'use client';
import type { IconType } from 'react-icons';
import { Fragment, useState } from 'react';
import clsx from 'clsx';
import { FaAngleDown } from 'react-icons/fa6';
import { usePathname, Link } from '@/i18n/routing';
import { LanguageSelector, ThemeSwitcher } from '@/components/ui/atoms';
import { getNavigationTree, type NavigationNode } from '@/utils';
import { useTranslations } from 'next-intl';

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isAcitve = pathname === href;
  return (
    <Link
      href={href}
      aria-current={isAcitve ? 'page' : undefined}
      className={clsx(
        'px-4 py-3 text-lg font-medium transition-colors',
        isAcitve
          ? 'text-accented-primary dark:text-accented-primary'
          : 'text-gray-900 dark:text-white hover:text-accented-primary dark:hover:text-accented-primary'
      )}
    >
      {label}
    </Link>
  );
}

function NavDropdownItem({
  href,
  label,
  caption,
  icon: Icon,
}: {
  href: string;
  label: string;
  caption: string;
  icon: IconType;
}) {
  const pathname = usePathname();
  const isAcitve = href === pathname;
  return (
    <Link
      href={href}
      role="menuitem"
      aria-current={isAcitve ? 'page' : undefined}
      className="group/link relative flex items-center gap-x-5 rounded-lg p-5 text-base transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 group-hover/link:bg-white dark:group-hover/link:bg-gray-700">
        <Icon aria-hidden="true" className="size-6 text-accented-primary" />
      </div>
      <div className="flex-auto">
        <span
          className={clsx(
            'block font-semibol transition-colors',
            isAcitve
              ? 'text-accented-primary dark:text-accented-primary'
              : 'text-gray-900 dark:text-white group-hover/link:text-accented-primary dark:group-hover/link:text-accented-primary'
          )}
        >
          {label}
        </span>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{caption}</p>
      </div>
    </Link>
  );
}

const NavDropdown = ({
  parentLink,
  label,
  childrenItems,
}: {
  parentLink: string;
  label: string;
  childrenItems: NavigationNode[];
}) => {
  const pathname = usePathname();
  const [isHover, setIsHover] = useState(false);
  const t = useTranslations();
  const isAcitve = parentLink === pathname || pathname.toString().includes(parentLink);
  const isWide = childrenItems.length >= 6 && childrenItems.length % 2 === 0;
  return (
    <div
      className="relative group "
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      role="menu"
      aria-label={`${label} submenu`}
    >
      <Link
        href={parentLink}
        aria-haspopup="true"
        aria-expanded={isHover ? 'true' : 'false'}
        aria-label={`${label} menu`}
        className={clsx(
          'flex items-center px-4 py-3 gap-x-1 text-lg font-medium transition-colors',
          isAcitve
            ? 'text-accented-primary dark:text-accented-primary'
            : 'text-gray-900 dark:text-white group-hover:text-accented-primary dark:group-hover:text-accented-primary'
        )}
      >
        {label}
        <FaAngleDown
          aria-hidden="true"
          className={clsx(
            'size-4 transition-colors',
            isAcitve
              ? 'text-accented-primary dark:text-accented-primary'
              : 'dark:text-gray-300 group-hover:text-accented-primary dark:group-hover:text-accented-primary'
          )}
        />
      </Link>

      <div
        className={clsx(
          'absolute invisible top-full -left-8 z-10 w-screen overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:ring-gray-700 scale-95 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0',
          isWide ? 'max-w-3xl grid grid-cols-2' : 'max-w-md'
        )}
      >
        {childrenItems.map(({ link, namespace, icon }) => (
          <NavDropdownItem
            key={link}
            href={link}
            label={t(`${namespace}.link`)}
            caption={t(`${namespace}.caption`)}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
};

export default function Navigation() {
  const navigation = getNavigationTree();
  const t = useTranslations();

  return (
    <>
      <div className="hidden lg:flex container lg:justify-evenly">
        {navigation.map(({ namespace, link, children }) => (
          <Fragment key={link}>
            {!children || children.length === 0 ? (
              <NavItem href={link} label={t(`${namespace}.link`)} />
            ) : (
              <NavDropdown parentLink={link} label={t(`${namespace}.link`)} childrenItems={children} />
            )}
          </Fragment>
        ))}
      </div>

      {/* Language & Theme */}
      <div className="hidden lg:flex items-center justify-end space-x-3">
        <LanguageSelector diraction="down" />
        <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-black dark:bg-white opacity-30" />
        <ThemeSwitcher />
      </div>
    </>
  );
}
