import { SiNodedotjs } from 'react-icons/si';
import {
  FaHouse,
  FaScrewdriverWrench,
  FaGlobe,
  FaCartShopping,
  FaLaptopCode,
  FaMobileScreenButton,
  FaMagnifyingGlassChart,
  FaCloud,
  FaPeopleCarryBox,
  FaMicrochip,
  FaUsers,
  FaEnvelope,
  FaCode,
} from 'react-icons/fa6';
import { FaReact } from 'react-icons/fa';
import { SiCreatereactapp, SiTypescript } from 'react-icons/si';
import { MdSupportAgent, MdOutlinePolicy } from 'react-icons/md';
import { LiaCookieSolid } from 'react-icons/lia';
import { GrTask } from 'react-icons/gr';

export const appConfig = [
  {
    namespace: 'HOME_PAGE',
    template: 'HOME_PAGE',
    icon: FaHouse,
    links: {
      en: '/',
      pl: '/',
      de: '/',
    },
  },
  {
    namespace: 'SERVICES',
    template: 'SERVICES',
    icon: FaScrewdriverWrench,
    links: {
      en: '/services',
      pl: '/uslugi',
      de: '/dienstleistungen',
    },
    children: [
      {
        namespace: 'WEBSITES',
        template: 'SINGLE_SERVICE',
        icon: FaGlobe,
        links: {
          en: '/websites',
          pl: '/strony-internetowe',
          de: '/webseiten',
        },
      },
      {
        namespace: 'E_COMMERCE',
        template: 'SINGLE_SERVICE',
        icon: FaCartShopping,
        links: {
          en: '/e-commerce',
          pl: '/sklepy-internetowe',
          de: '/e-commerce',
        },
      },
      {
        namespace: 'WEB_APPLICATIONS',
        template: 'SINGLE_SERVICE',
        icon: FaLaptopCode,
        links: {
          en: '/web-applications',
          pl: '/aplikacje-internetowe',
          de: '/web-anwendungen',
        },
      },
      {
        namespace: 'MOBILE_APPLICATIONS',
        template: 'SINGLE_SERVICE',
        icon: FaMobileScreenButton,
        links: {
          en: '/mobile-applications',
          pl: '/aplikacje-mobilne',
          de: '/mobil-anwendungen',
        },
      },
      {
        namespace: 'SERVER_APPLICATIONS',
        template: 'SINGLE_SERVICE',
        icon: FaCode,
        links: {
          en: '/server-applications',
          pl: '/aplikacje-serwerowe',
          de: '/server-apps',
        },
      },
      {
        namespace: 'SEARCH_ENGINE_OPTIMIZATION',
        template: 'SINGLE_SERVICE',
        icon: FaMagnifyingGlassChart,
        links: {
          en: '/search-engine-optimization',
          pl: '/optymalizacje-seo',
          de: '/seo-optimierung',
        },
      },
      {
        namespace: 'CLOUD_COMPUTING_SOLUTIONS',
        template: 'SINGLE_SERVICE',
        icon: FaCloud,
        links: {
          en: '/cloud-computing-solutions',
          pl: '/rozwiazania-chmurowe',
          de: '/cloud-computing-losungen',
        },
      },
      {
        namespace: 'OUTSOURCING',
        template: 'SINGLE_SERVICE',
        icon: FaPeopleCarryBox,
        links: {
          en: '/outsourcing',
          pl: '/outsourcing',
          de: '/outsourcing',
        },
      },
    ],
  },
  {
    namespace: 'TECHNOLOGIES',
    template: 'TECHNOLOGIES',
    icon: FaMicrochip,
    links: {
      en: '/technologies',
      pl: '/technologie',
      de: '/technologien',
    },
    children: [
      {
        namespace: 'TYPESCRIPT',
        icon: SiTypescript,
        template: 'SINGLE_TECHNOLOGY',
        links: {
          en: '/typescript',
          pl: '/typescript',
          de: '/typescript',
        },
      },
      {
        namespace: 'REACT',
        icon: FaReact,
        template: 'SINGLE_TECHNOLOGY',
        links: {
          en: '/react',
          pl: '/react',
          de: '/react',
        },
      },
      {
        namespace: 'NODE_JS',
        icon: SiNodedotjs,
        template: 'SINGLE_TECHNOLOGY',
        links: {
          en: '/nodejs',
          pl: '/nodejs',
          de: '/nodejs',
        },
      },
      {
        namespace: 'REACT_NATIVE',
        icon: SiCreatereactapp,
        template: 'SINGLE_TECHNOLOGY',
        links: {
          en: '/react-native',
          pl: '/react-native',
          de: '/react-native',
        },
      },
    ],
  },
  {
    namespace: 'ABOUT_US',
    template: 'ABOUT_US',
    icon: FaUsers,
    links: {
      en: '/about-us',
      pl: '/o-nas',
      de: '/uber-uns',
    },
  },
  {
    namespace: 'CONTACT',
    template: 'CONTACT',
    icon: FaEnvelope,
    links: {
      en: '/contact',
      pl: '/kontakt',
      de: '/kontakt',
    },
  },
  {
    namespace: 'SUPPORT',
    template: 'SUPPORT',
    icon: MdSupportAgent,
    links: {
      en: '/support',
      pl: '/pomoc',
      de: '/unterstutzung',
    },
    children: [
      {
        namespace: 'TERMS',
        icon: GrTask,
        template: 'SINGLE_SUPPORT',
        links: {
          en: '/terms-and-conditions',
          pl: '/regulamin',
          de: '/satzung',
        },
      },
      {
        namespace: 'POLICY',
        icon: MdOutlinePolicy,
        template: 'SINGLE_SUPPORT',
        links: {
          en: '/privacy-policy',
          pl: '/polityka-prywatnosci',
          de: '/datenschutzrichtlinie',
        },
      },
      {
        namespace: 'COOKIES',
        icon: LiaCookieSolid,
        template: 'SINGLE_SUPPORT',
        links: {
          en: '/cookies',
          pl: '/cookies',
          de: '/cookies',
        },
      },
    ],
  },
];

export type AppConfig = typeof appConfig;
export type AppConfigItem = AppConfig[number];
