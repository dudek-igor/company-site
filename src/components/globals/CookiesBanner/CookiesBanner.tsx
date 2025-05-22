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
  const { cookieConsent, showCookieBanner, updateCookieConsent, saveConsent } = useCookies();
  const preferences: (keyof typeof cookieConsent)[] = [
    'analytics_storage',
    'ad_storage',
    'ad_personalization',
    'ad_user_data',
    'personalization_storage',
  ];

  return (
    <AnimatePresence initial={false}>
      {showCookieBanner && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className={
            'fixed p-6 bottom-0 md:bottom-8 md:right-8 w-full md:max-w-xl z-50 bg-white dark:bg-gray-900 border-t border-accented-primary md:border md:shadow-2xl md:rounded-lg'
          }
        >
          <div className="flex flex-col justify-between items-start gap-4">
            <div>
              <p className="text-sm text-gray-800 dark:text-gray-200 font-medium text-justify">{t('caption')}</p>
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
                    {preferences.map((preference, index) => (
                      <ConsentSwitch
                        key={index}
                        label={t(`preferences.${preference}`)}
                        enabled={cookieConsent[preference]}
                        setEnabled={(val) => updateCookieConsent(preference, val)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full flex flex-row flex-wrap gap-4">
              <button
                onClick={() => saveConsent(showPreferences ? 'custom' : 'acceptAll')}
                className="w-full cursor-pointer px-4 py-2 text-sm bg-gradient-to-r text-white from-accented-primary to-accented-secondary shadow-md rounded-lg"
              >
                {showPreferences ? t('button.submit.custom') : t('button.submit.acceptAll')}
              </button>
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
  disabled = false,
  setEnabled,
}: {
  label: string;
  enabled: boolean;
  disabled?: boolean;
  setEnabled: (val: boolean) => void;
}) => (
  <div className="flex items-center justify-between space-x-2">
    <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    <Switch
      disabled={disabled}
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
