'use client';
import React, { createContext, useCallback, useEffect, useState, useContext } from 'react';
import { cookieKey } from '@/config';

type CookiesType = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type CookiesContextType = {
  cookies: CookiesType;
  showCookieBanner: boolean;
  setCookieConsent: (key: keyof CookiesType, value: boolean) => void;
  saveConsent: (mode: 'acceptAll' | 'rejectAll' | 'custom') => void;
};

const defaultCookies: CookiesType = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const initialContext: CookiesContextType = {
  cookies: defaultCookies,
  showCookieBanner: false,
  setCookieConsent: () => {},
  saveConsent: () => {},
};

const CookieContext = createContext(initialContext);

function isCookiesType(obj: unknown): obj is CookiesType {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj as CookiesType).necessary === true &&
    typeof (obj as CookiesType).analytics === 'boolean' &&
    typeof (obj as CookiesType).marketing === 'boolean'
  );
}

export const CookieProvider = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookies] = useState<CookiesType>(defaultCookies);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(cookieKey);
    let parsed: unknown;

    try {
      parsed = saved ? JSON.parse(saved) : null;
    } catch {
      parsed = null;
    }

    if (isCookiesType(parsed)) {
      setCookies(parsed);
    } else {
      setShowCookieBanner(true);
    }
  }, []);

  const setCookieConsent = useCallback((key: keyof CookiesType, value: boolean) => {
    setCookies((prev) => {
      const updated = { ...prev, [key]: key === 'necessary' ? true : value };
      return updated;
    });
  }, []);

  const saveConsent = useCallback(
    (mode: 'acceptAll' | 'rejectAll' | 'custom') => {
      const consent: CookiesType =
        mode === 'acceptAll'
          ? { necessary: true, analytics: true, marketing: true }
          : mode === 'rejectAll'
            ? { necessary: true, analytics: false, marketing: false }
            : cookies;

      setCookies(consent);
      localStorage.setItem(cookieKey, JSON.stringify(consent));
      setShowCookieBanner(false);
    },
    [cookies]
  );

  return (
    <CookieContext.Provider value={{ cookies, showCookieBanner, setCookieConsent, saveConsent }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => useContext(CookieContext);
