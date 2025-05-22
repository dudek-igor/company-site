'use client';
import React, { createContext, useCallback, useEffect, useState, useContext } from 'react';
import { sendGTMEvent } from '@next/third-parties/google';
import { cookieKey } from '@/config';

type CookieConsentType = {
  ad_storage: boolean;
  ad_user_data: boolean;
  ad_personalization: boolean;
  analytics_storage: boolean;
  personalization_storage: boolean;
};

type CookiesContextType = {
  cookieConsent: CookieConsentType;
  showCookieBanner: boolean;
  updateCookieConsent: (key: keyof CookieConsentType, value: boolean) => void;
  saveConsent: (mode: 'acceptAll' | 'rejectAll' | 'custom') => void;
};

const defaultCookieConsent: CookieConsentType = {
  analytics_storage: false,
  personalization_storage: false,
  ad_storage: false,
  ad_user_data: false,
  ad_personalization: false,
};

const initialContext: CookiesContextType = {
  cookieConsent: defaultCookieConsent,
  showCookieBanner: false,
  updateCookieConsent: () => {},
  saveConsent: () => {},
};

const CookieContext = createContext(initialContext);

function isCookiesType(obj: unknown): obj is CookieConsentType {
  if (typeof obj !== 'object' || obj === null) return false;

  const keys = Object.keys(defaultCookieConsent) as (keyof CookieConsentType)[];
  return keys.every((key) => typeof (obj as Record<string, unknown>)[key] === 'boolean');
}

export const CookieProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookieConsent, setCookieConsent] = useState<CookieConsentType>(defaultCookieConsent);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false);
  /**
   * Adjust cookie consent upon site visit
   */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(cookieKey);
      const parsed = saved ? JSON.parse(saved) : null;
      if (isCookiesType(parsed)) {
        setCookieConsent(parsed);
        sendGTMEvent({ event: 'cookie_consent_update', cookie_consent: parsed });
      } else {
        setShowCookieBanner(true);
      }
    } catch {}
  }, []);

  const updateCookieConsent = useCallback((key: keyof CookieConsentType, value: boolean) => {
    setCookieConsent((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveConsent = useCallback(
    (mode: 'acceptAll' | 'rejectAll' | 'custom') => {
      const cookie_consent: CookieConsentType =
        mode === 'acceptAll'
          ? (Object.fromEntries(Object.keys(cookieConsent).map((key) => [key, true])) as CookieConsentType)
          : mode === 'rejectAll'
            ? defaultCookieConsent
            : cookieConsent;

      // Set Cookie Consent to local storage
      localStorage.setItem(cookieKey, JSON.stringify(cookie_consent));
      // Set cookie consent to state
      setCookieConsent(cookie_consent);
      // Hide Cookie Banner
      setShowCookieBanner(false);
      // Send event to Google Tag Menager
      sendGTMEvent({
        event: 'cookie_consent_update',
        cookie_consent,
      });
    },
    [cookieConsent]
  );

  return (
    <CookieContext.Provider value={{ cookieConsent, showCookieBanner, updateCookieConsent, saveConsent }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => useContext(CookieContext);
