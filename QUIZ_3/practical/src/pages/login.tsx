import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image'
import styles from '@/styles/Login.module.sass'


export default function Login() {
    const { data: session } = useSession();
    if (session) {
        return (
            <div className={styles.container}>
                <div>
                    <Image src="/movieside.png" alt="logo" width="650" height="850"></Image>
                </div>
                <div>
                    Signed in as {session.user.email || session.user.name } <br />
                    <button className={styles.buttonstyle} onClick={() => signOut()}>Sign out</button>
                </div>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <div>
                <Image src="/movieside.png" alt="logo" width="650" height="850"></Image>
            </div>
            <div>
                Not signed in <br />
                <button className={styles.buttonstyle} onClick={() => signIn()}>Sign in</button>
            </div>
        </div>
    );
}