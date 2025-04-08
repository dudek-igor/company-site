import { appConfig, defaultLocale, type SupportedNamespace, AppConfigItem } from '@/config';
import type { IconType } from 'react-icons';
import { isValidNamespaceTypeGuard } from './i18n.utils';
/**
 * Utils for navigation purposes
 */
type TgetNavigationPaths = {
  withHomePath?: boolean;
  onlyMainRoute?: boolean;
  onlyHelpfulLinks?: boolean;
  withHelpfulLinks?: boolean;
};

export type NavigationNode = {
  link: string;
  icon: IconType;
  namespace: SupportedNamespace;
  children?: NavigationNode[];
};

export const getNavigationTree = ({
  withHomePath = false,
  onlyMainRoute = false,
  onlyHelpfulLinks = false,
  withHelpfulLinks = false,
}: TgetNavigationPaths = {}): NavigationNode[] => {
  const buildTree = (items: typeof appConfig, parentPath = ''): NavigationNode[] => {
    return items
      .filter(({ namespace }) => {
        if (!withHelpfulLinks && namespace === 'SUPPORT') return false;
        return true;
      })
      .map(({ namespace, links, icon, children }) => {
        const current = links[defaultLocale];

        if (!current) return null;

        const isHome = current === '/';
        if (isHome && !withHomePath) return null;

        const fullPath = isHome ? '/' : parentPath + current;

        if (!isValidNamespaceTypeGuard(namespace)) return null;

        const node: NavigationNode = {
          link: fullPath,
          icon,
          namespace,
        };

        if (!onlyMainRoute && children?.length) {
          const childNodes = buildTree(children, fullPath);
          if (childNodes.length) {
            node.children = childNodes;
          }
        }

        return node;
      })
      .filter((node): node is NavigationNode => Boolean(node));
  };

  const config = onlyHelpfulLinks
    ? appConfig.filter(({ namespace }) => {
        if (onlyHelpfulLinks && namespace === 'SUPPORT') return true;
        return false;
      })[0]?.children || []
    : appConfig;

  const parentPath = onlyHelpfulLinks ? '/support' : '';

  return buildTree(config, parentPath);
};
/**
 * Get children of given namespace
 */
interface ResultItem extends Omit<AppConfigItem, 'links' | 'children' | 'template'> {
  link: string;
  parentLink: string;
  namespace: SupportedNamespace;
}

export const getChildrenNamespace = (namespace: SupportedNamespace): ResultItem[] => {
  const findChildren = (items: AppConfigItem[], parentPath = ''): ResultItem[] => {
    for (const item of items) {
      const currentLink = item.links[defaultLocale];
      const fullPath = `${parentPath}${currentLink === '/' ? '' : currentLink}`;

      if (item.namespace === namespace && isValidNamespaceTypeGuard(namespace)) {
        return (item.children ?? []).map(({ links, namespace, icon }) => ({
          icon,
          namespace: namespace as SupportedNamespace,
          link: `${fullPath}${links[defaultLocale]}`,
          parentLink: fullPath,
        }));
      }

      if (item.children) {
        const result = findChildren(item.children, fullPath);
        if (result.length > 0) return result;
      }
    }

    return [];
  };

  return findChildren(appConfig);
};
