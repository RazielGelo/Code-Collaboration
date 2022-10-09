import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.sass'
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps: { session, ...pageProps }}) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout(
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
    );
}