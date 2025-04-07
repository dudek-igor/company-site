import type { ReactNode } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { defaultTheme, themeLocalStorageKey } from '@/config';
import { ThemeProvider } from '@/providers';
import { NextIntlClientProvider } from 'next-intl';
import { Header, Footer } from '@/components/globals';
import { notFound } from 'next/navigation';
import { type Slug } from '@/utils';

type Props = {
  children: ReactNode;
  params: Promise<Slug>;
};

export const dynamic = 'error';

export default async function RootLayout({ children, params }: Props) {
  /** @info Get slug and rerive locale */
  const { slug } = await params;
  const locale = slug[0];
  /** @info Ensure that the incoming `locale` is valid. */
  if (!hasLocale(routing.locales, locale)) return notFound();
  /**
   * @info  We are using Static Side Generation only in build time,
   *        we have to enable static rendering.
   *        This function running getRequestConfig from i18n.
   * @see   https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#add-setrequestlocale-to-all-relevant-layouts-and-pages
   */
  setRequestLocale(locale);
  /** @info We need to enable suppress hydration warning due to detection light/dark theme. */
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* This Script detect user theme preferation */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(()=>{"use strict";let e=()=>localStorage.getItem("${themeLocalStorageKey}"),t=e=>localStorage.setItem("${themeLocalStorageKey}",e),m=()=>{let t=e();return t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"${defaultTheme}")},h=e=>{document.documentElement.setAttribute("data-theme",e),t(e)};h(m())})()`,
          }}
        />
      </head>
      <body>
        {/* Unfortunately, we have to use a provider, unfortunately the link from next-intl requires it */}
        <NextIntlClientProvider>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
