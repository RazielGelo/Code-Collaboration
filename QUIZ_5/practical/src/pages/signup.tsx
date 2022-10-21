import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "@/styles/Signup.module.sass";


export default function Signup() {
    const { data: session } = useSession();

    return (
            <div className={styles.container}>
                <div>
                    <Image src="/leftimg.svg" width="256px" height="715px" alt="image"/>
                </div>
                <div className={styles.inputContainer}>
                    <Image src="/reglogo.svg" width="380px" height="127px" alt="logo" />
                    <input type="email" placeholder="email"/>
                    <input type="email" placeholder="confirm email"/>
                    <input type="password" placeholder="password"/>
                    <input type="password" placeholder="confirm password"/>
                    <button className={styles.button}>register</button>
                </div>
            </div>
    )
}