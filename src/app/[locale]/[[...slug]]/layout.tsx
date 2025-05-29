import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { defaultTheme, themeLocalStorageKey } from '@/config';
import { ThemeProvider, CookieProvider } from '@/providers';
import { NextIntlClientProvider } from 'next-intl';
import { Header, Footer, CookiesBanner, GoogleTagMenager } from '@/components/globals';
import { notFound } from 'next/navigation';
import { JetBrains_Mono, Manrope } from 'next/font/google';
import { isValidLocaleTypeGuard, type Slug } from '@/utils';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string } & Partial<Slug>>;
};

export const dynamic = 'error';

const manrope = Manrope({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

export default async function RootLayout({ children, params }: Props) {
  /** @info Get locale */
  const { locale } = await params;
  /** @info Ensure that the incoming `locale` is valid. */
  if (!isValidLocaleTypeGuard(locale)) return notFound();
  /**
   * @info  We are using Static Side Generation only in build time,
   *        we have to enable static rendering.
   *        This function running getRequestConfig from i18n.
   * @see   https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#add-setrequestlocale-to-all-relevant-layouts-and-pages
   */
  setRequestLocale(locale);
  /** @info We need to enable suppress hydration warning due to detection light/dark theme. */
  return (
    <html lang={locale} suppressHydrationWarning className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* This Script detect user theme preferation */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(()=>{"use strict";let e=()=>localStorage.getItem("${themeLocalStorageKey}"),t=e=>localStorage.setItem("${themeLocalStorageKey}",e),m=()=>{let t=e();return t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"${defaultTheme}")},h=e=>{document.documentElement.setAttribute("data-theme",e),t(e)};h(m())})()`,
          }}
        />
      </head>
      <body className="font-sans">
        {/* Unfortunately, we have to use a provider, unfortunately the link from next-intl requires it */}
        <NextIntlClientProvider>
          <CookieProvider>
            <ThemeProvider>
              <Header />
              {children}
              <CookiesBanner />
              <Footer />
              <GoogleTagMenager />
            </ThemeProvider>
          </CookieProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
