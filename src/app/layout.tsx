import './globals.css';
import env from '@/config/env.config';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

type Props = {
  children: ReactNode;
};
/**
 * We have to setup the layout just for Error 404 page
 */
export default async function ErrorLayout({ children }: Props) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  metadataBase: new URL(env.HOST),
  title: {
    template: '%s | Hello Software',
    default: 'Hello Software', // a default is required when creating a template
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
