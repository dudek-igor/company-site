import { appConfig, defaultLocale, type SupportedNamespace, AppConfigItem, AppConfig } from '@/config';
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
  /** @info Helpful Links namespace */
  const SUPPORT = 'SUPPORT';

  const buildTree = (items: typeof appConfig, parentPath = ''): NavigationNode[] => {
    return items
      .filter(({ namespace }) => {
        if (!withHelpfulLinks && namespace === SUPPORT) return false;
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
        if (onlyHelpfulLinks && namespace === SUPPORT) return true;
        return false;
      })[0]?.children || []
    : appConfig;

  const parentPath = onlyHelpfulLinks ? getLinkHrefViaNamespace(SUPPORT) : '';

  return buildTree(config, parentPath);
};
/**
 * Get children of given namespace
 */
export interface ChildrenItem extends Omit<AppConfigItem, 'links' | 'children' | 'template'> {
  link: string;
  parentLink: string;
  namespace: SupportedNamespace;
}

export const getChildrenNamespace = (namespace: SupportedNamespace): ChildrenItem[] => {
  const findChildren = (items: AppConfigItem[], parentPath = ''): ChildrenItem[] => {
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
/**
 * Get Href Link for given namespace
 */
export const getLinkHrefViaNamespace = (namespace: SupportedNamespace): string => {
  // Helper function to search the tree recursively
  const searchTree = (items: AppConfig): string | null => {
    for (const item of items) {
      // We check if this is the item we are looking for
      if (item.namespace === namespace) {
        return item.links[defaultLocale];
      }

      // If the element has children, we search them recursively
      if (item.children) {
        const childPath = searchTree(item.children);
        if (childPath) {
          // Łączymy ścieżkę rodzica z dzieckiem
          return item.links[defaultLocale] + childPath;
        }
      }
    }
    return null;
  };

  // Start searching app config
  return searchTree(appConfig) || '#';
};
