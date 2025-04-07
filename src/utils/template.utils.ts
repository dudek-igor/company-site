import { supportedTemplate, type SupportedTemplate } from '@/config';
/**
 * Type Guard for checking if the value is a valid Template
 */
export const isValidTemplateTypeGuard = (key: unknown): key is SupportedTemplate => {
  return typeof key === 'string' && supportedTemplate.some((template) => template === key);
};
