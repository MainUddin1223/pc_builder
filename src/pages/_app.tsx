import store from '@/redux/store';
import '@/styles/globals.css';
import { NextPage } from 'next';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page: React.ReactNode) => page);
  
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </Provider>
  );
}
