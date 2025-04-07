import './globals.css';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
/**
 * We have to setup the layout just for Error 404 page
 */
export default async function ErrorLayout({ children }: Props) {
  return <>{children}</>;
}
