import { useSession, signIn, signOut, getProviders, getSession } from "next-auth/react";
import Image from "next/image";
import styles from "@/styles/Login.module.sass";
import { getToken } from "next-auth/jwt";

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const token = await getToken({
      req: context.req
    })
    console.log("token",token)
    console.log("session", session)
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
  
    function signin(e: any){
      signIn(e.target.credentialsID.value, {
        email: e.target.email.value,
        password: e.target.password.value,
      });
    };

export default function Login({providers}:any) {

    return (
            <div className={styles.container}>
                <div>
                    <Image src="/leftimg.svg" width="256px" height="715px" alt="image"/>
                </div>
                <form className={styles.inputContainer} method='POST' onSubmit={signin} action="/api/auth/callback/credentials">
                    <Image src="/loginlogo.svg" width="259px" height="101px" alt="logo" />
                    <input name='credentialsID' type='hidden'value={providers.credentials.id} />
                    <input type="email" name="email" placeholder="email"/>
                    <input type="password" name="password" placeholder="password"/>
                    <button type="submit" className={styles.button}>login</button>
                </form>
            </div>
    )
}