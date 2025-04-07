import type { MetadataRoute } from 'next';
import env from '@/config/env.config';

// Constant for sitemaps
const host = env.HOST;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
