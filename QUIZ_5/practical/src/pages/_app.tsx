import Layout from "@/components/Layout";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {

    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}
export default MyApp;