import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { TBaseProps } from '@/config';
import { HeadingSection, HorizontalCardSection } from '@/components/ui';
import image1 from '@/public/assets/img/about-us/hello-software-core-values.jpg';
import image2 from '@/public/assets/img/about-us/hello-software-team-culture.png';
import image3 from '@/public/assets/img/about-us/hello-software-vision.jpg';
import image4 from '@/public/assets/img/about-us/hello-software-why-choose-us.jpg';
/**
 * Template for About Us
 *
 * Images shoudl be 400x300
 */
const images = [image1, image2, image3, image4];

export default function AboutUs({ locale, namespace }: TBaseProps) {
  setRequestLocale(locale);
  const t = useTranslations(namespace);

  return (
    <main className="pt-6 lg:pt-26">
      <HeadingSection title={t('title')} caption={t('caption')} />
      {images.map((image, index) => (
        <HorizontalCardSection
          key={index}
          title={t(`sections_${index + 1}.title`)}
          caption={t(`sections_${index + 1}.caption`)}
          text={t(`sections_${index + 1}.text`)}
          direction={index % 2 ? 'left' : 'right'}
          image={image}
        />
      ))}
    </main>
  );
}
