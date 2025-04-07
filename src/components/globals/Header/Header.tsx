'use client';
import { Logo } from '@/components/ui/atoms';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { MobileMenu, Navigation } from '@/components/ui';
import { useState } from 'react';
import clsx from 'clsx';
/**
 * Global component Header
 */
export default function Header() {
  const [isAtTop, setIsAtTop] = useState(true);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsAtTop(latest === 0);
  });

  return (
    <header
      className={clsx(
        'sticky lg:fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 dark:text-white lg:transition-colors lg:duration-300 lg:ease-in-out',
        isAtTop ? 'lg:bg-transparent dark:lg:bg-transparent' : 'lg:bg-white dark:lg:bg-gray-900 shadow-2xl'
      )}
    >
      <nav aria-label="Global" className="flex items-stretch justify-between pl-5 lg:px-8 lg:py-3">
        <Logo />
        {/* Mobile Menu visiable only to 1023px*/}
        <div className="flex lg:hidden">
          <MobileMenu />
        </div>
        {/* Main Navigation visiable from 1024px*/}
        <Navigation />
      </nav>
    </header>
  );
}
