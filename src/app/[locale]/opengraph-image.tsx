import { ImageResponse } from 'next/og';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { isValidLocaleTypeGuard } from '@/utils';

type TOpenGraphProps = {
  params: Promise<{ locale: string }>;
};

export async function generateImageMetadata() {
  return [
    {
      id: 1,
      size: { width: 1200, height: 630 },
      alt: 'Hello Software',
      contentType: 'image/png',
    },
  ];
}

export default async function OpenGraphImageGeneration({ params }: TOpenGraphProps) {
  /** @info Get locale */
  const { locale } = await params;
  /** @info Ensure that the incoming `locale` is valid. */
  if (!isValidLocaleTypeGuard(locale)) return notFound();
  /** @info Get Translation */
  const t = await getTranslations({ locale, namespace: 'OG_IMAGE' });

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #1a1a2e, #16213e)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            marginBottom: '24px',
            background: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {t('title')}
        </div>
        <div style={{ fontSize: '32px', marginBottom: '40px' }}>{t('caption')}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '24px',
          }}
        >
          <span>{t('link')}</span>
        </div>
      </div>
    )
  );
}
