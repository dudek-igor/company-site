import { SupportedLocale, SupportedNamespace } from '@/config';
import {
  HeroSection,
  ServiceSection,
  HowItWorkSection,
  StatsSection,
  IntegrationSection,
  ContactSection,
} from '@/components/ui';
/**
 * Template for HomePage
 */

type THomePage = {
  locale: SupportedLocale;
  namespace: SupportedNamespace;
};

export default function HomePage({ namespace }: THomePage) {
  return (
    <>
      <HeroSection namespace={namespace} />
      <ServiceSection />
      <HowItWorkSection namespace={namespace} />
      <ContactSection namespace={namespace} />
      <IntegrationSection namespace={namespace} />
      <StatsSection namespace={namespace} />
    </>
  );
}
