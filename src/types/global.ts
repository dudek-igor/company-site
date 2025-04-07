import { SupportedLocale } from '@/config';
import messages from '@/i18n/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: SupportedLocale;
    Messages: typeof messages;
  }
}

declare global {
  type Nullable<T> = T | null;
}

export {};
