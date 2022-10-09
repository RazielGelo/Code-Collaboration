import Link from "next/link";
import styles from "@/styles/Navbar.module.sass";


export default function Navbar() {
    return (
      <div className={styles.navcontainer}>
        <div className={styles.navcon1}>
          <Link href={"/"}><a href={"/"}>HOME</a></Link>
          <Link href={"/#what"}><a href={"./#what"}>WHAT</a></Link>
          <Link href={"/#how"}><a href={"./#how"}>HOW</a></Link>
          <Link href={"/showyourcards"}><a href={"/"}>CARDS</a></Link>
        </div>
        <div className={styles.navcon2}>
          <Link href={"/api/auth/signin"}><a>LOGIN</a></Link>
          <Link href={"/signup"}><a>SIGNUP</a></Link>
        </div>
      </div>
    );
}
