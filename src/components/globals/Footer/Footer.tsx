'use client';
import { useTranslations } from 'next-intl';
import type { SupportedNamespace } from '@/config';
import { Link, usePathname } from '@/i18n/routing';
import { getNavigationTree } from '@/utils';
import clsx from 'clsx';
/**
 * Global Footer Compoent.
 */
function FooterNavItem({ href, namespace }: { href: string; namespace: SupportedNamespace }) {
  const pathname = usePathname();
  const isAcitve = pathname === href;
  const t = useTranslations(namespace); // i18n hook
  return (
    <li>
      <Link
        href={href}
        aria-current={isAcitve ? 'page' : undefined}
        className={clsx(
          'transition-colors',
          isAcitve
            ? 'text-accented-primary dark:text-accented-primary'
            : 'text-gray-900 dark:text-white hover:text-accented-primary dark:hover:text-accented-primary'
        )}
      >
        {t('link')}
      </Link>
    </li>
  );
}

function FooterNav({ type = 'navigation' }: { type?: 'support' | 'navigation' }) {
  const label = type === 'navigation' ? 'Navigation' : 'Helpful Links';
  const options = type === 'navigation' ? { withHomePath: true, onlyMainRoute: true } : { onlyHelpfulLinks: true };
  const navigation = getNavigationTree(options);

  return (
    <div>
      <strong className="font-medium text-gray-900 dark:text-white">{label}</strong>
      <ul className="mt-3 space-y-1">
        {navigation.map(({ link: href, namespace }) => (
          <FooterNavItem key={href} href={href} namespace={namespace} />
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslations('FOOTER'); // i18n hook
  return (
    <footer className="mx-auto container px-6 pt-16 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex flex-col items-center">
        <strong className="block text-center text-xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          {t.rich('heading', {
            br: () => <br />,
          })}
        </strong>

        <form className="mt-10 w-full max-w-md">
          <div className="relative">
            <label className="sr-only" htmlFor="email">
              Email
            </label>

            <input
              className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              id="email"
              type="email"
              placeholder={t('form.placeholder')}
            />

            <button className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-accented-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
              {t('form.button')}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
        <div className="mx-auto max-w-sm lg:max-w-none">
          <p className="text-center text-sm text-gray-500 lg:text-justify lg:text-base dark:text-gray-400">
            {t('caption')}
          </p>

          {/* <SocialBar /> */}
        </div>

        <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-2 lg:text-left">
          <FooterNav />
          <FooterNav type="support" />
        </div>
      </div>

      <div className="mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
        <p className="text-center text-xs/relaxed text-gray-500 dark:text-gray-400">{t('all-rights-reserved')}</p>
      </div>
    </footer>
  );
}
