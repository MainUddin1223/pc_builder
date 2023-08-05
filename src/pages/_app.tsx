import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page: React.ReactNode) => page);
  return getLayout(<Component {...pageProps} />);
}