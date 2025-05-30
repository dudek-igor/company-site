import type { TBaseProps } from '@/config';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { getChildrenNamespace, getLinkHrefViaNamespace } from '@/utils';
import * as motion from 'motion/react-client';
import {
  HeroSection,
  HowItWorkSection,
  HeadingSectionSecondary,
  IntegrationSection,
  ContactSection,
  HorizontalCardSection,
  DescriptionListSection,
} from '@/components/ui';
import shape from '@/public/assets/img/shape/2.png';
import imageCoreValues from '@/public/assets/img/about-us/hello-software-core-values.jpg';
import imageWhyChooseUs from '@/public/assets/img/about-us/hello-software-why-choose-us.jpg';
/**
 * Template for HomePage
 */
export default function HomePage(props: TBaseProps) {
  const { namespace, locale } = props;
  setRequestLocale(locale);
  const t = useTranslations();
  return (
    <main className="relative pt-6 lg:pt-26 overflow-hidden">
      {/* Decoration in the left corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.4 }}
        className="absolute left-0 top-0 -z-10"
      >
        <Image src={shape} alt="shape" className="max-w-[60%] opacity-50" />
      </motion.div>
      <HeroSection namespace={props.namespace} />
      <HeadingSectionSecondary title={t('SERVICES.title')} caption={t('SERVICES.caption')} />
      <DescriptionListSection namespace={'SERVICES'} />
      <HowItWorkSection namespace={namespace} />
      <HeadingSectionSecondary title={t('CONTACT.title')} caption={t('CONTACT.caption')} />
      <ContactSection {...props} />
      <HeadingSectionSecondary title={t('TECHNOLOGIES.title')} caption={t('TECHNOLOGIES.caption')} />
      <IntegrationSection items={getChildrenNamespace('TECHNOLOGIES')} />
      <HeadingSectionSecondary title={t('ABOUT_US.title')} caption={t('ABOUT_US.caption')} />
      <HorizontalCardSection
        title={t(`ABOUT_US.sections_1.title`)}
        caption={t(`ABOUT_US.sections_1.caption`)}
        text={t(`ABOUT_US.sections_1.text`)}
        image={imageCoreValues}
        direction="left"
        link={{
          title: t(`ABOUT_US.link`),
          href: getLinkHrefViaNamespace('ABOUT_US'),
        }}
      />
      <HorizontalCardSection
        title={t(`ABOUT_US.sections_4.title`)}
        caption={t(`ABOUT_US.sections_4.caption`)}
        text={t(`ABOUT_US.sections_4.text`)}
        image={imageWhyChooseUs}
        link={{
          title: t(`ABOUT_US.link`),
          href: getLinkHrefViaNamespace('ABOUT_US'),
        }}
      />
    </main>
  );
}
