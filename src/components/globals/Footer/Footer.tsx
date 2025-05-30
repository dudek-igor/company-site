'use client';
import { useTranslations } from 'next-intl';
import type { SupportedNamespace } from '@/config';
import { Link, usePathname } from '@/i18n/routing';
import { getNavigationTree } from '@/utils';
import clsx from 'clsx';
import * as motion from 'motion/react-client';
import { StatsSection } from '@/components/ui';
import { sendSubscriptionMail } from '@/actions';
import { useActionState } from 'react';
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

function FooterNav({ type, label }: { type?: 'support' | 'navigation'; label: string }) {
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
  const namespace = 'FOOTER';
  const t = useTranslations(namespace);
  const [state, formAction, isPending] = useActionState(sendSubscriptionMail, { success: false });

  return (
    <footer className="mx-auto container px-6 pt-20 pb-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex flex-col items-center pb-12"
      >
        <strong className="block text-center text-xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          {t.rich('title', { br: () => <br /> })}
        </strong>

        <form action={formAction} className="mt-10 lg:mt-24 w-full max-w-md">
          <div className="relative">
            <label className="sr-only" htmlFor="email">
              Email
            </label>

            <input
              className={clsx(
                'w-full rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 p-4 pe-32 text-sm font-medium dark:bg-gray-800 dark:text-white',
                state.error && 'border-red-500 dark:border-red-500',
                state.success && 'border-green-600 dark:border-green-600'
              )}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={state.values?.email}
              placeholder={t('form.email.placeholder')}
              aria-invalid={state.error === 'email'}
              aria-describedby="email-error"
            />

            <button
              disabled={isPending}
              type="submit"
              id="submit"
              className={clsx(
                'cursor-pointer absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-accented-primary to-accented-secondary px-5 py-3 text-sm font-medium text-white',
                isPending && 'animate-pulse'
              )}
            >
              {t(`form.button.${isPending ? 'sending' : 'default'}`)}
            </button>
          </div>
          <div className="mt-2">
            {state?.success && (
              <div id="general" className="text-center text-sm text-green-600">
                {t('form.success')}
              </div>
            )}
            {state?.error && (
              <div id="error" className="text-center text-sm text-red-500">
                {t(`form.error.${state.error}`)}
              </div>
            )}
          </div>
        </form>
      </motion.div>
      <StatsSection namespace={namespace} />
      <div className="py-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
        <div className="mx-auto max-w-sm lg:max-w-none">
          <p className="text-center text-sm text-gray-500 lg:text-justify lg:text-base dark:text-gray-400">
            {t('caption')}
          </p>

          {/* <SocialBar /> */}
        </div>

        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:text-left">
          <FooterNav type="navigation" label={t('menu.navigation')} />
          <FooterNav type="support" label={t('menu.support')} />
        </div>
      </div>

      <div className="mt-16 border-t border-gray-100 pt-8 dark:border-gray-800">
        <p className="text-center text-xs/relaxed text-gray-500 dark:text-gray-400">{t('all-rights-reserved')}</p>
      </div>
    </footer>
  );
}
