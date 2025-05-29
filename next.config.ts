import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compress: true, // GZIP compression
  poweredByHeader: false,
  // output: 'standalone',
  experimental: {
    optimizePackageImports: ['@next/third-parties'],
  },
};

export default withNextIntl(nextConfig);
