import * as React from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from "@/styles/Navbar.module.sass"

export default function Navbar() {

    return(
        <div className={styles.container}>
            <div>
                <Image src="/movielogo.png" alt="logo" width={138} height={155}/>
            </div>
            <div className={styles.link}>
                <Link href={"/movieupload"}><a>Movies</a></Link>
            </div>
            <div>
                <Link href={"/"}>TV SHOWS</Link>
            </div>
                <div>
                    <Link href={"/login"}>LOGIN</Link>
                </div>
                <div>
                    <Link href={"/signup"}>SIGNUP</Link>
                </div>
        </div>
    )
}