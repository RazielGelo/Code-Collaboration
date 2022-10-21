import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "@/styles/Login.module.sass";


export default function Login() {
    const { data: session } = useSession();

    return (
            <div className={styles.container}>
                <div>
                    <Image src="/leftimg.svg" width="256px" height="715px" alt="image"/>
                </div>
                <div className={styles.inputContainer}>
                    <Image src="/loginlogo.svg" width="259px" height="101px" alt="logo" />
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    <button className={styles.button}>login</button>
                </div>
            </div>
    )
}