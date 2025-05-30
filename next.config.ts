import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import env from '@/config/env.config';

const withNextIntl = createNextIntlPlugin();

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' 
    https://*.googletagmanager.com 
    https://*.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: 
    https://*.google-analytics.com 
    https://*.googletagmanager.com;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  frame-src https://*.googletagmanager.com;
  connect-src 'self' 
    https://*.google-analytics.com 
    https://*.analytics.google.com 
    https://*.googletagmanager.com 
    https://*.gstatic.com;
    ${env.NODE_ENV === 'production' ? 'upgrade-insecure-requests;' : ''}
`;

const nextConfig: NextConfig = {
  compress: true, // GZIP compression
  poweredByHeader: false,
  // output: 'standalone',
  experimental: {
    optimizePackageImports: ['@next/third-parties'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
