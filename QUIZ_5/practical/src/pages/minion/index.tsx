import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "@/styles/MinionContact.module.sass";
import Card from "@/components/Card"


export default function Minion() {
    const { data: session } = useSession();

    return (
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <div className={styles.img}>
                        <Image src="/postminlogo.png" width="493px" height="80px" alt="logo" />
                    </div>
                    <Card/>
                    <div className={styles.inputs}>
                        <input type="text" placeholder="your name"/>
                        <input type="email" placeholder="your email"/>
                        <input type="text" placeholder="your phone"/>
                        <input type="text" placeholder="message" style={{height: "271px"}}/>
                        <button className={styles.button}>send</button>
                    </div>
                        <Image src="/botimg.png" width="789px" height="351px" alt="logo"/>
                </div>
            </div>
    )
}