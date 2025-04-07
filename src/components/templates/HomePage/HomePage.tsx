import { SupportedLocale, SupportedNamespace } from '@/config';
import { HeroSection, ServiceSection } from '@/components/ui';
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
    </>
  );
}
