import Messenger from '@/components/MessengerChat';
import Loading from '@/components/loading';
import store from '@/redux/store';
import '@/styles/globals.css';
import { NextPage } from 'next';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

type PageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false)
  const Router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };
    const handleRouteChangeError = () => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [Router]);

  const getLayout = (Component as PageWithLayout).getLayout || ((page: React.ReactNode) => page);
  const persistor = persistStore(store)


  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
      {/* <PersistGate persistor={persistor}>
      </PersistGate> */}
        {isLoading && <Loading/>}
        {getLayout(<Component {...pageProps} />)}
        <Messenger/>
        </SessionProvider>
      </Provider>
  );
}
