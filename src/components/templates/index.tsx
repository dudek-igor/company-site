import type { TBaseProps, SupportedTemplate } from '@/config';
import { notFound } from 'next/navigation';
import { default as HomePage } from './HomePage/HomePage';
import { default as Services } from './Services/Services';
import { default as SingleService } from './SingleService/SingleService';
import { default as Technologies } from './Technologies/Technologies';
import { default as SingleTechnology } from './SingleTechnology/SingleTechnology';
import { default as AboutUs } from './AboutUs/AboutUs';
import { default as Contact } from './Contact/Contact';

type TDynamicTemplate = {
  template: SupportedTemplate;
} & TBaseProps;

const mapTemplate: Record<SupportedTemplate, React.ComponentType<TBaseProps>> = {
  HOME_PAGE: HomePage,
  SERVICES: Services,
  SINGLE_SERVICE: SingleService,
  TECHNOLOGIES: Technologies,
  SINGLE_TECHNOLOGY: SingleTechnology,
  ABOUT_US: AboutUs,
  CONTACT: Contact,
  SINGLE_SUPPORT: Contact,
  SUPPORT: Contact,
};

export default function DynamicTemplate({ template, locale, namespace }: TDynamicTemplate) {
  const Component = mapTemplate[template];

  if (!Component) return notFound();

  return <Component locale={locale} namespace={namespace} />;
}
