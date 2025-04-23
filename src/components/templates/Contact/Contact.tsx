import { SupportedLocale, SupportedNamespace } from '@/config';
/**
 * Template for Contact
 */
import { ContactSection } from '@/components/ui';

type TContacTemplate = {
  locale: SupportedLocale;
  namespace: SupportedNamespace;
};

export default function ContactTamplate({ namespace }: TContacTemplate) {
  return <ContactSection namespace={namespace} />;
}
