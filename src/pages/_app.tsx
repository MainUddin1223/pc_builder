import store from '@/redux/store';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page: React.ReactNode) => page);
  return <Provider store={store}>
    {
      getLayout(<Component {...pageProps} />)
    }
  </Provider>
}