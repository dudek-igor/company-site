import type { SupportedLocale, SupportedNamespace, SupportedTemplate } from '@/config';
import { notFound } from 'next/navigation';
import { default as HomePage } from './HomePage/HomePage';
import { default as Services } from './Services/Services';
import { default as SingleService } from './SingleService/SingleService';
import { default as Technologies } from './Technologies/Technologies';
import { default as SingleTechnology } from './SingleTechnology/SingleTechnology';
import { default as Company } from './Company/Company';
import { default as Contact } from './Contact/Contact';

type TDynamicTemplate = {
  template: SupportedTemplate;
  locale: SupportedLocale;
  namespace: SupportedNamespace;
};

type TMapTemplate = {
  locale: SupportedLocale;
  namespace: SupportedNamespace;
};

const mapTemplate: Record<SupportedTemplate, React.ComponentType<TMapTemplate>> = {
  HOME_PAGE: HomePage,
  SERVICES: Services,
  SINGLE_SERVICE: SingleService,
  TECHNOLOGIES: Technologies,
  SINGLE_TECHNOLOGY: SingleTechnology,
  COMPANY: Company,
  CONTACT: Contact,
};

export default function DynamicTemplate({ template, locale, namespace }: TDynamicTemplate) {
  const Component = mapTemplate[template];

  if (!Component) return notFound();

  return <Component locale={locale} namespace={namespace} />;
}
