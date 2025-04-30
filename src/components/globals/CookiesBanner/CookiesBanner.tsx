'use client';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useCookies } from '@/providers';

const CookieBanner = () => {
  const namespace = 'COOKIES_BANNER';
  const t = useTranslations(namespace);
  const [showPreferences, setShowPreferences] = useState(false);
  const { cookies, showCookieBanner, setCookieConsent, saveConsent } = useCookies();
  const preferences: (keyof typeof cookies)[] = ['analytics', 'marketing', 'necessary'];

  return (
    <AnimatePresence initial={false}>
      {showCookieBanner && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className={
            'fixed p-4 bottom-0 w-full z-50 bg-white dark:bg-gray-900 border-t border-accented-primary shadow-lg'
          }
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center md:gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium text-justify">{t('caption')}</p>
              <AnimatePresence initial={false}>
                {showPreferences && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pt-2 space-y-2"
                  >
                    {preferences
                      .filter((preference) => preference !== 'necessary')
                      .map((preference, index) => (
                        <ConsentSwitch
                          key={index}
                          label={t(`preferences.${preference}`)}
                          enabled={cookies[preference]}
                          setEnabled={(val) => setCookieConsent(preference, val)}
                        />
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full flex flex-row flex-wrap gap-2 md:gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="grow text-sm underline text-gray-600 dark:text-gray-400"
              >
                {showPreferences ? t('button.settings.close') : t('button.settings.open')}
              </button>
              <button
                onClick={() => saveConsent('rejectAll')}
                className="grow px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg"
              >
                {t('button.reject')}
              </button>
              <button
                onClick={() => saveConsent(showPreferences ? 'custom' : 'acceptAll')}
                className="grow cursor-pointer px-4 py-2 text-sm bg-gradient-to-r text-white from-accented-primary to-accented-secondary shadow-md rounded-lg"
              >
                {showPreferences ? t('button.submit.custom') : t('button.submit.acceptAll')}
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

const ConsentSwitch = ({
  label,
  enabled,
  setEnabled,
}: {
  label: string;
  enabled: boolean;
  setEnabled: (val: boolean) => void;
}) => (
  <div className="flex items-center justify-between space-x-2">
    <span className="text-sm text-gray-700">{label}</span>
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-accented-primary justify-end' : 'bg-gray-300  justify-start'}
       flex items-center p-1 h-5 min-w-10 rounded-full transition-colors`}
    >
      <motion.span
        className={clsx('h-3 w-3 rounded-full bg-white')}
        layout
        transition={{
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </Switch>
  </div>
);

export default CookieBanner;
