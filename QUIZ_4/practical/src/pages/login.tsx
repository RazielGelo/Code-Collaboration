import Link from 'next/link'
import styles from '../styles/Login.module.sass'
import Image from 'next/image'
import { NextPage } from 'next';
import { Props } from 'next/script';
import { ReactElement, ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProviders, getSession, signIn, signOut } from 'next-auth/react';

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (session) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return {
      props: {
        providers: await getProviders(),
      },
    };
  }

  const Login = (e) => {
    signIn(e.target.credentialsID.value, {
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

type NextPageWithLayout = NextPage<Props> & { 
    getLayout: (page: ReactElement) => ReactNode;
}

export default function Signin({providers}) {
        return (
            <div className={styles.container}>
                <form className={styles.seccontainer} method='POST' onSubmit={Login} action='/api/auth/callback/credentials'>
                    <h1 className={styles.fixposition1}>LOGIN</h1>
                    <p className={styles.fixposition2}>LEARN AND PLAY THE BEST CARD GAME.</p>
                    <input name='credentialsID' type='hidden'value={providers.credentials.id} />
                    <input type ="email" name='email' placeholder="YOUR EMAIL"/>
                    <input type ="password" name='password' placeholder="PASSWORD"/>
                    <button className={styles.fixposition1} type='submit'>
                        <Image src='/signupbutton.png' width='187px' height='105.97px' alt='Submit'/>
                    </button>
                    {/* <input type='image'  src='/signupbutton.png' width='187px' height='105.97px'/> */}
                </form>
            </div>
        )
    }         


Signin.getLayout = function (page: ReactElement) {
    return (
        <div className={styles.layout}>
            <Navbar />
            {page}
            <Footer />
        </div>
    )
}

