import Link from 'next/link';
import { themeLocalStorageKey, defaultTheme } from '@/config';
import * as motion from 'motion/react-client';
/**
 * Unfortunately we can only create one 404 page.
 */
export default function NotFoundPage() {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <motion.main
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 } }}
          className="h-screen grid place-items-center px-6 py-24 sm:py-32 lg:px-8"
        >
          <div className="text-center">
            <p className="text-2xl font-semibold text-accented-primary">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-7xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 dark:text-gray-400 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-gradient-to-r from-accented-primary to-accented-secondary px-3.5 py-2.5 text-md font-semibold text-white shadow-xl 
               focus-visible:outline-2 focus-visible:outline-offset-2 hover:scale-115 transition-transform duration-300"
              >
                Home <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </motion.main>
      </body>
    </html>
  );
}
