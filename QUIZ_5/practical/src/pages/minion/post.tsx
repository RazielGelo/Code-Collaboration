import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "@/styles/Post.module.sass";


export default function Post() {
    const { data: session } = useSession();

    return (
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <Image src="/postminlogo.png" width="493px" height="80px" alt="logo" />
                    <input type="text" placeholder="minion name"/>
                    <input type="text" placeholder="skills"/>
                    <input type="text" placeholder="personality"/>
                    <input type="email" placeholder="email"/>
                    <input type="text" placeholder="phone"/>
                    <input type="text" placeholder="description" style={{height: "271px"}}/>
                    <input type="image" src="/imagelogo.png"/>
                    <button className={styles.button}>register</button>
                    <Image src="/botimg.png" width="789px" height="351px" alt="logo" />
                </div>
            </div>
    )
}